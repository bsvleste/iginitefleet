import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'

type ButtonProps =TouchableOpacityProps& {
    title:string
    isLoading?:boolean
}

export function Button({title,isLoading=false,...props}:ButtonProps){
return(
    <S.Container
        activeOpacity={0.7}
        disabled={isLoading}
        {...props}
    >
        {
            isLoading?<S.Loading/>:<S.Title>{title}</S.Title>
        }
    </S.Container>
)
}