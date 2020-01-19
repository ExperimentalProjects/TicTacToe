import React, { useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { reducer, PLAY_AND_CHANGE_TURN, NEW_GAME, playAction, getIntialState } from './logic';


const GameComponent = (props) => {
    const [gameState, dispatch] = useReducer(reducer, getIntialState(props.gameType));
    let isGameEnded = gameState.gameEnd && gameState.gameEnd.end
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
            {isGameEnded &&
                <Text style={{ fontSize: 30 }}> Player {gameState.turn} Won!!</Text>
            }
            {!isGameEnded && gameState.filled &&
                <Text style={{ fontSize: 30 }}> Game Drawn!</Text>
            }

            {!isGameEnded && !gameState.filled && < View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}> Player {gameState.turn}'s Turn</Text>
            </View>}


            <Text style={{ marginTop: 16, fontSize: 30 }}>Score</Text>
            <View style={[styles.row, { width: '100%', justifyContent: "space-between", padding: 10, borderTopWidth: 1, marginTop: 16, alignItems: 'center' }]}>
                <View style={styles.column}>
                    <Text style={{ fontSize: 30 }}>Player X</Text>
                    <Text style={{ fontSize: 30 }}>{gameState.score.X}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={{ fontSize: 30 }}>Player O</Text>
                    <Text style={{ fontSize: 30 }}>{gameState.score.O}</Text>
                </View>
            </View>

            {

            }
            <TouchableOpacity
                style={{ margin: 10, padding: 16, backgroundColor: 'blue', borderRadius: 4 }}
                onPress={() => dispatch({ type: NEW_GAME })}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>New Game</Text>
            </TouchableOpacity>
        </View >
    )
}


const GameTile = (props) => {
    const size = 100
    const { id, gameState, dispatch } = props
    let value = gameState[id]
    let isGameEnded = gameState.gameEnd && gameState.gameEnd.end
    const isPartOfWinnigTile = gameState.gameEnd && gameState.gameEnd.ids.indexOf((id)) !== -1
    return (
        <TouchableOpacity
            onPress={() => {
                if (!value && !isGameEnded) {
                    playAction(dispatch, id, gameState)
                }
            }}
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