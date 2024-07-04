const Product = require('../models/Product');

exports.createProduct = async (req, res) =>
{
    try
    {
        const { name, description, price, stock, imageUrl } = req.body;
        const product = new Product({ name, description, price, stock, imageUrl });
        await product.save();
        res.json(product);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProduct = async( req, res)=>{
    try{
        const { name, description, price, stock, imageUrl } = req.body;
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: 'Product not found'});
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.imageUrl = imageUrl;
        await product.save();
        res.json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
}
exports.deleteProduct = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: 'Product not found'});
        await product.remove();
        res.json({message: 'Product removed'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};
