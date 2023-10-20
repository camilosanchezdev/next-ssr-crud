const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData<T>(slug: string) {
    const response = await fetch(`${baseUrl}/${slug}`, { cache: "no-store" });

    if (!response.ok) throw new Error(`${response.status}`)

    return response.json() as Promise<T>;
}