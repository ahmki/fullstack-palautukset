const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// Tehtävät 6.1 - 6.2
const counterReducer = (state = initialState , action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedGoodState = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return changedGoodState
    case 'OK':
      const changedOkState = {
        good: state.good,
        ok: state.ok + 1, 
        bad: state.bad
      }
      return changedOkState
    case 'BAD':
      const changedBadState = {
        good: state.good,
        ok: state.ok, 
        bad: state.bad + 1
      }
      return changedBadState
    case 'ZERO':
      const resetState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetState
    default: return state
  }
  
}

export default counterReducer