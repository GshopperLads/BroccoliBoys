/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login} from './auth-form'
export {Signup} from './signup-form'
export {default as Cart} from './cart'
export {default as AllProducts} from './Allproducts'
export {default as SingleUser} from './SingleUser'
export {default as SingleProduct} from './SingleProduct'
export {default as Home} from './Home'
export {default as Payment} from './Payment'
export {default as NewReview} from './review-form'
export {default as UserEdit} from './user-edit'
export {default as Admin} from './Admin'
export {default as Dashboard} from './admin/Dashboard'
export {default as AdminProduct} from './admin/Product'
export {default as AdminCustomer} from './admin/Customer'
export {default as AdminEvent} from './admin/Event'
export {default as GuestCart} from './GuestCart'
export {default as GuestPayment} from './GuestPayment'

