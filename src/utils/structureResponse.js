const structureResponse = (data) => {
    if(data && data.data) {
        data.data.datasetOrders.map((e)=> console.log(e));
        return data.data.datasetOrders;
    }
    return null;
}

export default structureResponse;