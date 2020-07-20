// contactAction.js

import * as actionTypes from './actionTypes';

export const gameResult = (result, winner, round, gamesCount) => {
  return {
     type: actionTypes.GAME_RESULT,
     result,
     winner,
     round,
     gamesCount,
  }
}
export const resetScoreboard = () => {
  return {
    type: actionTypes.RESET_SCOREBOARD,
  }
}

export const findWinner = () => {
  return {
    type: actionTypes.FIND_WINNER,
  }
}

export const setScores = roundWinner => {
  return {
    type: actionTypes.SET_SCORES_BOARD,
    roundWinner,
  }
}

export const setPlayerNames = (players) => {
  return {
    type: actionTypes.SET_PLAYER_NAMES,
   players,
  }
}
