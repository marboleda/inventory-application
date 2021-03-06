import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormButton } from './ItemCreate';

const InputContainer = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    margin: 0 auto;
`;

const DeletePageButton = styled(FormButton)`
    margin: 10px;
    width: 5vw;
`;

const ItemName = styled.span`
    font-weight: bold;
`;

const ItemDelete = (props) => {

    const { id } = useParams();
    const { serverRoot, clientRoot } = props;
    let categoryURL, itemURL;

    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        fetch(`${serverRoot}item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => {
            setItemData(res);
        });
    }, []);

    const deleteData = (e) => {
        e.preventDefault();
        fetch(`${serverRoot}item/${id}`, {
            mode: 'cors', 
            method: 'delete', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                itemID: itemData._id,
                filename:  itemData.image_filename
            })
        })
        .then((res) => {
            console.log(res);
            categoryURL = `${clientRoot}category/${itemData.category}`;
            window.location.href = categoryURL;
        });
    }

    const cancelDelete = (e) => {
        itemURL = `${clientRoot}item/${itemData._id}`;
        window.location.href = itemURL;
    }

    return(
        (itemData && (
        <div className='ItemDelete'>
            <p>Are you sure you want to delete <ItemName>{itemData.name}</ItemName>?</p>
            <InputContainer>
                <DeletePageButton onClick={deleteData} type='button'>Delete</DeletePageButton>
                <DeletePageButton onClick={cancelDelete} type='button'>Cancel</DeletePageButton>
            </InputContainer>
        </div>))
    );
}

export default ItemDelete;