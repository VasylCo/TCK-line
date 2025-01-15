import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'ТЦК та СП е-Черга', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="service-select"
        options={{
          title: 'ТЦК та СП е-Черга',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Реєстрація',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
