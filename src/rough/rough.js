import axios from "axios";
import "./slots.css"
import { useState } from "react";
import { useEffect } from "react";
const Slots = () => {

    const [slotArray, setSlotArray] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/gaming-center')
            .then(response => {
                setSlotArray(response.data);
            })
            .catch(err => console.log(err));
    }, []);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const toggleSlotSelection = (index) => {
        // Check if the slot is already selected
        if (selectedSlots.includes(index)) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter((slot) => slot !== index));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, index]);
        }
    };

    return (
        <>
            {
                slotArray.map((slots, index) => (
                    <div className="main-slot-div">
                        <div className="slots-con">
                            <div onClick={() => toggleSlotSelection(index)} className={"slot-con-div"${selectedSlots.includes(index) ? "selected-time-slot" : ""}}>{slots.console1} <div className="slot-span"><input className="slots-input" type="number" ></input>
                                <p className="slots-p"></p></div>   </div>
                        <div onClick={() => toggleSlotSelection(index)} class="slot-con-div">{slots.console2} <div className="slot-span2"><input className="slots-input" type="number" ></input>
                            <p className="slots-p"></p></div>   </div>
                        <div onClick={() => toggleSlotSelection(index)} class="slot-con-div">{slots.console3} <div className="slot-span3"><input className="slots-input" type="number" ></input>
                            <p className="slots-p"></p></div>   </div>
                        <div onClick={() => toggleSlotSelection(index)} class="slot-con-div">{slots.console4} <div className="slot-span4"><input className="slots-input" type="number" ></input>
                            <p className="slots-p"></p></div>   </div>
                        <div onClick={() => toggleSlotSelection(index)} class="slot-con-div">{slots.console5} <div className="slot-span5"><input className="slots-input" type="number" ></input>
                            <p className="slots-p"></p></div>   </div>

                    </div>
                    </div >
                )

                )
            }

        </>
    )
}
export default Slots



import axios from "axios";
import "./slots.css";
import { useState, useEffect } from "react";

