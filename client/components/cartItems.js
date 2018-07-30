import React from "react"
import { Card, Icon, Button, Image } from 'semantic-ui-react'


const cartItems = (props) => {
    const products = [...props.products]
    return (
        <div className="itemsInCart">
        <Card.Group>
            {products.map(product =>
            <Card key={product.id}>
                <Card.Content>
                    <Image floated='right' size='mini' src={product.imageUrl} />
                    <Card.Header>{product.name}</Card.Header>
                    <Card.Meta>${product.price}</Card.Meta>
                    <Card.Description>
                        {product.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p>
                        <Icon name='cart' />
                        20 in cart
                </p>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            +
                    </Button>
                        <Button basic color='red'>
                            -
                    </Button>
                    </div>
                </Card.Content>
            </Card>
            )}
        </Card.Group>
    </div>
    )
}

export default cartItems