import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function useRequest(requestQuery) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    client
      .query({
        query: gql(requestQuery),
      })
      .then((data) => {
        setData(data);
        console.log("Subgraph data: ", data);
      })
      .catch((err) => {
        setError(err);
        console.log("Error data fetching", err);
      });
  }, [requestQuery]);


  return { data, loading, error }
}

export default useRequest;