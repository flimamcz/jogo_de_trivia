export const SET_SCORE = 'SET_SCORE';

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload: {
    score: payload.score,
    assertions: payload.assertions,
  },
});
