import React from 'react';
import styled from 'styled-components';

const HeaderText = styled.h1`
    background-color: #427d00;
    color: #ffffff;
    box-sizing: border-box;
    margin: 0;
    height: 10vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
    margin-bottom: 20px;
`

const Header = () => {

    return(
        <HeaderText>Got-It-All Grocers</HeaderText>     
    )

}

export default Header