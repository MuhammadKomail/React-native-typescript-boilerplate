import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SparePartRequestData} from '../types/sparePartsTypes';
import {ChatData} from '../types/chatTypes';

export type RootStackParamList = {
  'home-screen': undefined;
  Home: undefined;
  Alerts: undefined;
  Tickets: undefined;
  Profile: undefined;
  History: undefined;
  Chats: undefined;
  'my-tickets': undefined;
  'ticket-details-screen': undefined;
  'inspection-screen': undefined;
  'quotation-screen': {inspectionDetails: string};
  'ticket-completed-screen': {jobId: string};
  'invoice-screen': undefined;
  'request-spare-parts-screen': {jobId: string};
  'request-success-screen': {id: string; screenName: string};
  TicketDetails: {id: string};
  'request-parts-screen': undefined;
  'all-spare-parts-request-screen': undefined;
  'spare-part-accept-screen': {requestedData: SparePartRequestData};
  'reschedule-visit-screen': undefined;
  'reschedule-ticket-screen': undefined;
  'new-quotation-screen': {jobId: string};
  'cancel-ticket-screen': undefined;
  'create-chat-screen': undefined;
  'message-screen': {chatData: ChatData};
  'inventory-screen': undefined;
};

// Type for props in the Home screen
// export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

// Type for props in the Details screen
export type TicketDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TicketDetails'
>;

// Type for props in Spare parts accepting screen
export type SparePartAcceptedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'spare-part-accept-screen'
>;

export type TicketCompletedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ticket-completed-screen'
>;

export type RequestSparePartsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'request-spare-parts-screen'
>;

export type NewQuotationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'new-quotation-screen'
>;

export type SparePartsSuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'request-success-screen'
>;

export type MessageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'message-screen'
>;

export type QuotationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'quotation-screen'
>;
