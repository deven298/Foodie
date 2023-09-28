import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatISODateToNormalDate } from './utils';
// import { getOrderDeliveryStatus } from './api';
import WebSocket from 'react-native-websocket';
import { deliveryUrl } from './api';

const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'circle';
      case 'processing':
        return 'hourglass-half';
      case 'shipped':
        return 'truck';
      case 'delivered':
        return 'check-circle';
      default:
        return 'question-circle';
    }
  };
const OrderHistory = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState(route.params.orders || []);
  if (!orders) return null;
  // const navigation = useNavigation();

  useEffect(() => {
    // Fetch orders when the component mounts
    // fetchOrders();

    // Initialize WebSocket and set up event listeners
    // const foodieSocket = new WebSocket(deliveryUrl);
    // foodieSocket.onopen = () => {
    //   console.log('WebSocket connection opened.');
    // };
    // foodieSocket.onmessage = (event) => {
    //   const message = event.data;
    //   console.log('Received a message:', message);

    //   // Update the delivery status in your state
    // };
    // foodieSocket.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };
    // foodieSocket.onclose = (event) => {
    //   console.log('WebSocket connection closed:', event.code, event.reason);
    // };
    // // Clean up WebSocket connection when the component unmounts
    // return () => {
    //   foodieSocket.close();
    // };
  }, []);

  // const handleStatusUpdate = (order) => {    
  //   getOrderDeliveryStatus(
  //     order.user,
  //     order.id,
  //     (deliveryStatus) => {
  //       // Handle successful status update here
  //       console.log('Delivery Status:', deliveryStatus);
  //       // Update the order status in your state or do other necessary actions
  //       order.status = deliveryStatus;
  //       return order
  //     },
  //     (error) => {
  //       // Handle errors here
  //       console.error('Error:', error);
  //     }
  //   );
  // };

  const fetchOrders = () => {
    console.log("refreshing");
    // setRefreshing(true);
    // try {
    //   const updatedOrders = orders.map((item) => {
    //     if (item.status != "delivered") {
    //       setTimeout(handleStatusUpdate(item), 1500);
    //     }
    //   })
    //   console.log("[Info] updated orders ", updatedOrders);
    //   setOrders(updatedOrders);
    //   setRefreshing(false);
    // } catch (error) {
    //   console.error('Error fetching orders:', error);
    //   setRefreshing(false);
    // }
  };
  

  const handleWriteReview = (order) => {
    // console.log("navigating to order review", order, navigation);
    // Navigate to the review submission screen and pass the order information
    navigation.navigate('OrderReview', { order });
  };

  const onClose = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <WebSocket
        ref={ref => {this.ws = ref}}
        url={`${deliveryUrl}`}
        onOpen={() => {
          console.log('WebSocket connection opened.');
          // this.ws.send('Hello');
        }}
        onMessage={(event) => {
          const message = event.data;
          console.log('Received a message:', message);
    
          // Update the delivery status in your state
        }}
        onError={(error) => {
          console.error('WebSocket error:', error);
        }}
        onClose={(event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
        }}
        // reconnect // Will try to reconnect onClose
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Order History</Text>
          <ScrollView 
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchOrders}
                colors={['#F39C12']} // Customize the loading spinner color
              />
            }
          >
                {orders.map((item) => (
                <View style={styles.orderItem} key={item.id}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.orderDate}>
                        {formatISODateToNormalDate(item.order_date)}
                    </Text>
                    </View>
                    <View style={styles.menuItemsContainer}>
                    {item.items.slice(0, 2).map((menuItem) => (
                        <Text style={styles.menuItemText} key={menuItem.id}>
                        {menuItem.name}
                        </Text>
                    ))}
                    </View>
                    <View style={styles.statusContainer}>
                        <FontAwesome
                        name={getStatusIcon(item.status)}
                        size={24}
                        color={
                            item.status === 'delivered'
                            ? 'green'
                            : item.status === 'shipped'
                            ? 'yellow'
                            : 'gray'
                        }
                        />
                        <Text style={styles.orderStatus}>{item.status}</Text>
                    </View>
                    <Text style={styles.orderTotalPrice}>
                    Total: ${item.total_price}
                    </Text>
                    <TouchableOpacity onPress={() => handleWriteReview(item)}>
                      <Text style={styles.writeReviewButton}>Write a Review</Text>
                    </TouchableOpacity>
                </View>
                ))}
            </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      modalContent: {
        width: '100%',
        maxHeight: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      orderItem: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      orderDate: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      orderStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',
      },
      menuItemsContainer: {
        flexDirection: 'row',
      },
      menuItemText: {
        fontSize: 14,
        marginRight: 10,
      },
      closeButton: {
        marginTop: 10,
      },
      closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
      },
      orderStatus: {
        fontSize: 16,
      },
      statusContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      orderTotalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      scrollView: {
        width: '100%',
      },
      writeReviewButton: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
      },
});

export default OrderHistory;
