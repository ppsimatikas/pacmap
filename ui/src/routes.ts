export const WebRoutes = {
    Home: "/",
    Search: "/search",
    SearchResults: "/results",
    Mappy: "/mappy",
    Module: "/module/:id"
}

export function getPath(path: string, id?: string) {
    return  id ?
        path.replace(":id", id).replace(":uid", id) :
        path
}

export function toResults(query: string) {
    return  `${WebRoutes.SearchResults}?query=${query}`
}