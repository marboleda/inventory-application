import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormButton } from './ItemCreate';

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubmitButton = styled(FormButton)`
    width: 30vw;
`;

const ItemUpdate = (props) => {

    const { id } = useParams();
    const { serverRoot, clientRoot } = props;
    const itemURL = `${clientRoot}item/${id}`

    const [itemData, setItemData] = useState(null);
    const [name, setName] = useState('');
    const [weightNum, setWeightNum] = useState(-1);
    const [weightUnit, setWeightUnit] = useState('');
    const [price, setPrice] = useState(-1);
    const [stock, setStock] = useState(-1);
    const [imageFileName, setImageFileName] = useState('');

    useEffect(() => {
        fetch(`${serverRoot}item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => {
            setItemData(res);
            setName(res.name);
            setWeightNum(res.weight_num);
            setWeightUnit(res.weight_unit);
            setPrice(res.price);
            setStock(res.stock);
            setImageFileName(res.image_filename);
        });
    }, []);

    const postData = (e) => {
        e.preventDefault();

        /*
        const itemObject = {
            name: e.target.name.value,
            weight_num: e.target.weight_num.value,
            weight_unit: e.target.weight_unit.value,
            price: e.target.price.value,
            stock: e.target.stock.value
        }
        */

        const formData = new FormData();

        formData.append('name', name);
        formData.append('weight_num', weightNum);
        formData.append('weight_unit', weightUnit);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('itemImage', imageFileName);

        fetch(`${serverRoot}item/${id}`, {
            mode: 'cors', 
            method: 'post', 
            body: formData
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
            case 'image':
                setImageFileName(e.target.files[0]);
                break;
        }
    }

    return(
        (itemData && (
        <div className='ItemUpdate'>
            <h2>Update Item</h2>
            <UpdateForm onSubmit={postData} encType='multipart/form-data'>
                <div>
                    <label for='name'>Name:</label>
                    <input name='name' type='text' value={name} onChange={(e) => handleChange(e, 'name')} required />
                </div>

                <div>
                    <label for='weight_num'>Weight Quantity:</label>
                    <input name='weight_num'type='number' step='any' value={weightNum} onChange={(e) => handleChange(e, 'weight_num')}/>
                </div>

                <div>
                    <label for='weight_unit'>Weight Unit:</label>
                    <select name='weight_unit' required>
                        <option value=''>Select an Option</option>
                        <option value='kg'>kg</option>
                        <option value='g'>g</option>
                        <option value='ml'>ml</option>
                        <option value='l'>l</option> 
                        <option value='oz'>oz</option> 
                        <option value='count'>count</option>                         
                    </select>
                </div>

                <div>
                    <label for='price'>Price:</label>
                    <input name='price' type='number' step='0.01' value={price} onChange={(e) => handleChange(e, 'price')}/>
                </div>

                <div>
                    <label for='stock'>In Stock:</label>
                    <input name='stock' type='number' step='1' value={stock} onChange={(e) => handleChange(e, 'stock')}/>
                </div>      

                <div>
                    <label for='itemImage'>Image:</label>
                    <input name='itemImage' type='file' onChange={(e) => handleChange(e, 'image')} />
                </div>         

                <SubmitButton type="submit">Submit</SubmitButton>
            </UpdateForm>
        </div>))
    );
}

export default ItemUpdate;