import React from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Shop} from '../store'
import {connect} from 'react-redux'

class CardExampleCardProps extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Card
          image={this.props.image}
          header={this.props.name}
          meta={`$${this.props.price}/head | (${
            this.props.quantity
          }) in stock.`}
          description={this.props.description}
          extra={
            <div>
              <div
                className="ui vertical animated button"
                tabIndex="0"
                onClick={() =>
                  this.props.Shop(this.props.product.id, this.props.userId)
                }
              >
                <div className="hidden content">Add</div>
                <div className="visible content">
                  <i className="shop icon" />
                </div>
              </div>
              {!this.props.isSingle &&
                <Link to={`/products/${this.props.product.id}`}>
                  <button className="ui button">See More</button>
                </Link>
              }
              <Icon name="recycle" />
              Certified Organic
            </div>
          }
        />
      </div>
    )
  } else {
    return (
      <div>
      <Card
     image={this.props.image}
     header={this.props.name}
     meta={`$${this.props.price}/head | (${
       this.props.quantity
     }) in stock.`}
     description={this.props.description}
     extra={
       <div>
         <div
           className="ui vertical animated button"
           tabIndex="0"
           onClick={() =>
             this.props.Shop(this.props.product.id, this.props.userId)
           }
         >
           <div className="hidden content">Add</div>
           <div className="visible content">
             <i className="shop icon" />
           </div>
         </div>
         <Icon name="recycle" />
         Certified Organic
       </div>
     }
    />
    </div>
     )
  }
 }
}

const mapStateToprops = state => {
  return {
    products: state.products,
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Shop: (productId, userId) => dispatch(Shop(productId, userId))
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(
  CardExampleCardProps
)
