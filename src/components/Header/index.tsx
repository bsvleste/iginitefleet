import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

import * as S from './styles'
import theme from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 42
  const { goBack } = useNavigation()
  return (
    <S.Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <FontAwesome5 name="arrow-left" size={24} color={theme.COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}