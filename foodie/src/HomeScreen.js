import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fetchMenuItems } from './api';
import { useAuth } from './auth';

const HomeScreen = () => {
    const [specials, setSpecials] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    const user = useAuth();

    useEffect(() => {
        console.log("User info ", user.user, user.user['token']);
        // Fetch data when the component mounts
        fetchMenuItems(user.user, user.user['token'])
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw res.json()
          }
        })
        .then((json) => {
          console.log(json, json.specials, json.menu);
        })
        .catch((error) => console.error('Error fetching menu items:', error));
    }, []);

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Today's Specials</Text>
          <FlatList
            data={specials}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.specialItem}>
                <Image source={{ uri: item.image }} style={styles.specialImage} />
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </View>
            )}
          />
    
          <Text style={styles.title}>Menu</Text>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </View>
            )}
          />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 16,
    },
    specialItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    specialImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 16,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    menuImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
  });
  
  export default HomeScreen;