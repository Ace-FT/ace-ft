export function datasetStruct(key: string, url: string, fileName: string, message: string, size: number) {
    return {
        "key": key,
        "url": url,
        "name": fileName,
        "message": message,
        "size": size,
    }
}