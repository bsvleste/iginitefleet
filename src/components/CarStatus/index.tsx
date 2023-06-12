import { TouchableOpacityProps } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import * as S from './styles'
import { useTheme } from 'styled-components';

type CarStatusProps = TouchableOpacityProps & {
  licensePlate?: string | null
}
export function CarStatus({ licensePlate = null, ...props }: CarStatusProps) {
  const Icon = licensePlate ? 'key' : 'car'
  const message = licensePlate ? `Veiculo ${licensePlate} em uso. ` : 'Nenhum veiculo em uso. '
  const status = licensePlate ? ` chegada` : ' saida'
  const theme = useTheme()
  return (

    <S.Container {...props}>
      <S.IconBox>
        <FontAwesome5 name={Icon} size={32} color={theme.COLORS.BRAND_LIGHT} />
      </S.IconBox>
      <S.Message>
        {message}
        <S.TextHight>
          Clique aqui para registrar a {status}
        </S.TextHight>
      </S.Message>
    </S.Container>
  );
}