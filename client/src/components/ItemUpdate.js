import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ItemUpdate = (props) => {

    const { id } = useParams();

    const [itemData, setItemData] = useState(null);
  

    useEffect(() => {
        fetch(`https://ancient-beyond-65897.herokuapp.com/item/${id}`, {mode: 'cors'})
        .then(res => res.json())
        .then(res => setItemData(res));
    }, []);

    return(
        (itemData && (
        <div className='ItemUpdate'>
            <h2>Update Item</h2>
            <UpdateForm method='POST' action=''>
                <div>
                    <label for='name'>Name:</label>
                    <input name='title' type='text' required />
                </div>

                <div>
                    <label for='weight_num'>Weight Quantity:</label>
                    <input name='weight_num'type='number' step='any' />
                </div>

                <div>
                    <label for='weight_unit'>Weight Unit:</label>
                    <select name='weight_unit'>
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
                    <input name='price' type='number' step='0.01' />
                </div>

                <div>
                    <label for='stock'>In Stock:</label>
                    <input name='stock' type='number' step='1' />
                </div>               

                <button type="submit">Submit</button>
            </UpdateForm>
        </div>))
    );
}

export default ItemUpdate;