import React, { Component } from "react"
import { Arrow, ImageSlide } from "./CarouselHelpers"
import { Login } from "./auth-form"
const imgUrls = ["https://ttglibrary.files.wordpress.com/2014/07/brocolli-forest2.jpg", "http://conhecimentocientifico.r7.com/wp-content/uploads/2015/11/Nutrilite-Waterfall1.jpg", "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a725ce12952161.5626f652774f4.jpg"]

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            currentImageIndex: 0
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    previousSlide() {
        console.log("previous slide pressed")
        const lastIndex = 2;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
        console.log("old index:", this.state.currentImageIndex)
        this.setState({
            currentImageIndex: index
        });
        console.log("image index reset in previousSlide")
        console.log("new index:", this.state.currentImageIndex)
    }

    nextSlide() {
        const lastIndex = 2;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    render() {
        console.log(imgUrls)
        return (
            <div>
                <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" />
                <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
                <Login />
                <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
            </div>
        );
    }
}


export default Carousel

