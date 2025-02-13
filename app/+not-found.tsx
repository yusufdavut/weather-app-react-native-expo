import { View, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Oops!" }} />
    </View>
  );
}
