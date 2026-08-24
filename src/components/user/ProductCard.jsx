import React, { useContext, useState } from 'react';
import { CartContext } from '../common/CartContext';
export default function ProductCard({ product, onAddToCart }) {

    const {addToCart,cart} = useContext(CartContext)

    const existingCartItem = cart.find((item)=>item.id===product.id)

    const [cartonQty, setCartonQty] = useState(existingCartItem?.qty ?? product?.minOrderQty ?? 1);

    const handleIncrement = () => {
        if (cartonQty < product.stockCartons) {
            setCartonQty(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (cartonQty > (product.minOrderQty || 1)) {
            setCartonQty(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (addToCart) {
            const finalProduct = {...product,qty:cartonQty}
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
                            disabled={cartonQty <= (product.minOrderQty || 1)}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="qty-count">{cartonQty}</span>
                        <button
                            type="button"
                            className="qty-btn"
                            onClick={handleIncrement}
                            disabled={cartonQty >= product.stockCartons}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary add-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add {cartonQty} to Cart
                    </button>
                </div>
            </div>

            <style>{`
                .product-card {
                    display: flex;
                    flex-direction: column;
                    border-radius: 24px;
                    overflow: hidden;
                    position: relative;
                    background: var(--bg-card);
                    border: 1px solid var(--border-glass);
                    box-shadow: var(--shadow-card);
                    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease;
                }

                .product-card:hover {
                    transform: translateY(-6px);
                    border-color: var(--primary-orange);
                    box-shadow: 0 20px 40px -10px rgba(255, 107, 53, 0.2);
                }

                .card-badges {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    right: 16px;
                    display: flex;
                    justify-content: space-between;
                    gap: 8px;
                    z-index: 2;
                }

                .badge {
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    text-transform: uppercase;
                    backdrop-filter: blur(8px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                }

                .badge-popular {
                    background: rgba(255, 107, 53, 0.9);
                    color: #ffffff;
                }

                .badge-low-stock {
                    background: rgba(239, 68, 68, 0.9);
                    color: #ffffff;
                }

                .badge-category {
                    background: rgba(255, 255, 255, 0.85);
                    color: var(--text-dark);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                }

                .card-image-wrap {
                    height: 220px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .product-image {
                    max-height: 180px;
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 12px 15px rgba(0,0,0,0.15));
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .product-card:hover .product-image {
                    transform: scale(1.08) rotate(-4deg);
                }

                .card-body {
                    padding: 10px 15px 10px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    gap: 5px;
                }

                .product-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-dark);
                    line-height: 1.3;
                    margin-bottom: 2px;
                }

                .product-flavor {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--primary-orange);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .product-desc {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .wholesale-specs {
                    display: flex;
                    gap: 8px;
                    margin-top: 4px;
                }

                .spec-pill {
                    flex: 1;
                    background: #f8fafc;
                    border: 1px solid var(--border-subtle);
                    border-radius: 12px;
                    padding: 6px 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .spec-label {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .spec-val {
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--text-dark);
                }

                .price-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-top: 6px;
                }

                .price-tag {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--primary-orange);
                }

                .price-unit {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    font-weight: 500;
                    margin-left: 4px;
                }

                .stock-info {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: var(--text-muted);
                }

                .card-actions {
                    display: flex;
                    gap: 12px;
                    margin-top: auto;
                    padding-top: 10px;
                }

                .quantity-control {
                    display: flex;
                    align-items: center;
                    background: #f1f5f9;
                    border-radius: 12px;
                    padding: 4px;
                    border: 1px solid var(--border-subtle);
                }

                .qty-btn {
                    width: 30px;
                    height: 30px;
                    border: none;
                    background: #ffffff;
                    color: var(--text-dark);
                    font-size: 1rem;
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                }

                .qty-btn:hover:not(:disabled) {
                    background: var(--primary-orange);
                    color: #ffffff;
                }

                .qty-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .qty-count {
                    width: 32px;
                    text-align: center;
                    font-weight: 700;
                    font-size: 0.95rem;
                    color: var(--text-dark);
                }

                .add-cart-btn {
                    flex: 1;
                    padding: 10px 16px;
                    font-size: 0.88rem;
                    border-radius: 12px;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
