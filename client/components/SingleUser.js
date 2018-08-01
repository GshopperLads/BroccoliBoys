import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me, fetchOrders} from '../store'

class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  async componentDidMount() {
    console.log('component Did Mount triggered')
    await this.props.me()
    this.setState({user: this.props.user})
    await this.props.fetchOrders()
  }

  render() {
    console.log('render method triggered')
    const user = this.state.user
    const userOrders = this.props.orders.filter(
      order => order.userId === user.id
    )
    console.log(userOrders)
    return (
      <div className="user-info">
        {
          <div className="user-info-text">
            <div className="user-info-title">
              <h1>Account Info</h1>
            </div>
            <hr />
            <div>
              <big>BroccoliBoys ID</big>
            </div>
            <div className="user-data-text">{user.email}</div>
            <div>
              <big>Your Name</big>
            </div>
            <div className="user-data-text">{user.name}</div>
            <div>
              <big>Shipping Address</big>
            </div>
            <div className="user-data-text">{user.address}</div>
            <div>
              <big>Order History</big>
            </div>
            <div className="user-data-text">
              {userOrders.map(order => (
                <div key={order.id}>
                  <div>{order.product.name} (quantity: {order.quantity}) - Total: ${order.product.price*order.quantity} ({order.createdAt.slice(0,10)})</div>

                </div>
              ))}
            </div>
            <Link to="/useredit">
              <div>
                <input type="submit" value="Edit" className="btn-edit" />
              </div>
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
