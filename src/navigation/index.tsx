import { SCREENS } from '../constants/screens';
import { SPACING } from '../constants/spacing';
import { CustomThemeProps, _custom_themes } from '../constants/themes';

declare module '@react-navigation/native' {
  export type ExtendedTheme = CustomThemeProps;
  export function useTheme(): ExtendedTheme;
}

import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AccountScreen } from '../screens/Account';
import { AdjustmentsScreen } from '../screens/Adjustments';
import { AfterSplash } from '../screens/AfterSplash';
import { EmployeesScreen } from '../screens/Employees';
import { HomeScreen } from '../screens/Home';
import { MenuScreen } from '../screens/Menu';
import { PasswordScreen } from '../screens/Password';
import { PendingScreen } from '../screens/Pending';
import { PlansScreen } from '../screens/Plans';
import { PlaygroundScreen } from '../screens/Playground';
import { ReportsScreen } from '../screens/Reports';
import { SettingsScreen } from '../screens/Settings';
import { UserScreen } from '../screens/User';
import { VacationsScreen } from '../screens/Vacations';
import { WelcomeScreen } from '../screens/Welcome';
import { WorkLeavesScreen } from '../screens/WorkLeaves';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Home = () => {
  const screen = useWindowDimensions();

  const width = useMemo(() => {
    const widthWithPadding = screen.width - SPACING.small;
    const widthLimit = 360;
    return Math.min(widthLimit, widthWithPadding);
  }, [screen]);

  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.Home}
      drawerContent={MenuScreen}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        drawerStyle: { width: width },
      }}>
      <Drawer.Screen name={SCREENS.Home + '/drawer'} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer theme={_custom_themes.light}>
      <Stack.Navigator initialRouteName={SCREENS.AfterSplash}>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name={SCREENS.AfterSplash} component={AfterSplash} />

          <Stack.Screen name={SCREENS.Welcome} component={WelcomeScreen} />
          <Stack.Screen name={SCREENS.User} component={UserScreen} />
          <Stack.Screen name={SCREENS.Password} component={PasswordScreen} />

          <Stack.Screen name={SCREENS.Home} component={Home} />
          <Stack.Screen name={SCREENS.Account} component={AccountScreen} />
          <Stack.Screen name={SCREENS.Settings} component={SettingsScreen} />
          <Stack.Screen name={SCREENS.Plans} component={PlansScreen} />
          <Stack.Screen name={SCREENS.Pending} component={PendingScreen} />
          <Stack.Screen name={SCREENS.Employees} component={EmployeesScreen} />
          <Stack.Screen name={SCREENS.Vacations} component={VacationsScreen} />
          <Stack.Screen name={SCREENS.Reports} component={ReportsScreen} />
          <Stack.Screen
            name={SCREENS.Adjustments}
            component={AdjustmentsScreen}
          />

          <Stack.Screen
            name={SCREENS.WorkLeaves}
            component={WorkLeavesScreen}
          />

          <Stack.Screen
            name={SCREENS.Playground}
            component={PlaygroundScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
