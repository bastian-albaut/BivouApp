import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from "@/common/constants/Colors";

interface ProgressBarProps {
  progress: number; // progress should be a number between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      <View style={[styles.bar, { width: `${(1 - progress) * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.green1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginRight: 2,
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.lightGrey,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});

export default ProgressBar;