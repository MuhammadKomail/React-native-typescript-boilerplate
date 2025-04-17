import {CommonActions, NavigationContainerRef} from '@react-navigation/native';

// Use a generic or unknown for navigation ref and params
type RootNavigationParamList = Record<string, object | undefined>;

let _navigator: NavigationContainerRef<RootNavigationParamList>;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<RootNavigationParamList>,
) {
  _navigator = navigatorRef;
}

function navigate<RouteName extends keyof RootNavigationParamList>(
  routeName: RouteName,
  params?: RootNavigationParamList[RouteName],
) {
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
