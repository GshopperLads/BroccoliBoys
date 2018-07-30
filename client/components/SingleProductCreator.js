import React from "react"
import { Card } from 'semantic-ui-react'
import CardExampleCardProps from "./Card"

const SingleProductCreator = (props) => {
    const products = [...props.products]
    return (
        <Card.Group itemsPerRow={4}>
            {products.map(product =>
                <CardExampleCardProps key={product.id} name={product.name} image={product.imageUrl} price={product.price} quantity={product.quantity} description={product.description} product={product} />)}
        </Card.Group>
    )
}

export default SingleProductCreator
