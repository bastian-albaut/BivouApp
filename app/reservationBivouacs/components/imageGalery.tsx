import React, { useState } from 'react';
import { View, FlatList, Image, Dimensions, Text, TouchableOpacity, Share, Platform, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "@/common/constants/Colors";
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

type ImageGalleryProps = {
  images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const onViewRef = React.useRef(({ viewableItems }: { viewableItems: { isViewable: boolean; index: number | null }[] }) => {
    if (viewableItems[0].isViewable && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const { t } = useTranslation();

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Handle sharing for iOS
  const handleShare = async () => {
    if (Platform.OS === 'ios') {
      try {
        await Share.share({
          message: t('reservationBivouacs:share_bivouac'),
        });
      } catch (error : any) {
        alert(error.message);
      }
    }
  };

  // State to manage favorite status
  const [isFavorited, setIsFavorited] = useState(false);

  // Toggle the favorite status
  const toggleFavorite = () => {
      setIsFavorited(!isFavorited);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />
        )}
      />
      
      <View style={styles.imageCountContainer}>
        <Text style={styles.imageCount}>{currentIndex + 1}/{totalImages}</Text>
      </View>

      <View style={styles.topRightContainer}>
        
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={handleShare}>
            <FontAwesome name="external-link" size={24} color={Colors.white} style={styles.icon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={toggleFavorite}>
          <FontAwesome name="heart" size={24} color={isFavorited ? "red" : "gray"} style={styles.icon} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  imageCountContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCount: {
    color: Colors.white,
    fontSize: 14,
  },
  topRightContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});
