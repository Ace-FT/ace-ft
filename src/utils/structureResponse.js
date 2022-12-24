const structureResponse = (data) => {
    
    if(data && data.datasets) {
        data.datasets.map((e)=> console.log("ds-------->",  e));
        return data.datasets;
    }
    return null;
}

export default structureResponse;