import { FileHolder } from 'angular2-image-upload/lib/image-upload/image-upload.component';

export interface IPaginatorEvent {
  length: number,
  pageIndex: number,
  pageSize: number
}

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

export interface IReview {
  rating: number,
  review: string,
  user: IUser,
  createdAt: string,
  updatedAt: string
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
  status: 'WAITING' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'IN_PROGRESS' | 'FINISHED',
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
  description: string,
  cost: number,
  limit?: number,
  isAvailable: boolean,
  applications: IRoomApplication[]
  isOwner?: boolean,
  images?: IRoomImage[],
  user?: IUser,
  createdAt: string,
  averageRating: number
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
  user?: IUser,
  createdAt: string,
}

export interface ILostFoundImage {
  src: string,
}

export interface ILostFoundComment {
  comment: string,
  lostFound: number
  user: IUser,
  createdAt: string
}

export interface ILostFound {
  id: number,
  description: string,
  images?: ILostFoundImage[],
  comments?: ILostFoundComment[],
  user?: IUser,
  type: 'LOST' | 'FOUND'
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
  status: 'WAITING' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'IN_PROGRESS' | 'FINISHED',
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

export interface IQuestion {
  id: number,
  user: IUser,
  text: string,
  answers: IQuestionAnswer[],
  comments: IQuestionComment[],
  isOwner?: boolean,
  createdAt: string
  deletedAt: string
}

export interface IQuestionComment {
  id: number,
  user: IUser,
  question: number,
  text: string,
  createdAt: string,
  deletedAt: string
}

export interface IQuestionAnswer {
  id: number,
  user: IUser,
  question: number,
  text: string,
  votes: IQuestionAnswerVote[],
  createdAt: string
  deletedAt: string
}

export interface IQuestionAnswerVote {
  id: number,
  user: IUser,
  answer: number,
  reaction: -1 | 0 | 1,
  createdAt: string
  deletedAt: string
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

export interface INotificationRoomApplicationRate {
  room: number | IRoom,
  application: number | IRoomApplication,
  rating: number,
  review: string
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

export interface INotificationLostFoundComment {
  comment: number | ILostFoundComment,
  adopt: number | ILostFound
}

export interface INotification {
  id: number,
  from: number | IUser,
  to: number | IUser,
  roomApplicationCreate: number | INotificationRoomApplicationCreate,
  roomApplicationStatusUpdate: number | INotificationRoomApplicationStatusUpdate,
  roomApplicationRate: number | INotificationRoomApplicationRate,
  walkerApplicationCreate: number | INotificationWalkerApplicationCreate,
  walkerApplicationStatusUpdate: number | INotificationWalkerApplicationStatusUpdate,
  walkerApplicationMessageCreate: number | INotificationWalkerApplicationMessageCreate,
  adoptCommentCreate: number | INotificationAdoptComment,
  lostFoundCommentCreate: number | INotificationLostFoundComment,
  seen: boolean,
  createdAt: string
}

export interface IMessage {
  id: number,
  from: number | IUser,
  to: number | IUser,
  text: string,
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
  total: number
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
  total: number
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
  total: number
}

export interface IRoomApplicationListRequest {
  roomId: number
}

export interface IRoomApplicationListResponse {
  list: IRoomApplication[],
  total: number,
  roomId?: number // only for front
}

export interface IRoomCreateRequest {
  description: string,
  cost: number,
  images: any[],
}

export interface IRoomCreateResponse extends IRoom {}

export interface IRoomGetByIdRequest {
  roomId: number | string
}

export interface IRoomGetByIdResponse extends IRoom {}

export interface IRoomDeleteRequest {
  roomId: number
}

export interface IRoomDeleteResponse {
  roomId?: number // only for front
}

export interface IRoomApplyRequest {
  roomId: number
}

export interface IRoomApplyResponse extends IRoomApplication {
}

export interface IRoomUpdateApplicationStatusRequest {
  applicationId: number,
  status: string,
  roomId?: number // only for front
}

export interface IRoomUpdateApplicationStatusResponse {
  status?: string // only for front
  applicationId?: number // only for front
  roomId?: number // only for front
}

export interface IRoomRateApplicationRequest {
  rating: number,
  review?: string,
  applicationId: number,
  roomId?: number // only for front
}

export interface IRoomRateApplicationResponse {
  rating?: number, // only for front
  review?: string // only for front
  applicationId?: number // only for front
  roomId?: number // only for front
}

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

export interface IWalkerDeleteRequest {
  walkerId: number
}

export interface IWalkerDeleteResponse {}

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

export interface IAdoptDeleteRequest {
  adoptId: number
}

export interface IAdoptDeleteResponse {}

export interface IAdoptGetByIdRequest {
  adoptId: number
}

export interface IAdoptGetByIdResponse extends IAdopt {}


export interface IAdoptCommentListRequest {
  adoptId: number,
  skip?: number,
  limit?: number
}

export interface IAdoptCommentListResponse {
  total: number,
  list: IAdoptComment[]
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
 * LostFound
 */
export interface ILostFoundListRequest {
  skip: number,
  limit: number
}

export interface ILostFoundListResponse {
  list: ILostFound[],
  count: number
}

export interface ILostFoundCreateRequest {
  description: string,
  type: 'LOST' | 'FOUND',
  images: File[],
}

export interface ILostFoundCreateResponse extends ILostFound {}

export interface ILostFoundGetByIdRequest {
  lostFoundId: number
}

export interface ILostFoundGetByIdResponse extends ILostFound {}

export interface ILostFoundDeleteRequest {
  lostFoundId: number
}

export interface ILostFoundDeleteResponse {}

export interface ILostFoundGetByIdRequest {
  lostFoundId: number
}

export interface ILostFoundGetByIdResponse extends ILostFound {}


export interface ILostFoundCommentListRequest {
  lostFoundId: number,
  skip?: number,
  limit?: number
}

export interface ILostFoundCommentListResponse {
  total: number,
  list: ILostFoundComment[]
}

export interface ILostFoundCommentCreateRequest {
  lostFoundId: number,
  comment: string
}

// TODO: add ILostFoundCommentCreateResponse interface
export interface ILostFoundCommentCreateEventResponse extends ILostFoundComment {

}

export interface ILostFoundCommentStreamJoinRequest {
  lostFoundId: number,
  'x-auth-token'?: string
}

/**
 * Question
 */
export interface IQuestionListRequest {
  skip: number,
  limit: number
}

export interface IQuestionListResponse {
  list: IWalker[],
  total: number
}

export interface IQuestionCreateRequest {
  text: string
}

export interface IQuestionCreateResponse extends IQuestion {}

export interface IQuestionGetByIdRequest {
  questionId: number
}

export interface IQuestionGetByIdResponse extends IQuestion {}

export interface IQuestionDeleteRequest {
  questionId: number
}

export interface IQuestionDeleteResponse {}

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

/**
 * Message
 */
export interface IMessageConversationsRequest {
}

export interface IMessageConversationsResponse {
  list: IMessage[],
  total: number
}

export interface IMessageConversationRequest {
  userEntityId: number | string
}

export interface IMessageConversationResponse {
  list: IMessage[],
  total: number
  userEntity: IUser
}

export interface IMessageCreateRequest {
  userEntityId: number,
  text: string
}

export interface IMessageCreateResponse extends IMessage {
}
