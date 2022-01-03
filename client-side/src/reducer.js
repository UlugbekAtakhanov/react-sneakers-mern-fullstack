const reducer = (state, action) => {

    if (action.type === "GET_USER") {
        return {...state, mainUser: action.data}
    }
    if (action.type === "LOG_OUT") {
        return {...state, mainUser: {}, allProducts: [], cart: []}
    }

    if (action.type === "GET_ALL_PRODUCTS") {
        return {...state, allProducts: action.data, isLoading: false, errorAllProducts: ""}
    }
    if (action.type === "SEARCH") {
        return {...state, search: action.searchTerm}
    }


    if (action.type === "SINGLE_PRODUCT") {
        return {...state, singleProduct: action.data}
    }
    if (action.type === "GET_CART") {
        return {...state, cart: action.data}
    }
    if (action.type === "ADD_TO_CART") {
        return {...state, cart: [...state.cart, action.data], errorCartProducts: ""}
    }
    // if (action.type === "DELETE_FROM_CART") {
    //     return {...state, cart: action.data, itemFromCartId: action.id}
    // }
    if (action.type === "ITEM_IS_IN_CART") {
        return {...state, isInCart: true}
    }
    
    if (action.type === "GET_ALL_FAVORITES") {
        return {...state, allFavorites: action.data}
    }
    if (action.type === "ADD_TO_FAVORITE") {
        return {...state, allFavorites: [...state.allFavorites, action.data]}
    }
    // if (action.type === "DELETE_FROM_FAVORITE") {
    //     return {...state, allFavorites: action.data}
    // }


    if (action.type === "ERROR_ALL_PRODUCTS") {
        return {...state, errorAllProducts: action.msg}
    }
    if (action.type === "ERROR_CART_PRODUCTS") {
        return {...state, errorCartProducts: action.msg, cart: []}
    }


    return state
}

export default reducer
