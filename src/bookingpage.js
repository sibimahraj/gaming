import "./bookingpage.css"

import { useState } from "react";
import Timing from "./timing";
const Bookingpage = () => {
    {/* const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected);
    };*/}
    const [timing, showTiming] = useState(false);
    const showTimingcom = () => {
        showTiming(true)
    }
    const [isSelected, setIsSelected] = useState(0);

    const toggleSelection = (cardNumber) => {
        if (isSelected === cardNumber) {

            setIsSelected(0);
        } else {

            setIsSelected(cardNumber);
        }
    };
    return (
        <>
            <div className="body">
                {!timing && <div>
                    <div className="location-container">
                        <div className={`location-card logo-card1 ${isSelected === 1 ? 'selected' : ''}`} onClick={() => toggleSelection(1)}>

                            <div className="location-info loc-name1" >
                                <b className="loc-b">solinganallur</b> <br></br>
                                <p>select location</p>

                            </div>
                        </div>

                        <div className={`location-card logo-card2 ${isSelected === 2 ? 'selected' : ''}`} onClick={() => toggleSelection(2)}>

                            <div className="location-info">
                                <b className="loc-b">duraipakam</b><br></br>
                                <p>select location</p>
                            </div>
                        </div>
                    </div>

                    <div className="date-container">
                        <p className="date-p">select date</p> <br></br>
                        <input className="date-input" type="date" id="datecon" name="date" />
                    </div>
                    <div className="nxt-div">
                        <div className="next-btn">
                            <p onClick={showTimingcom}>next</p>
                        </div>
                    </div>
                </div>}


                {timing && < Timing />}
            </div>
        </>
    )
}
export default Bookingpage;