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
import { Realm, useUser } from '@realm/react'
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { TopMessage } from '../../components/TopMessage'
export function Home() {
  const { navigate } = useNavigation()
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)
  const historic = useQuery(Historic)
  const realm = useRealm()
  const user = useUser()
  function handlerRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() })
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
  async function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)")
      const lastSync = await getLastAsyncTimestamp()
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
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
    navigate('arrival', { id })
  }

  async function progressNotification(transfered: number, transferable: number) {
    const percentage = (transferable / transfered) * 100
    if (percentage === 100) {
      await saveLastSyncTimestamp()
      await fetchHistoric();
      setPercentageToSync(null)
      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados.'
      })
    }
    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado`)
    }
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
  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) {
      return
    }
    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )
    return () => syncSession.removeProgressNotification(progressNotification)
  }, [])
  return (
    <S.Container>
      {
        percentageToSync &&
        <TopMessage title={percentageToSync} />
      }
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