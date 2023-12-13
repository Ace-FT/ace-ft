export default function inboxItemStruct(id: string, 
                                        name: string, 
                                        owner: string) {
    return {
        "id": id,
        "name": name,
        "from": owner,
        "to": "",
        "status": "",
        "sendDate": "",
        "orderHash":"",
        "price":0,
        "downloadDate": "", 
        "taskid":"", 
        "dealid":""
    }
}