import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/unprotected/loginScreen";
import RegisterScreen from "./screens/unprotected/RegisterScreen";
import Toast from "react-native-toast-message";
import HomeScreen from "./screens/protectedscreen/homescreen";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "./screens/utils/tokenStorage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/protectedscreen/profilescreen";
import AboutScreen from "./screens/protectedscreen/aboutscreeen";
import HalfMessage from "./screens/protectedscreen/halfmessage";
import AllMessage from "./screens/protectedscreen/allmessage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  // const [isLogingin, setIsLogingin] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // This is for checking if to take user to login page (if no token) or to the application (if there is token)
  useEffect(() => {
    // removeToken();
    getToken().then((storedToken) => {
      setAuthToken(storedToken);
      // setIsLogingin(false);
    });
    // setAuthToken(getToken())
  }, []);

  // if (isLogingin) {
  //   return null;
  // }
  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => <HomeScreen setAuthToken={setAuthToken} />}
        </Stack.Screen>
        <Stack.Screen
          name="HalfMessage"
          options={{
            title: "Half Message",
          }}
          component={HalfMessage}
        />
        <Stack.Screen
          name="AllMessage"
          options={{
            title: "All Message",
          }}
          component={AllMessage}
        />
      </Stack.Navigator>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {authToken ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
            >
              {() => <HomeStack setAuthToken={setAuthToken} />}
            </Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
              {() => <LoginScreen setAuthToken={setAuthToken} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </View>
  );
}

export default App;
