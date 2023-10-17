import React, { useState } from 'react';
import "./timing.css"
import "./submission.css"
import SubmissionComponent from './submission';

const GamingBooking = () => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedConsole, setSelectedConsole] = useState(null);
    const [showTimeSlotSelection, setShowTimeSlotSelection] = useState(true);
    const [showConsoleSelection, setShowConsoleSelection] = useState(false);

    const gamingConsoles = [
        {
            "consolename": "ps5-1",
            "availabletimeslot": generateTimeSlots("9:00 AM", "11:30 AM", 30),
        },
        {
            "consolename": "ps5-2",
            "availabletimeslot": generateTimeSlots("9:00 AM", "11:30 AM", 30),
        },
        {
            "consolename": "xbox-1",
            "availabletimeslot": generateTimeSlots("9:00 AM", "11:30 AM", 30),
        },
        {
            "consolename": "xbox-2",
            "availabletimeslot": generateTimeSlots("9:00 AM", "11:30 AM", 30),
        }];

    function generateTimeSlots(startTime, endTime, interval) {
        const timeSlots = [];
        let currentTime = new Date(`01/01/2023 ${startTime}`);
        const end = new Date(`01/01/2023 ${endTime}`);

        while (currentTime <= end) {
            const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            timeSlots.push(time);
            currentTime.setMinutes(currentTime.getMinutes() + interval);
        }

        return timeSlots;
    }

    const handleTimeChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedTimes(selected);
    };

    const handleNextButtonClick = () => {
        if (selectedTimes.length > 0) {
            setShowTimeSlotSelection(false);
            setShowConsoleSelection(true);
        }
    };

    return (
        <>
            <div>
                {showTimeSlotSelection && (
                    <div>
                        <h2>Select Time Slots</h2>
                        <div>
                            <label>Select Time Slots:</label>
                            <select value={selectedTimes} onChange={handleTimeChange} multiple>
                                {gamingConsoles[0].availabletimeslot.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedTimes.length > 0 && <p>You've selected: {selectedTimes.join(', ')}</p>}
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                )}
                {showConsoleSelection && (
                    <div>
                        <h2>Select a Console</h2>
                        <div className="console-selection">
                            {gamingConsoles.map((console, index) => (
                                <div key={index} className="console" onClick={() => setSelectedConsole(console.consolename)}>
                                    {console.consolename}
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                )}
                {showConsoleSelection && <SubmissionComponent selectedTimes={selectedTimes} selectedConsole={selectedConsole} />}

            </div>
        </>
    );
};

export default GamingBooking;
