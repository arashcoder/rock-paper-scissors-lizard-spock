import React from 'react';
import HumanPlayer from './HumanPlayer';
import ComputerPlayer from './ComputerPlayer';
import Score from './Score';

const Game = (props) => {
    return (
        <div>
            {props.humanPlayer ?
                <HumanPlayer gameStarted={props.gameStarted}
                    current={props.player1Choice}
                    items={props.items}
                    selectChoice={props.onHumanSelect} />
                : <ComputerPlayer items={props.items} current={props.player1Choice} />}
            <Score scores={props.scores} />
            <ComputerPlayer items={props.items} current={props.player2Choice} />
        </div>
    );
}


export default Game;
