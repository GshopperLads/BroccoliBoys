import React from 'react'
import { connect } from 'react-redux'
import {fetchCart, removeFromCart} from '../store/store'
import {Button, Card, Image, Icon, List, Header } from 'semantic-ui-react'
import Cartitems from './cartItems'


class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        if(this.props.user !== {}){
            this.props.fetchCartFromDb(this.props.match.params.userId)

        }
    }

    render(){
       let user = this.props.user
        console.log(user)
        return (
            <div className="cartContainer" >
            { user && 
                <Cartitems products={this.props.products} />
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
                    {this.props.products.map(product => 
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
                        <Header.Content>$20</Header.Content>
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