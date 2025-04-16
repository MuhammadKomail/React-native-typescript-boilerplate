import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/api';
import {
  AddChatAndUserRequest,
  AddChatAndUserResponse,
  AddUserMsgToChatRequest,
  AddUserMsgToChatResponse,
  ListAllChatsResponse,
  ListAllMessageByChatIdResponse,
} from '../../../types/chatTypes';

export const addChatAndUser = createAsyncThunk<
  AddChatAndUserResponse | null,
  AddChatAndUserRequest
>('chat/addChatAndUser', async (data, {rejectWithValue}) => {
  try {
    let response = await api({
      method: 'POST',
      url: '/Messenger/IMessagingFeature/AddChatAndUserToIt',
      data: data,
    });

    console.log('add chat and user res:: ', response);
    if (response.status !== 200 && response.status !== 201) {
      const errorMessage =
        response.data?.message ||
        `Add chat and user failed with status ${response.status}`;
      return rejectWithValue(errorMessage);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('ERROR:', error.response);
      console.log('Error Response Data:', error.response.data);

      const errorData = error.response.data;

      let errorMessage = 'An unknown error occurred';

      if (errorData?.exception && Object.keys(errorData.exception).length > 0) {
        const firstKey = Object.keys(errorData.exception)[0];
        const firstError = errorData.exception[firstKey];

        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        } else {
          errorMessage = String(firstError);
        }
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('An unknown error occurred');
  }
});

export const addUserMsgToChat = createAsyncThunk<
  AddUserMsgToChatResponse | null,
  AddUserMsgToChatRequest
>('chat/addUserMsgToChat', async (data, {rejectWithValue}) => {
  try {
    let response = await api({
      method: 'POST',
      url: '/Messenger/IMessagingFeature/AddUserMessageToChat',
      data: data,
    });

    console.log('add user msg to chat res:: ', response);
    if (response.status !== 200 && response.status !== 201) {
      const errorMessage =
        response.data?.message ||
        `Add user message to chat failed with status ${response.status}`;
      return rejectWithValue(errorMessage);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('ERROR:', error.response);
      console.log('Error Response Data:', error.response.data);

      const errorData = error.response.data;

      let errorMessage = 'An unknown error occurred';

      if (errorData?.exception && Object.keys(errorData.exception).length > 0) {
        const firstKey = Object.keys(errorData.exception)[0];
        const firstError = errorData.exception[firstKey];

        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        } else {
          errorMessage = String(firstError);
        }
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue('An unknown error occurred');
  }
});

export const listAllChatByUserId = createAsyncThunk<ListAllChatsResponse, {userId: string}>(
  'chat/listAllChatByUserId',
  async ({userId}, {rejectWithValue}) => {
    console.log('USER ID:::',userId)
    try {
      let response = await api({
        method: 'GET',
        url: `/Messenger/IMessagingFeature/ListLastChatMessagesByUserId?userId=${userId}`,
      });

      console.log('list all chat by user id res:: ', response);
      if (response.status !== 200) {
        const errorMessage =
          response.data?.message ||
          `List all chat by user id failed with status ${response.status}`;
        return rejectWithValue(errorMessage);
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log('ERROR:', error.response);
        console.log('Error Response Data:', error.response.data);

        const errorData = error.response.data;

        let errorMessage = 'An unknown error occurred';

        if (
          errorData?.exception &&
          Object.keys(errorData.exception).length > 0
        ) {
          const firstKey = Object.keys(errorData.exception)[0];
          const firstError = errorData.exception[firstKey];

          if (Array.isArray(firstError) && firstError.length > 0) {
            errorMessage = firstError[0];
          } else {
            errorMessage = String(firstError);
          }
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const listAllMessageByChatId = createAsyncThunk<ListAllMessageByChatIdResponse, {chatId: string}>(
  'chat/listAllMessageByChatId',
  async ({chatId}, {rejectWithValue}) => {
    try {
      let response = await api({
        method: 'GET',
        url: `/Messenger/IMessagingFeature/ListAllMessagesWithUserByChatId?chatId=${chatId}`,
      });

      console.log('list all message by chat id res:: ', response);
      if (response.status !== 200) {
        const errorMessage =
          response.data?.message ||
          `List all message by chat id failed with status ${response.status}`;
        return rejectWithValue(errorMessage);
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log('ERROR:', error.response);
        console.log('Error Response Data:', error.response.data);

        const errorData = error.response.data;

        let errorMessage = 'An unknown error occurred';

        if (
          errorData?.exception &&
          Object.keys(errorData.exception).length > 0
        ) {
          const firstKey = Object.keys(errorData.exception)[0];
          const firstError = errorData.exception[firstKey];

          if (Array.isArray(firstError) && firstError.length > 0) {
            errorMessage = firstError[0];
          } else {
            errorMessage = String(firstError);
          }
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unknown error occurred');
    }
  }
);
