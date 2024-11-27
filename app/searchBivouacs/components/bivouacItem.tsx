import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/common/constants/Colors';
import { useRouter } from 'expo-router';

export default function BivouacItem({
  item,
  onToggleFavorite,
}: {
  item: any;
  onToggleFavorite: () => void;
}) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(item.isFavorited);


  const toggleFavorite = () => {
    setIsFavorited((prev: any) => !prev);
    onToggleFavorite();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/reservationBivouacs/screens/detailBivouac',
          params: { itemId: item.bivouacId },
        })
      }
    >
      <View style={styles.bivouacItem}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={styles.bivouacImage}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
            <FontAwesome name="heart" size={28} color={isFavorited ? 'red' : 'gray'} />
          </TouchableOpacity>
        </View>

        <View>
        {/* <View style={styles.informationContainer}> */}
          <Text style={styles.bivouacTitle}>{item.name || 'Pas de nom'}</Text>
          <Text style={styles.bivouacAddress}>
            {item.address
              ? `${item.address.number} ${item.address.street}, ${item.address.city} ${item.address.postalCode}`
              : 'Privé'}
          </Text>
          <View style={styles.bivouacViewHost}>
            <FontAwesome style={styles.bivouacHostIcon} name="user-circle" size={20} color="black" />
            <Text style={styles.bivouacHost}>
              {item.host ? `${item.host.first_name} ${item.host.last_name}` : 'Anonyme'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bivouacItem: {
    flexDirection: 'column',
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  bivouacImage: {
    alignSelf: 'stretch',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  bivouacTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bivouacAddress: {
    color: '#555',
  },
  bivouacViewHost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bivouacHostIcon: {
    color: Colors.secondary,
  },
  bivouacHost: {
    color: Colors.secondary,
  },
});
