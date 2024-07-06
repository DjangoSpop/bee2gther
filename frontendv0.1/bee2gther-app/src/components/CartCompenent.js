import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, removeItemFromCart, updateCartItemQuantity, clearCart } from './cartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    const handleRemoveItem = (itemId) => {
        dispatch(removeItemFromCart(itemId));
    };

    const handleUpdateQuantity = (itemId, quantity) => {
        dispatch(updateCartItemQuantity(itemId, quantity));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {items.map(item => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={handleClearCart}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;
