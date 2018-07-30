import React from 'react'
import { connect } from 'react-redux'
import {fetchCart, removeFromCart} from '../store/store'
import {Button, Card, Image, Icon, List, Header } from 'semantic-ui-react'
import Cartitems from './cartItems'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productsToRender: []
        }
    }

    componentWillMount(){
        console.log(this.props)
        let productsToRenderKeys = Object.keys(this.props.cart.cartProducts)
        console.log('RENDER KEYS', productsToRenderKeys)
        let productsToRender = this.props.products.filter(product => productsToRenderKeys.includes(product.id.toString()))
        this.setState({productsToRender:productsToRender})
    }

    render(){
       let user = this.props.user
        let value = 0;
        this.state.productsToRender.forEach(product => value+= product.price)
        console.log('VAL', value)
        return (
            <div className="cartContainer" >
            { user && 
                <Cartitems products={this.state.productsToRender} />
            }
                <Header as='h2' >
                    Your cart is empty!
                </Header> 
                <div>
                    <Header as='h2' icon>
                        <Icon name='cart' />
                        Cart
                    </Header>
                <List celled>
                    {this.state.productsToRender.map(product => 
                        <List.Item key={product.id}>
                        <Image avatar src={product.imageUrl} />
                        <List.Content>
                            <List.Header>{product.name}</List.Header>
                            {product.price}
                        </List.Content>
                    </List.Item>
                    )}
                        
                    </List>
                    <Header as='h2'>
                        <Icon name='dollar sign' />
                        <Header.Content>{value}.00 </Header.Content>
                    </Header>
                </div>

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
        fetchCartFromDb: (userId) => dispatch(fetchCart(userId)),
        removeCartFromDb: (newProduct, newCart, productId, cartId) => dispatch(removeFromCart(newProduct, newCart, productId, cartId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
