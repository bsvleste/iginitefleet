import { useNavigation, useRoute } from '@react-navigation/native';
import * as S from './styles'
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';
import { Alert } from 'react-native';

type ArrivalRouteParamsProps = {
  id: string
}
export function Arrivel() {
  const route = useRoute()
  const { goBack } = useNavigation()
  const { id } = route.params as ArrivalRouteParamsProps
  const historic = useObject(Historic, new BSON.UUID(id))
  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'
  const realm = useRealm()
  function handleREmoveVehicleUsage() {
    Alert.alert(
      "Cancelar",
      "Cancelar a utilização do veiculo?",
      [
        { text: "Não", style: 'cancel' },
        { text: "Sim", onPress: () => { removeVehicleUsage() } },
      ]
    )
  }
  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    })
    goBack()
  }
  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert("Error", "Não foi possivel obter os dados para registrar a chegada do veiculo")
      }
      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date()
      })
      Alert.alert("Chegada", "Chegada registrada com sucesso.")
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Não foi possivel registrar a chegada do veiculo.")
    }
  }
  return (
    <S.Container>
      <Header title={title} />
      <S.Content>
        <S.Label>Placa do Veiculo</S.Label>
        <S.LicensePlate>{historic?.license_plate}</S.LicensePlate>
        <S.Label>Finalidade</S.Label>
        <S.Description>{historic?.description}</S.Description>

      </S.Content>
      {
        historic?.status === 'departure' &&
        <S.Footer>
          <ButtonIcon onPress={handleREmoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleArrivalRegister} />
        </S.Footer>
      }
    </S.Container>
  );
}