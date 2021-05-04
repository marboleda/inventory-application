import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Header = styled.h1`
`;

const CategoryItems = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`;

const CategoryItem = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 160px;
    height: 320px;
    box-sizing: border-box;
`;

const ItemLink = styled(Link)`
    color: #000000;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    display: flex;
    flex-direction: column;
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
                    return <CategoryItem key={categoryItem._id}  >
                                    <ItemLink to={`/item/${categoryItem._id}`}>
                                            {(categoryItem.image_filename === '') ?
                                             (<img src={`${serverRoot}images/default.png`}/>) :
                                             (<img src={`${serverRoot}images/${categoryItem.image_filename}`}/>)
                                            } 
                                            <span>{categoryItem.name}</span>
                                            <span>{categoryItem.stock} in stock</span>
                                    </ItemLink>
                            </CategoryItem>
                })}                
            </CategoryItems>
            <NewItemButton><NewItemLink to={`/category/${id}/create_item`}>New Item</NewItemLink></NewItemButton>
        </div>))
    )
}

export default CategoryDetail;