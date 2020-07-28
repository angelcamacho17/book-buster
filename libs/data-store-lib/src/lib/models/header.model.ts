export interface IHeader {
  title: string,
  leftIcon: string,
  rightIcon: string,
  titClass: string,
  lastUrl: string,
  confirmDiscard?: boolean,
  addArt?: boolean,
  centered?: boolean
}

export interface IHeaderState {
  header: IHeader
}
