import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import * as S from './styles'
export function Home() {
  const { navigate } = useNavigation()
  function handlerRegisterMovement() {
    navigate('departure')
  }
  return (
    <S.Container>
      <HomeHeader />
      <S.Content>
        <CarStatus onPress={handlerRegisterMovement} />
      </S.Content>
    </S.Container>
  )
}