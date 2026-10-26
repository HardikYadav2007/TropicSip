import { createContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const CartContext = createContext({
    cart: [],
    addToCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    setCart: () => {}
})

export function CartProvider({children}){
    const [cart,setCart] = useState([]);
    const { currentUser } = useAuth();
    const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superadmin";

    // Clear cart if admin logs in or is active
    useEffect(() => {
        if (isAdmin && cart.length > 0) {
            setCart([]);
        }
    }, [isAdmin]);

    const addToCart = (product)=>{
        if (isAdmin) {
            return;
        }
        setCart((prevCart)=>{

            const existingItem = prevCart.find((item)=>item.id===product.id)
            if(existingItem){
                return prevCart.map((item) =>
                item.id === product.id ? 
                { ...item, qty: item.qty + (product.qty || 1) } 
                    : item
            );
            }
            else{
            return [...prevCart,product];
            }
        })
    }

    const updateQuantity = (id,newqty)=>{
        if (isAdmin) {
            return;
        }
        if(newqty===0){
            setCart((prevCart) => prevCart.filter((product) => product.id !== id));
        }
        else{
        setCart((prevCart)=>
        prevCart.map((product)=>
            product.id == id ? {...product,qty:newqty}:product
        ))
        }
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, addToCart, updateQuantity, clearCart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}