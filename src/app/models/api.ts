export interface IPin {
  description: string,
  lat: number,
  lng: number
  link: string
}
export interface IUserData {
  id: number,
  gender: 'MALE' | 'FEMALE',
  avatar: string,
  firstName: string,
  lastName: string
}

export interface IAuthProvider {
  type: 'FACEBOOK',
  externalId: string,
  accessToken: string
}

export interface IUser {
  id: number,
  email: string,
  userData?: IUserData,
  isSitter?: boolean
  authProviders?: IAuthProvider[]
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

export interface ILocation {
  name: string,
  id: number,
  description: string,
  link: string,
  thumbnail: string,
  lat: number,
  lng: number,
  lang: string,
  type: string
}

export interface IRoomApplication {
  rating: number,
  review: string,
  consumer?: IUser,
  provider?: IUser,
  room?: IRoom,
  count?: number,
  status: 'CONFIRMED' | 'WAITING_CONSUMER_CONFIRM' | 'WAITING_PROVIDER_CONFIRM' | 'DECLINED_BY_CONSUMER' | 'DECLINED_BY_PROVIDER' |
    'FINISHED'
  startedAt: string
  endedAt: string
}

export interface IRoomImage {
  src: string,
}

export interface IRoom {
  id: number,
  // name: string,
  description: string,
  cost: number,
  limit?: number,
  isAvailable: boolean,
  applications: IRoomApplication[]
  isOwner?: boolean,
  images?: IRoomImage[],
  user?: IUser
}

export interface IUserReview {
  rating: number,
  text: string,
  reviewer?: IUser,
  user?: IUser
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
 * Location
 */
export interface ILocationListRequest {
  skip: number,
  limit: number,
  categories?: string[]
}

export interface ILocationListResponse {
  list: ILocation[],
  count: number
}

export interface ILocationPinsRequest {
  categories?: string[]
}

export interface ILocationPinsResponse extends ILocation {}

export interface ILocationFiltersRequest {}

export interface ILocationFiltersResponse {
  categories?: { [name: string]: { id: number, name: string } }
}

/**
 * Room
 */
export interface IRoomListRequest {
  skip: number,
  limit: number
}

export interface IRoomListResponse {
  list: IRoom[],
  count: number
}

export interface IRoomCreateRequest {
  name: string,
  description: string,
  cost: number,
  limit: number,
  images: File[],
}

export interface IRoomCreateResponse extends IRoom {}

export interface IRoomGetByIdRequest {
  roomId: number
}

export interface IRoomGetByIdResponse extends IRoom {}

export interface IRoomApplyRequest {
  roomId: number
}

export interface IRoomApplyResponse {}

/**
 * Notification
 */
export interface INotificationCountRequest {}

export interface INotificationCountResponse {
  count: number
}

export interface INotificationListRequest {
  skip: number,
  limit: number
}

export interface INotificationListResponse {
  list: any,
  count: number
}
