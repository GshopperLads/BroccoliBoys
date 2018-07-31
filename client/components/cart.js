import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, removeFromCart} from '../store'
import {Button, Card, Image, Icon, List, Header} from 'semantic-ui-react'
import Cartitems from './cartItems'
import {SSL_OP_SSLEAY_080_CLIENT_DH_BUG} from 'constants'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productsToRender: []
    }
  }

  async componentWillMount() {
    await this.props.fetchCartFromDb()
    // let productsToRenderKeys = Object.keys(this.props.cart.cartProducts)
    // let productsToRender = this.props.products.filter(product =>
    //   productsToRenderKeys.includes(product.id.toString())
    // )
    // this.setState({productsToRender: productsToRender})
  }

  render() {
    const user = this.props.user
    let userId = user.id
    const cartToRender = this.props.cart.filter(el => el.userId === userId)
    const productsToRender = this.props.cart
      .filter(el => el.userId === userId)
      .map(userCart => userCart.product)
    let value = 0
    productsToRender.forEach(product => (value += product.price))
    console.log('productsToRender', productsToRender)
    console.log('VAL', value)
    return (
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
        {user && <Cartitems products={productsToRender} carts={cartToRender} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartFromDb: userId => dispatch(fetchCart(userId)),
    removeCartFromDb: (newProduct, newCart, productId, cartId) =>
      dispatch(removeFromCart(newProduct, newCart, productId, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
