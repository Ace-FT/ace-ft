import * as ace from "./constants";
import { getIexec } from "./getIexec";
import inboxItemStruct from "../utils/inboxItemStruct.ts";
import { setIexecProvider } from "./web3AuthLogin";
import { getProtectedDataAccess } from "../dataprotector-extentions/fetchMyGrantedAccess.ts";

const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

const ensLookup = async(items) => {
    let iexec = getIexec();

    for (let k = 0; k < items.length; k++) {
        if (items[k].dataOwner) {
            try {
                let ensLookup = await iexec.ens.lookupAddress(items[k].to);
                if (ensLookup) { items[k].to = ensLookup; }
            } catch (e) { console.error(e); }

            try {
                let ensLookup = await iexec.ens.lookupAddress(items[k].dataOwner);
                if (ensLookup) { items[k].dataOwner = ensLookup; }
            } catch (e) { console.error(e); }
        }
    }

}

export const mapInboxOrders = async(connectedAccount, structuredResponseItems) => {
    if (IS_DEBUG) console.log("structuredResponseItems", structuredResponseItems); 

    let mapped = await Promise.all(structuredResponseItems.map(async(item) => {
        console.log("========== using dataprotector ==========")

        let itemProtectedData = await getProtectedDataAccess(item.id, item.name, connectedAccount)
        if (item.orders && item.orders.length > 0 && item.orders[0].deals && item.orders[0].deals.length > 0) {
            if (IS_DEBUG) console.log("There is a deal,", item.orders[0].deals[0].id)
            itemProtectedData.dealid = item.orders[0].deals[0].id;

            if (IS_DEBUG) console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime));
            itemProtectedData.downloadTimestamp = new Date(Number(item.orders[0].deals[0].startTime) * 1000);

            if (item.orders[0].deals[0].tasks && item.orders[0].deals[0].tasks.length > 0) {
                itemProtectedData.taskid = item.orders[0].deals[0].tasks[0].id;
                itemProtectedData.status = item.orders[0].deals[0].tasks[0].status;
            }
        }
    
        if (IS_DEBUG) console.log("itemProtectedData", itemProtectedData)

        return itemProtectedData;
    }));

    mapped = mapped.filter((item) => {
        return (null != item && item.to && item.to.toLowerCase() === connectedAccount) || (null != item && item.to && item.to === connectedAccount);
    })
    await ensLookup(mapped);

    if (IS_DEBUG) console.log("mapped after filter", mapped);

    return mapped;
}


export const countPendingInboxItems = async(connectedAccount, structuredResponseItems) => {
    let mapped = await mapInboxOrders(connectedAccount, structuredResponseItems);

    let pendingInboxItem = mapped.filter((item) => {
        return !item.taskid || item.taskid === "";
    });

    return pendingInboxItem.length;
}


export const mapSentItemsOrders = async(connectedAccount, structuredResponseItems) => {
    if (IS_DEBUG) console.log("structuredResponseItems", structuredResponseItems);

    let mapped = await Promise.all(structuredResponseItems.map(async(item) => {
        let requester = "0x0000000000000000000000000000000000000000";

        if (item.name.indexOf('#') > -1) {
            let foundRequest = item.name.split('#')[1].toLowerCase();

            let regExMatch = foundRequest.match(/(\b0x[a-f0-9]{40}\b)/g)
            if (IS_DEBUG) console.log("GRRRRR", item.name, foundRequest, regExMatch);

            if (regExMatch && regExMatch.length > 0) {
                requester = regExMatch[0];
            }
            if (IS_DEBUG) console.log("requester", requester);
        }

        let itemProtectedData = await getProtectedDataAccess(item.id, item.name, requester)
        if (item.orders && item.orders.length > 0 && item.orders[0].deals.length > 0) {
            if (IS_DEBUG) console.log("There is a deal,", item.orders[0].deals[0].id)
            itemProtectedData.dealid = item.orders[0].deals[0].id;

            if (IS_DEBUG) console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime));
            itemProtectedData.downloadTimestamp = new Date(Number(item.orders[0].deals[0].startTime) * 1000);

            if (item.orders[0].deals[0].tasks && item.orders[0].deals[0].tasks.length > 0) {
                itemProtectedData.taskid = item.orders[0].deals[0].tasks[0].id;
                itemProtectedData.status = item.orders[0].deals[0].tasks[0].status;
            }
        }
        return itemProtectedData
    }));

    mapped = mapped.filter((item) => {
        return (null !== item && item.dataOwner && item.dataOwner.toLowerCase() === connectedAccount) || (null !== item && item.dataOwner === connectedAccount);
    })
    await ensLookup(mapped);

    if (IS_DEBUG) console.log("mapped after filter", mapped);

    return mapped;
}