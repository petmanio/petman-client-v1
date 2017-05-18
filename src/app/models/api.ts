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
  icon?: string,
  sourceCreatedAt?: string,
  createdAt: string
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
  id: number,
  rating: number,
  review: string,
  consumer?: IUser,
  provider?: IUser,
  room?: number | IRoom,
  count?: number,
  chats?: IRoomApplicationMessage[],
  status: 'IN_PROGRESS' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'CONFIRMED' | 'FINISHED',
  startedAt: string
  endedAt: string
  finishedAt: string
}

export interface IRoomApplicationMessage {
  to: number | IUser
  from: number | IUser,
  application: number | IRoomApplication,
  room: number | IRoom,
  isOwner: boolean,
  message: string,
  createdAt: string
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
  user?: IUser,
  createdAt: string
}

export interface IAdoptImage {
  src: string,
}

export interface IAdoptComment {
  comment: string,
  adopt: number
  user: IUser,
  createdAt: string
}

export interface IAdopt {
  id: number,
  description: string,
  images?: IAdoptImage[],
  comments?: IAdoptComment[],
  commentsCount?: number,
  user?: IUser,
  createdAt: string,
}

export interface IWalkerApplication {
  id: number,
  rating: number,
  review: string,
  consumer?: IUser,
  provider?: IUser,
  walker?: number | IWalker,
  count?: number,
  chats?: IWalkerApplicationMessage[],
  status: 'IN_PROGRESS' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'CONFIRMED' | 'FINISHED',
  startedAt: string
  endedAt: string
  finsihedAt: string
}

export interface IWalkerApplicationMessage {
  to: number | IUser
  from: number | IUser,
  isOwner: boolean,
  application: number | IWalkerApplication,
  walker: number | IWalker,
  message: string,
  createdAt: string
}

export interface IWalker {
  id: number,
  // name: string,
  description: string,
  cost: number,
  limit?: number,
  isAvailable: boolean,
  applications: IWalkerApplication[]
  isOwner?: boolean,
  user?: IUser,
  createdAt: string
}

export interface INotificationRoomApplicationStatusUpdate {
  room: number | IRoom,
  application: number | IRoomApplication,
  prevStatus: string,
  currentStatus: string
}

export interface INotificationRoomApplicationCreate {
  room: number | IRoom,
  application: number | IRoomApplication,
}

export interface INotificationRoomApplicationMessageCreate {
  room: number | IRoom,
  application: number | IRoomApplication,
  message: number | IRoomApplicationMessage,
}

export interface INotificationWalkerApplicationStatusUpdate {
  walker: number | IWalker,
  application: number | IWalkerApplication,
  prevStatus: string,
  currentStatus: string
}

export interface INotificationWalkerApplicationCreate {
  walker: number | IWalker,
  application: number | IWalkerApplication,
}

export interface INotificationWalkerApplicationMessageCreate {
  walker: number | IWalker,
  application: number | IWalkerApplication,
  message: number | IWalkerApplicationMessage,
}

export interface INotificationAdoptComment {
  comment: number | IAdoptComment,
  adopt: number | IAdopt
}

