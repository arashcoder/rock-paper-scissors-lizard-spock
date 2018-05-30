import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import GameButtons from './GameButtons';
import { HUMAN_VS_COMP, COMP_VS_COMP } from '../util/constants';
import { conf2 } from '../util/gameConfiguration';
import {
    gameStart,
    setPlayer1Choice,
    setPlayer2Choice,
    evaluateResult,
    loadAltConfiguration,
    setItems,
    setScores,
    changeMode
} from '../actions/actions';


class GameContainer extends Component {

    componentDidMount() {
        this.props.setScores(JSON.parse(localStorage.getItem(this.props.mode)));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mode !== this.props.mode) {
            this.props.setScores(JSON.parse(localStorage.getItem(nextProps.mode)));
        }
    }

    startGame = () => {
        if (this.props.mode === HUMAN_VS_COMP) {
            this.props.gameStart(true);
        }
        this.setRandomChoiceForComp();
        if (this.props.mode === COMP_VS_COMP) {
            setTimeout(() => {
                this.finishCompVsComp();
            }, 3000);
        }
    }

    setRandomChoiceForComp = () => {
        this.shuffleInterval = setInterval(() => {
            if (this.props.mode === COMP_VS_COMP) {
                this.props.setPlayer1Choice(this.randomComputerResult());
            }
            this.props.setPlayer2Choice(this.randomComputerResult());
        }, 500);
    }

    randomComputerResult = () => {
        return this.props.items[Math.floor(Math.random() * this.props.items.length)];
    }

    finishCompVsComp = () => {
        clearInterval(this.shuffleInterval);
        this.props.setPlayer2Choice(this.randomComputerResult());
        this.props.setPlayer1Choice(this.randomComputerResult());
        this.props.evaluateResult();
    }

    finishHumanVsComp = (humanChoice) => {
        clearInterval(this.shuffleInterval);
        const computerChoice = this.randomComputerResult();
        this.props.gameStart(false);
        this.props.setPlayer2Choice(computerChoice);
        this.props.setPlayer1Choice(humanChoice);
        this.props.evaluateResult();
    }

    setAltConfig = () => {
        this.props.loadAltConfiguration(conf2);
        this.props.setItems(Object.keys(conf2));
    }

    changeMode = () => {
        this.props.changeMode();
    }

    render() {
        return (
            <div className="wrapper">
                <GameButtons mode={this.props.mode}
                    startGame={this.startGame}
                    setAltConfig={this.setAltConfig}
                    changeMode={this.changeMode} />

                <div className="game">
                    <Game
                        humanPlayer={this.props.mode === HUMAN_VS_COMP}
                        gameStarted={this.props.gameStarted}
                        player1Choice={this.props.player1Choice}
                        player2Choice={this.props.player2Choice}
                        items={this.props.items}
                        onHumanSelect={this.finishHumanVsComp}
                        scores={this.props.scores} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        gameStarted: state.gameStarted,
        mode: state.mode,
        scores: state.scores,
        player1Choice: state.player1Choice,
        player2Choice: state.player2Choice
    }
}

const dispatchToProps =  {
    gameStart, setPlayer1Choice, setPlayer2Choice, loadAltConfiguration,
    setItems, evaluateResult, setScores, changeMode
}

export default connect(mapStateToProps, dispatchToProps)(GameContainer);