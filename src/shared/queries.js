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
            where: {apprestrict: "${ace.APP_ADDRESS}"}
          ) {
            requesterrestrict
            datasetprice
            dataset(where: {owner: {id: "${requestingAccount}"}}) {
              name
              timestamp
              multiaddr
              owner {
                id
              }
            }
            deals {
              id
              tasks {
                status
              }
            }
          }
        }
            `
    }
    return query;
}