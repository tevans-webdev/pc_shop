import { CART_ADD_ITEM, CART_ERR } from '../constants/cartConstants'
import axios from 'axios'

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: CART_ERR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}
