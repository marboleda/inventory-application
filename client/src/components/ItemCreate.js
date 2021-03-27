import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const NewItemForm = styled.form`
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

const ItemCreate = (props) => {

    const { id } = useParams();
    const categoryURL = `${window.location.protocol}\/\/${window.location.hostname}:${window.location.port}/category/${id}`

    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/category/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setCategoryData(res));
    }, []);

    const putData = (e) => {
        e.preventDefault();
        const itemObject = {
            name: e.target.name.value,
            weight_num: e.target.weight_num.value,
            weight_unit: e.target.weight_unit.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
            category: categoryData._id
        }
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {
            mode: 'cors', 
            method: 'put', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(itemObject)
        })
        .then((res) => {
            console.log(res);
            window.location.href = categoryURL;
        });
    }

    return(
        (categoryData && (
        <div className='ItemCreate'>
            <h2>Create a new {categoryData.name} item:</h2>
            <NewItemForm onSubmit={putData}>
                <div>
                    <label for='name'>Name:</label>
                    <input name='name' type='text' required />
                </div>

                <div>
                    <label for='weight_num'>Weight Quantity:</label>
                    <input name='weight_num'type='number' step='any'/>
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
                    <input name='price' type='number' step='0.01'/>
                </div>

                <div>
                    <label for='stock'>In Stock:</label>
                    <input name='stock' type='number' step='1'/>
                </div>               

                <SubmitButton type="submit">Submit</SubmitButton>
            </NewItemForm>
        </div>))
    );
}

export default ItemCreate;