import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native';
import { IconProps } from 'phosphor-react-native';
import * as S from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {

}
export function ButtonIcon({ ...props }: Props) {
  const { COLORS } = useTheme()
  return (
    <S.Container activeOpacity={0.7} {...props}>
      <MaterialCommunityIcons name="close" size={42} color={COLORS.BRAND_LIGHT} />
    </S.Container>
  );
}