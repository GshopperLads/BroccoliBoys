import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import {Shop} from '../store/store'

class CardExampleCardProps extends React.Component {


    render(){
        return (
            <Card
                image={this.props.image}
                header={this.props.name}
                meta={`$${this.props.price}/head | (${this.props.quantity}) in stock.`}
                description={this.props.description}
                extra={(<div>
                    <button class="btn btn-primary btn-lg raised" onClick={() => this.props.shop(this.props.product.id)}>Add to Cart</button>
                    <Link to={`/products/${this.props.product.id}`}>
                        <button class="btn btn-primary btn-lg raised" >See More</button>
                    </Link>
                    <Icon name='recycle' />
                    Certified Organic
                </div>)}
            />
        )
    }
}

const mapStateToprops = state => {
    return {
        products: state.products,
        cart: state.cart
    }
    
}

const mapDispatchToProps = () => {
    return {
        shop: (productId) => dispatch(Shop(productId))
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(CardExampleCardProps)



