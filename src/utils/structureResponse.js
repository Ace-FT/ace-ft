const structureResponse = (data) => {
    
    if(data && data.data.datasets) {
        data.data.datasets.map((e)=> console.log("ds-------->",  e));
        return data.data.datasets;
    }
    return null;
}

export default structureResponse;