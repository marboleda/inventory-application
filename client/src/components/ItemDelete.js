import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    margin: 0 auto;
`;

const DeletePageButton = styled.button`
    width: 30vw;
    background-color: #427d00;
    color: #ffffff;    
    margin: 10px;
    width: 5vw;
`;

const ItemName = styled.span`
    font-weight: bold;
`;

const ItemDelete = (props) => {

    const { id } = useParams();
    const rootURL = `${window.location.protocol}\/\/${window.location.hostname}:${window.location.port}/`;
    let categoryURL, itemURL;

    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => {
            setItemData(res);
            categoryURL = `${rootURL}category/${res.category}`;
            itemURL = `${rootURL}item/${res._id}`;
        });
    }, []);

    const deleteData = (e) => {
        e.preventDefault();
        fetch(`http://localhost:9000/item/${id}`, {
            mode: 'cors', 
            method: 'delete', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ itemID: itemData._id })
        })
        .then((res) => {
            console.log(res);
            window.location.href = categoryURL;
        });
    }

    return(
        (itemData && (
        <div className='ItemDelete'>
            <p>Are you sure you want to delete <ItemName>{itemData.name}</ItemName>?</p>
            <InputContainer>
                <DeletePageButton onClick={deleteData} type='button'>Delete</DeletePageButton>
                <a href={itemURL}><DeletePageButton type='button'>Cancel</DeletePageButton></a>
            </InputContainer>
        </div>))
    );
}

export default ItemDelete;