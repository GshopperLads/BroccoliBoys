import React from "react"


const HomePage = () => {
    return (
        <React.Fragment>
            <script type="text/javascript">
                $(document).ready(function(){
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
export default HomePage
