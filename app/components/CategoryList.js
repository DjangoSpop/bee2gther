'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const ListItem = styled.li`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function CategoryList({ categories }) {
  return (
    <List>
      {categories.map((category) => (
        <ListItem key={category.id}>
          <Link href={`/category/${category.id}`}>
            {category.name}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
