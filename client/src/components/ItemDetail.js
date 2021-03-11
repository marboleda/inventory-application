import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Price = styled.p`
    font-weight: bold;
`;


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
        </div>))
    );
}

export default ItemDetail;