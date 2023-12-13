export type GrantedDataAccessInfo = {
  id: string,
  name?: string,
  dataOwner: string,
  to?: string,
  sendTimestamp?: Date,
  price: number,
  orderHash: string,
  tag?: string,
  status: string,
  taskid?: string,
  dealid?: string,
  downloadTimestamp?: any,
}