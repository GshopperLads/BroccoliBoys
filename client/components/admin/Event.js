import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, fetchOrders} from '../../store'
import {Label, Table, Icon, Menu, TableRow} from 'semantic-ui-react'

class AdminEvent extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchOrders()
  }

  render() {
    const users = this.props.users
    const orders = this.props.orders
    return (
      <div>
        <div>
          <div className="admin-event-section">
            <h2 className="admin-title">Event Management</h2>
            <div>
            <h3>Send Emails to Customers</h3>

            <input type="submit" value="Send To All Customers"  className="admin-event-btn" />
            <input type="submit" value="Send To Best Customers"  className="admin-event-btn" />
            <input type="submit" value="Send Promotion Notification"  className="admin-event-btn" />
            </div>
            <div>
            <h3>Special Event</h3>
            <input type="submit" value="Discount Least Selling Products"  className="admin-event-btn" />
            <input type="submit" value="On Sale" className="admin-event-btn" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users,
  orders: state.orders
})

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(AdminEvent)
