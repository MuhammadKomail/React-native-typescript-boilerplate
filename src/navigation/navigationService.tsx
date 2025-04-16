import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

let _navigator: NavigationContainerRef<any>;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef<any>) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params?: Record<string, any>) {
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