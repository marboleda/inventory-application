import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Header = styled.h1`
`;

const CategoryItems = styled.ul`
    display: table;
    text-align: left;
    margin: 0 auto;
`;

const ItemLink = styled(Link)`
    color: #000000;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const NewItemButton = styled.button`
    margin: 10px;
    background-color: #427d00;

`;

const NewItemLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
`

const CategoryDetail = (props) => {

    const { id } = useParams();
    const { serverRoot } = props;

    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        const getCategoryData = async () => {
            const res = await fetch(`${serverRoot}category/${id}`, {mode: 'cors'});
            const data = await res.json();
            setCategoryData(data);
        }

        getCategoryData();
    }, [])

    return(
        (categoryData && (
        <div className='CategoryDetail'>
            <Header>{categoryData.category.name}</Header>
            <CategoryItems>
                {categoryData.category_items.map((categoryItem) => {
                    return <li key={categoryItem._id}  >
                                    <ItemLink to={`/item/${categoryItem._id}`}>
                                            <span>{categoryItem.name} -</span>
                                    </ItemLink> {categoryItem.stock} in stock
                            </li>
                })}                
            </CategoryItems>
            <NewItemButton><NewItemLink to={`/category/${id}/create_item`}>New Item</NewItemLink></NewItemButton>
        </div>))
    )
}

export default CategoryDetail;