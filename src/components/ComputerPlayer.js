import React from 'react';
const ComputerPlayer = (props) => {
    return (
        <div className="player">
            <div className="header">
            computer
            </div>
            <div className="board">
                <div className="choice">
                    <h1>{props.current}</h1>
                </div>
            </div>
        </div>
    );
}

export default ComputerPlayer;
