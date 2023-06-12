import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native';
import * as S from './styles'
type LicensePlateInputProps = TextInputProps & {
  label: string
}

export function LicensePlateInput({ label, ...props }: LicensePlateInputProps) {
  const { COLORS } = useTheme()
  return (
    <S.Container >
      <S.Label>
        {label}
      </S.Label>
      <S.Input
        maxLength={7}
        autoCapitalize='characters'
        placeholderTextColor={COLORS.GRAY_400}
        {...props}
      />
    </S.Container>
  );
}