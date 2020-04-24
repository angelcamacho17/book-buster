export interface Customer {
  id?: number,
  name: string,
  address: string,
  initials?: string,
  smaller?: boolean
}

export interface CustomerState {
  customers: Customer[]
}
