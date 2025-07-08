export interface AddChatAndUserRequest {
  chatName: string;
  chatDescription: string;
  chatDpUrl: string;
  expiryMins: number;
  userIds: string[];
}

export interface Exception {
  message: string;
  code?: number;
  [key: string]: unknown;
}

export interface AddChatAndUserResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: unknown[];
  exception: Exception[];
}

export interface AddUserMsgToChatRequest {
  targetNamespace: string;
  tag: string;
  chatId: string;
  userId: string;
  messageName: string;
  messageData: string;
  messageIsRead: boolean;
  isActive: boolean;
}

export interface AddUserMsgToChatResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: boolean;
  exception: Exception[];
}

export interface ListAllChatsResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: ChatData[];
  exception: Exception[];
}

export interface ChatData {
  chatId: string;
  chats: Chat[];
  messages: Message[];
}

export interface Chat {
  id: string;
  name: string;
  description: string;
  dpUrl: string;
  expiryMins: number;
  createdBy: string;
  updatedBy: string;
  createdDate: Date;
  updatedDate: Date;
  isActive: boolean;
  isArchived: boolean;
}

export interface Message {
  id: string;
  name: string;
  data: string;
  isRead: boolean;
  createdBy: string;
  updatedBy: string;
  createdDate: Date;
  updatedDate: Date;
  isActive: boolean;
  isArchived: boolean;
}

export interface ListAllMessageByChatIdResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: listAllMessageByChatIdData[];
  exception: Exception[];
}

export interface listAllMessageByChatIdData {
  id: string;
  name: string;
  data: string;
  isRead: boolean;
  userId: string;
  userDetails: UserDetails;
  createdBy: string;
  updatedBy: string;
  createdDate: Date;
  updatedDate: Date;
  isActive: boolean;
  isArchived: boolean;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  userType: string;
}
