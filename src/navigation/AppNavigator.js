import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignUpScreen';
import TrsMarketScreen from '../screens/TrsMarketScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import PaymentMethod from '../screens/PaymentMethodScreen';
import ReviewSummary from '../screens/ReviewSummaryScreen';
import CreateTRSScreen from '../screens/CreateTrsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrsMarket" component={TrsMarketScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="paymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
        <Stack.Screen name="ReviewSummary" component={ReviewSummary} options={{ headerShown: false }} />
        <Stack.Screen name="CreateTrs" component={CreateTRSScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
