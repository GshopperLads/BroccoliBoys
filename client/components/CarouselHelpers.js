import React from "react"
export const Arrow = ({ direction, clickFunction, glyph }) => (
    <div
        className={`slide-arrow ${direction}`}
        onClick={clickFunction}>
        {glyph}
    </div>
);

export const ImageSlide = (url) => {
    console.log("ImageSlide method entered")
    const imgUrl = url
    console.log(imgUrl)
    return (
        <container className="image-slide">
            <img className="image-slide" src={imgUrl.url} />
        </container >
    );
}

