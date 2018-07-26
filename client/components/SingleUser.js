// import React, {Component} from './react'
// import {me} from '../store'

// class SingleUser extends Component {
//   async componentDidMount() {
//     await this.props.me()
//   }
//   render() {
//     const user = this.props.user
//     return (
//       <div>
//         {
//           <h2>Account Info</h2>
//           <div>{user.name}</div>
//           <div>{user.email}</div>
//           <div>
//             <button type="submit" className="btn">
//               Edit
//             </button>
//           </div>

//         }
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   user: state.user
// })

// const mapDispatchToProps = dispatch => ({
//   me: () => dispatch(me())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
