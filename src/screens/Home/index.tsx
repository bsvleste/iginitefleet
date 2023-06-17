import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import * as S from './styles'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useUser } from '@realm/react'
export function Home() {
  const { navigate } = useNavigation()
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])
  const historic = useQuery(Historic)
  const realm = useRealm()
  const user = useUser()
  function handlerRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrivel', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure')
    }
  }
  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert("Veiculo em uso", "Não foi possivel carregar o veiculo em uso.")
    }
  }
  function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)")
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[Sainda em] DD/MM/YYYY [ás] HH:mm')
        })
      })
      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.log(error)
      Alert.alert('Historico', 'Não foi possivel carregar o hisotrico.')
    }
  }
  function handleHistoricDetails(id: string) {
    navigate('arrivel', { id })
  }

  useEffect(() => {
    fetchHistoric()
  }, [historic])
  useEffect(() => {
    fetchVehicleInUse()
  }, [])
  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    }
  }, [])
  useEffect(() => {
    realm.subscriptions.update((mutablesSubs, realm) => {
      const historicByUserQuery = realm.objects("Historic").filtered(`user_id='${user!.id}'`)
      mutablesSubs.add(historicByUserQuery, { name: "historic_by_user" })
    })
  }, [realm])
  return (
    <S.Container>
      <HomeHeader />
      <S.Content>
        <CarStatus onPress={handlerRegisterMovement} licensePlate={vehicleInUse?.license_plate} />
        <S.Title>Historico</S.Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <S.Label>
              Nenhum veiculo utilizado.
            </S.Label>
          )}
        />
      </S.Content>

    </S.Container>
  )
}