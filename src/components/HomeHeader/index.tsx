import { TouchableOpacity } from 'react-native'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';
import { useUser, useApp } from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export function HomeHeader() {
  const user = useUser()
  const app = useApp()

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut()
  }
  return (
    <S.Container style={{ paddingTop }}>
      <S.Picture source={{ uri: user?.profile.pictureUrl }} placeholder="LKO2:N%2Tw=w]~RBVZRi};RPxuwH" />
      <S.Greeting>
        <S.Message>Olá</S.Message>
        <S.Name>{user?.profile.name}</S.Name>
      </S.Greeting>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="power-settings-new" size={36} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </S.Container>
  );
}