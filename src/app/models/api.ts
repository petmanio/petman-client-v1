export interface IUserData {
  id: number,
  gender: 'MALE' | 'FEMALE',
  avatar: string,
  user: number
}

export interface IAuthProvider {
  provider: 'FACEBOOK',
  fbId: string,
  fbAccessToken: string
}

export interface IUser {
  id: number,
  email: string,
  userData?: IUserData,
  authProvider?: IAuthProvider
}

export interface IBlog {
  id: number,
  source: string,
  description: string,
  link: string,
  thumbnail: string,
  date: string,
  lang: string
}

export interface IShop {
  name: string,
  id: number,
  description: string,
  link: string,
  thumbnail: string,
  lat: number,
  lng: number
  lang: string
}

/**
 * Auth
 */
export interface ILoginRequest {
  fb: {
    authResponse: any
  }
}

export interface ILoginResponse {
  token: string
}

export interface IFbLoginRequest {

}

export interface IFbLoginResponse {

}

export interface IAuthCurrentUserRequest {}

export interface IAuthCurrentUserResponse extends IUser {

}

/**
 * Blog
 */
export interface IBlogListRequest {
  skip: number,
  limit: number
}

export interface IBlogListResponse {
  list: IBlog[],
  count: number
}

/**
 * Blog
 */
export interface IShopListRequest {
  skip: number,
  limit: number
}

export interface IShopListResponse {
  list: IShop[],
  count: number
}

export interface IShopPinsRequest {}

export interface IShopPinsResponse extends IShop {}
