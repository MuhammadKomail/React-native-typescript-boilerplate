import './gesture-handler';

import React from 'react';
import Navigation from './src/navigation/mainNavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {I18nextProvider} from 'react-i18next';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import i18n from './src/languageTranslation/index';
import {setToastRef} from './src/utils/toast';

const ToastInitializer = () => {
  const toast = useToast();

  React.useEffect(() => {
    setToastRef(toast); // Set the global toast reference
  }, [toast]);

  return null; // This component does not render anything
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <I18nextProvider i18n={i18n}>
            <ToastProvider
              offset={110}
              duration={3000}
              placement="bottom"
              successColor="#01BCCD">
              <ToastInitializer />
              <Navigation />
            </ToastProvider>
          </I18nextProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
