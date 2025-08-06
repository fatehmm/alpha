export interface IBaseResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  data: T;
  message: string | null;
  totalCount: number;
}

export interface IPaginationRequest {
  page: number;
  size: number;
}

export interface IUserDetails {
  id: number;
  name: string;
  surname: string;
  birthDate: Date;
  gender: string;
  address: string;
  picture: string;
  activity: string;
  useFor: string;
}

export interface IUserActivity {
  id: number;
  activity: number;
  useFor: number;
  title: string;
}

export interface IUserOpportunity {
  id: number;
  title: string;
  value: string;
}

export interface IUserPricing {
  id: number;
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  discount: number;
  description: string;
  opportunities: IUserOpportunity[];
}

export interface IUserMembership {
  id: number;
  startDate: string;
  dueDate: string;
  pricing: IUserPricing;
}

export interface IUser {
  id: string;
  email: string;
  createdDate: string;
  isActive: boolean;
  emailConfirmed: boolean;
  details: IUserDetails;
  activity: IUserActivity;
  membership: IUserMembership;
}

export interface ISession {
  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
  },
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IFaq {
  id: number;
  title: string;
  description: string;
}

export interface IPlan {
  id: number;
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  discount: number;
  description: string;
  opportunities: IOpportunity[];
}

export interface IOpportunity {
  id: number;
  title: string;
  value: string;
}

export interface ITestimonial {
  id: number;
  photo: string;
  fullName: string;
  jobTitle: string;
  testimonial: string;
}

export interface IDictionary {
  id: number;
  name: string;
}

export interface IHubResponse {
  result: boolean;
  payload: IHubPayload;
}

export interface IHubPayload {
  status: "Success" | "Warning" | "Error" | "Info";
  type: "Execution" | "Notification" | "Deployment";
  message: string;
  color: "blue" | "red" | "green" | "yellow";
  id?: number;
}

export interface ISingleOperationRequest {
  id: number;
  operationType: "start" | "delete" | "restart" | "stop" | "reset";
}

export interface IMultiOperationRequest {
  ids: number[];
  operationType: "start" | "delete" | "restart" | "stop" | "reset";
}

export interface IContainerSpecification {
  title: string;
  limit: string;
  usedPercentage: number;
  freePercentage: number;
}

export interface IContainerOperation {
  commandType: string;
  date: string;
}

export interface IContainerPort {
  title: string;
  port: number;
}

export interface IContainerSecret {
  key: string;
  value: string;
}

export interface IFeedbackRequest {
  categoryId: number;
  note: string;
  rating: number;
}
