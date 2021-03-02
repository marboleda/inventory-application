import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
`;

const CategoryItems = styled.ul`
`;

const ItemLink = styled.a`
    color: #000000;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
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
                                    <ItemLink href={`/item/${categoryItem._id}`}>{categoryItem.name}</ItemLink> - {categoryItem.stock} in stock
                            </li>
                })}                
            </CategoryItems>
        </div>
    )
}

export default CategoryDetail;