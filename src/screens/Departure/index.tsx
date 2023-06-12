import { useRef } from 'react';
import { Platform, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import * as S from './styles'
const keyboardAvoidViewBehavior = Platform.OS === 'android' ? 'height' : 'position'
export function Departure() {
  const descriptionRef = useRef<TextInput>(null)
  function handleDepartureRegister() {
    console.log('ok')
  }
  return (
    <S.Container>
      <Header title='Saida' />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidViewBehavior} >
        <ScrollView>
          <S.Content>
            <LicensePlateInput
              label='Placa do veiculo'
              placeholder='ABC-0000'
              returnKeyType='next'
              onSubmitEditing={() => descriptionRef.current?.focus()} />
            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              placeholder='Vou utilizar o veiculo para ...' />

            <Button title='Registrar Saida' onPress={handleDepartureRegister} />
          </S.Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </S.Container>
  );
}