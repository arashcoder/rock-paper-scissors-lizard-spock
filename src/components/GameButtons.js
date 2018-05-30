import React from 'react';
const GameButtons = (props) => {
    return (
        <div>
            <button  onClick={props.startGame}>Start Game</button>
            <button onClick={props.setAltConfig}>Add spock and lizard</button>
            <div className="float-right">
                {props.mode}
                <button onClick={props.changeMode}>Change Mode</button>
            </div>
        </div>
    );
}

export default GameButtons;
