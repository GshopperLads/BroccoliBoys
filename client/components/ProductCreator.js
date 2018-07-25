const ProductCreator = (props) => {
    const products = [...props.products]
    return (
        <ul>
            products.map(product => {
                <li key={product.id}>
                    {' '}
                    {product.name} {product.imageUrl} {product.price}{' '}
                    {product.quantity}{' '}
                </li>
            })
        </ul>

    )
}

export default ProductCreator