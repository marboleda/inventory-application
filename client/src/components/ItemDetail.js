import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Price = styled.p`
    font-weight: bold;
`;

const ButtonsContainer = styled.div`
`;

const ModifyButton = styled.button`
    margin: 10px;
    background-color: #427d00;
    color: #ffffff;
`


const ItemDetail = (props) => {

    const { id } = useParams();

    const [itemData, setItemData] = useState(null);
  

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setItemData(res));
    }, []);

    return(
        (itemData && (
        <div className='ItemDetail'>
            <h2>{itemData.name}</h2>
            <p>{itemData.weight_num} {itemData.weight_unit}</p>
            <Price>${itemData.price}</Price>
            <p>In Stock: {itemData.stock}</p>
            <ButtonsContainer>
                <ModifyButton>Update</ModifyButton>
                <ModifyButton>Delete</ModifyButton>
            </ButtonsContainer>
        </div>))
    );
}

export default ItemDetail;