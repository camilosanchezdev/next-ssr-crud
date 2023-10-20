import { Session } from "next-auth";
import { DELETE, GET, POST, PUT } from "./base-api.service";

const initialQuery: QueryCriteria = {
    sorts: [],
    filters: [],
    search: '',
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface ListPageResponse<T = any> {
    count: number
    start: number
    length: number
    data: T[]
}

interface FilterCriterion {
    propertyName: string
    type: string
    value: any
    from?: string
    to?: string
    or?: FilterCriterion[]
    and?: FilterCriterion[]
}


interface SortCriterion {
    propertyName: string
    descending?: boolean
}

export interface QueryCriteria {
    sorts: SortCriterion[]
    filters: FilterCriterion[]
    search: string
}

interface ListPageCriteria {
    start: number
    length: number
    query?: string
}
type BaseApiType = {
    get: <ResType>(id?: number) => Promise<ResType>
    list: <ResType>(criteria?: ListPageCriteria) => Promise<ListPageResponse<ResType>>
    all: <ResType>() => Promise<ResType>
    create: <ReqType, ResType>(payload: ReqType, createAction?: boolean) => Promise<ResType>
    update: <ReqType, ResType>(payload: ReqType | null | ReqType[], id?: number) => Promise<ResType>
    remove: <ResType>(id: number, deleteAction?: boolean) => Promise<ResType>
}


export function BaseApi(
    url: string,
    session: Session | null,
): BaseApiType {

    const baseUrl = `${API_URL}/${url}`

    const headers: HeadersInit = {
        ...(session && { Authorization: `Bearer ${session?.user}` }),
        Accept: 'application/json',
        'Content-Type': 'application/json',

    }

    const get = async <ResType>(id?: number): Promise<ResType> => {
        const URL = baseUrl + `${id ? `/${id}` : ''}`
        return GET<ResType>(URL, headers)
    }


    const all = async <ResType>(): Promise<ResType> => {
        const URL = `${baseUrl}/all`
        return GET<ResType>(URL, headers)
    }

    const list = async <ResType>(
        criteria: ListPageCriteria = { start: 0, length: 0, query: '' },
    ): Promise<ResType> => {
        const queryValue = JSON.stringify(initialQuery) !== criteria.query ? criteria.query : null
        const params = {
            start: criteria.start.toString(),
            length: criteria.length.toString(),
            ...(queryValue && { query: queryValue })
        }
        const baseUrlApi = `${baseUrl}?`
        const URL = baseUrlApi + new URLSearchParams(params)
        return GET<ResType>(URL, headers)
    }

    const create = async <ReqType, ResType>(payload: ReqType, createAction: boolean = false): Promise<ResType> => {
        const URL = `${baseUrl}${(createAction ? '/create' : '')}`
        return POST<ReqType, ResType>(URL, payload, headers)
    }

    const update = async <ReqType, ResType>(payload: ReqType | null | ReqType[], id?: number): Promise<ResType> => {
        const URL = `${baseUrl}${id ? `/${id}` : ''}`
        return PUT<ReqType, ResType>(URL, payload, headers)
    }

    const remove = async <ResType>(id: number, deleteAction: boolean = false): Promise<ResType> => {
        const URL = `${baseUrl}${(deleteAction ? '/delete' : '')}/${id}`
        return DELETE<ResType>(URL, headers)
    }

    return { get, all, list, create, update, remove }
}

