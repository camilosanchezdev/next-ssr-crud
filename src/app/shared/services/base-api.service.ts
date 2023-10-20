

export const GET = async <T>(
    url: string,
    headers: Record<string, string> = {}
): Promise<T> => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': "application/json",
            ...headers
        },

    })
    if (!response.ok) {
        return Promise.reject(response.statusText)
    }
    return (await response.json()) as T
}


export const POST = async <ReqType, ResType>(
    url: string,
    body: ReqType,
    headers: Record<string, string> = {}
): Promise<ResType> => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return (await response.json()) as ResType;
};

export const PUT = async <ReqType, ResType>(
    url: string,
    body: ReqType | ReqType[] | null,
    headers: Record<string, string> = {}
): Promise<ResType> => {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return (await response.json()) as ResType;
};

export const DELETE = async <T>(
    url: string,
    headers: Record<string, string> = {}
): Promise<T> => {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            ...headers
        }
    })
    if (!response.ok) {
        return Promise.reject(response.statusText)
    }
    return (await response.json()) as T
}