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

export interface IBlogListResponse extends IBlog {

}
