export interface IHeader {
  title: string,
  leftIcon?: string,
  rightIcon?: string,
  titClass: string,
  lastUrl?: string,
  checkGoBack?: boolean,
  addArt?: boolean,
  centered?: boolean,
  flow?: string
}

export interface IHeaderState {
  header: IHeader
}
