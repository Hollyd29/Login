import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { url } from "./utils/config";
import Toast from "react-native-toast-message";
import Entypo from "@expo/vector-icons/Entypo";

function RegisterScreen() {
  const Navigation = useNavigation();

  const registerData = {
    name: "",
    email: "",
    password: "",
  };

  const [registerDetails, setRegisterDetails] = useState(registerData);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handleTextChange(value, name) {
    setRegisterDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmitPress() {
    const { name, email, password } = registerDetails;
    if (!name || !email || !password) {
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
      await axios.post(`${url}/auth/register`, registerDetails);
      setIsLoading(false);
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: "Registration Successful",
        text2Style: { fontSize: 18 },
        visibilityTime: 3000,
      });
      setRegisterDetails(registerData);
    } catch (error) {
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
          keyboardType="text"
          value={registerDetails.name}
          placeholder="Username"
          style={styles.inputFeild}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
        <TextInput
          keyboardType="email-address"
          value={registerDetails.email}
          placeholder="Email address"
          style={styles.inputFeild}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
        <View style={{ position: "relative" }}>
          <TextInput
            secureTextEntry={isVisible}
            value={registerDetails.password}
            placeholder="Password"
            style={styles.inputFeild}
            onChangeText={(value) => handleTextChange(value, "password")}
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
          onPress={handleSubmitPress}
        />
      </View>
      <View style={styles.loginText}>
        <Text>You already have an account?</Text>
        <Pressable onPress={() => Navigation.navigate("Login")}>
          <Text style={{ color: "purple" }}>Login here</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  inputFeild: {
    borderWidth: 2,
    borderColor: "#8d99ae",
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
