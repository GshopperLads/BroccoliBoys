import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, fetchOrders, fetchProducts} from '../../store'
import {Label, Table, Icon, Menu, TableRow, Image} from 'semantic-ui-react'

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchOrders()
    this.props.fetchProducts()
  }

  render() {
    const users = this.props.users
    const orders = this.props.orders
    const products = this.props.products
    console.log('dashboard: ', orders)
    return (
      <div>
        <div>
          <div className="admin-user-section">
            <h2>All Customers</h2>
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
                {users.map(user => (
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
            <h2>Customers Order History</h2>
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
                {orders.map(order => (
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
          <div className="admin-user-section">
            <h2>All Product</h2>
            <Table celled colored inverted tablet stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Id</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Stock</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.map(product => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.id}</Table.Cell>
                    <Table.Cell>
                      <Image avatar src={product.imageUrl} />
                    </Table.Cell>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell>
                      {product.quantity}{' '}
                      <button className="amdin-order-btn">order</button>
                    </Table.Cell>
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
  orders: state.orders,
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchOrders: () => dispatch(fetchOrders()),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Dashboard)
