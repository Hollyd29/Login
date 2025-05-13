import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { removeToken } from "../utils/tokenStorage";

function HomeScreen({ setAuthToken }) {
  const navigation = useNavigation();

  function handleLogout() {
    removeToken();
    setAuthToken(null);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Logout" onPress={handleLogout} />;
      },
    });
  }, []);
  return (
    <View>
      <Text>Name: OLADIMEJI OLAPEJU</Text>
      <Text>Age: UNDIFINE</Text>
      <Text>Sex: MALE</Text>
      <Text>Habit: ALWAYS TRY MY BEST TO MAKE GOOD EARNINGS</Text>
      <View style={{ marginTop: 30, display: "flex", gap: 10 }}>
        <Button
          title="Half Message"
          onPress={() => navigation.navigate("HalfMessage")}
        />
        <Button
          title="All Message"
          onPress={() => navigation.navigate("AllMessage")}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
