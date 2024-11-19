import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import HomeMenu from './src/components/HomeMenu';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{ stackBarIcon: () => <Ionicons name="create-outline" size={24} color="black" /> }} />
        <Stack.Screen name="Login" component={Login} options={{ stackBarIcon: () => <Feather name="log-in" size={24} color="black" /> }} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{ stackBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;