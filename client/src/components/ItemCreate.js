import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormButton = styled.button`
  background-color: #427d00;
  color: #ffffff;
  margin-top: 10px;  
`;

const NewItemForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubmitButton = styled(FormButton)`
    width: 30vw;
`;

const ItemCreate = (props) => {

    const { id } = useParams();
    const { serverRoot, clientRoot } = props;
    const categoryURL = `${clientRoot}category/${id}`


    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        fetch(`${serverRoot}category/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setCategoryData(res));
    }, []);

    const postData = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('weight_num', e.target.weight_num.value);
        formData.append('weight_unit', e.target.weight_unit.value);
        formData.append('price', e.target.price.value);
        formData.append('stock', e.target.stock.value);
        formData.append('category', e.target.category.value);
        formData.append('itemImage', e.target.itemImage.files[0]);

        fetch(`${serverRoot}category/${id}/create_item`, {
            mode: 'cors', 
            method: 'post', 
            body: formData
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
            <NewItemForm onSubmit={postData} enctype='multipart/form-data'>
                <div>
                    <label for='name'>Name:</label>
                    <input name='name' type='text' required />
                </div>

                <div>
                    <label for='weight_num'>Weight Quantity:</label>
                    <input name='weight_num' type='number' step='any'/>
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

                <input name='category' type='hidden' value={categoryData.category._id} />               

                <div>
                    <label for='itemImage'>Image:</label>
                    <input name='itemImage' type='file'></input>
                </div>

                <SubmitButton type="submit">Submit</SubmitButton>
            </NewItemForm>
        </div>))
    );
}

export { ItemCreate, FormButton };