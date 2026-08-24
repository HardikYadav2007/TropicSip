import { useContext } from "react";
import { CartContext } from "../common/CartContext";

function CartPage({ closeCart }) {
    const { cart, updateQuantity } = useContext(CartContext)

    return (
        <>
            <div id="main">
                {closeCart && (
                    <button
                        className="btn btn-secondary"
                        onClick={closeCart}
                        style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', padding: '6px 14px', fontSize: '0.85rem' }}
                    >
                        ← Back to Home
                    </button>
                )}
                {
                    cart.map((product, index) =>
                        (
                            <div className="card" key={product.id}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <p>{product.name}</p>
                                <button className="decrement" onClick={() => updateQuantity(product.id, product.qty - 1)}>-</button>
                                <p className="display">{product.qty}</p>
                                <button className="increment" onClick={() => updateQuantity(product.id, product.qty + 1)}>+</button>
                            </div>
                        )
                    )
                }
            </div>

            <style>{`
                /* Main container to keep everything centered and neat */
                #main {
                FFmax-width: 800px;
                margin: 80px auto 40px; /* Top margin makes room for the Back button */
                padding: 0 20px;
                font-family: system-ui, -apple-system, sans-serif;
                }

    /* The Cart Item Card */
                .card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: #ffffff;
                    border: 1px solid #eaeaea;
                    border-radius: 12px;
                    padding: 16px 24px;
                    margin-bottom: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
                }

    /* Product Image */
                .product-image {
                    height: 90px;
                    width: 90px;
                    object-fit: cover;
                    border-radius: 8px;
                }

    /* Product Name */
                .card p:not(.display) {
                    flex-grow: 1; /* This forces the text to take up empty space, pushing buttons to the right */
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }

    /* Quantity Buttons (+ and -) */
                .increment, .decrement {
                    background-color: #f3f4f6;
                    border: none;
                    border-radius: 8px;
                    width: 36px;
                    height: 36px;
                    font-size: 1.2rem;
                    color: #333;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                }

                .increment:hover, .decrement:hover {
                    background-color: #e5e7eb;
                }

                /* The Number Display */
                .display {
                    font-size: 1.1rem;
                    font-weight: 700;
                    min-width: 32px;
                    text-align: center;
                    margin: 0;
                }
`}</style>
        </>
    )
}
export default CartPage;