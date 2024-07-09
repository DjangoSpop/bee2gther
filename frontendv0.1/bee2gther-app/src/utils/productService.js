import axios from 'axios';
const API_URL = 'api/products/';


const ProductService = {
    addProduct:async (productData) => {
        const formData = new FormData();
        for (const key in productData){
            formData.append(key, productData[key]);
        }
        const response = await axios.post(`${API_URL}add/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${localStorage.getItem(`token`)}`
            }
        });
        return response.data;
    },
    // Add other product-related API calls here 
};

export default ProductService;
