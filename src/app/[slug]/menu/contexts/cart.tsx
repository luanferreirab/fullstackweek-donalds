"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";


export interface CartProduct 
    extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    decreaseProductQuantity: (product: string) => void;
    increaseProductQuantity: (product: string) => void;
    removeProduct: (product: string) => void;
    
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    total: 0,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {},
    
})

export const CartProvider = ({children}: {children: ReactNode}) =>  {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)
    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }
    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(prevProducts => prevProducts.id === product.id)
        if(!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if(prevProducts.id === product.id) {
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity,
                    }
                }
                return prevProducts
            })
        })
    }
    const decreaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if(prevProduct.id != productId) {
                    return prevProduct;
                }
                if(prevProduct.quantity === 1 ) {
                    return prevProduct;
                }
                return {...prevProduct, quantity: prevProduct.quantity - 1}
            })
        })
    }
    const increaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if(prevProduct.id != productId) {
                    return prevProduct;
                }
                return {...prevProduct, quantity: prevProduct.quantity + 1}
            })
        })
    }
    const removeProduct = (productId: string) => {
        setProducts(prevProduts => prevProduts.filter(prevProdut => prevProdut.id != productId))
    }
    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProduct,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

