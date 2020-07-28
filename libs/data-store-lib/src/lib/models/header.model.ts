export interface Header {
  title: string,
  leftIcon: string,
  rightIcon: string,
  titClass: string,
  lastUrl: string,
  confirmDiscard: boolean,
  addArt: boolean,
  centered: boolean
}

export interface HeaderState {
  header: Header
}
