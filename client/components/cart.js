import React from 'react'
import { connect } from 'react-redux'
import {fetchCart, removeFromCart} from '../store/store'
import {Button, Card, Image } from 'semantic-ui-react'


class Cart extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        //console.log(this.props.products)
        return (
            <div>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>
                                Steve wants to add you to the group <strong>best friends</strong>
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
                </Card.Group>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCartFromDb: (userId) => dispatch(fetchCart()),
        removeCartFromDb: (newProduct, newCart, productId, cartId) => dispatch(removeFromCart(newProduct, newCart, productId, cartId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)