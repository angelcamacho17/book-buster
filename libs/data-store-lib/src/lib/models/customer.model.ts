export interface Customer {
  id?: number,
  name: string,
  address: string
}

export interface CustomerState {
  customers: Customer[]
}
