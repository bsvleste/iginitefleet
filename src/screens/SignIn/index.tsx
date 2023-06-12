import { useEffect, useState } from 'react'
import {Alert} from'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as S from './styles'
import backgroundPNG from '../../assets/background.png'
import { Button } from '../../components/Button'
import{ ANDROID_CLIENT_ID,IOS_CLIENT_ID} from "@env"
import {Realm,useApp} from '@realm/react'

WebBrowser.maybeCompleteAuthSession()
 export function SignIn(){
    const[isAuthenticating,setIsAuthenticating] = useState(false)
   const [_,response,googleSignIn ]= Google.useAuthRequest({
        androidClientId:ANDROID_CLIENT_ID,
        iosClientId:IOS_CLIENT_ID,
        scopes:['profile','email']
    })
    const app = useApp()
    function handleGoogleSignIn(){
        setIsAuthenticating(true)
        googleSignIn().then(response=>{
            if(response.type !== "success"){
                setIsAuthenticating(false)
            }
        })
    }
    useEffect(()=>{
        if(response?.type === 'success'){
            if(response.authentication?.idToken){
                const credentials = Realm.Credentials.jwt(response.authentication.idToken)
                app.logIn(credentials).catch(error=>{
                    Alert.alert("Entrar","Não foi possivel entrar na sua conta do google")
                    setIsAuthenticating(false)
                })
            }else{
                Alert.alert("Entrar","Não foi possivel entrar na sua conta do google")
                setIsAuthenticating(false)
            }
        }
    },[response])
    return(
        <S.Container source={backgroundPNG} alt="imagem do carro">
            <S.Title>Ignite Fleet</S.Title>
            <S.Slogan>Gestçao de uso de Veiculos</S.Slogan>
            <Button title='Entrar com o google' onPress={handleGoogleSignIn} isLoading={isAuthenticating}/>
        </S.Container>
    )
}