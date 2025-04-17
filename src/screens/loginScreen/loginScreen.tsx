import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  I18nManager,
  ActivityIndicator,
} from 'react-native';

// Suppress lint rules for dynamic styles and types in this screen
import React, {useState, useEffect} from 'react';
import {colors, defaultStyles, imgPath, typography} from '../../styles/style';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import {useTranslation} from 'react-i18next';
import Icon from '@react-native-vector-icons/material-icons';
import {showToast} from '../../utils/toast';

import {RootState, useAppDispatch, useAppSelector} from '../../redux/store';
import {loginUser} from '../../redux/slices/authSlice/authSlice';

interface Login {
  iqamaId: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

const LoginScreen = () => {
  const {width, height} = useWindowDimensions();
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;

  const [formStates, setFormStates] = useState<Login>({
    iqamaId: '',
    password: '',
    showPassword: false,
    rememberMe: false,
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const {isLoading, error, lastLoginDate} = useAppSelector(
    (state: RootState) => state.auth,
  ) || {isLoading: false, error: null, lastLoginDate: null};

  // Update current date every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', options);
  };

  const submitForm = () => {
    if (formStates.iqamaId === '') {
      showToast({
        type: 'danger',
        message: 'Iqama ID is required',
      });
    } else if (formStates.password === '') {
      showToast({
        type: 'danger',
        message: 'Password is required',
      });
    } else {
      dispatch(
        loginUser({
          username: formStates.iqamaId,
          password: formStates.password,
        }),
      ).then(result => {
        if (loginUser.fulfilled.match(result)) {
        }
      });
    }
  };

  return (
    <>
      <ImageBackground
        source={imgPath.backgroundImg}
        style={[defaultStyles.bgImg, {width, height}]}
        resizeMode="cover">
        <ScrollView contentContainerStyle={styles.container}>
          <SafeAreaView style={[styles.container]}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
            </View>

            <Image
              source={imgPath.logo}
              style={[defaultStyles.image]}
              resizeMode="contain"
            />
            <Text style={[defaultStyles.mainHeading]}>
              {t('Sign into your account')}
            </Text>
            <Text style={[defaultStyles.subHeading]}>
              {t('Enter your Username and Password to login')}
            </Text>
            <View style={defaultStyles.mainContainer}>
              {lastLoginDate && (
                <View style={styles.lastLoginContainer}>
                  <Text style={styles.lastLoginText}>
                    {t('Last Login')}:{' '}
                    {new Date(lastLoginDate).toLocaleString(
                      isRTL ? 'ar-SA' : 'en-US',
                    )}
                  </Text>
                </View>
              )}

              <Text style={styles.textStyles}>{t('Iqama ID')}</Text>
              <TextInput
                style={[styles.input]}
                value={formStates.iqamaId}
                onChangeText={text =>
                  setFormStates({...formStates, iqamaId: text})
                }
                placeholder={t('Enter your Iqama ID')}
                placeholderTextColor={colors.lightGray}
                textAlign={isRTL ? ('right' as const) : ('left' as const)}
              />
              <Text style={styles.textStyles}>{t('Password')}</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={formStates.password}
                  onChangeText={text =>
                    setFormStates({...formStates, password: text})
                  }
                  secureTextEntry={!formStates.showPassword}
                  placeholder={t('Enter your password')}
                  placeholderTextColor={colors.lightGray}
                  textAlign={isRTL ? ('right' as const) : ('left' as const)}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() =>
                    setFormStates({
                      ...formStates,
                      showPassword: !formStates.showPassword,
                    })
                  }>
                  {formStates.showPassword ? (
                    <Icon name="visibility" size={width * 0.05} />
                  ) : (
                    <Icon name="visibility-off" size={width * 0.05} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.secondContainer}>
                <View style={[styles.rememberMeContainer]}>
                  <Checkbox
                    checked={formStates.rememberMe}
                    onPress={() =>
                      setFormStates({
                        ...formStates,
                        rememberMe: !formStates.rememberMe,
                      })
                    }
                  />
                  <Text style={[styles.textStyles]}>{t('Remember me')}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.forgotPassword]}>
                    {t('Forgot Password')}?
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                title={isLoading ? t('Logging in...') : t('Login')}
                onPress={submitForm}
                disabled={isLoading}
              />

              {isLoading && (
                <ActivityIndicator size="large" color={colors.primary} />
              )}

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;

// NOTE: Unused style warnings can be ignored because styles are used via createRTLAwareStyles (styles)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? 70 : '30%',
  },
  textStyles: {
    fontFamily: typography.fontFamilies.mullish,
    color: colors.black,
    textAlign: I18nManager.isRTL ? ('right' as const) : ('left' as const),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '100%',
    textAlign: I18nManager.isRTL ? ('right' as const) : ('left' as const),
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
    paddingLeft: 15,
    color: colors.black,
  },
  eyeIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 12 : 15,
    padding: 5,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  forgotPassword: {
    color: colors.primary,
    fontFamily: typography.fontFamilies.mullish,
  },
  dateContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontFamily: typography.fontFamilies.mullish,
    color: colors.black,
    fontSize: 14,
    textAlign: 'center',
  },
  lastLoginContainer: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  lastLoginText: {
    fontFamily: typography.fontFamilies.mullish,
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: I18nManager.isRTL ? ('right' as const) : ('left' as const),
    marginTop: 10,
    fontFamily: typography.fontFamilies.mullish,
  },
});
