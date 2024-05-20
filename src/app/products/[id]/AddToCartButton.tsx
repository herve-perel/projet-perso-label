'use client'

import { useState, useTransition } from "react"

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)

    return (
        <div className='flex items-center gap-2'>
            <button className='btn btn-secondary'
                onClick={() => {
                    setSuccess(false)
                    startTransition(async () => {
                        await incrementProductQuantity(productId)
                        setSuccess(true)
                    })
                }}>
                Ajouter au panier
            </button>
            {isPending && <span className='loading loading-spinner loading-md' />}
            {!isPending && success && <span className='text-success'>Produit ajouté au panier</span>}
        </div>
    )
}