import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, I18nManager} from 'react-native';
import {colors, typography, defaultStyles} from '../../styles/style';
import CustomDropdown from '../../components/dropdown';
import icon from '../../assets/images/icon.png';
import Button from '../../components/button';
import navigate from '../../navigation/navigationService';
import {useAppDispatch} from '../../redux/store';
import {changeLanguage} from '../../redux/slices/translationSlice/translationSlice';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

const LanguageSelection = () => {
  // Language-related states
  const [languageSelection, setLanguageSelection] = useState<string | ''>('');

  // Translation hook
  const {t, i18n} = useTranslation();

  // Redux state and dispatch
  const dispatch = useAppDispatch();

  // Language selection handler
  const handleSelect = (item: string) => {
    const languageMap: {[key: string]: string} = {
      English: 'en',
      Arabic: 'ar',
      Urdu: 'ur',
      Hindi: 'hi',
      Bengali: 'bn',
    };
    setLanguageSelection(languageMap[item as keyof typeof languageMap]);
  };

  // Language change effect
  useEffect(() => {
    if (languageSelection !== '') {
      i18n.changeLanguage(languageSelection).then(() => {
        I18nManager.forceRTL(i18n.language === 'ar');
        dispatch(changeLanguage(languageSelection));
        setTimeout(() => RNRestart.Restart(), 1000);
      });
    }
  }, [languageSelection, dispatch, i18n]);

  const handleContinue = () => {
    navigate.navigate('login-screen');
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={defaultStyles.image} resizeMode="contain" />
      <Text style={styles.title}>{t('Choose Your Language')}</Text>
      <Text style={styles.subtitle}>
        {t(
          'Please choose a language to continue. You can update your language preference anytime in the settings.',
        )}
      </Text>
      <View style={defaultStyles.mainContainer}>
        <Text style={styles.languageHeader}>
          {t('Select Your Preferred Language')}
        </Text>
        <CustomDropdown
          data={[
            t('English'),
            t('Arabic'),
            t('Urdu'),
            t('Bengali'),
            t('Hindi'),
          ]}
          onSelect={handleSelect}
          maxVisibleItems={3}
          width={320}
        />
        <Button title={t('Continue')} onPress={handleContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    alignItems: typography.alignments.center,
    justifyContent: typography.alignments.center,
  },
  title: {
    fontSize: typography.fontSizes.extraLarge,
    fontWeight: typography.fontWeights.bold,
    marginBottom: 20,
    textAlign: typography.alignments.center,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: typography.alignments.center,
    marginBottom: 40,
    color: colors.gray,
  },
  languageHeader: {
    fontSize: 16,
    fontWeight: typography.fontWeights.regular600,
    marginBottom: 15,
    color: colors.black,
    textAlign: 'center',
  },
});

export default LanguageSelection;
