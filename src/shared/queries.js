import { IExec } from "iexec";
import * as ace from "../shared/constants";

/**
 * Get the stringify query
 * @param {string} query the type of query (is it for Inbox or for the SentItems list ?)
 * @param {string} requestingAccount the account requesting the query
 * @returns the stringified query
 */
export const requestQueryOnApp = (query, requestingAccount) => {
    if (query === "INBOX") {
        query = `
        {
            datasetOrders(
                  where: {apprestrict: "${ace.APP_ADDRESS}", requesterrestrict: "${requestingAccount}"}
            ) {
                dataset {
                id
                owner {
                    id
                }
                name
                timestamp
                }
                datasetprice
            deals {
              id
              tasks {
                id,
                status
              }
            }
          }
        }
            `
    } else if (query === "SENT_ITEMS") {
        query = `
                {
                    datasetOrders(
                    where: {apprestrict: ${ace.APP_ADDRESS}}
                    ) {
                    dataset {
                        id
                        name
                        timestamp
                        owner {
                        id
                        }
                    }
                    datasetprice
                    requesterrestrict
                    }
                }
            `
    }
    return query;
}




export const queryForMyInbox = `
query {
  datasetOrders(
    where: {apprestrict: "0x2bd8fdfa9a2fc441939402441ecffc9f2de22ebd", requesterrestrict: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0"}
  ) {
    dataset {
      id
      owner {
        id
      }
      name
      timestamp
    }
    datasetprice
  }
}
`;

export const queryForSentItems = `
{
    datasetOrders(
      where: {apprestrict: "0x2bd8FDFA9A2Fc441939402441EcFfc9F2De22eBd"}
    ) {
      dataset {
        id
        name
        timestamp
        owner {
          id
        }
      }
      datasetprice
      requesterrestrict
    }
  }
`;
