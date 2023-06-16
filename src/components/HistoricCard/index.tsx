import { TouchableOpacityProps } from 'react-native'
import *  as S from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
export type HistoricCardProps = {
  id: string
  licensePlate: string
  created: string
  isSync: boolean
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps
}

export function HistoricCard({ data, ...props }: Props) {
  return (
    <S.Container activeOpacity={0.7} {...props} >
      <S.Info>
        <S.LicensePlate>{data.licensePlate}</S.LicensePlate>
        <S.Departure>{data.created}</S.Departure>
      </S.Info>
      {
        data.isSync ?
          <MaterialCommunityIcons name="check" size={24} color={theme.COLORS.BRAND_LIGHT} /> :
          <MaterialCommunityIcons name="clock-minus-outline" size={24} color={theme.COLORS.GRAY_400} />
      }
    </S.Container>
  );
}