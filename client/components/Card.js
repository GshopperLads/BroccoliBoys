import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import {Shop} from '../store'
import {connect} from 'react-redux'

class CardExampleCardProps extends React.Component {


    render(){
        return (
            <div>
                <Card
                    image={this.props.image}
                    header={this.props.name}
                    meta={`$${this.props.price}/head | (${this.props.quantity}) in stock.`}
                    description={this.props.description}
                    extra={(<div>
                        <div className="ui vertical animated button" tabIndex="0" onClick={() => this.props.shop(this.props.product.id, this.props.cart.id) }>
                            <div className="hidden content">Add</div>
                            <div className="visible content">
                                <i className="shop icon"></i>
                            </div>
                        </div>
                        <Link to={`/products/${this.props.product.id}`}>
                            <button className="ui button">See More</button>
                        </Link>
                        <Icon name='recycle' />
                        Certified Organic
                </div>)}
                />
            </div>
        )
    }
}

const mapStateToprops = state => {
    return {
        products: state.products,
        cart: state.cart
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        shop: (productId, cartId) => dispatch(Shop(productId, cartId))
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(CardExampleCardProps)



