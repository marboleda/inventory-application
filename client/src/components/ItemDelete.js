import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubmitButton = styled.button`
    width: 30vw;
    background-color: #427d00;
    color: #ffffff;    
    margin-top: 10px;
`;

const ItemDelete= (props) => {

    const { id } = useParams();
    const itemURL = `${window.location.protocol}\/\/${window.location.hostname}:${window.location.port}/item/${id}`

    const [itemData, setItemData] = useState(null);
    const [name, setName] = useState('');
    const [weightNum, setWeightNum] = useState(-1);
    const [weightUnit, setWeightUnit] = useState('');
    const [price, setPrice] = useState(-1);
    const [stock, setStock] = useState(-1);
  

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => {
            setItemData(res);
            setName(res.name);
            setWeightNum(res.weight_num);
            setWeightUnit(res.weight_unit);
            setPrice(res.price);
            setStock(res.stock);
        });
    }, []);

    const postData = (e) => {
        e.preventDefault();
        const itemObject = {
            name: e.target.name.value,
            weight_num: e.target.weight_num.value,
            weight_unit: e.target.weight_unit.value,
            price: e.target.price.value,
            stock: e.target.stock.value
        }
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {
            mode: 'cors', 
            method: 'post', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(itemObject)
        })
        .then((res) => {
            console.log(res);
            window.location.href = itemURL;
        });
    }

    const handleChange = (e, field) => {
        const inputValue = e.target.value;
        switch (field) {
            case 'name':
                setName(inputValue);
                break;
            case 'weight_num':
                setWeightNum(inputValue);
                break;
            case 'weight_unit':
                setWeightUnit(inputValue);
                break;
            case 'price':
                setPrice(inputValue);
                break;
            case 'stock':
                setStock(inputValue);
                break;
        }
    }

    return(
        (itemData && (
        <div className='ItemDelete'>
            
        </div>))
    );
}

export default ItemDelete;