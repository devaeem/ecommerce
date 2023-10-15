export  function userReducer(state = null, action) {
    switch (action.type) {
      case "LOGIN":
        return action.playload;
      case "LOGOUT":
        localStorage.clear()
        return action.playload;
      default:
        return state;
    }
  }
  