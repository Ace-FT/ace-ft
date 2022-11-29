import * as ace from "../../shared/constants";

const queryForInbox = (requestingAccount) => {
    return `
    {
        datasetOrders(
          where: {apprestrict: "${ace.APP_ADDRESS}"}
        ) {
          requesterrestrict
          datasetprice
          dataset {
            id,
            name,owner {
              id
            }
            timestamp
          }
          deals(
            where: {datasetOwner_: {id: "${requestingAccount}"}}
          ) {
            tasks {
              status
            }
          }
        }
      }
        `
}
export default queryForInbox;