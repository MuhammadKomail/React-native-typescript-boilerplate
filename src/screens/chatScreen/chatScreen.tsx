import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Header from '../../components/header';
import {colors, typography, imgPath} from '../../styles/style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';
// Demo data types
interface Message {
  id: string;
  data: string;
  name: string;
  isRead: boolean;
  isActive: boolean;
  isArchived: boolean;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
}

interface Chat {
  id: string;
  name: string;
  description: string;
  dpUrl: string;
  expiryMins: number;
  isActive: boolean;
  isArchived: boolean;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
}
import {ChatData} from '../../types/chatTypes';
import Loader from '../../components/loader';

interface TicketItemProps {
  item: ChatData;
}

const ChatScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [filteredChatList, setFilteredChatList] = useState<ChatData[]>([]);

  // Demo data
  const demoChats: ChatData[] = [
    {
      chatId: '1',
      chats: [
        {
          id: '1',
          name: 'John Doe',
          description: 'Software Developer',
          dpUrl: 'https://example.com/avatar1.jpg',
          expiryMins: 60,
          isActive: true,
          isArchived: false,
          createdBy: 'system',
          createdDate: new Date(),
          updatedBy: 'system',
          updatedDate: new Date(),
        },
      ],
      messages: [
        {
          id: '1',
          name: 'Message 1',
          data: 'Hey, how are you?',
          isRead: false,
          isActive: true,
          isArchived: false,
          createdDate: new Date(),
          createdBy: 'system',
          updatedDate: new Date(),
          updatedBy: 'system',
        },
      ],
    },
    {
      chatId: '2',
      chats: [
        {
          id: '2',
          name: 'Alice Smith',
          description: 'Project Manager',
          dpUrl: 'https://example.com/avatar2.jpg',
          expiryMins: 60,
          isActive: true,
          isArchived: false,
          createdBy: 'system',
          createdDate: new Date(),
          updatedBy: 'system',
          updatedDate: new Date(),
        },
      ],
      messages: [
        {
          id: '2',
          name: 'Message 2',
          data: 'Can you help me with the project?',
          isRead: false,
          isActive: true,
          isArchived: false,
          createdDate: new Date(),
          createdBy: 'system',
          updatedDate: new Date(),
          updatedBy: 'system',
        },
      ],
    },
    {
      chatId: '3',
      chats: [
        {
          id: '3',
          name: 'Bob Johnson',
          description: 'Team Lead',
          dpUrl: 'https://example.com/avatar3.jpg',
          expiryMins: 60,
          isActive: true,
          isArchived: false,
          createdBy: 'system',
          createdDate: new Date(),
          updatedBy: 'system',
          updatedDate: new Date(),
        },
      ],
      messages: [
        {
          id: '3',
          name: 'Message 3',
          data: 'Meeting at 3 PM today',
          isRead: false,
          isActive: true,
          isArchived: false,
          createdDate: new Date(),
          createdBy: 'system',
          updatedDate: new Date(),
          updatedBy: 'system',
        },
      ],
    },
    {
      chatId: '4',
      chats: [
        {
          id: '4',
          name: 'Emma Wilson',
          description: 'UX Designer',
          dpUrl: 'https://example.com/avatar4.jpg',
          expiryMins: 60,
          isActive: true,
          isArchived: false,
          createdBy: 'system',
          createdDate: new Date(),
          updatedBy: 'system',
          updatedDate: new Date(),
        },
      ],
      messages: [
        {
          id: '4',
          name: 'Message 4',
          data: 'Thanks for your help!',
          isRead: false,
          isActive: true,
          isArchived: false,
          createdDate: new Date(),
          createdBy: 'system',
          updatedDate: new Date(),
          updatedBy: 'system',
        },
      ],
    },
  ];

  // Note: Handling navigation here...!
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // Note: Function to refresh list
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    setFilteredChatList(demoChats);
  }, []);

  // Note: Function to filter chat list based on search input
  useEffect(() => {
    const filteredList = demoChats.filter(item =>
      item.chats[0].name.toLowerCase().includes(searchMessage.toLowerCase()),
    );
    setFilteredChatList(filteredList);
  }, [searchMessage]);

  const TicketItem = ({item}: TicketItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // goToMessageScreen(item);
        }}
        style={styles.ticketContainer}>
        <View style={styles.iconContainer}>
          <Image source={imgPath.chatTicket} style={{height: 30, width: 30}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.ticketId}>{item.chats[0].name}</Text>
          <Text style={styles.ticketText}>
            {item.messages[item.messages.length - 1].data}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {new Date(item.messages[0].createdDate).toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
          {/* {item.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  // Note: Function to go to Create Chat Screen...!
  const goToCreateChat = () => {
    navigation.navigate('create-chat-screen');
  };

  // Note: Function to go to Chat Message Screen...!
  const goToMessageScreen = () => {
    // navigation.navigate('message-screen', {chatData: item});
  };

  return (
    <>
      <Header title="Chats" screenName="chat-screen" />

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={colors.gray}
            placeholder="Search Ticket"
            value={searchMessage}
            onChangeText={setSearchMessage}
          />
          <TouchableOpacity
            onPress={() => goToCreateChat()}
            style={styles.iconStyle}>
            <Image source={imgPath.write} style={{height: 25, width: 25}} />
          </TouchableOpacity>
        </View>

        {/* List of Tickets */}
        <FlatList
          data={filteredChatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.chatId}
          renderItem={({item}) => <TicketItem item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 10,
  },
  searchContainer: {
    // backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grayHue,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  iconStyle: {
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  ticketContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayHue,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  ticketId: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    fontFamily: typography.fontFamilies.mullish,
  },
  ticketText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '400',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
  },
  badge: {
    backgroundColor: '#1E40AF',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 5,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
