import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import * as S from './styles'
import { forwardRef } from 'react'

type TextAreaInputProps = TextInputProps & {
  label: string
}
const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(({ label, ...props }, ref) => {
  const { COLORS } = useTheme()
  return (
    <S.Container>
      <S.Label>
        {label}
      </S.Label>
      <S.Input
        ref={ref}
        autoCapitalize='sentences'
        multiline
        placeholderTextColor={COLORS.GRAY_400}
        {...props}
      />
    </S.Container>
  );
})
export { TextAreaInput }