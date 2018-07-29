import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, removeFromCart } from '../store'
import { Button, Card, Image, Icon, List, Header } from 'semantic-ui-react'


class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (this.props.user) {
            this.props.fetchCartFromDb(user.id)
        }
    }

    render() {
        let user = this.props.user
        console.log(this.props)
        return (
            <div className="cartContainer" >
                {user &&
                    <div className="itemsInCart">
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
                }
                <div>
                    <Header as='h2' icon>
                        <Icon name='cart' />
                        Cart
                    </Header>
                    <List celled>
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                            <List.Content>
                                <List.Header>Snickerdoodle</List.Header>
                                An excellent companion
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                            <List.Content>
                                <List.Header>Poodle</List.Header>
                                A poodle, it's pretty basic
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                            <List.Content>
                                <List.Header>Paulo</List.Header>
                                He's also a dog
                            </List.Content>
                        </List.Item>
                    </List>
                    <Header as='h2'>
                        <Icon name='dollar sign' />
                        <Header.Content>Uptime Guarantee</Header.Content>
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
