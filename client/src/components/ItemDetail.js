import React from 'react';
import styled from 'styled-components';


const ItemDetail = (props) => {

    const { itemData } = props;

    return(
        <div className='ItemDetail'>
            <h2>{itemData.name}</h2>
            <p>{itemData.weight_num} {itemData.weight_unit}</p>
        </div>
    );
}

export default ItemDetail;