export interface Customer {
  id?: number,
  name: string,
  address: string,
  initials?: string,
  smallIcon?: boolean,
  email?: string
}

export interface CustomerState {
  customers: Customer[]
}
