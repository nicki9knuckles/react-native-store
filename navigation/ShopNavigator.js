import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { Platform, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductsStack = createNativeStackNavigator()

function ProductsNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <ProductsStack.Navigator screenOptions={defaultNavOptions}>
        <ProductsStack.Screen
          name='ProductsOverviewScreen'
          component={ProductsOverviewScreen}
        />
        <ProductsStack.Screen
          name='ProductDetail'
          component={ProductDetailScreen}
        />
        <ProductsStack.Screen name='CartScreen' component={CartScreen} />
      </ProductsStack.Navigator>
    </View>
  )
}

const OrdersStack = createNativeStackNavigator()

function OrdersNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <OrdersStack.Navigator screenOptions={defaultNavOptions}>
        <OrdersStack.Screen name='OrdersScreen' component={OrdersScreen} />
      </OrdersStack.Navigator>
    </View>
  )
}

const AdminStack = createNativeStackNavigator()

function AdminNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <AdminStack.Navigator screenOptions={defaultNavOptions}>
        <AdminStack.Screen name='UserProducts' component={UserProductsScreen} />
        <AdminStack.Screen name='EditProduct' component={EditProductScreen} />
      </AdminStack.Navigator>
    </View>
  )
}

const DrawerNavigator = createDrawerNavigator()

function MainNavigator() {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      <DrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}

export default Navigation
