export const WebRoutes = {
    Home: "/",
    Search: "/search",
    Mappy: "/mappy",
}

export function getPath(path: string, id?: string) {
    return  id ?
        path.replace(":id", id).replace(":uid", id) :
        path
}