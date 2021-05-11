import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormButton } from './ItemCreate';

const Price = styled.p`
    font-weight: bold;
`;

const ButtonsContainer = styled.div`
`;

const ModifyButton = styled(FormButton)`
    margin: 10px;
`


const ItemDetail = (props) => {

    const { id } = useParams();
    const { serverRoot } = props;

    const [itemData, setItemData] = useState(null);
  

    useEffect(() => {
        fetch(`${serverRoot}item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setItemData(res));
    }, []);

    return(
        (itemData && (
        <div className='ItemDetail'>
            <h2>{itemData.name}</h2>
            {(itemData.image_filename === '') ?
             (<img src={`${serverRoot}images/default.png`}/>) :
             (<img src={`${serverRoot}images/${itemData.image_filename}`}/>)
            } 
            <p>{itemData.weight_num} {itemData.weight_unit}</p>
            <Price>${itemData.price}</Price>
            <p>In Stock: {itemData.stock}</p>
            <ButtonsContainer>
                <a href={`./${id}/update`}><ModifyButton type="button">Update</ModifyButton></a>
                <a href={`./${id}/delete`}><ModifyButton type="button">Delete</ModifyButton></a>
            </ButtonsContainer>
        </div>))
    );
}

export default ItemDetail;