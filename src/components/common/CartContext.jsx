import { createContext,useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [cart,setCart] = useState([])

    const addToCart = (product)=>{
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

    return (
        <CartContext.Provider value={{cart,addToCart,updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}