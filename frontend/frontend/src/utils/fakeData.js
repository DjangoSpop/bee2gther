export const generateFakeProducts = (count = 20) => {
    return Array.from({ length: count }, (_, index) => ({
      _id: `product_${index + 1}`,
      name: `Product ${index + 1}`,
      image: `https://picsum.photos/200/300?random=${index + 1}`,
      description: `This is a description for Product ${index + 1}`,
      brand: `Brand ${Math.floor(index / 5) + 1}`,
      category: `Category ${Math.floor(index / 3) + 1}`,
      price: Math.floor(Math.random() * 1000) + 10,
      countInStock: Math.floor(Math.random() * 50),
      rating: Math.random() * 5,
      numReviews: Math.floor(Math.random() * 100),
    }));
  };
  
  export const generateFakeUsers = (count = 10) => {
    return Array.from({ length: count }, (_, index) => ({
      _id: `user_${index + 1}`,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      isAdmin: index === 0, // First user is admin
    }));
  };
