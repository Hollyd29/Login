import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { url } from "../utils/config";
import Entypo from "@expo/vector-icons/Entypo";
import { setToken } from "../utils/tokenStorage";

function LoginScreen({ setAuthToken }) {
  const Navigation = useNavigation();
  const loginData = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  function handleLoginText(value, name) {
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLoginSubmit() {
    const { email, password } = loginDetails;
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No filed should be empty",
        text2Style: { fontSize: 18 },
        visibilityTime: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${url}/auth/login`, loginDetails);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      // Navigation.navigate("Home");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
        text2Style: { fontSize: 18 },
        visibilityTime: 3000,
      });
    }
  }

  return (
    <View>
      <View style={styles.inputCon}>
        <TextInput
          keyboardType="email-address"
          value={loginDetails.email}
          placeholder="Email address"
          style={styles.inputFeild}
          onChangeText={(value) => handleLoginText(value, "email")}
        />
        <View>
          <TextInput
            secureTextEntry={isVisible}
            value={loginDetails.password}
            placeholder="Password"
            style={styles.inputFeild}
            onChangeText={(value) => handleLoginText(value, "password")}
          />
          <Pressable
            style={styles.positionEye}
            onPress={() => setIsVisible(!isVisible)}
          >
            {!isVisible && <Entypo name="eye" size={24} color="black" />}
            {isVisible && (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <Button
          title={isLoading ? "Loading..." : "Submit"}
          disabled={isLoading}
          onPress={handleLoginSubmit}
        />
      </View>
      <View style={styles.loginText}>
        <Text>You do not have an account?</Text>
        <Pressable onPress={() => Navigation.navigate("Register")}>
          <Text style={{ color: "purple" }}>Register here</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  inputFeild: {
    borderWidth: 2,
    borderColor: "#c0c0c0",
    height: 40,
    borderRadius: 6,
  },
  inputCon: {
    display: "flex",
    gap: 15,
    marginTop: 30,
    padding: 20,
  },
  loginText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginInline: "auto",
    gap: 5,
  },
  positionEye: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    opacity: 0.5,
  },
});
