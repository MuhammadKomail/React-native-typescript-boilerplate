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
import React, {useState, useEffect} from 'react';
import {colors, defaultStyles, imgPath, typography} from '../../styles/style';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import {useTranslation} from 'react-i18next';
import Icon from '@react-native-vector-icons/material-icons';
import { showToast } from '../../utils/toast';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/slices/authSlice/authSlice';
import { getDirectionStyles, createRTLAwareStyles } from '../../utils/rtlUtils';

interface Login {
  iqamaId: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

const LoginScreen = () => {
  const {width, height} = useWindowDimensions();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const isRTL = I18nManager.isRTL;
  const directionStyles = getDirectionStyles(isRTL);

  const [isLoadings, setIsLoadings] = useState(false);

  const [formStates, setFormStates] = useState<Login>({
    iqamaId: '',
    password: '',
    showPassword: false,
    rememberMe: false,
  });
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const { isLoading, error, lastLoginDate } = useAppSelector((state: any) => state.auth) || { isLoading: false, error: null, lastLoginDate: null };

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
      hour12: true
    };
    
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', options);
  };

  console.log('formStates', formStates);

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
      dispatch(loginUser({
        username: formStates.iqamaId,
        password: formStates.password
      })).then((result) => {
        if (loginUser.fulfilled.match(result)) {
          // navigation.navigate('home-tabs' as never);
        }
      });
    }
  };

  // Apply RTL styles
  const rtlStyles = createRTLAwareStyles(styles, {
    input: {
      ...styles.input,
      textAlign: isRTL ? 'right' as const : 'left' as const,
    },
    passwordInput: {
      paddingRight: isRTL ? 15 : 40,
      paddingLeft: isRTL ? 40 : 15,
      color: 'black',
    },
    eyeIcon: {
      position: 'absolute',
      ...(isRTL ? { left: 10 } : { right: 10 }),
      top: Platform.OS === 'android' ? 12 : 15,
      padding: 5,
    },
    secondContainer: {
      ...styles.secondContainer,
      flexDirection: isRTL ? 'row-reverse' : 'row' as any,
    },
  });

  return (
    <>
      <ImageBackground
        source={imgPath.backgroundImg}
        style={[defaultStyles.bgImg, {width, height}]}
        resizeMode="cover">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <SafeAreaView
            style={[
              rtlStyles.container,
              {
                paddingHorizontal: width * 0.05,
                paddingTop: Platform.OS === 'ios' ? 20 : 0,
              },
            ]}>
            <View style={rtlStyles.dateContainer}>
              <Text style={rtlStyles.dateText}>{formatDate(currentDate)}</Text>
            </View>
            
            <Image
              source={imgPath.logo}
              style={[defaultStyles.image, {paddingBottom: 10}]}
              resizeMode="contain"
            />
            <Text
              style={[
                defaultStyles.mainHeading,
                {
                  color: 'white',
                  fontSize: width * 0.07,
                  textAlign: 'center',
                  marginBottom: height * 0.01,
                },
              ]}>
              {t('Sign into your account')}
            </Text>
            <Text
              style={[
                defaultStyles.subHeading,
                {
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: height * 0.02,
                },
              ]}>
              {t('Enter your Username and Password to login')}
            </Text>
            <View style={defaultStyles.mainContainer}>
              {lastLoginDate && (
                <View style={rtlStyles.lastLoginContainer}>
                  <Text style={rtlStyles.lastLoginText}>
                    {t('Last Login')}: {new Date(lastLoginDate).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                  </Text>
                </View>
              )}
              
              <Text style={rtlStyles.textStyles}>{t('Iqama ID')}</Text>
              <TextInput
                style={[rtlStyles.input, {fontSize: width * 0.04}]}
                value={formStates.iqamaId}
                onChangeText={text =>
                  setFormStates({...formStates, iqamaId: text})
                }
                placeholder={t('Enter your Iqama ID')}
                placeholderTextColor={colors.lightGray}
                textAlign={isRTL ? 'right' as const : 'left' as const}
              />
              <Text style={rtlStyles.textStyles}>{t('Password')}</Text>
              <View style={rtlStyles.passwordContainer}>
                <TextInput
                  style={[
                    rtlStyles.input,
                    rtlStyles.passwordInput,
                    {fontSize: width * 0.04},
                  ]}
                  value={formStates.password}
                  onChangeText={text =>
                    setFormStates({...formStates, password: text})
                  }
                  secureTextEntry={!formStates.showPassword}
                  placeholder={t('Enter your password')}
                  placeholderTextColor={colors.lightGray}
                  textAlign={isRTL ? 'right' as const : 'left' as const}
                />
                <TouchableOpacity
                  style={rtlStyles.eyeIcon}
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
              <View style={rtlStyles.secondContainer}>
                <View style={[rtlStyles.rememberMeContainer, {flexDirection: isRTL ? 'row-reverse' : 'row'}]}>
                  <Checkbox
                    checked={formStates.rememberMe}
                    onPress={() =>
                      setFormStates({
                        ...formStates,
                        rememberMe: !formStates.rememberMe,
                      })
                    }
                  />
                  <Text style={[{fontSize: width * 0.04}, rtlStyles.textStyles]}>
                    {t('Remember me')}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text
                    style={[rtlStyles.forgotPassword, {fontSize: width * 0.04}]}>
                    {t('Forgot Password')}?
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                title={isLoading ? t('Logging in...') : t('Login')}
                onPress={submitForm}
                style={{marginTop: height * 0.02}}
                disabled={isLoading}
              />
              
              {isLoading && (
                <ActivityIndicator 
                  size="large" 
                  color={colors.primary} 
                  style={{marginTop: 20}} 
                />
              )}
              
              {error && (
                <Text style={rtlStyles.errorText}>{error}</Text>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: Platform.OS == 'android' ? 70 : '30%',
  },
  textStyles: {
    fontFamily: typography.fontFamilies.mullish,
    color: colors.black,
    textAlign: I18nManager.isRTL ? 'right' as const : 'left' as const,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '100%',
    textAlign: I18nManager.isRTL ? 'right' as const : 'left' as const,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
    paddingLeft: 15,
    color: 'black',
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
    gap: 5
  },
  forgotPassword: {
    color: colors.primary,
    fontFamily: typography.fontFamilies.mullish,
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: 'rgba(1, 188, 205, 0.1)',
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
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: typography.fontFamilies.mullish,
  },
});
