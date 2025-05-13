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
      <Text>This home screen</Text>
    </View>
  );
}

export default HomeScreen;
