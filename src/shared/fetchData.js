import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const fetchData = (async (theGraphQuery) => {

  let data = null;
  let error = null;
  let loading = null;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
  });

  try {
    let response = await client.query({ query: gql(theGraphQuery) });
    loading = response.loading;
    data = response.data;

  }
  catch (err) {
    error = err;
    console.error("Error data fetching", err);
  }
  if (IS_DEBUG) console.log("Subgraph data:> ", data);
  return { data, loading, error }

});

export default fetchData;


