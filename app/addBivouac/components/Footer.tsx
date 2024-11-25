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
    showBackButton?: boolean;
    isLastStep?: boolean;
  }
  
  const Footer: React.FC<FooterProps> = ({ onBackPress, onNextPress, progress, showBackButton = true, isLastStep = false }) => {

    const { t } = useTranslation();

    return (
      <View style={styles.footerContainer}>
        <ProgressBarComponent progress={progress} />
        <View style={styles.buttonContainer}>
                {showBackButton ? (
                    <TouchableOpacity onPress={onBackPress}>
                        <Text style={styles.backButton}>{t('addBivouac:previous')}</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />  // Empty view to take up space
                )}
                <View style={styles.buttonMargin}>
                    <ButtonComponent title={isLastStep ? t('addBivouac:end') : t('addBivouac:next')} onPress={onNextPress} width={100} />
                </View>
            </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    footerContainer: {
      position: 'absolute',
      width: 340,
      bottom: 15,
      backgroundColor: Colors.white,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  spacer: {
      width: 100,  // Same width as the button to maintain spacing
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