import React from 'react'
import {Card, Icon, Button, Image} from 'semantic-ui-react'

const cartItems = props => {
  const products = [...props.products]
  const carts = [...props.carts]
  return (
    <div className="itemsInCart">
      <Card.Group>
        {carts.map(cart => (
          <Card key={cart.product.id}>
            <Card.Content>
              <Image floated="right" size="mini" src={cart.product.imageUrl} />
              <Card.Header>{cart.product.name}</Card.Header>
              <Card.Meta>${cart.product.price}</Card.Meta>
              <Card.Description>{cart.product.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>
                <Icon name="cart" />
                  {cart.quantity} in cart
              </p>
              <div className="ui two buttons">
                <Button basic color="green" onClick>
                  +
                </Button>
                <Button basic color="red">
                  -
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  )
}

const mapState = state => ({

})
const mapDispatch = dispatch => ({

})

export default cartItems
