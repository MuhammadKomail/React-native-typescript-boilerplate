import { NavigationContainer } from "@react-navigation/native";
import navigationService from "./navigationService";
import StackNavigation from "./stackNavigation";
import DrawerNavigation from "./drawerNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppSelector } from "../redux/store";

const Navigation = () => {
    const { user } = useAppSelector((state: any) => state.auth) || { user: null };

    return (
        <SafeAreaProvider>
            <NavigationContainer ref={(ref) => ref && navigationService.setTopLevelNavigator(ref)}>
                {!user ? <StackNavigation /> : <DrawerNavigation />}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Navigation