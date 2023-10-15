export  function searchReducers(state = { text:""}, action) {
    switch (action.type) {
      case "SEARCH_QUERY":
        return {...state, ...action.playload};
     
      default:
        return state;
    }
  }
  