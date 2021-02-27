import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
`;

const CategoryItems = styled.ul`
`;

const CategoryDetail = (props) => {

    const { categoryData } = props;

    return(
        <div className='CategoryDetail'>
            <Header>{categoryData.category.name}</Header>
            <CategoryItems>
                {categoryData.category_items.map((categoryItem) => {
                    return <li
                                key={categoryItem._id}  >
                                    {categoryItem.name} - {categoryItem.stock} in stock
                            </li>
                })}                
            </CategoryItems>
        </div>
    )
}

export default CategoryDetail;