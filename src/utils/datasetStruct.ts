export function datasetStruct(key: string, url: string, message: string, size: number) {
    return {
        "key": key,
        "url": url,
        "message": message,
        "size": size,
    }
}