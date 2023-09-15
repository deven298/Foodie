import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const formatISODateToNormalDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

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
const OrderHistoryModal = ({ isVisible, orders, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
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
                </View>
                ))}
            </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
        fontSize: 12, // Small font size for date
        fontWeight: 'bold',
      },
      orderStatus: {
        fontSize: 12, // Small font size for status
        fontWeight: 'bold',
        color: 'green', // Customize the color based on status
      },
      menuItemsContainer: {
        flexDirection: 'row',
      },
      menuItemText: {
        fontSize: 14, // Font size for menu items
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
});

export default OrderHistoryModal;
