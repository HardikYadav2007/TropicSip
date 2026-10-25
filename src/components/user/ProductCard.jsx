import React, { useContext, useState } from 'react';
import { CartContext } from '../common/CartContext';
import { useAuth } from '../../context/AuthContext';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
    const { addToCart, cart } = useContext(CartContext);
    const { currentUser } = useAuth();
    const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superadmin";

    const existingCartItem = cart.find((item) => item.id === product.id);

    const [cartonQty, setCartonQty] = useState(existingCartItem?.qty ?? product?.minOrderQty ?? 1);

    const handleIncrement = () => {
        if (isAdmin) return;
        if (cartonQty < product.stockCartons) {
            setCartonQty(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (isAdmin) return;
        if (cartonQty > (product.minOrderQty || 1)) {
            setCartonQty(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (isAdmin) return;
        if (addToCart) {
            const finalProduct = { ...product, qty: cartonQty };
            addToCart(finalProduct);
        }
    };

    const isLowStock = product.stockCartons < 20;

    return (
        <div className="product-card glass-card">
            {/* Top Badges */}
            <div className="card-badges">
                {product.isPopular && <span className="badge badge-popular">🔥 Bestseller</span>}
                {isLowStock ? (
                    <span className="badge badge-low-stock">⚠️ Low Stock ({product.stockCartons})</span>
                ) : (
                    <span className="badge badge-category">{product.category}</span>
                )}
            </div>

            {/*img*/}
            <div className="card-image-wrap" style={{ background: product.bgGradient || 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
                <img src={product.image} alt={product.name} className="product-image" />
            </div>

            {/*Body */}
            <div className="card-body">
                <div className="card-header-row">
                    <div>
                        <h3 className="product-name">{product.name}</h3>
                        <span className="product-flavor">{product.flavor}</span>
                    </div>
                </div>

                {/* <p className="product-desc">{product.description}</p> */}

                {/* Wholesale Specifications */}
                {/* <div className="wholesale-specs">
                    <div className="spec-pill">
                        <span className="spec-label">Units/Carton</span>
                        <span className="spec-val">{product.unitsPerCarton} Bottles</span>
                    </div>
                    <div className="spec-pill">
                        <span className="spec-label">Min Order</span>
                        <span className="spec-val">{product.minOrderQty} Cartons</span>
                    </div>
                </div> */}

                {/* Price & Stock Section */}
                <div className="price-row">
                    <div>
                        <span className="price-tag">₹{product.pricePerCarton}</span>
                        <span className="price-unit">/carton |</span>
                    </div>
                    <span className="stock-info"> {product.stockCartons} cartons available</span>
                </div>

                {/* Quantity Controls & Add to Cart */}
                <div className="card-actions">
                    <div className="quantity-control">
                        <button
                            type="button"
                            className="qty-btn"
                            onClick={handleDecrement}
                            disabled={isAdmin || cartonQty <= (product.minOrderQty || 1)}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="qty-count">{cartonQty}</span>
                        <button
                            type="button"
                            className="qty-btn"
                            onClick={handleIncrement}
                            disabled={isAdmin || cartonQty >= product.stockCartons}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        className={`btn btn-primary add-cart-btn ${isAdmin ? 'admin-disabled' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAdmin}
                        title={isAdmin ? "Admins cannot place orders through the storefront" : `Add ${cartonQty} to Cart`}
                    >
                        {isAdmin ? "Disabled for Admin" : `Add ${cartonQty} to Cart`}
                    </button>
                </div>
            </div>

        </div>
    );
}
