import { useContext } from "react";

import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";

const CartSheet = () => {
    const { isOpen, toggleCart }  = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>teste</SheetTitle>
                    <SheetDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolorum consequuntur exercitationem deserunt non earum fugit tempora reiciendis eius vero quod animi quibusdam, aliquid nisi adipisci quaerat, libero perspiciatis? Laborum.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;