import { useRef, useState } from 'react';
import { Alert, TextInput, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import * as S from './styles'
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const realm = useRealm()
  const user = useUser()
  const { goBack } = useNavigation()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert("Placa invalida", "A placa é invalida. Por favro digite sa placa do veiculo")
      }
      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert("Finalidade", "Por favor, informe a finalidade do veiculo.")
      }
      setIsRegistering(false)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate,
          description
        }))
      })
      Alert.alert('Saida', 'Saida do veiculo registrada com sucesso')
      goBack()
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel registrar a saida do veiculo")
      console.log(error)
      setIsRegistering(false)
    }
  }
  return (
    <S.Container>
      <Header title='Saida' />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <S.Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label='Placa do veiculo'
              placeholder='ABC-0000'
              returnKeyType='next'
              onChangeText={setLicensePlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              onChangeText={setDescription}
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              placeholder='Vou utilizar o veiculo para ...'
            />
            <Button
              isLoading={isRegistering}
              title='Registrar Saida'
              onPress={handleDepartureRegister}
            />
          </S.Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </S.Container>
  );
}