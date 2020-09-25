export interface IHeader {
  title: string,
  leftIcon?: string,
  profIcon?: boolean,
  rightIcon?: string,
  titClass: string,
  lastUrl?: string,
  checkGoBack?: boolean,
  addArt?: boolean,
  centered?: boolean,
  flow?: string,
  rightIconClass?: string
}

export interface IHeaderState {
  header: IHeader
}
