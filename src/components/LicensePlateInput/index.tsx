import { forwardRef } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { useTheme } from 'styled-components/native';
import * as S from './styles'
type LicensePlateInputProps = TextInputProps & {
  label: string
}

const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(({ label, ...props }, ref) => {
  const { COLORS } = useTheme()
  return (
    <S.Container >
      <S.Label>
        {label}
      </S.Label>
      <S.Input
        ref={ref}
        maxLength={7}
        autoCapitalize='characters'
        placeholderTextColor={COLORS.GRAY_400}
        {...props}
      />
    </S.Container>
  );
})
export { LicensePlateInput }