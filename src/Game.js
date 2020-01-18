import React, { useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { checkForWin, reducer, initialState, PLAY_AND_CHANGE_TURN, RESET_GAME } from './logic';


const GameComponent = (props) => {
    const [gameState, dispatch] = useReducer(reducer, initialState);
    return (
        <View style={[styles.column, { alignItems: 'center', paddingTop: 10 }]}>
            <View style={styles.row}>
                <GameTile id={1} gameState={gameState} dispatch={dispatch} />
                <GameTile id={2} gameState={gameState} dispatch={dispatch} />
                <GameTile id={3} gameState={gameState} dispatch={dispatch} />
            </View>
            <View style={styles.row}>
                <GameTile id={4} gameState={gameState} dispatch={dispatch} />
                <GameTile id={5} gameState={gameState} dispatch={dispatch} />
                <GameTile id={6} gameState={gameState} dispatch={dispatch} />
            </View>
            <View style={styles.row}>
                <GameTile id={7} gameState={gameState} dispatch={dispatch} />
                <GameTile id={8} gameState={gameState} dispatch={dispatch} />
                <GameTile id={9} gameState={gameState} dispatch={dispatch} />
            </View>

            {gameState.gameEnd && gameState.gameEnd.end && <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}> Game Over!</Text>
                <Text style={{ fontSize: 30 }}> Player {gameState.turn} won!!!</Text>
            </View>}
            <TouchableOpacity
                style={{ margin: 10, padding: 16, backgroundColor: 'blue', borderRadius: 4 }}
                onPress={() => dispatch({ type: RESET_GAME })}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Reset</Text>
            </TouchableOpacity>
        </View >
    )
}


const GameTile = (props) => {
    const size = 100
    const { id, gameState, dispatch } = props
    let value = gameState[id]
    const isPartOfWinnigTile = gameState.gameEnd && gameState.gameEnd.ids.indexOf((id)) !== -1
    return (
        <TouchableOpacity
            onPress={() => dispatch({ type: PLAY_AND_CHANGE_TURN, id })}
            style={{ backgroundColor: isPartOfWinnigTile ? "green" : "white", borderWidth: 2, borderColor: 'black', width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{value}</Text>
        </TouchableOpacity >
    )
}


export default GameComponent


const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})