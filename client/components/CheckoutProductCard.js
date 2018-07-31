import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const CheckoutProductCard = props => (
  <Card
    image={props.image}
    header={<Link to={`/products/${props.product.id}`}>{props.name}</Link>}
    meta={`$${props.price}/head | (${props.quantity}) in stock.`}
    description={props.description}
    extra={
      <div>
        <Icon name="recycle" />
        Certified Organic
      </div>
    }
  />
)
