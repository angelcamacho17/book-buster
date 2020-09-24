export interface ICustomerAddress {
  uuid: 9770
  box?: string;
  city?: string;
  code?: number;
  country?: string;
  formatted?: any;
  number?: number;
  street?: string;
  zip?: string;
}

export interface ICustomer {
  uuid?: number;
  address: ICustomerAddress;
  code: number;
  email?: string;
  mobile?: string;
  name: string;
  phone?: string;
  title?: string;
  initials?: string;
  smallIcon?: boolean;
}

export interface ICustomersState {
  customers: ICustomer[]
}


export interface ICustomerState {
  customer: ICustomer
}

