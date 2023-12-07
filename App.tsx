import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import Home from './src/screens/Home';
import AddTache from './src/screens/AddTache';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='addTache' component={AddTache}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
