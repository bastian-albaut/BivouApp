import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddLocation from './addLocation';
import AddType from './addType';
import AddEquipment from './addEquipment';
import AddPhotos from './addPhotos';
import AddPrice from './addPrice';

const Stack = createStackNavigator();

const AddStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AddLocation" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen
        name="AddType"
        component={AddType}
        //options={{ headerLeft: null }} // Désactiver le bouton de retour sur cet écran
      />
      <Stack.Screen
        name="AddEquipment"
        component={AddEquipment}
      />
      <Stack.Screen
        name="AddPhotos"
        component={AddPhotos}
      />
      <Stack.Screen
        name="AddPrice"
        component={AddPrice}
      />
    </Stack.Navigator>
  );
};

export default AddStack;
