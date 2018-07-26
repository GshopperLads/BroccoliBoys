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
            <div className="ui vertical animated button" tabIndex="0">
                <div className="hidden content">Add</div>
                <div className="visible content">
                    <i className="shop icon"></i>
                </div>
            </div>
            <Link to={`/products/${props.product.id}`}>
                <button className="ui button">See More</button>
            </Link>
            <Icon name='recycle' />
            Certified Organic
      </div>)}
    />
)





