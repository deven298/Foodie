// ReviewSubmission.js
import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import { formatISODateToNormalDate } from './utils';
import { FontAwesome } from '@expo/vector-icons';
import { reviewOrder } from './api';

const StarRating = ({ maxStars, rating, onStarPress }) => {
    return (
      <View style={styles.starRatingContainer}>
        {Array.from({ length: maxStars }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onStarPress(index + 1)}
          >
            <FontAwesome
              name={index < rating ? 'star' : 'star-o'}
              size={24}
              color="orange"
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
};
const OrderReview = ({ route, navigation }) => {
  const { order } = route.params; // Get the order information passed from the previous screen

  // Extract the top 3 menu items from the order (you may need to adjust this logic based on your data structure)
  const topMenuItems = order.items.slice(0, 3);

  // State variables for the review data
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleCloseReview = () => {
    navigation.goBack(); // or navigation.navigate('PreviousScreen') to navigate to a specific screen
  };
  
  // Function to submit the review
  const submitReview = async () => {
    // console.log("[Info] submit review with:", order);
    const review_data = {
        order_id: order.id,
        rating: rating,
        text: reviewText,
        created_at: new Date().toISOString(),
    };
    try {
        const response = await reviewOrder(review_data)
        .then((res) => {
            if (res.ok) {
                handleCloseReview();
                console.log("[Info] user added review successfully");
                return;
            }
            console.log("[Error] reviewing failed with status ", res.status);
            return;
        });
    } catch (error) {
        console.log("[Error] error submitting review ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Review Order</Text>
      {/* Display order details */}
      <Text style={styles.orderDetails}>{formatISODateToNormalDate(order.order_date)}</Text>

      {/* Display top 3 menu items */}
      {topMenuItems.map((menuItem) => (
        <Text key={menuItem.id} style={styles.menuItem}>
          {menuItem.name}
        </Text>
      ))}
      <Text style={styles.subtitle}>${order.total_price}</Text>

      {/* Review input fields */}
      <StarRating
        maxStars={5}
        rating={rating}
        onStarPress={(newRating) => setRating(newRating)}
      />
      <TextInput
        style={styles.reviewTextInput}
        placeholder="Write your review here..."
        multiline
        value={reviewText}
        onChangeText={(text) => setReviewText(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCloseReview} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitReview} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  orderDetails: {
    fontSize: 14,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  starRatingContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
  },
  starIcon: {
    marginRight: 5,
  },
  reviewTextInput: {
    width: '80%',
    height: 120,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    textAlign: 'left',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  submitButton: {
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '45%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '45%',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderReview;
