import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import fruits_veg_img from '../assets/images/category_fruits_and_vegetables.jpeg';
import dairy_eggs_img from '../assets/images/category_dairy_and_eggs.jpeg';
import bakery_img from '../assets/images/category_bakery.jpeg';
import meat_seafood_img from '../assets/images/category_meat_and_seafood.jpeg';
import international_foods_img from '../assets/images/category_international_food.jpeg';

const Category = styled.li`
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
    position: relative;
    list-style: none;
    &:hover {
        cursor: pointer;
    }
`

const CategoryImage = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 50%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

const getImage = (categoryName) => {
    switch(categoryName) {
        case 'Fruits & Vegetables':
            return fruits_veg_img;
            break;
        case 'Dairy & Eggs':
            return dairy_eggs_img;
            break;
        case 'Bakery':
            return bakery_img;
            break;
        case 'Meat & Seafood':
            return meat_seafood_img;
            break;
        case 'International Foods':
            return international_foods_img;
            break;
        default:
            return null;
    }
}

const HomepageCategory = (props) => {

    const { id, category_name, onCategoryClick } = props;
    const routeURL = `/category/${id}`;

    return(
        <Category key={id} onClick={() => onCategoryClick(id)}>
            <StyledLink to={routeURL}>
                <CategoryImage src={getImage(category_name)} />
                <h3>{category_name}</h3>
            </StyledLink>
        </Category>
    )

}

export default HomepageCategory