import React from 'react';
const HumanPlayer = (props) => {
  return (
    <div className="player">
      <div className="header">
          human
      </div>
      <div className="board">
          {props.gameStarted ? btns(props) : (
          <div className="choice">
            <h1>{props.current}</h1>
          </div>
          )
        }
      </div>
    </div>
  );
}

const btns = (props) => {
  return (
    <div className="buttons">
      {props.items.map((item, i) => (<a key={i} onClick={() => props.selectChoice(item)}>{item}</a>))}
    </div>
  );
}

export default HumanPlayer;
