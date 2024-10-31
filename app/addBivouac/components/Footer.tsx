// common/components/Footer.tsx
import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import ButtonComponent from '../../../common/components/ButtonComponent';
import ProgressBarComponent from './ProgressBar';
import Colors from "@/common/constants/Colors";
import { useTranslation } from 'react-i18next';

interface FooterProps {
    onBackPress: () => void;
    onNextPress: () => void;
    progress: number;
  }
  
  const Footer: React.FC<FooterProps> = ({ onBackPress, onNextPress, progress }) => {

    const { t } = useTranslation();

    return (
      <View style={styles.footerContainer}>
        <ProgressBarComponent progress={progress} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onBackPress}>
              <Text style={styles.backButton}>{t('addBivouac:previous')}</Text>
            </TouchableOpacity>
            <View style={styles.buttonMargin}>
              <ButtonComponent title={t('addBivouac:next')} onPress={onNextPress} width={100} />
            </View>
          </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    footerContainer: {
      position: 'absolute',
      width: 340,
      bottom: 0,
      backgroundColor: Colors.white,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    backButton: {
      color: 'black',
      textDecorationLine: 'underline',
      fontSize: 16,
    },
    buttonMargin: {
      marginRight: -10,
    },
  });
  
  export default Footer;