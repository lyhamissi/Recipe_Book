import { RecipeProvider } from './src/context/RecipeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <RecipeProvider>
        <AppNavigator />
      </RecipeProvider>
    </UserProvider>

  );
}
