import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GameComponent from './Game'

export const GAME_TYPE = {
  NORMAL: "normal",
  BOT: "bot"
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100 }}>
        <Text>Tic Tac Toe Game</Text>
        <TouchableOpacity
          style={{ margin: 10, padding: 16, backgroundColor: 'blue', borderRadius: 4 }}
          onPress={() => this.props.navigation.navigate('Game', { type: GAME_TYPE.NORMAL })}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Play Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10, padding: 16, backgroundColor: 'blue', borderRadius: 4 }}
          onPress={() => this.props.navigation.navigate('Game', { type: GAME_TYPE.BOT })}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Play With Bot</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class GameScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    let gameType = navigation.getParam('type', null)
    return (
      <GameComponent gameType={gameType} />
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Game: GameScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);