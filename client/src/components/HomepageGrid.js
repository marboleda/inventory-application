import React from 'react';
import styled from 'styled-components';
import HomepageCategory from './HomepageCategory'

const Grid = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-left: 0px;
`

const HomepageGrid = (props) => {

    const { categories } = props;

    return(
        <Grid className='HomepageGrid'>
            {categories.map((category) => {
                return <HomepageCategory id={category.id} category_name={category.name}></HomepageCategory>
            })}        
        </Grid>
    )

}

export default HomepageGrid