export interface Customer {
  id?: number;
  name: string;
  address: string;
  initials?: string;
}

export interface CustomerState {
  customers: Customer[]
}
