import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { Departure } from '../screens/Departure'
import { Arrivel } from '../screens/Arrivel'
const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}
        >
            <Screen name='home' component={Home} />
            <Screen name='departure' component={Departure} />
            <Screen name='arrivel' component={Arrivel} />
        </Navigator>
    )
}