import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../theme';
import * as S from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
type Props = {
  title: string,
}
export function TopMessage({ title }: Props) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 5
  return (
    <S.Container  >
      <MaterialCommunityIcons name="wifi-off" size={32} color={theme.COLORS.BRAND_LIGHT} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}