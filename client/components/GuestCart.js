import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, removeFromCart} from '../store'
import {Button, Card, Image, Icon, List, Header} from 'semantic-ui-react'
import GuestCartItems from './GuestCartItems'
import {SSL_OP_SSLEAY_080_CLIENT_DH_BUG} from 'constants'




class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = sessionStorage
   
  }

  componentWillMount(){
    console.log('hi')
  }

  render() {
    console.log('SSTORAGE', sessionStorage)
    
    //define products
    const products = this.props.products

    //Get keys from session storage, to find products needed
    let productsToRenderKeys = Object.keys(sessionStorage)
    //Check to see what products are included in local storage
    let productsToRender = [];
    // console.log('ALL PRODUCTS', products)
    // console.log()
    for (let i=0; i<products.length; i++){
      if(productsToRenderKeys.includes(products[i].id.toString())){
        productsToRender.push(products[i])
      }
    }

    console.log('PRODUCTS RENDER',productsToRender)

    let value = 0
    productsToRender.forEach(product => (value += product.price*Number(this.state[product.id])))
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
                    {product.price * Number(this.state[product.id])}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        </div>
        <div className="itemsInCart">
        <Card.Group>
          {productsToRender.map(product => (
            <Card key={product.id}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src={product.imageUrl}
                />
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>${product.price}</Card.Meta>
                <Card.Description>{product.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="cart" />
                  {this.state[product.id]} in cart
                </p>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                        let quantity = Number(sessionStorage.getItem([product.id]))+1
                        
                        console.log('QUANT', quantity)
                        sessionStorage.setItem([product.id], quantity)
                        this.setState({[product.id]: quantity})
                    }
                       
                    }
                  >
                    +
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() =>
                        {
                        let quantity = Number(sessionStorage.getItem([product.id]))-1
                        
                        console.log('QUANT', quantity)
                        sessionStorage.setItem([product.id], quantity)
                        this.setState({[product.id]: quantity})
                        }
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
    removeCartFromDb: (newProduct, newCart, productId, cartId) =>
      dispatch(removeFromCart(newProduct, newCart, productId, cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
