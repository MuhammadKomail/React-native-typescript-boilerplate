import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {I18nManager} from 'react-native';
import i18next from '../../../languageTranslation/index';

// Note: Translation interface...!
interface TranslationState {
  language: string;
}

// Note: Translation state...!
const initialState: TranslationState = {
  language: 'en',
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      console.log('ACTION:', action.payload);
      console.log('STATE:', state.language);
      const language = action.payload;
      state.language = language;

      const isRTL = language === 'ar';
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
        // Note: React Native requires an app restart for RTL changes to take effect
      }
    },
  },
});

export const {changeLanguage} = translationSlice.actions;
export default translationSlice.reducer;
