import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/common/constants/Colors';
import { useTranslation } from 'react-i18next';

type BivouacDetailsProps = {
  name: string;
  price: number;
  address: {
    number: string;
    street: string;
    city: string;
    postalCode: string;
  };
  rating: number;
  comments: number;
  host: {
    userId: number;
    name: string;
    email: string;
    phone: string;
  }
  description: string;
  equipment: string[];
};

export default function BivouacInformations({ name, price, address, rating, comments, host, description, equipment }: any) {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.priceContainer}>
          <FontAwesome name="money" size={20} color={Colors.black} />
          <Text style={styles.price}>{price}€ / {t('common:night')}</Text>
        </View>
      </View>

      <Text style={styles.address}>{address.number} {address.street}, {address.city} {address.postalCode}</Text>

      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={18} color={Colors.black} />
        <Text style={styles.rating}>{rating}/5 - {comments} {t('common:comments')}</Text>
      </View>

      <View style={styles.hostContainer}>
        <FontAwesome name="user-circle" size={18} color={Colors.black} />
        <Text style={styles.host}>{t('common:host')}: {host ? host.first_name + ' ' + host.last_name:'Anonyme'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        {isDescriptionExpanded ? description : `${description.slice(0, 100)}...`}
      </Text>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.readMore}>{isDescriptionExpanded ? t('common:read_less') : t('common:read_more')}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>{t('common:equipments')}</Text>
      <View style={styles.equipmentList}>
        {equipment.map((item: any, index: any) => (
          <View key={index} style={styles.equipmentItem}>
            <FontAwesome name={getEquipmentIcon(item.label)} size={18} color={Colors.black} />
            <Text style={styles.equipmentText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// Provisoire (ou permanent...)
const getEquipmentIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'eau':
      return 'tint';
    case 'toilet':
      return 'bath';
    case 'picnic':
      return 'tree';
    case 'shower':
      return 'shower';
    case 'electricity':
      return 'bolt';
    case 'shelter':
      return 'umbrella';  
    case 'wifi':
      return 'wifi';
    case 'campfire':
      return 'fire';
    default:
      return 'cog';
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    marginLeft: 5,
    color: Colors.black,
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: Colors.black,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  host: {
    fontSize: 16,
    marginLeft: 5,
    color: Colors.black,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.black,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    marginTop: 5,
  },
  readMore: {
    fontSize: 16,
    color: Colors.green1,
    marginTop: 5,
    fontWeight: '600',
  },
  equipmentList: {
    marginTop: 10,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  equipmentText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.black,
  },
});
