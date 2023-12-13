import * as ace from "../../shared/constants";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

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