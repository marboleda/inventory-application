import React from 'react';
import styled from 'styled-components';
import HomepageCategory from './HomepageCategory'

const Grid = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: space-evenly;
`

const HomepageGrid = (props) => {

    const { categories } = props;

    return(
        <Grid className='HomepageGrid'>
            {categories.map((category) => {
                return <li key={category._id}>{category.name}</li>
            })}        
        </Grid>
    )

}

export default HomepageGrid