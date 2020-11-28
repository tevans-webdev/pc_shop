import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAY_METHOD,
  CART_SAVE_SHIP_ADDR,
  CART_ERR
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload
      const existingItem = state.cartItems.find(
        shit => shit.product === item.product
      )

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(shit =>
            shit.product === existingItem.product ? item : shit
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== payload)
      }
    case CART_SAVE_SHIP_ADDR:
      return {
        ...state,
        shippingAddress: payload
      }
    case CART_SAVE_PAY_METHOD:
      return {
        ...state,
        paymentMethod: payload
      }
    case CART_ERR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
