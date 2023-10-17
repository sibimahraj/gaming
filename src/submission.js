import React, { useState } from 'react';
import "./submission.css";

const SubmissionComponent = ({ selectedTimes, selectedConsole }) => {
    const [name, setName] = useState('');
    const [numOfPlayers, setNumOfPlayers] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [startEndTime, setStartEndTime] = useState({ startTime: null, endTime: null });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedTimes.length > 0 && selectedConsole) {
            const submission = {
                name,
                numOfPlayers,
                mobileNumber,
                selectedTimes,
                selectedConsole,
            };

            setSubmissions([...submissions, submission]);
            setShowOverlay(true);
            setStartEndTime({ startTime: selectedTimes[0], endTime: selectedTimes[selectedTimes.length - 1] });

            setName('');
            setNumOfPlayers('');
            setMobileNumber('');
        }
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <div>
            <h2>Submission Component</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Number of Players:</label>
                    <input type="number" value={numOfPlayers} onChange={(e) => setNumOfPlayers(e.target.value)} />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <h3>Submissions:</h3>
            <ul>
                {submissions.map((submission, index) => (
                    <li key={index}>
                        <p>Name: {submission.name}</p>
                        <p>Number of Players: {submission.numOfPlayers}</p>
                        <p>Mobile Number: {submission.mobileNumber}</p>
                        <p>Selected Times: {submission.selectedTimes.join(', ')}</p>
                        <p>Selected Console: {submission.selectedConsole}</p>
                    </li>
                ))}
            </ul>

            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h3>Submitted Data</h3>
                        <p>Name: {name}</p>
                        <p>Number of Players: {numOfPlayers}</p>
                        <p>Mobile Number: {mobileNumber}</p>
                        <p>Selected Times: {selectedTimes.join(', ')}</p>
                        <p>Selected Console: {selectedConsole}</p>
                        <p>Start Time: {startEndTime.startTime}</p>
                        <p>End Time: {startEndTime.endTime}</p>
                        <button onClick={closeOverlay}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmissionComponent;
