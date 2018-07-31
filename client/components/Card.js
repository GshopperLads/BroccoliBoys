import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Shop, fetchCart } from '../store'
import { connect } from 'react-redux'

class CardExampleCardProps extends React.Component {

  render() {
    return (
      <React.Fragment>
      {this.props.isLoggedIn ? (
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
                onClick={async() =>{
                  await this.props.Shop(this.props.product.id, this.props.userId)
                  await this.props.fetchCartFromDb(this.props.userId)
                }
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
      ) : (
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
                  sessionStorage.setItem([this.props.product.id], 1)

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

      )}
      </React.Fragment>
    )
  }
}

const mapStateToprops = state => {
  return {
    products: state.products,
    userId: state.user.id,
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    carts: state.carts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Shop: (productId, userId) => dispatch(Shop(productId, userId)),
    fetchCartFromDb: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(
  CardExampleCardProps
)
