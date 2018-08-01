import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, fetchOrders} from '../../store'
import {Label, Table, Icon, Menu, TableRow} from 'semantic-ui-react'

class AdminCustomer extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchOrders()
  }
  dynamicSort(property) {
    var sortOrder = 1
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  render() {
    const users = this.props.users
    const orders = this.props.orders
    const totalPurchase = orders.map(order => ({
      total: order.quantity*order.product.price,
      user: order.userId
    }))

    // orders.sort(dynamicSort('price'))
    // r.reverse()

    console.log('dashboard: ', orders)
    return (
      <div>
        <div>
          <div className="admin-user-section">
            <h2>Best Customers</h2>
            <Table celled colored inverted tablet stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Customer Id</Table.HeaderCell>
                  <Table.HeaderCell>name</Table.HeaderCell>
                  <Table.HeaderCell>email</Table.HeaderCell>
                  <Table.HeaderCell>address</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.sort(this.dynamicSort('name')).map(user => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="admin-order-section">
            <h2>Best Customers Orders</h2>
            <Table celled colored inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>order data</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Customer ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.sort(this.dynamicSort('orders.product.price')).map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>{order.createdAt.slice(0, 10)}</Table.Cell>
                    <Table.Cell>
                      ${order.product.price * order.quantity}
                    </Table.Cell>
                    <Table.Cell>{order.product.name}</Table.Cell>
                    <Table.Cell>{order.quantity}</Table.Cell>
                    <Table.Cell>{order.userId}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
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

export default connect(mapState, mapDispatch)(AdminCustomer)
