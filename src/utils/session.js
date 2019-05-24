import { createActions, handleActions } from 'redux-actions'
import api from './api'

const runeliteApi = api('https://session.runelitepl.us/')

// Actions
export const { fetchSessionCount, setSessionCount } = createActions(
  {
    FETCH_SESSION_COUNT: () => async dispatch => {
      const response = await runeliteApi(`count`, {
        method: 'GET'
      })

      dispatch(setSessionCount(response))
      return response
    }
  },
  'SET_SESSION_COUNT'
)

// Reducer
export default handleActions(
  {
    [setSessionCount]: (state, { payload }) => ({
      ...state,
      sessionCount: payload
    })
  },
  {
    sessionCount: 0
  }
)

// Selectors
export const getSessionCount = state => state.session.sessionCount