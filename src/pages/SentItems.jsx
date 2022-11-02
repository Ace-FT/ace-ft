import React, { useContext, useEffect, useState } from "react";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import useRequest from '../hooks/useRequest';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {requestQueryOnApp} from '../shared/queries';
import structureResponse from "../utils/structureResponse";


const SentItems = () => {
  const iexec = new IExec({ ethProvider: window.ethereum });
  const { connectedAccount } = useContext(AceContext)
  console.log(connectedAccount)
  const queryType = "SENT_ITEMS";
  const query = requestQueryOnApp(queryType, connectedAccount)

  
  const { data, loading, error } = useRequest(query);
  const [renders, setRendered] = useState(false);
  const [allData, setAllData] = useState()
  var structuredResponse = null;


  useEffect(() => {
    if (data) {
      console.log(data)
      structuredResponse = structureResponse(data);;
      //structuredResponse = structureResponse(data);
      console.log("structuredResponse", structuredResponse)
      if(structuredResponse) { console.log("dataset details", structuredResponse[0]) }
      //console.log("One dataset", structuredResponse[0].dataset.name)
      setAllData(structuredResponse)
      setRendered(true);
    } 
  }, [data])


  return (
    <div>
      {allData ? (
        <table className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="border-r border-gray-200 py-3">Send date</th>
              <th className="border-r border-gray-200 py-3">To</th>
              <th className="border-r border-gray-200 py-3">Price (in RLC)</th>
              <th className="border-r border-gray-200 py-3">Status</th>
              <th className="px-3">Download date</th>
            </tr>
          </thead>
          <tbody>
            { allData.map((datasetOrder, i) => {
              console.log(structuredResponse);

              const isCompleted = datasetOrder.deals && datasetOrder.deals[0] && datasetOrder.deals[0].tasks && datasetOrder.deals[0].tasks[0] && datasetOrder.deals[0].tasks[0].status === "COMPLETED"
              return (
                <tr className="text-center border-b border-gray-200" key={i}>
                  <td className="border-r border-gray-200 p-3">{datasetOrder.dataset.timestamp}</td>
                  <td className="border-r border-gray-200 p-3">{datasetOrder.requesterrestrict}</td>
                  <td className="border-r border-gray-200 p-3">{datasetOrder.datasetprice}</td>
                  <td className="border-r border-gray-200 p-3">{isCompleted ? <span>Downloaded</span> : <span>Received</span>}</td>
                  <td className="border-r border-gray-200 p-3">{datasetOrder.dataset.timestamp}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black">
          You have no pending files in your inbox.
        </div> 
      )}
    </div>
  );
};

export default SentItems;
