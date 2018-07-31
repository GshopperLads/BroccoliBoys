import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart, removeFromCart, modifyQuantity } from '../store'
import { Button, Card, Image, Icon, List, Header } from 'semantic-ui-react'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'

export class CartCreator extends React.Component {
  constructor() {
    super()
    this.state = {
      carts: []
    }
    this.addClick = this.addClick.bind(this)
    this.minusClick = this.minusClick.bind(this)
  }

  async componentWillMount() {
    await this.props.fetchCartFromDb(this.props.user.id)
  }

  async addClick(cart) {
    console.log("CART", cart)
    await this.props.modifyQuantity('plus', cart.id, cart.quantity)
    const checkout = await this.props.fetchCartFromDb(this.props.user.id)
    console.log("THIS IS CHECKOUT", checkout)
    this.setState({
      carts: checkout
    })
  }

  async minusClick(cart) {
    const quant = await this.props.modifyQuantity('minus', cart.id, cart.quantity)
    const checkout = await this.props.fetchCartFromDb(this.props.user.id)
    const updated = checkout.find((el) => { return el.id === cart.id })
    if (updated.quantity <= 0) {
      await this.props.removeCartFromDb(cart.id)
    }
    this.setState({
      carts: checkout
    })
  }

  render() {
    const user = this.props.user
    let userId = user.id

    //find USER CART
    const cartToRender = this.props.carts.filter(el => el.userId === userId)

    //GET relevant products
    const productsToRender = cartToRender.map(userCart => userCart.product)
    let value = 0

    console.log("productsToRender", productsToRender)
    for (let i = 0; i < productsToRender.length; i++) {
      for (let j = 0; j < cartToRender.length; j++) {
        if (productsToRender[i].id === cartToRender[j].productId) {
          value += Number(productsToRender[i].price) * Number(cartToRender[j].quantity)
        }
      }
    }

    return (
      <div>
        <div>
          <div className="cartContainer">
            {productsToRender.length !== 0 || (
              <Header as="h2">Your cart is empty!</Header>
            )}
            <div>
              <Header as="h2" icon>
                <Icon name="cart" />
                Cart
            </Header>
              <Header as="h2">
                <Icon name="dollar sign" />
                <Header.Content>{value}.00 </Header.Content>
              </Header>
            </div>
            <div>
              <Link to="/payment">
                <input type="submit" value="Check Out" className="btn-payment" />
              </Link>
              <List celled>
                {productsToRender.map(product => (
                  <List.Item key={product.id}>
                    <Image avatar src={product.imageUrl} />
                    <List.Content>
                      <List.Header>{product.name}</List.Header>
                      {product.price}
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </div>
          </div>
        </div>
        <div className="itemsInCart">
          <Card.Group>
            {cartToRender.map(cart => (
              <Card key={cart.product.name}>
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
                      onClick={() => this.addClick(cart)}
                    >
                      +
                  </Button>
                    <Button
                      basic
                      color="red"
                      onClick={() => this.minusClick(cart)}
                    >
                      -
                  </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    carts: state.carts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartFromDb: userId => dispatch(fetchCart(userId)),
    removeCartFromDb: (cartid) =>
      dispatch(removeFromCart(cartid)),
    modifyQuantity: (type, cartId, currentQuanity) =>
      dispatch(modifyQuantity(type, cartId, currentQuanity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCreator)
