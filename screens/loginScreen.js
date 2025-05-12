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

function LoginScreen() {
  const Navigation = useNavigation();
  const loginData = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(loginData);

  return (
    <View>
      <View style={styles.inputCon}>
        <TextInput
          keyboardType="email-address"
          value={loginDetails.email}
          placeholder="Email address"
          style={styles.inputFeild}
        />
        <TextInput
          secureTextEntry={true}
          value={loginDetails.password}
          placeholder="Password"
          style={styles.inputFeild}
        />
        <Button title="Submit" />
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
    borderColor: "gray",
    height: 40,
    borderRadius: 6,
    opacity: 0.5,
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
