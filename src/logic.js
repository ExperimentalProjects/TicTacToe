



export const PLAY_AND_CHANGE_TURN = "PLAY_AND_CHANGE_TURN"
export const RESET_GAME = "RESET_GAME"

const TURN_MARK = {
    1: "X", 2: "O"
}
export const initialState = {
    turn: 1
};

export function reducer(state, action) {
    switch (action.type) {
        case PLAY_AND_CHANGE_TURN:
            let value = TURN_MARK[state.turn]
            let newState = { ...state, [action.id]: value };
            let gameEnd = checkForWin(newState, action.id, value)
            if (!gameEnd || !gameEnd.end) {
                newState.turn = state.turn === 1 ? 2 : 1
            }
            return { ...newState, gameEnd }
        case RESET_GAME:
            return initialState
        default:
            throw new Error();
    }
}

export const checkForWin = (state, id, value) => {
    let shouldCheckWin = true
    if (shouldCheckWin) {
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

    } else {
        return false
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




export const updateGameState = (id, gameState, update) => {
    let newState = gameState ? gameState : {}
    newState[id] = "X"
    update(newState)
}