const Slots = () => {
    const [slotArray, setSlotArray] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/gaming-center")
            .then((response) => {
                setSlotArray(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const toggleSlotSelection = (index) => {
        // Check if the slot is already selected
        if (selectedSlots.includes(index)) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter((slot) => slot !== index));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, index]);
        }
    };

    return (
        <>
            {slotArray.map((slots, index) => (
                <div key={index} className="main-slot-div">
                    <div className="slots-con">
                        <div
                            onClick={() => toggleSlotSelection(index)}
                            className={`slot-con-div ${selectedSlots.includes(index) ? "selected-slot-slot" : ""
                                }`}
                        >
                            {slots.console1}
                            <div className="slot-span">
                                <input className="slots-input" type="number" />
                                <p className="slots-p"></p>
                            </div>
                        </div>
                        <div
                            onClick={() => toggleSlotSelection(index)}
                            className={`slot-con-div ${selectedSlots.includes(index) ? "selected-slot-slot" : ""
                                }`}

                        >
                            {slots.console2}
                            <div className="slot-span2">
                                <input className="slots-input" type="number" />
                                <p className="slots-p"></p>
                            </div>
                        </div>
                        <div
                            onClick={() => toggleSlotSelection(index)}
                            className={`slot-con-div ${selectedSlots.includes(index) ? "selected-slot-slot" : ""
                                }`}

                        >
                            {slots.console3}
                            <div className="slot-span3">
                                <input className="slots-input" type="number" />
                                <p className="slots-p"></p>
                            </div>
                        </div>
                        <div
                            onClick={() => toggleSlotSelection(index)}
                            className={`slot-con-div ${selectedSlots.includes(index) ? "selected-slot-slot" : ""
                                }`}

                        >
                            {slots.console4}
                            <div className="slot-span4">
                                <input className="slots-input" type="number" />
                                <p className="slots-p"></p>
                            </div>
                        </div>
                        <div
                            onClick={() => toggleSlotSelection(index)}
                            className={`slot-con-div ${selectedSlots.includes(index) ? "selected-slot-slot" : ""
                                }`}

                        >
                            {slots.console5}
                            <div className="slot-span5">
                                <input className="slots-input" type="number" />
                                <p className="slots-p"></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Slots;






import { useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
const Submission = () => {
    const [name, setName] = useState("");
    const [noofmembers, setNoOfMembers] = useState("");
    const [mobileno, setMobileNo] = useState("");

    const [customerInfo, setCustomerInfo] = useState({
        id: uuidv4(),
        name: "",
        noofmembers: "",
        mobileno: ""
    })
    const customerInfo1 = (event) => {
        setCustomerInfo({ ...customerInfo, name: event.target.value })
    }
    const customerInfo2 = (event) => {
        setCustomerInfo({ ...customerInfo, noofmembers: event.target.value })
    }
    const customerInfo3 = (event) => {
        setCustomerInfo({ ...customerInfo, mobileno: event.target.value })
    }
    const postFunction = () => {
        axios.post("http://localhost:3001/customer", customerInfo)
            .then((response) => {
                console.log(response);
                // Clear the input fields after a successful submission
                setName("");
                setNoOfMembers("");
                setMobileNo("");
            })
            .catch((error) => console.log(error));

    }

    return (
        <>
            <div>  <div className="ip1">
                <input onChange={customerInfo1} className="inp" placeholder="name"></input>
            </div>
                <div className="ip1">
                    <input onChange={customerInfo2} className="inp" placeholder="no of person"></input>
                </div>
                <div className="ip1">
                    <input onChange={customerInfo3} className="inp" placeholder="mobile number"></input>
                </div></div>
            <div className="ip1">
                <input onClick={postFunction} className="inp2" type="submit" value="Submit"></input>
            </div>
        </>
    )
}
export default Submission



{
    showOverlay && <div className="overlay" onClick={() => setShowOverlay(false)}>
        {subAraay.map((e, i) => (<div className="box">
            <p>{e.name}</p><br></br>
            <p>{e.noofmembers}</p><br></br>
            <p>{e.mobileno}</p><br></br>

        </div>))}




        import {useState} from "react";
        import axios from "axios";
        import {v4 as uuidv4} from 'uuid';
        import {useEffect} from "react";
        import "./submission.css"

const Submission = () => {
    const [subAraay, setSubArray] = ([]);
        const [name, setName] = useState("");
        const [noofmembers, setNoOfMembers] = useState("");
        const [mobileno, setMobileNo] = useState("");
        const [showOverlay, setShowOverlay] = useState(false)

    const postFunction = () => {
        const customerInfo = {
            id: uuidv4(),
        name,
        noofmembers,
        mobileno
        };

        axios.post("http://localhost:3001/customer", customerInfo)
            .then((response) => {
            console.log(response);
        setName("");
        setNoOfMembers("");
        setMobileNo("");
            })
            .catch((error) => console.log(error));
        setShowOverlay(true)
    }
    useEffect(() => {
            axios.get('http://localhost:3001/customer')
                .then((response) => setSubArray(response.data))
                .catch((err) => console.log(err));
    }, [])



        return (
        <>
            <div>
                <div className="ip1">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="inp" placeholder="name" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setNoOfMembers(e.target.value)} value={noofmembers} className="inp" placeholder="no of person" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setMobileNo(e.target.value)} value={mobileno} className="inp" placeholder="mobile number" />
                </div>
            </div>
            <div className="ip1">
                <input onClick={postFunction} className="inp2" type="submit" value="Submit" />
            </div>

            {showOverlay && (
                <div className="overlay" onClick={() => setShowOverlay(false)}>
                    {
                        subAraay.map((e, i) => (
                            <div className="box" key={i}>
                                <p>{e.name}</p>
                                <br />
                                <p>{e.noofmembers}</p>
                                <br />
                                <p>{e.mobileno}</p>
                                <br />

                            </div>
                        ))}
                </div>
            )}

        </>
        )
}

        export default Submission;




        import {useState} from "react";
        import axios from "axios";
        import {v4 as uuidv4} from 'uuid';
        import {useEffect} from "react";
        import "./submission.css"

        const Submission = ({selectedSlots, selectedConsole, selectedConsole2, selectedConsole3, selectedConsole4, selectedConsole5}) => {
    const [subArray, setSubArray] = useState([]);
        const [name, setName] = useState("");
        const [noOfMembers, setNoOfMembers] = useState("");
        const [mobileNo, setMobileNo] = useState("");
        const [showOverlay, setShowOverlay] = useState(false);

    const fetchSubmissions = () => {
            axios.get('http://localhost:3001/customer')
                .then((response) => setSubArray(response.data))
                .catch((err) => console.log(err));
    };

    useEffect(() => {
            fetchSubmissions();
    }, []);

    const postFunction = () => {
        const customerInfo = {
            id: uuidv4(),
        name,
        noofmembers: noOfMembers,
        mobileno: mobileNo,
        timing: selectedSlots,
        consoleSlots: {
            console1: selectedConsole,
        console2: selectedConsole2,
        console3: selectedConsole3,
        console4: selectedConsole4,
        console5: selectedConsole5,
            }
        };

        axios.post("http://localhost:3001/customer", customerInfo)
            .then((response) => {
            console.log(response);

        fetchSubmissions();
        setName("");
        setNoOfMembers("");
        setMobileNo("");
            })
            .catch((error) => console.log(error));
        setShowOverlay(true);
    }

        return (
        <>
            <div>
                <div className="ip1">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="inp" placeholder="name" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setNoOfMembers(e.target.value)} value={noOfMembers} className="inp" placeholder="no of person" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} className="inp" placeholder="mobile number" />
                </div>
            </div>
            <div className="ip1">
                <input onClick={postFunction} className="inp2" type="submit" value="Submit" />
            </div>

            {showOverlay && (
                <div className="overlay" onClick={() => setShowOverlay(false)}>
                    {
                        subArray.map((e, i) => (
                            <div className="box" key={e.id}>
                                <p>Name: {e.name}</p>
                                <p>No of Members: {e.noofmembers}</p>
                                <p>Mobile No: {e.mobileno}</p>
                                <p>Timing: {e.timing}</p>


                            </div>
                        ))}
                </div>
            )}
        </>
        )
}

        export default Submission;





        timing
        import axios from "axios";
        import Slots from "./slots";
        import "./timing.css"
        import Submission from "./submission";
        import {useState} from "react";
        import {useEffect} from "react";
const Timing = () => {
    const [slots, showSlots] = useState(false)
    const showSlotsCom = () => {
            showSlots(true);
    }
        const [timing, setTiming] = useState([]);
        const [selectedSlots, setSelectedSlots] = useState([]);
    useEffect(() => {
            axios.get('http://localhost:3000/gaming-center')
                .then(response => {
                    setTiming(response.data);
                })
                .catch(err => console.log(err));
    }, []);
    const toggleSlotSelection = (index) => {
        // Check if the slot is already selected
        if (selectedSlots.includes(index)) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter((slot) => slot !== index));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, index]);
        }
    };
        return (


        <>
            {!slots && <div><div className="time-slot-container">
                {timing.map((e, i) => (
                    <div className="some" key={i}>
                        {e.timing.map((time, index) => (
                            <div
                                key={index}
                                className={`time-slot ${selectedSlots.includes(index) ? "selected-time-slot" : ""
                                    }`}
                                onClick={() => toggleSlotSelection(index)}
                            >
                                <span>{time.tm}</span>
                            </div>
                        ))}
                    </div>
                ))}</div>

                <div></div>

                <div>
                    <button onClick={showSlotsCom}>confirm slots</button>
                </div> </div>}
            {slots && <Slots />}
            {slots && <Submission selectedSlots={selectedSlots} />}

        </>



        )
}
        export default Timing






        import axios from "axios";
        import "./slots.css";
        import {useState, useEffect} from "react";
        import Submission from "./submission";

