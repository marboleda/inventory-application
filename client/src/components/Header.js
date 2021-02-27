import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    background-color: #427d00;
`

const HeaderText = styled.h1`
    background-color: #427d00;
    color: #ffffff;
    box-sizing: border-box;
    margin: 0;
    height: 10vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
    margin-bottom: 20px;
    min-height: 50px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

const Header = () => {

    return(
        <HeaderContainer>
            <StyledLink to='/'>
                <HeaderText>Got-It-All Grocers</HeaderText>
            </StyledLink>  
        </HeaderContainer>   
    )

}

export default Header