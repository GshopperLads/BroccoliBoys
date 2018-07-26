import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const extra = (
    <div>
        <button class="btn btn-primary btn-lg raised" onClick={() => console.log("#########################ADD CART FUNCTIONALITY HERE#########################")}>Add to Cart</button>
        <Icon name='recycle' />
        Certified Organic
  </div>
)

export const CardExampleCardProps = (props) => (
    <Card
        image={props.image}
        header={props.name}
        meta={`$${props.price}/head | (${props.quantity}) in stock.`}
        description={props.description}
        extra={extra}
    />
)



// Product.create({ name: "Broccoli", imageUrl: "broccoli.png", price: 9.0, description: "yummy yummy broccoli!", quantity: 1 })


