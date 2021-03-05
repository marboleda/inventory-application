import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Header = styled.h1`
`;

const CategoryItems = styled.ul`
`;

const ItemLink = styled(Link)`
    color: #000000;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const CategoryDetail = (props) => {

    const { onItemClick } = props;
    const { id } = useParams();

    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/category/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setCategoryData(res));
    }, [])

    return(
        (categoryData && (
        <div className='CategoryDetail'>
            <Header>{categoryData.category.name}</Header>
            <CategoryItems>
                {categoryData.category_items.map((categoryItem) => {
                    return <li
                                key={categoryItem._id}  >
                                    <ItemLink to={`/item/${categoryItem._id}`}>
                                            {categoryItem.name}
                                    </ItemLink> - {categoryItem.stock} in stock
                            </li>
                })}                
            </CategoryItems>
        </div>))
    )
}

export default CategoryDetail;