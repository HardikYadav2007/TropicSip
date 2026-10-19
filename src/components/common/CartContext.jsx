import { createContext,useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [cart,setCart] = useState([])

    const addToCart = (product)=>{
        setCart((prevCart)=>{

            const existingItem = prevCart.find((item)=>item.id===product.id)
            if(existingItem){
                return prevCart.map((item) =>{
                    if(item.id === product.id){
                        const proposedQty = item.qty + (product.qty || 1)
                        const cappedQty = proposedQty > item.stockCartons? item.stockCartons : proposedQty

                        return {...item,qty:cappedQty}
                    }
                    return item;
                }
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
        prevCart.map((product)=>{
           if(product.id == id){
                const cappedQty = newqty > product.stockCartons ? product.stockCartons : newqty<product.minOrderQty? product.minOrderQty:newqty;
                return { ...product, qty: cappedQty }
           }
           return product;
        }))
        }
    }

    return (
        <CartContext.Provider value={{cart,addToCart,updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}