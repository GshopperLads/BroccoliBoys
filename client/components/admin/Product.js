import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, fetchOrders, fetchProducts} from '../../store'
import {Label, Table, Icon, Menu, TableRow, Image} from 'semantic-ui-react'

class AdminProduct extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchOrders()
    this.props.fetchProducts()
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
    const products = this.props.products
    return (
      <div>
        <div>
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
                    <Table.Cell>{product.quantity}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="admin-order-section">
            <h2>Least Selling Product</h2>
            <Table celled colored inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Stock</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.sort(this.dynamicSort('quantity')).map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>{order.product.name}</Table.Cell>
                    <Table.Cell>{order.product.quantity}</Table.Cell>
                    <Table.Cell>
                      ${order.product.price * order.quantity}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="admin-order-section">
            <h2>Best Selling Product</h2>
            <Table celled colored inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Stock</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.sort(this.dynamicSort('productId')).map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>{order.product.name}</Table.Cell>
                    <Table.Cell>{order.product.quantity}</Table.Cell>
                    <Table.Cell>
                      ${order.product.price * order.quantity}
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

export default connect(mapState, mapDispatch)(AdminProduct)
