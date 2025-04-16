export interface AddChatAndUserRequest {
  chatName: string;
  chatDescription: string;
  chatDpUrl: string;
  expiryMins: number;
  userIds: string[];
}

export interface AddChatAndUserResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: any[];
  exception: any[];
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
  exception: any[];
}

export interface ListAllChatsResponse {
  isApiHandled:     boolean;
  isRequestSuccess: boolean;
  statusCode:       number;
  message:          string;
  data:             ChatData[];
  exception:        any[];
}

export interface ChatData {
  chatId:   string;
  chats:    Chat[];
  messages: Message[];
}

export interface Chat {
  id:          string;
  name:        string;
  description: string;
  dpUrl:       string;
  expiryMins:  number;
  createdBy:   string;
  updatedBy:   string;
  createdDate: Date;
  updatedDate: Date;
  isActive:    boolean;
  isArchived:  boolean;
}

export interface Message {
  id:          string;
  name:        string;
  data:        string;
  isRead:      boolean;
  createdBy:   string;
  updatedBy:   string;
  createdDate: Date;
  updatedDate: Date;
  isActive:    boolean;
  isArchived:  boolean;
}

export interface ListAllMessageByChatIdResponse {
  isApiHandled:     boolean;
  isRequestSuccess: boolean;
  statusCode:       number;
  message:          string;
  data:             listAllMessageByChatIdData[];
  exception:        any[];
}

export interface listAllMessageByChatIdData {
  id:          string;
  name:        string;
  data:        string;
  isRead:      boolean;
  userId:      string;
  userDetails: UserDetails;
  createdBy:   string;
  updatedBy:   string;
  createdDate: Date;
  updatedDate: Date;
  isActive:    boolean;
  isArchived:  boolean;
}

export interface UserDetails {
  id:       string;
  name:     string;
  email:    string;
  userType: string;
}


