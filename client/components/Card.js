import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const src = 'white-image.png'

export const CardExampleColored = () => (
    <Card.Group itemsPerRow={4}>
        <Card color='red' image={src} />
        <Card color='orange' image={src} />
        <Card color='yellow' image={src} />
        <Card color='olive' image={src} />
        <Card color='green' image={src} />
        <Card color='teal' image={src} />
        <Card color='blue' image={src} />
        <Card color='violet' image={src} />
        <Card color='purple' image={src} />
        <Card color='pink' image={src} />
        <Card color='brown' image={src} />
        <Card color='grey' image={src} />
    </Card.Group>
)

const extra = (
    <a>
        <Icon name='recycle' />
        Certified Organic
  </a>
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


