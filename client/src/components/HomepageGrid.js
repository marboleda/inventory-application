import React from 'react';
import styled from 'styled-components';
import HomepageCategory from './HomepageCategory';
import { BrowserRouter } from 'react-router-dom';

const Grid = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-left: 0px;
`

const HomepageGrid = (props) => {

    const { onCategoryClick, categories } = props;

    return(
        <BrowserRouter>
            <Grid className='HomepageGrid'>
                {categories.map((category) => {
                    return <HomepageCategory
                                key={category._id} 
                                id={category._id} 
                                category_name={category.name}
                                onCategoryClick={onCategoryClick} >
                            </HomepageCategory>
                })}        
            </Grid>
        </BrowserRouter>
    )

}

export default HomepageGrid