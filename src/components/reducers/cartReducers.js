let initialState = []
if(typeof window !== "undefined"){
    if(localStorage.getItem('cart')){
        initialState = JSON.parse(localStorage.getItem('cart'))
    }else{
        initialState = []
    }
}
export  function cartReducers(state = initialState, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        return action.playload; 
      default:
        return state;
    }
  }
  