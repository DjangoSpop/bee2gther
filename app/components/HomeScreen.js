'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupBuys } from '../../store/actions/groupBuyActions';
import ProductList from './ProductList';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fetchCategories } from '@/store/actions/categoryActions';
import CategoryList from './CategoryList';
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { groupBuys, loading, error } = useSelector((state) => state.groupBuys);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchGroupBuys());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (categoriesLoading) return <div>Loading categories...</div>;

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1>Welcome to Bee2gther</h1>
      <h2>Categories</h2>
      <CategoryList categories={categories} />
      <h2>Featured Group Buys</h2>
      {groupBuys && groupBuys.length > 0 ? (
        <ProductList products={groupBuys} />
      ) : (
        <p>No group buys available at the moment.</p>
      )}
    </Container>
  );
}
