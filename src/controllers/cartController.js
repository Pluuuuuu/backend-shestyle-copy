const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cartItem = await Cart.findOne({ where: { user_id: req.user.id, product_id: productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user_id: req.user.id,
        product_id: productId,
        quantity,
      });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.findByPk(id);
    if (cartItem) {
      await cartItem.destroy();
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

// View cart items
exports.viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { user_id: req.user.id } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

// Update product quantity in cart
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    let cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
};
