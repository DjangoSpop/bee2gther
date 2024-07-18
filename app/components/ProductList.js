'use client';

import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

export default function ProductList({ products }) {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.id}>{product.name} - ${product.price}</ListItem>
      ))}
    </List>
  );
}
