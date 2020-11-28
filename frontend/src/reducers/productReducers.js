import {
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUC,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUC,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_LIST_REQ:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUC:
      return {
        loading: false,
        products: payload
      }
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: payload
      }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_DETAILS_REQ:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUC:
      return {
        loading: false,
        product: payload
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
