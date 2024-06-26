import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { setProductQuantity } from "./action"
import { formatPrice } from "@/lib/format"

export const metadata = {
    title: 'panier - distro'
}

export default async function CartPage() {
    const cart = await getCart()

    return (
        <div>
            <h1 className='mb-6 text-3xl font-bold'>Votre panier</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
            ))}
            {!cart?.items.length && <p>Votre panier est vide</p>}
            <div className='flex flex-col items-end sm:items-center'>
                <p className='mb-3 text-bold'>
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className='btn btn-secondary sm:w-[200px]'>Valider mon panier</button>
            </div>
        </div>
    )
}