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

function RegisterScreen() {
  const Navigation = useNavigation();

  const registerData = {
    name: "",
    email: "",
    password: "",
  };

  const [registerDetails, setRegisterDetails] = useState(registerData);
  const [isLoading, setIsLoading] = useState(false);

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
        <TextInput
          secureTextEntry={false}
          value={registerDetails.password}
          placeholder="Password"
          style={styles.inputFeild}
          onChangeText={(value) => handleTextChange(value, "password")}
        />

        <Button
          title={isLoading ? "Loading..." : "Submit"}
          disabled={isLoading}
          onPress={handleSubmitPress}
        />
      </View>
      <View style={styles.loginText}>
        <Text>You already have an account?</Text>
        <Pressable onPress={() => Navigation.navigate("Register")}>
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
});
