import { GAME_TYPE } from "./App";
import { BorderlessButton } from "react-native-gesture-handler";




export const PLAY_AND_CHANGE_TURN = "PLAY_AND_CHANGE_TURN"
export const NEW_GAME = "NEW_GAME"

const TURN_MARK = {
    1: "X", 2: "O"
}

export function reducer(state, action) {
    switch (action.type) {
        case PLAY_AND_CHANGE_TURN:
            let value = state.turn
            let newState = { ...state, [action.id]: value };
            console.log(newState)
            let gameEnd = checkForWin(newState, action.id, value)
            if (!gameEnd || !gameEnd.end) {
                //deciding turn
                newState.turn = state.turn === TURN_MARK[1] ? TURN_MARK[2] : TURN_MARK[1]
            }
            if (gameEnd && gameEnd.end) {
                // gameover score increment
                newState.score[newState.turn] += 1
            }

            newState = { ...newState, gameEnd }
            console.log("afterWin", newState)

            if ((!gameEnd || !gameEnd.end) && newState.gameType === GAME_TYPE.BOT && newState.turn === newState.bot) {
                // play for the bot
                newState = botPlay(newState)
            }
            if (!notAllTilesAreFilled(newState)) {
                //filled
                newState.filled = true
            }
            return newState
        case NEW_GAME:
            let freshState = getIntialState(state.gameType)
            return { ...freshState, score: state.score, gameType: state.gameType }
        default:
            throw new Error();
    }
}

export const checkForWin = (state, id, value) => {

    let rowCheck = checkValueInRow(state, id, value)
    if (rowCheck.end) {
        return rowCheck
    }

    let colCheck = checkValueInColumn(state, id, value)
    if (colCheck.end) {
        return colCheck
    }

    let diaCheck = checkValueInDiagonal(state, id, value)
    if (diaCheck.end) {
        return diaCheck
    }
}


const checkValueInRow = (state, id, value) => {
    if (id <= 3 && state[1] === value && state[2] === value && state[3] === value) {
        return { end: true, ids: [1, 2, 3] }
    } else if (id <= 6 && state[4] === value && state[5] === value && state[6] === value) {
        return { end: true, ids: [4, 5, 6] }
    } if (id <= 9 && state[7] === value && state[8] === value && state[9] === value) {
        return { end: true, ids: [7, 8, 9] }
    }
    return {}
}

const checkValueInColumn = (state, id, value) => {
    let index = id % 3
    if (index == 1 && state[1] === value && state[4] === value && state[7] === value) {
        return { end: true, ids: [1, 4, 7] }
    } else if (index === 2 && state[2] === value && state[5] === value && state[8] === value) {
        return { end: true, ids: [2, 5, 8] }
    } if (index === 0 && state[3] === value && state[6] === value && state[9] === value) {
        return { end: true, ids: [3, 6, 9] }
    }
    return {}
}

const checkValueInDiagonal = (state, id, value) => {
    if (id === 5) {
        if (state[1] === value && state[9] === value) {
            return { end: true, ids: [1, 5, 9] }
        } else if (state[3] === value && state[7] === value) {
            return { end: true, ids: [3, 5, 7] }
        }
    } else if ((id === 1 || id === 9) && state[1] === value && state[5] === value && state[9] === value) {
        return { end: true, ids: [1, 5, 9] }
    } else if ((id === 3 || id === 7) && state[3] === value && state[5] === value && state[7] === value) {
        return { end: true, ids: [3, 5, 7] }
    }

    return {}
}

const notAllTilesAreFilled = (state) => {
    for (let i = 1; i < 10; i++) {
        if (!state[i]) {
            return true
        }
    }
    return false
}


export const botPlay = (state) => {
    if (notAllTilesAreFilled(state)) {

        let blankIndex
        do {
            blankIndex = Math.floor(1 + (Math.random() * (9 - 1 + 1)));
        } while (state[blankIndex])

        state[blankIndex] = state.bot
        state.turn = "X"
        let gameEnd = checkForWin(state, blankIndex, state.bot)
        if (gameEnd && gameEnd.end) {
            // gameover score increment
            state.score[state.bot] += 1
        }

        return { ...state, gameEnd }
    } else {
        return state
    }
}

export const playAction = (dispatch, id) => {
    dispatch({ type: PLAY_AND_CHANGE_TURN, id })

}


export const getIntialState = (gameType) => {

    const initialState = {
        turn: Math.random() < 0.5 ? TURN_MARK[1] : TURN_MARK[2], //start by selecting random player turn
        score: { X: 0, O: 0 },
        bot: "O"
    };

    let state = { ...initialState, gameType: gameType }
    if (gameType === GAME_TYPE.BOT && state.turn === state.bot) {
        let blankIndex
        do {
            blankIndex = Math.floor(1 + (Math.random() * (9 - 1 + 1)));
        } while (state[blankIndex])

        state[blankIndex] = state.bot
        state.turn = "X"
    }

    console.log("init", state)
    return state
}


