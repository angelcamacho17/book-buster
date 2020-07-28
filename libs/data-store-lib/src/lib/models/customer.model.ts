export interface ICustomer {
  id?: number;
  name: string;
  address: string;
  initials?: string;
  smallIcon?: boolean,
  email?: string
}

export interface ICustomerState {
  customers: ICustomer[]
}
