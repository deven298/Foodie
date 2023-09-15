import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CartDrawer = ({ cart, onClose, placeOrder }) => {
    const totalCost = Object.values(cart)
    .reduce((total, item) => total + parseFloat(item.price), 0);
    const formattedTotalCost = totalCost.toFixed(2);
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={onClose}
        >
        <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Your Cart</Text>
            <ScrollView>
            {Object.values(cart).map((item) => (
                <View key={item.id} style={styles.cartItem}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>${item.price}</Text>
                </View>
            ))}
            </ScrollView>
            <Text style={styles.totalCost}>Total: ${formattedTotalCost}</Text>
            <TouchableOpacity onPress={placeOrder} style={styles.placeOrderButton}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Adjust the background color
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16, // Adjust the spacing
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
  },
  cartItemName: {
    fontSize: 18, // Adjust the font size
  },
  cartItemPrice: {
    fontSize: 16, // Adjust the font size
    color: 'gray',
  },
  totalCost: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16, // Adjust the spacing
  },
  placeOrderButton: {
    alignSelf: 'center',
    marginTop: 24, // Adjust the spacing
    paddingVertical: 12, // Adjust the padding
    paddingHorizontal: 24, // Adjust the padding
    backgroundColor: 'green', // Adjust the button color
    borderRadius: 8, // Adjust the border radius
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Adjust the text color
  },
  backButton: {
    padding: 10,
  },
});

export default CartDrawer;
