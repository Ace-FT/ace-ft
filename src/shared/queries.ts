import * as datasetNameGenerator from "../utils/datasetNameGenerator.ts";

export const inboxDatasetsQuery = (owner?: string, requesterrestrict?:string) =>  {


  const datasetNameLookup = datasetNameGenerator.generateDatasetNameLookup(owner, requesterrestrict); 
  const query = `
  {
    datasets(
      where: {name_contains: "${datasetNameLookup}"}
    ) {
      id
      name
      owner {
        id
      }
      orders {
        id
        deals {
          id
          startTime
          tasks(first: 1) {
            id,
            status
          }
        }
      }
    }
  }`;

  return query ;
}
