import reducer from './reducer'
import { conf1, conf2 } from '../util/gameConfiguration';
import { HUMAN_VS_COMP, COMP_VS_COMP } from '../util/constants';
import {
    SET_ITEMS, START_GAME, CHANGE_MODE, PLAYER1_CHOICE, PLAYER2_CHOICE,
    EVAL_RESULT, LOAD_CONFIG, SET_SCORES
} from '../actions/actionTypes'

describe('testing started state of reducer', () => {
    it('When starting a game, start status is true', () => {
        const currentState = {};
        const action = { type: START_GAME, isStarted: true };
        expect(reducer(currentState, action).gameStarted).toEqual(true);
    });

    it('After a move was played, start status is false', () => {
        const currentState = {};
        const action = { type: START_GAME, isStarted: false };
        expect(reducer(currentState, action).gameStarted).toEqual(false);
    });
});

describe('testing the change in mode', () => {
    it('When changing the mode from human vs comp, mode is changed to comp vs comp', () => {
        const currentState = {mode:HUMAN_VS_COMP};
        const action = { type: CHANGE_MODE };
        expect(reducer(currentState, action).mode).toEqual(COMP_VS_COMP);
    });
});


describe('testing the usage of default and alternate configs', () => {
    it('When using default config, reducer items list contains 3 items', () => {
        const currentState = {};
        const action = { type: SET_ITEMS, items: Object.keys(conf1) };
        expect(reducer(currentState, action).items.length).toEqual(3);
    });

    it('When using default config, reducer items list contains rock, paper, and scissors', () => {
        const currentState = {};
        const action = { type: SET_ITEMS, items: Object.keys(conf1) };
        expect(reducer(currentState, action).items).toEqual(Object.keys(conf1));
    });

    it('When using alternate config, reducer items list contains 5 items', () => {
        const currentState = {};
        const action = { type: SET_ITEMS, items: Object.keys(conf2) };
        expect(reducer(currentState, action).items.length).toEqual(5);
    });

    it('When using alternate config, reducer items list contains rock, paper, scissors, spock, and lizard', () => {
        const currentState = {};
        const action = { type: SET_ITEMS, items: Object.keys(conf2) };
        expect(reducer(currentState, action).items).toEqual(Object.keys(conf2));
    });
});

describe('when player1 selects a move, that option is stored correctly', () => {
    it('When player1 selects rock, his choice is stored as rock', () => {
        const currentState = {};
        const action = { type: PLAYER1_CHOICE, choice: 'rock' };
        expect(reducer(currentState, action).player1Choice).toEqual('rock');
    });
    it('When player1 selects lizard, his choice is stored as lizard', () => {
        const currentState = {};
        const action = { type: PLAYER1_CHOICE, choice: 'lizard' };
        expect(reducer(currentState, action).player1Choice).toEqual('lizard');
    });
});

describe('when player2 selects a move, that option is stored correctly', () => {
    it('When player2 selects paper, his choice is stored as paper', () => {
        const currentState = {};
        const action = { type: PLAYER2_CHOICE, choice: 'paper' };
        expect(reducer(currentState, action).player2Choice).toEqual('paper');
    });
    it('When player2 selects spock, his choice is stored as spock', () => {
        const currentState = {};
        const action = { type: PLAYER2_CHOICE, choice: 'spock' };
        expect(reducer(currentState, action).player2Choice).toEqual('spock');
    });
});

describe('When loading configs, the correct config is loaded', () => {
    it('When selecting default config, simple config is set', () => {
        const currentState = {};
        const action = { type: LOAD_CONFIG, conf: conf1 };
        expect(reducer(currentState, action).conf).toEqual(conf1);
    });
    it('When selecting alternate config, config with lizard and spock is loaded', () => {
        const currentState = {};
        const action = { type: LOAD_CONFIG, conf: conf2 };
        expect(reducer(currentState, action).conf).toEqual(conf2);
    });
});

describe('When loading results from local storage, state of the app is correct', () => {
    const savedState = {
        results: [
            {
                player1: 'paper',
                player2: 'scissors',
                key: HUMAN_VS_COMP,
                result: 'player2'
            },
            {
                player1: 'paper',
                player2: 'rock',
                key: COMP_VS_COMP,
                result: 'player1'
            }
        ],
        player1: '3',
        player2: '5',
        tie: '1'
    };

    it('After loading from storage, number of results is correctly set', () => {
        const currentState = {};
        const action = { type: SET_SCORES, scores: savedState };
        expect(reducer(currentState, action).scores.results.length).toEqual(2);
    });

    it('After loading from storage, results are correctly set', () => {
        const currentState = {};
        const action = { type: SET_SCORES, scores: savedState };
        expect(reducer(currentState, action).scores.results[0].player2).toEqual('scissors');
        expect(reducer(currentState, action).scores.results[1].player2).toEqual('rock');
        expect(reducer(currentState, action).scores.results[0].result).toEqual('player2');
        expect(reducer(currentState, action).scores.results[1].key).toEqual(COMP_VS_COMP);
    });

    it('After loading from storage, player1 wins is correctly set', () => {
        const currentState = {};
        const action = { type: SET_SCORES, scores: savedState };
        expect(reducer(currentState, action).scores.player1).toEqual("3");
    });

    it('After loading from storage, player2 wins is correctly set', () => {
        const currentState = {};
        const action = { type: SET_SCORES, scores: savedState };
        expect(reducer(currentState, action).scores.player2).toEqual("5");
    });

    it('After loading from storage, tie is correctly set', () => {
        const currentState = {};
        const action = { type: SET_SCORES, scores: savedState };
        expect(reducer(currentState, action).scores.tie).toEqual("1");
    });
});

describe('After every round, the correct results are calculated', () => {
    const currentState = {
        mode: COMP_VS_COMP,
        player1Choice: 'rock',
        player2Choice: 'paper',
        scores: {
            results: [],
            player1: 0,
            player2: 0,
            tie: 0
        },
        conf: conf1
    }
    const expectedState = {
        mode: COMP_VS_COMP,
        player1Choice: 'rock',
        player2Choice: 'paper',
        scores: {
            results: [
                {
                    player1: 'rock',
                    player2: 'paper',
                    key: COMP_VS_COMP,
                    result: 'player2'
                }
            ],
            player1: 0,
            player2: 1,
            tie: 0
        },
        conf: conf1
    }
    it('When player2 wins, his wins are incremented by one', () => {
      
        const action = { type: EVAL_RESULT };
        expect(reducer(currentState, action).scores.player2)
        .toEqual(expectedState.scores.player2);
    });
    it('When player2 wins, this is saved in resullts', () => {
      
        const action = { type: EVAL_RESULT };
        expect(reducer(currentState, action).scores.results.length)
        .toEqual(expectedState.scores.results.length);
        expect(reducer(currentState, action).scores.results[0].result)
        .toEqual(expectedState.scores.results[0].result);
    });
});
