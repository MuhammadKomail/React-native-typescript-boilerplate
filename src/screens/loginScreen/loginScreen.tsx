import {
  StyleSheet,
  Text,
  View,
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
import React, {useState} from 'react';
import {colors, defaultStyles, imgPath, typography} from '../../styles/style';
import Button from '../../components/button';
import {useTranslation} from 'react-i18next';
import Icon from '@react-native-vector-icons/material-icons';
import {showToast} from '../../utils/toast';
import {lightTheme} from '../../theme/theme';
import {RootState, useAppDispatch, useAppSelector} from '../../redux/store';
import {useTheme} from '../../theme/ThemeContext';
import {loginUser} from '../../redux/actions/authAction/authAction';

interface Login {
  name: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

const LoginScreen = () => {
  const {width, height} = useWindowDimensions();
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;
  const {theme} = useTheme();

  const [formStates, setFormStates] = useState<Login>({
    name: '',
    password: '',
    showPassword: false,
    rememberMe: false,
  });

  const dispatch = useAppDispatch();

  const {loading} = useAppSelector((state: RootState) => state.auth);

  const submitForm = () => {
    if (formStates.name === '') {
      showToast({
        type: 'danger',
        message: 'User name is required',
      });
    } else if (formStates.password === '') {
      showToast({
        type: 'danger',
        message: 'Password is required',
      });
    } else {
      dispatch(
        loginUser({
          data: {
            name: formStates.name,
            password: formStates.password,
          },
        }),
      );
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme === 'dark' ? lightTheme.text : colors.black}
          />
        ) : (
          <SafeAreaView style={[styles.container]}>
            <Image
              source={imgPath.logo}
              style={[defaultStyles.image]}
              resizeMode="contain"
            />
            <Text
              style={[
                defaultStyles.mainHeading,
                {color: theme === 'dark' ? lightTheme.text : colors.black},
              ]}>
              {t('Sign into your account')}
            </Text>
            <Text
              style={[
                defaultStyles.subHeading,
                {color: theme === 'dark' ? lightTheme.text : undefined},
              ]}>
              {t('Enter your Username and Password to login')}
            </Text>
            <View
              style={[
                defaultStyles.mainContainer,
                {
                  backgroundColor:
                    theme === 'dark' ? lightTheme.background : undefined,
                },
              ]}>
              <Text
                style={[
                  styles.textStyles,
                  {color: theme === 'dark' ? lightTheme.text : colors.black},
                ]}>
                {t('Iqama ID')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === 'dark' ? lightTheme.background : colors.white,
                    borderColor:
                      theme === 'dark' ? lightTheme.border : colors.lightGray,
                    color: theme === 'dark' ? lightTheme.text : colors.black,
                  },
                ]}
                value={formStates.name}
                onChangeText={text =>
                  setFormStates({...formStates, name: text})
                }
                placeholder={t('Enter your Iqama ID')}
                placeholderTextColor={
                  theme === 'dark' ? lightTheme.text : colors.lightGray
                }
                textAlign={isRTL ? 'right' : 'left'}
              />
              <Text
                style={[
                  styles.textStyles,
                  {color: theme === 'dark' ? lightTheme.text : colors.black},
                ]}>
                {t('Password')}
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      backgroundColor:
                        theme === 'dark' ? lightTheme.background : colors.white,
                      borderColor:
                        theme === 'dark' ? lightTheme.border : colors.lightGray,
                      color: theme === 'dark' ? lightTheme.text : colors.black,
                    },
                  ]}
                  value={formStates.password}
                  onChangeText={text =>
                    setFormStates({...formStates, password: text})
                  }
                  secureTextEntry={!formStates.showPassword}
                  placeholder={t('Enter your password')}
                  placeholderTextColor={
                    theme === 'dark' ? lightTheme.text : colors.lightGray
                  }
                  textAlign={isRTL ? 'right' : 'left'}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() =>
                    setFormStates({
                      ...formStates,
                      showPassword: !formStates.showPassword,
                    })
                  }>
                  <Icon
                    name={
                      formStates.showPassword ? 'visibility' : 'visibility-off'
                    }
                    size={width * 0.05}
                    color={theme === 'dark' ? lightTheme.text : colors.black}
                  />
                </TouchableOpacity>
              </View>
              <Button title={t('Login')} onPress={submitForm} />
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
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
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '100%',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  passwordInput: {
    paddingRight: I18nManager.isRTL ? 15 : 40,
    paddingLeft: I18nManager.isRTL ? 40 : 15,
    color: colors.black,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 12 : 15,
    [I18nManager.isRTL ? 'left' : 'right']: 5,
    padding: 5,
  },
  secondContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    marginTop: 10,
    fontFamily: typography.fontFamilies.mullish,
  },
});
