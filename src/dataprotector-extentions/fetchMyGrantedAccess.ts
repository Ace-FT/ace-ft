import * as ace from "../shared/constants";
import { getIexec } from "../shared/getIexec";
import { GrantedDataAccessInfo } from "./GrantedDataAccessInfo";

export const getProtectedDataAccess = async (protectedData: string, name?: string, granted?: string) => {
  const iexec = getIexec();

  try {
    var orderBook = await iexec.orderbook.fetchDatasetOrderbook(
      protectedData,
      {
        app: ace.APP_ADDRESS,
        requester: granted,
        minTag: ["tee", "scone"],
        maxTag: ["tee", "scone"],
      }
    );

    var dataAccessInfo: GrantedDataAccessInfo = {
      id: protectedData,
      name: name,
      dataOwner: orderBook.orders[0]?.signer,
      to: granted,
      price: orderBook.orders[0]?.order.datasetprice,
      orderHash: orderBook.orders[0]?.orderHash,
      tag: orderBook.orders[0]?.order.tag,
      status: orderBook.orders[0]?.status,
    };

    if (orderBook.orders[0]?.publicationTimestamp)
      dataAccessInfo.sendTimestamp = new Date(orderBook.orders[0]?.publicationTimestamp);


    return dataAccessInfo;
  } catch (err) {
    console.log(err);
  }
};
