import React, {Component} from 'react'
import {Card, Icon, Button, Image, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {modifyQuantity} from '../store'

class cartItems extends Component {

    constructor(){
        super()
        this.state = sessionStorage //{1: 1, 2: 2}
    }
  componentDidUpdate() {

  }

  render() {
    const products = [...this.props.productsToRender]
    return (
    <div>
         <List celled>
              {products.map(product => (
                <List.Item key={product.id}>
                  <Image avatar src={product.imageUrl} />
                  <List.Content>
                    <List.Header>{product.name}</List.Header>
                    {product.price * Number(this.state[product.id])}
                  </List.Content>
                </List.Item>
              ))}
            </List>
      <div className="itemsInCart">
        <Card.Group>
          {products.map(product => (
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

const mapState = state => ({
  // carts: state.carts
})
const mapDispatch = dispatch => ({
  modifyQuantity: (type, cartId, currentQuanity) =>
    dispatch(modifyQuantity(type, cartId, currentQuanity))
})
export default connect(mapState, mapDispatch)(cartItems)
