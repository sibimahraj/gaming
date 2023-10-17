import "./homepage.css";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate()
    const BookNow = () => {
        navigate(`/booking`)
    }
    const time = () => {
        navigate(`/timing`)
    }
    return (

        <>
            <div>
                <div className="maindiv">
                    <div className="navheader">
                        <div className="headerlogo">
                            <span className="headerspan">
                                <img src="https://logowik.com/content/uploads/images/gamepad9349.jpg" />
                            </span>
                        </div>
                        <div className>
                            <button className="booknow" onClick={BookNow}>BOOKNOW</button>
                            <button className="booknow" onClick={time}>BOOKNOW</button>
                        </div>
                    </div>
                </div>
                <div className="firstcontent">
                    <div className="subcon1">
                        <div className="subcon2">
                            <div className="subcon3">
                                <div className="subcon4">
                                    <div className="subcon5">
                                        <div className="subcon6">
                                            <h2 className="subh2 SH2">dknfdknks</h2>
                                            <h2 className="subh2 SH3 ">dlalmadlm</h2>
                                            <p className="para">dvmakdvadvk kdknsasvknadknvkdvknvndvas
                                                ddkvnnavdknkdvndanadvndkkndv nannk
                                                dkvnkadvnkvdnknvdnkdadndavvdvdnankdavnkdkn</p>
                                        </div>
                                        <div className="subcon5">
                                            <div className="subimg">
                                                <img src="https://html.design/demo/gamepad/images/img-1.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Homepage