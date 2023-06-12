import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background: ${({theme})=>theme.COLORS.BRAND_LIGHT};

`;
export const Title = styled.Text`
    ${({theme})=>css`
        color:${theme.COLORS.WHITE};
        font-size:${theme.FONT_SIZE.MD}px;
        font-family:${theme.FONT_FAMILY.BOLD};
        text-align:center;

    `}
`;

export const Loading = styled.ActivityIndicator.attrs(({theme})=>{
    color:theme.COLORS.WHITE
})``
