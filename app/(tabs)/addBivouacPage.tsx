import AddStack from "@/app/addBivouac/screens/addStack";
import { NavigationContainer } from "@react-navigation/native";

// Tout doit etre migrer dans la page specifique dans features/...
export default function AddBivouacPage() {
  return (
    <NavigationContainer>
      <AddStack />
    </NavigationContainer>
  );
}
