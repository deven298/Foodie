import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatISODateToNormalDate } from './utils';

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
  const { orders } = route.params;
  if (!orders) return null;
  
  // const navigation = useNavigation();

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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Order History</Text>
          <ScrollView style={styles.scrollView}>
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
