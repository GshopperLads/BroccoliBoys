import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"

export const CardExampleCardProps = (props) => (
    <Card
        image={props.image}
        header={props.name}
        meta={`$${props.price}/head | (${props.quantity}) in stock.`}
        description={props.description}
        extra={(<div>
            <button class="btn btn-primary btn-lg raised" onClick={() => console.log("#########################ADD CART FUNCTIONALITY HERE#########################")}>Add to Cart</button>
            <Link to={`/products/${props.product.id}`}>
                <button class="btn btn-primary btn-lg raised" >See More</button>
            </Link>
            <Icon name='recycle' />
            Certified Organic
      </div>)}
    />
)





