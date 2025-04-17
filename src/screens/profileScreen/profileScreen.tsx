import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  I18nManager,
} from 'react-native';

// Styles are used via createRTLAwareStyles for RTL support.
import React from 'react';
import Header from '../../components/header';
import {colors, imgPath} from '../../styles/style';
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from '../../redux/store';
import ProfileImage from '../../components/profileImage';
import Icon from '@react-native-vector-icons/material-icons';
import {logout} from '../../redux/slices/authSlice/authSlice';
import {useTranslation} from 'react-i18next';
import {createRTLAwareStyles} from '../../utils/rtlUtils';

const ProfileScreen = () => {
  const {user, lastLoginDate} = useAppSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;

  // Format date function
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      t('Logout'),
      t('Are you sure you want to logout?'),
      [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Logout'),
          onPress: () => {
            dispatch(logout());
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  // Apply RTL styles
  const rtlStyles = createRTLAwareStyles(styles, {
    detailRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    } as typeof styles.detailRow,
    label: {
      textAlign: isRTL ? 'right' : 'left',
    } as typeof styles.label,
    value: {
      textAlign: isRTL ? 'right' : 'left',
    } as typeof styles.value,
    logoutButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
    } as typeof styles.logoutButton,
    logoutText: {
      marginLeft: isRTL ? 0 : 10,
      marginRight: isRTL ? 10 : 0,
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    } as typeof styles.logoutText,
  });

  return (
    <View style={rtlStyles.container}>
      <Header title={t('Profile')} screenName="profile-screen" />

      <ScrollView style={rtlStyles.scrollView}>
        <View style={rtlStyles.content}>
          {/* Profile Image Section */}
          <View style={rtlStyles.imageSection}>
            <Text style={rtlStyles.userName}>
              {user?.name || t('User Name')}
            </Text>
            <Text style={rtlStyles.userRole}>
              {user?.role || t('User Role')}
            </Text>
          </View>

          {/* Last Login Section */}
          <View style={rtlStyles.infoSection}>
            <Text style={rtlStyles.sectionTitle}>{t('Login Information')}</Text>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Last Login')}</Text>
              <Text style={rtlStyles.value}>
                {formatDate(lastLoginDate || '')}
              </Text>
            </View>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Join Date')}</Text>
              <Text style={rtlStyles.value}>
                {formatDate(user?.joinDate || '')}
              </Text>
            </View>
          </View>

          {/* Basic Info Section */}
          <View style={rtlStyles.infoSection}>
            <Text style={rtlStyles.sectionTitle}>{t('Basic Information')}</Text>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Name')}</Text>
              <Text style={rtlStyles.value}>{user?.name || t('N/A')}</Text>
            </View>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Email')}</Text>
              <Text style={rtlStyles.value}>{user?.email || t('N/A')}</Text>
            </View>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Phone')}</Text>
              <Text style={rtlStyles.value}>{user?.phone || t('N/A')}</Text>
            </View>
          </View>

          {/* Iqama Details Section */}
          <View style={rtlStyles.infoSection}>
            <Text style={rtlStyles.sectionTitle}>{t('Iqama Details')}</Text>
            <View style={rtlStyles.detailRow}>
              <Text style={rtlStyles.label}>{t('Iqama ID')}</Text>
              <Text style={rtlStyles.value}>{user?.iqamaId || t('N/A')}</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={rtlStyles.logoutButton}
            onPress={handleLogout}>
            <Icon name="logout" size={24} color={colors.white} />
            <Text style={rtlStyles.logoutText}>{t('Logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

// NOTE: Unused style warnings can be ignored because styles are used via createRTLAwareStyles (rtlStyles)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
  userRole: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 5,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
    textAlign: I18nManager.isRTL ? 'right' : ('left' as 'left' | 'right'),
  },
  value: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
    textAlign: I18nManager.isRTL ? 'right' : ('left' as 'left' | 'right'),
  },
  logoutButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
