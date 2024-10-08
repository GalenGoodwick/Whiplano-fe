import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import SplashScreen from "../screens/SplashScreen";
import LandingScreen from "../screens/LandingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";
import TrsMarketScreen from "../screens/TrsMarketScreen";
import PaymentMethod from "../screens/PaymentMethodScreen";
import ReviewSummary from "../screens/ReviewSummaryScreen";
import CreateTRSScreen from "../screens/CreateTrsScreen";
import { checkAuthState } from "../redux/slices/authSlice";
import TrsInventoryScreen from "../screens/TrsInventoryScreen";
import TrsDetailScreen from "../screens/TrsDetailScreen";
import ReviewTRSScreen from "../screens/TrsReviewScreen";
import TrsDetailMarketPlaceScreen from "../screens/TrsDetailMarketPlaceScreen";
import ApproveTrsScreen from "../screens/approveTrsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  // if (loading) {
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TrsMarket"
              component={TrsMarketScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TrsDetailMarketPlace"
              component={TrsDetailMarketPlaceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="paymentMethod"
              component={PaymentMethod}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReviewSummary"
              component={ReviewSummary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateTrs"
              component={CreateTRSScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wallet"
              component={TrsInventoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TrsDetail"
              component={TrsDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReviewTrsScreen"
              component={ReviewTRSScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ApproveTrs"
              component={ApproveTrsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
