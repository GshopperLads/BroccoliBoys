import React from "react"
import { Card } from 'semantic-ui-react'
import { CheckoutProductCard } from "./CheckoutProductCard"

const CheckoutProductCards = (props) => {
    const products = [...props.products]
    return (
        <Card.Group itemsPerRow={8} stackable={true}>
            {products.map(product =>
                <CheckoutProductCard key={product.id} name={product.name} image={product.imageUrl} price={product.price} quantity={product.quantity} description={product.description} product={product} />)}
        </Card.Group>
    )
}

export default CheckoutProductCards
