import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../theme';
import * as S from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
type Props = {
  title: string,
  hasIcon?: boolean
}
export function TopMessage({ title, hasIcon = false }: Props) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 15
  return (
    <S.Container  >
      {
        hasIcon &&
        <MaterialCommunityIcons name="wifi-off" size={32} color={theme.COLORS.BRAND_LIGHT} />
      }
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}