import { conf1 } from '../util/gameConfiguration';
import { HUMAN_VS_COMP, COMP_VS_COMP } from '../util/constants';
const initialState = {
    items: Object.keys(conf1),
    gameStarted: false,
    mode: HUMAN_VS_COMP,
    player1Choice: '',
    player2Choice: '',
    scores: {
        results: [],
        player1: 0,
        player2: 0,
        tie: 0
    },
    conf: conf1
}

const evaluateResult = (state, action) => {
    let result;
    if (state.player1Choice === state.player2Choice) {
        result = 'tie';
    } else if (state.conf[state.player1Choice].beats.indexOf(state.player2Choice) !== -1) {
        result = 'player1';
    } else {
        result = 'player2';
    }

    return setResults({
        player1: state.player1Choice,
        player2: state.player2Choice,
        key: state.mode,
        result
    }, state);
}

const setResults = (score, state) => {
    const newScores = Object.assign({}, state.scores, {
        results: [...state.scores.results, score],
        [score.result]: (state.scores[score.result] + 1)
    });
    localStorage.setItem(score.key, JSON.stringify(newScores));
    return Object.assign({}, state, { scores: newScores });
}

const switchMode = (mode) => {
    return mode === HUMAN_VS_COMP ? COMP_VS_COMP : HUMAN_VS_COMP;
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return Object.assign({}, state, { items: action.items });
        case 'START_GAME':
            return Object.assign({}, state, { gameStarted: action.isStarted });
        case 'CHANGE_MODE':
            return Object.assign({}, state, { mode: switchMode(state.mode)});
        case 'PLAYER1_CHOICE':
            return Object.assign({}, state, { player1Choice: action.choice });
        case 'PLAYER2_CHOICE':
            return Object.assign({}, state, { player2Choice: action.choice });
        case 'LOAD_CONFIG':
            return Object.assign({}, state, { conf: action.conf });
        case 'SET_SCORES':
            return Object.assign({}, state, { scores: action.scores || initialState.scores });
        case 'EVAL_RESULT':
            return evaluateResult(state, action);
        default:
            return state;
    }
}

export default game;