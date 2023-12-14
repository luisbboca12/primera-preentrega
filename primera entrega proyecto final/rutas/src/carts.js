const express = require('express');
const router = express.Router();
const fs = require('fs');

class CartManager {
  constructor() {
    this.filePath = '/data/carrito.json';
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar carritos:', error.message);
      return [];
    }
  }

  saveCarts() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.filePath, data);
    } catch (error) {
      console.error('Error al guardar carritos:', error.message);
    }
  }

  createCart() {
    const newCart = { id: Date.now().toString(), products: [] };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart.id;
  }
}

const cartManager = new CartManager();

//  crearrr un nuevo carrito
router.post('/', (req, res) => {
  const cartId = cartManager.createCart();
  res.json({ message: 'Carrito creado exitosamente', cartId });
});

module.exports = router;
