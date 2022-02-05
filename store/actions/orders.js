import Constants from 'expo-constants'
import Order from '../../models/order'

export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${Constants.manifest.extra.SERVER_URL}/orders/u1.json`
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const resData = await response.json()
      const loadedOrders = []

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        )
      }

      dispatch({ type: SET_ORDERS, loadedOrders: [] })
    } catch (err) {
      throw err
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date()
  return async (dispatch) => {
    const response = await fetch(
      `${Constants.manifest.extra.SERVER_URL}/orders/u1.json`,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    )

    const resData = await response.json()

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    })
  }
}
