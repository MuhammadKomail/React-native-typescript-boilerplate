import {CommonActions, NavigationContainerRef} from '@react-navigation/native';

// Store navigation container ref
let _navigator: NavigationContainerRef<any>;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<any> | null,
) {
  if (navigatorRef) _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  _navigator.navigate(routeName, params);
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