const Slots = () => {
    const [slotArray, setSlotArray] = useState([]);
        const [selectedConsoles, setSelectedConsoles] = useState([]);
        const [confirmedSlots, setConfirmedSlots] = useState(false);

    useEffect(() => {
            axios.get('http://localhost:3000/gaming-center')
                .then(response => {
                    setSelectedConsoles(response.data);
                })
                .catch(err => console.log(err));
    }, []);
    const toggleSlotSelection = (selectedConsoless) => {
        const index = selectedSlots.indexOf(selectedConsoless);

        if (index !== -1) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter(time => time !== selectedConsoless));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, selectedConsoless]);
        }
    };













        const [submit, showSubmit] = useState(false)
    const showSubmitCom = () => {



        return (
        <>
            {!slots && (
                <div>
                    <div className="time-slot-container">
                        {selectedConsoles.map((e, i) => (
                            <div className="some" key={i}>
                                {e.consoles.map((console, index) => (
                                    <div
                                        key={index}
                                        className={`time-slot ${selectedSlots.includes(console.console) ? "selected-time-slot" : ""}`}
                                        onClick={() => toggleSlotSelection(console.console)}
                                    >
                                        <span>{console.console}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div>
                        <button onClick={showSlotsCom}>confirm slots</button>
                    </div>
                </div>
            )}
            {confirmedSlots && <Submission


            />}
        </>
        );
    };

        export default Slots;





        import axios from "axios";
        import {useState, useEffect} from "react";
        import "./slots.css"
        import Submission from "./submission";

const Slots = () => {
    const [selectedConsoles, setSelectedConsoles] = useState([]);
        const [confirmedSlots, setConfirmedSlots] = useState(false);

    useEffect(() => {
            axios.get('http://localhost:3001/gaming-center')
                .then(response => {
                    setSelectedConsoles(response.data[0].consoles);
                    console.log(response.data[0].consoles)
                })
                .catch(err => console.log(err));

    }, []);


    const toggleSlotSelection = (selectedConsole) => {
        const index = selectedConsoles.indexOf(selectedConsole);

        if (index !== -1) {
            // If selected, remove it
            setSelectedConsoles(selectedConsoles.filter(console => console !== selectedConsole));
        } else {
            // If not selected, add it
            setSelectedConsoles([...selectedConsoles, selectedConsole]);
        }
    };

    const showSubmitCom = () => {
            // Handle the submission logic here

            // Set confirmedSlots to true to display the Submission component
            setConfirmedSlots(true);
    };

        return (
        <div>
            <div className="console-slot-container">
                {selectedConsoles.map((e, index) => (
                    <div
                        key={index}
                        className={`console-slot ${selectedConsoles.includes(console) ? "selected-console-slot" : ""}`}
                        onClick={() => toggleSlotSelection(console)}
                    >
                        <span>{e.console}</span>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={showSubmitCom}>Confirm Consoles</button>
            </div>
            {confirmedSlots && <Submission selectedConsoles={selectedConsoles} />}
        </div>
        );
};

        export default Slots;







        import axios from "axios";
        import {useState, useEffect} from "react";
        import "./slots.css"
        import Submission from "./submission";

const Slots = () => {
    const [selectedConsoles, setSelectedConsoles] = useState([]);
        const [selectedCons, setSelectedCons] = useState([]);
        const [confirmedSlots, setConfirmedSlots] = useState(false);

    useEffect(() => {
            axios.get('http://localhost:3001/gaming-center')
                .then(response => {
                    setSelectedConsoles(response.data[0].consoles);
                    console.log(response.data[0].consoles)
                })
                .catch(err => console.log(err));

    }, []);


    const toggleSlotSelection = (selectedConsole) => {
        const index = selectedCons.indexOf(selectedConsole);

        if (index !== -1) {
            // If selected, remove it
            setSelectedCons(selectedCons.filter(console => console !== selectedConsole));
        } else {
            // If not selected, add it
            setSelectedCons([...selectedCons, selectedConsole]);
        }
    };

    const showSubmitCom = () => {
            // Handle the submission logic here

            // Set confirmedSlots to true to display the Submission component
            setConfirmedSlots(true);
    };

        return (
        <div>
            <div className="slots-con">
                {selectedConsoles.map((e, index) => (
                    <div
                        key={index}
                        className={`slot-con-div ${selectedConsoles.includes(e.console) ? "selected-slot-slot" : ""}`}
                        onClick={() => toggleSlotSelection(e.console)}
                    >
                        <span>{e.console}</span>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={showSubmitCom}>Confirm Consoles</button>
            </div>
            {confirmedSlots && <Submission selectedConsoles={selectedCons} />}
        </div>
        );
};

        export default Slots;




        timing
        import axios from "axios";
        import Slots from "./slots";
        import "./timing.css"
        import Submission from "./submission";
        import {useState} from "react";
        import {useEffect} from "react";

const Timing = () => {
    const [slots, showSlots] = useState(false);
    const showSlotsCom = () => {
            showSlots(true);
    }

        const [timing, setTiming] = useState([]);
        const [selectedSlots, setSelectedSlots] = useState([]);

    useEffect(() => {
            axios.get('http://localhost:3001/gaming-center')
                .then(response => {
                    setTiming(response.data);
                })
                .catch(err => console.log(err));
        console.log(selectedSlots)
    }, []);

    const toggleSlotSelection = (selectedTime) => {
        const index = selectedSlots.indexOf(selectedTime);

        if (index !== -1) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter(time => time !== selectedTime));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, selectedTime]);
        }
    };


        return (
        <>
            {!slots && (
                <div>
                    <div className="time-slot-container">
                        {timing.map((e, i) => (
                            <div className="some" key={i}>
                                {e.timing.map((time, index) => (
                                    <div
                                        key={index}
                                        className={`time-slot ${selectedSlots.includes(time.tm) ? "selected-time-slot" : ""}`}
                                        onClick={() => toggleSlotSelection(time.tm)}
                                    >
                                        <span>{time.tm}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div>
                        <button onClick={showSlotsCom}>confirm slots</button>
                    </div>
                </div>
            )}
            {slots && <Slots />}
            {slots && <Submission selectedSlots={selectedSlots} />}
        </>
        )
}

        export default Timing;




        import {useState} from "react";
        import axios from "axios";
        import {v4 as uuidv4} from 'uuid';
        import {useEffect} from "react";
        import "./submission.css"

        const Submission = ({selectedSlots, selectedConsoles}) => {
    const [subArray, setSubArray] = useState([]);
        const [name, setName] = useState("");
        const [noOfMembers, setNoOfMembers] = useState("");
        const [mobileNo, setMobileNo] = useState("");
        const [showOverlay, setShowOverlay] = useState(false);

    const fetchSubmissions = () => {
            axios.get('http://localhost:3000/customer')
                .then((response) => setSubArray(response.data))
                .catch((err) => console.log(err));
    };

    useEffect(() => {
            console.log("selectedConsoles:", selectedConsoles);
        fetchSubmissions();
    }, []);

    const postFunction = () => {
        const customerInfo = {
            id: uuidv4(),
        name,
        noofmembers: noOfMembers,
        mobileno: mobileNo,
        timing: selectedSlots,
        console: selectedConsoles
        };

        axios.post("http://localhost:3000/customer", customerInfo)
            .then((response) => {
            console.log(response);
        fetchSubmissions();
        setName("");
        setNoOfMembers("");
        setMobileNo("");
            })
            .catch((error) => console.log(error));
        setShowOverlay(true);
    }

        return (
        <>
            <div>
                <div className="ip1">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="inp" placeholder="name" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setNoOfMembers(e.target.value)} value={noOfMembers} className="inp" placeholder="no of persons" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} className="inp" placeholder="mobile number" />
                </div>
            </div>
            <div className="ip1">
                <input onClick={postFunction} className="inp2" type="submit" value="Submit" />
            </div>
            {showOverlay && (
                <div className="overlay" onClick={() => setShowOverlay(false)}>
                    {subArray.map((e, i) => (
                        <div className="box" key={e.id}>
                            <p>Name: {e.name}</p>
                            <p>No of Members: {e.noofmembers}</p>
                            <p>Mobile No: {e.mobileno}</p>
                            <p>Timing: {Array.isArray(e.timing) ? e.timing.join(", ") : "No timing available"}</p>
                            <p>no of consoles: {Array.isArray(e.console) ? e.console.join(", ") : "No timing available"}</p>

                        </div>
                    ))}
                </div>
            )}
        </>
        )
}

        export default Submission;


        timing2
        import React, {useState, useEffect} from "react";
        import axios from "axios";
        import Slots from "./slots";
        import "./timing.css"
        import Submission from "./submission";


const Timing = () => {
    const [slots, showSlots] = useState(false);
    const showSlotsCom = () => {
            showSlots(true);
    }

        const [timing, setTiming] = useState([]);
        const [selectedSlots, setSelectedSlots] = useState([]);
        const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
            // Fetch timing slots from the JSON server
            axios.get('http://localhost:3001/gaming-center')
                .then(response => {
                    setTiming(response.data);
                })
                .catch(err => console.log(err));

        // Fetch available slots from your separate JSON server
        axios.get('http://localhost:3000/customer')
            .then(response => {
            setAvailableSlots(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const toggleSlotSelection = (selectedTime) => {
        const index = selectedSlots.indexOf(selectedTime);

        if (index !== -1) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter(time => time !== selectedTime));
        } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, selectedTime]);
        }
    };


        return (
        <>
            {!slots && (
                <div>
                    <div className="time-slot-container">
                        {timing.map((e, i) => (
                            <div className="some" key={i}>
                                {e.timing.map((time, index) => (
                                    <div
                                        key={index}
                                        className={`time-slot ${selectedSlots.includes(time.tm) ? "selected-time-slot" : ""}`}
                                        onClick={() => toggleSlotSelection(time.tm)}
                                    >
                                        <span>{time.tm}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div>
                        <button onClick={showSlotsCom}>confirm slots</button>
                    </div>
                </div>
            )}
            {slots && <Slots />}
            {slots && <Submission selectedSlots={selectedSlots} />}
        </>
        )
}

        export default Timing;

        submission
        import {useState} from "react";
        import axios from "axios";
        import {v4 as uuidv4} from 'uuid';
        import {useEffect} from "react";
        import "./submission.css";

        const Submission = ({selectedSlots, selectedConsoles}) => {
    const [subArray, setSubArray] = useState([]);
        const [name, setName] = useState("");
        const [noOfMembers, setNoOfMembers] = useState("");
        const [mobileNo, setMobileNo] = useState("");
        const [showOverlay, setShowOverlay] = useState(false);

    const fetchSubmissions = () => {
            axios.get('http://localhost:3000/customer')
                .then((response) => setSubArray(response.data))
                .catch((err) => console.log(err));
    };

    useEffect(() => {
            console.log("selectedConsoles:", selectedConsoles);
        fetchSubmissions();
    }, []);

    const postFunction = () => {
        const customerInfo = {
            id: uuidv4(),
        name,
        noofmembers: noOfMembers,
        mobileno: mobileNo,
        timing: selectedSlots,
        console: selectedConsoles
        };

        axios.post("http://localhost:3000/customer", customerInfo)
            .then((response) => {
            console.log(response);
        fetchSubmissions();
        setName("");
        setNoOfMembers("");
        setMobileNo("");
            })
            .catch((error) => console.log(error));
        setShowOverlay(true);
    }

        return (
        <>
            <div>
                <div className="ip1">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="inp" placeholder="name" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setNoOfMembers(e.target.value)} value={noOfMembers} className="inp" placeholder="no of persons" />
                </div>
                <div className="ip1">
                    <input onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} className="inp" placeholder="mobile number" />
                </div>
            </div>
            <div className="ip1">
                <input onClick={postFunction} className="inp2" type="submit" value="Submit" />
            </div>
            {showOverlay && (
                <div className="overlay" onClick={() => setShowOverlay(false)}>
                    {subArray.map((e, i) => (
                        <div className="box" key={e.id}>
                            <p>Name: {e.name}</p>
                            <p>No of Members: {e.noofmembers}</p>
                            <p>Mobile No: {e.mobileno}</p>
                            <p>Timing: {Array.isArray(e.timing) ? e.timing.join(", ") : "No timing available"}</p>
                            <p>no of consoles: {Array.isArray(e.console) ? e.console.join(", ") : "No timing available"}</p>

                        </div>
                    ))}
                </div>
            )}
        </>
        )
}

        export default Submission;





        const toggleSlotSelection = (selectedTime) => {
            const index = selectedSlots.indexOf(selectedTime);

        if (index !== -1) {
            // If selected, remove it
            setSelectedSlots(selectedSlots.filter((time) => time !== selectedTime));
            } else {
            // If not selected, add it
            setSelectedSlots([...selectedSlots, selectedTime]);
            }
        };

