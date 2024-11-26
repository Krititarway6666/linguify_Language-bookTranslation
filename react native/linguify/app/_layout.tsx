import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="translation" />
      {/* <Stack.Screen name="home" />
      <Stack.Screen name="translation" /> */}
    </Stack>
  );
}
