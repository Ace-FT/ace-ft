import { ApolloClient, InMemoryCache, gql } from "@apollo/client";


async function  fetchData(requestQuery) {
  let data = null ; 
  let error = null ; 

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
  });

    await client
      .query({
        query: gql(requestQuery),
      })
      .then((returnedData) => {
        data = returnedData ;
      })
      .catch((err) => {
        error = err;
        console.log("Error data fetching", err);
      });

  console.log("SETTING DATA +HERE ", data) ; 
  return data ;
}

export default fetchData;