'use client'

import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
interface ShoppingCartProps {
    cart: ShoppingCart | null
}

export default function ShoppingCartButton({ cart }: ShoppingCartProps) {
    function closeDropdown() {
        const elem = document.activeElement as HTMLElement
        if (elem) {
            elem.blur()
        }
    }

    return (
        <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn-ghost btn-circle btn'>
                <div className='indicator'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="w-6 h-6">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                    <span className='badge badge-sm indicator-item text-secondary'>{cart?.size || 0}</span>
                </div>
            </label>
            <div tabIndex={0} className='card dropdown-content card-compact mt-3 w-52 bg-slate-500 shadow'>
                <div className='card-body'>
                    <span className='text-lg font-bold'>{cart?.size} Articles</span>
                    <span className='text-info'>Total: {formatPrice(cart?.subtotal || 0)}</span>
                    <div className='card-actions'>
                        <Link href='/cart' className='btn btn-secondary btn-block' onClick={closeDropdown}>
                            Voir le panier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}