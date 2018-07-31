import React, {Component} from 'react'
import {Card, Icon, Button, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {modifyQuantity} from '../store'

class cartItems extends Component {
  componentDidUpdate() {

  }

  render() {
    const carts = [...this.props.carts]
    console.log(carts)
    return (
      <div className="itemsInCart">
        <Card.Group>
          {carts.map(cart => (
            <Card key={cart.product.id}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src={cart.product.imageUrl}
                />
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
                  <Button
                    basic
                    color="green"
                    onClick={() =>
                      this.props.modifyQuantity('plus', cart.id, cart.quantity)
                    }
                  >
                    +
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() =>
                      this.props.modifyQuantity('minus', cart.id, cart.quantity)
                    }
                  >
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
}

const mapState = state => ({
  // carts: state.carts
})
const mapDispatch = dispatch => ({
  modifyQuantity: (type, cartId, currentQuanity) =>
    dispatch(modifyQuantity(type, cartId, currentQuanity))
})
export default connect(mapState, mapDispatch)(cartItems)
