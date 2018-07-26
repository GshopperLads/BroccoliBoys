import React from "react"
import { Card } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import { CardExampleCardProps } from "./Card"



const ProductCreator = (props) => {
    const products = [...props.products]
    return (
        <Card.Group itemsPerRow={4}>
            {products.map(product =>
                <Link to={`/products/${product.id}`} key={product.id}><CardExampleCardProps name={product.name} image={product.imageUrl} price={product.price} quantity={product.quantity} description={product.description} /></Link>)}
        </Card.Group>
    )
}

export default ProductCreator