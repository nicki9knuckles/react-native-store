import React, { useLayoutEffect, useEffect, useState } from 'react'
import {
  FlatList,
  Text,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as orderActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const orders = useSelector((state) => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={StyleSheet.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Your Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [])

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OrdersScreen
