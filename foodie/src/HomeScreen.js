import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchMenuItems, logoutPost, placeOrder, getOrders } from './api';
import { useAuth } from './auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shuffleArray } from './utils';
import { FontAwesome5 } from '@expo/vector-icons';
import UserInfoModal from './UserInfoModal';
import CartDrawer from './CartDrawer';
import OrderHistoryModal from './OrderHistoryModal';

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const { user, isLoggedIn, logout } = useAuth();

  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState({});
  const cartItemCount = Object.keys(cart).length;

  const [userInfoVisible, setUserInfoVisible] = useState(false);

  const [orderHistoryVisible, setOrderHistoryVisible] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const resetCart = () => {
    setCart({});
  }

  const toggleOrderHistory = () => {
    setOrderHistoryVisible(!orderHistoryVisible);
  };

  const toggleUserInfo = () => {
    setUserInfoVisible(!userInfoVisible);
  };

  const fetchAllOrders = async () => {
    try {
      const userOrders = await getOrders(user);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = async () => {
    const postData = {
      'username': user.username,
      'email': user.email
    };
    try {
      const logoutResponse =  await logoutPost(postData)
      .then((res) => {
        if (res.ok) {
          logout();
          toggleUserInfo();
          navigation.navigate('Landing');
        }
      })
    } catch (error) {
      console.log("[Error] user log in failed with", error);
    }
  };

  const checkUser = async () => {
    if (isLoggedIn) {
      try {
        const menu_items = await fetchMenuItems();
        // console.log(menu_items);
        setMenuItems(shuffleArray(menu_items));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not logged in.");
    }
  };

  useEffect(() => {
      checkUser();
      fetchAllOrders();
  }, [isLoggedIn]);

  // Function to add an item to the cart
  const toggleToCart = (item) => {
    // Check if the item is already in the cart
    if (cart[item.id]) {
      // If it's already in the cart, remove it
      const newCart = { ...cart };
      delete newCart[item.id];
      setCart(newCart);
    } else {
      // If it's not in the cart, add it
      const newCart = { ...cart, [item.id]: item };
      setCart(newCart);
    }
  };

  const userPlaceOrder = async () => {
    const itemIds = Object.keys(cart);
    const total_price = Object.values(cart)
    .reduce((total, item) => total + parseFloat(item.price), 0);
    const date = new Date();
    console.log("[INFO] order ", user, date, itemIds, total_price)
    const order = {
      order_date: new Date().toISOString(),
      items: itemIds,
      total_price: total_price.toFixed(2)
    }
    try {
      const response = await placeOrder(order)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartVisible(false);
        resetCart();
        fetchAllOrders();
      });
    } catch (error) {
      console.log("[Error] error placing order", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={toggleUserInfo}>
          <Image source={require('../assets/user.png')} style={{ width: 24, height: 24, tintColor: 'black' }} />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity onPress={toggleOrderHistory} style={styles.ordersIcon}>
          <FontAwesome5 name="list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Image source={item.is_special ? require('../assets/chef.png') : require('../assets/dish.png')} style={styles.menuImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleToCart(item)}>
            <FontAwesome5
              name={cart[item.id] ? 'check' : 'plus'}
              size={20}
              color={cart[item.id] ? 'green' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => toggleCart()}>
        <View style={styles.floatingCartButton}>
          {cartItemCount > 0 && ( // Display count if cart is not empty
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
          <FontAwesome5 name="shopping-cart" size={24} color="white" />
        </View>
      </TouchableOpacity>
      {cartVisible && <CartDrawer cart={cart} onClose={() => setCartVisible(false)} placeOrder={userPlaceOrder}/>}
      <UserInfoModal
        isVisible={userInfoVisible}
        user={user}
        onClose={toggleUserInfo}
        onLogout={handleLogout}
      />
      {orderHistoryVisible && <OrderHistoryModal isVisible={orderHistoryVisible} orders={orders} onClose={toggleOrderHistory} />}
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  specialIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  itemNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 10,
    color: 'gray',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'orange',
    borderRadius: 30,
    padding: 10
  },
  cartDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ordersIcon: {
    marginLeft: 16,
  },
  });
  
  export default HomeScreen;