import React from "react"
import { Link, Redirect } from "react-router-dom"


class HomePage extends React.Component {

    componentDidMount() {

        var el = document.getElementById('searchBar2');
        if (el) {
            el.addEventListener("keypress", function (evt) {
                if (evt.keyCode == 13) {
                    this.props.history.push("/products")
                }
                // const products = this.props.products
                // let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
                // this.setState({ products: vals })
            }.bind(this))
        }

        var el2 = document.getElementById('searchBar2');
        if (el2) {
            el2.addEventListener("keypress", function (evt) {
                if (evt.keyCode == 13) {
                    this.props.history.push("/products")
                }
                // const products = this.props.products
                // let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
                // this.setState({ products: vals })
            }.bind(this))
        }

    }

    componentWillUnmount() {
        var el = document.getElementById('searchBar2');
        if (el) {
            el.removeEventListener("keypress", function (evt) {
                if (evt.keyCode == 13) {
                    this.props.history.push("/products")
                }
                // const products = this.props.products
                // let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
                // this.setState({ products: vals })
            }.bind(this))
        }




        var el2 = document.getElementById('searchBar2');
        if (el2) {
            el2.removeEventListener("keypress", function (evt) {
                if (evt.keyCode == 13) {
                    this.props.history.push("/products")
                }
                // const products = this.props.products
                // let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
                // this.setState({ products: vals })
            }.bind(this))
        }
    }

    render() {
        return (
            <React.Fragment>
                <script type="text/javascript">
                    $(document).ready(function() {
                        window.setInterval(function () {
                            var next = ($('.select').index() + 1) % $('.circle').length;
                            var prev = $('.select').index();
                            $('.select').removeClass('select');
                            $('.circle').eq(next).addClass('select');
                            $('.slide').eq(next).addClass('open').css('left', '100%');
                            $('.slide').eq(prev).animate({ 'left': '-100%' }, 700);
                            $('.slide').eq(next).animate({ 'left': '0%' }, 700);
                        }, 7000)})
            </script>
                <div className="brand-name">Broccoli Boys - "Grown with the heart."</div>
                <div className="slidelist">
                    <div className="slide open" style={{ left: "-100%" }}><span className="image1"></span></div>
                    <div className="slide open" style={{ left: "-100%" }}><span className="image2"></span></div>
                    <div className="slide open" style={{ left: "-100%" }}><span className="image3"></span></div>
                    <div className="slide open" style={{ left: "-100%" }}><span className="image4"></span></div>
                    <div className="slide open" style={{ left: "0%" }}><span className="image5"></span></div>

                    <div className="bottomButton">
                        <ul>
                            <li className="circle"><i className="fa fa-circle-o"></i></li>
                            <li className="circle"><i className="fa fa-circle-o"></i></li>
                            <li className="circle"><i className="fa fa-circle-o"></i></li>
                            <li className="circle"><i className="fa fa-circle-o"></i></li>
                            <li className="circle select"><i className="fa fa-circle-o"></i></li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }


}
export default HomePage

