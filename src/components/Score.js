import React from 'react';

const Scores = (props) => {
  return (
    <div className="score">
      <div className="result">
        <div>
          <p>Wins</p>
          <div>{props.scores.player1}</div>
        </div>
        <div className="tie">
          <p>Ties</p>
          <div>{props.scores.tie}</div>  
        </div>
        <div>
          <p>Wins</p>
          <div>{props.scores.player2}</div>  
        </div>
      </div>
      <div className="rounds">
        <p>Round {props.scores.results.length + 1}</p>
        {renderScores(props.scores.results)}
      </div>
    </div>
  );
}

const renderScores = (results) => {
  return results.map((item, i) => {
    return (
      <div key={i} className="round">
        <div className={item.result === 'player1' ? 'winner' : ''}>{item.player1}</div>
        <div>Round {i + 1}</div>
        <div className={item.result === 'player2' ? 'winner': ''}>{item.player2}</div>
      </div>
    )
  });
}

export default Scores;