export interface INotification {
  id: number,
  from: number | IUser,
  to: number | IUser,
  roomApplicationCreate: number | INotificationRoomApplicationCreate,
  roomApplicationStatusUpdate: number | INotificationRoomApplicationStatusUpdate,
  roomApplicationMessageCreate: number | INotificationRoomApplicationMessageCreate,
  walkerApplicationCreate: number | INotificationWalkerApplicationCreate,
  walkerApplicationStatusUpdate: number | INotificationWalkerApplicationStatusUpdate,
  walkerApplicationMessageCreate: number | INotificationWalkerApplicationMessageCreate,
  adoptCommentCreate: number | INotificationAdoptComment,
  seen: boolean,
  createdAt: string
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
  token: string,
  user: IUser
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

export interface IRoomUpdateApplicationRequest extends IRoomApplication {}

export interface IRoomUpdateApplicationResponse extends IRoomApplication {}

export interface IRoomApplicationMessageListRequest {
  applicationId: number
}

export interface IRoomApplicationMessageListResponse {
  count: number,
  list: IRoomApplicationMessage[]
}

export interface IRoomApplicationMessageJoinRequest {
  applicationId: number,
  'x-auth-token'?: string
}

export interface IRoomApplicationMessageCreateRequest {
  applicationId: number,
  message: string
}

// TODO: add IRoomApplicationMessageCreateResponse interface

export interface IRoomApplicationMessageCreateEventResponse extends IRoomApplicationMessage {

}

export interface IRoomShareOnFacebookRequest {
  method?: string,
  name?: string,
  link?: string,
  caption?: string,
  picture?: string,
  description?: string
}

export interface IRoomShareOnFacebookResponse {}


/**
 * Walker
 */
export interface IWalkerListRequest {
  skip: number,
  limit: number
}

export interface IWalkerListResponse {
  list: IWalker[],
  count: number
}

export interface IWalkerCreateRequest {
  name: string,
  description: string,
  cost: number,
  limit: number,
  images: File[],
}

export interface IWalkerCreateResponse extends IWalker {}

export interface IWalkerGetByIdRequest {
  walkerId: number
}

export interface IWalkerGetByIdResponse extends IWalker {}

export interface IWalkerApplyRequest {
  walkerId: number
}

export interface IWalkerApplyResponse {}

export interface IWalkerUpdateApplicationRequest extends IWalkerApplication {}

export interface IWalkerUpdateApplicationResponse extends IWalkerApplication {}

export interface IWalkerApplicationMessageListRequest {
  applicationId: number
}

export interface IWalkerApplicationMessageListResponse {
  count: number,
  list: IWalkerApplicationMessage[]
}

export interface IWalkerApplicationMessageJoinRequest {
  applicationId: number,
  'x-auth-token'?: string
}

export interface IWalkerApplicationMessageCreateRequest {
  applicationId: number,
  message: string
}

// TODO: add IWalkerApplicationMessageCreateResponse interface

export interface IWalkerApplicationMessageCreateEventResponse extends IWalkerApplicationMessage {

}

export interface IWalkerShareOnFacebookRequest {
  method?: string,
  name?: string,
  link?: string,
  caption?: string,
  picture?: string,
  description?: string
}

export interface IWalkerShareOnFacebookResponse {}

/**
 * Adopt
 */
export interface IAdoptListRequest {
  skip: number,
  limit: number
}

export interface IAdoptListResponse {
  list: IAdopt[],
  count: number
}

export interface IAdoptCreateRequest {
  description: string,
  images: File[],
}

export interface IAdoptCreateResponse extends IAdopt {}

export interface IAdoptGetByIdRequest {
  adoptId: number
}

export interface IAdoptGetByIdResponse extends IAdopt {}

export interface IAdoptGetByIdRequest {
  adoptId: number
}

export interface IAdoptGetByIdResponse extends IAdopt {}


export interface IAdoptCommentListRequest {
  adoptId: number
}

export interface IAdoptCommentListResponse {
  count: number,
  list: IAdoptComment[],
  adoptId: number
}

export interface IAdoptCommentCreateRequest {
  adoptId: number,
  comment: string
}

// TODO: add IAdoptCommentCreateResponse interface
export interface IAdoptCommentCreateEventResponse extends IAdoptComment {

}

export interface IAdoptCommentStreamJoinRequest {
  adoptId: number,
  'x-auth-token'?: string
}

/**
 * Notification
 */
export interface INotificationListRequest {
  skip: number,
  limit: number
}

export interface INotificationListResponse {
  list: INotification[],
  count: number
}

export interface INotificationSeenRequest {
  notifications: number[]
}

export interface INotificationSeenResponse {
  notifications: number[]
}
