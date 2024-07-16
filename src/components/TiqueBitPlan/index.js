import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { UIText } from '../UI/Text';
import { UISkeleton } from '../Skeleton';

import { useTheme } from '@react-navigation/native';

export const TiqueBitPlan = () => {
  const { colors } = useTheme();

  const imageSize = 64;

  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    planCircle: {},
    image: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: imageSize,
      width: imageSize,
      borderColor: colors.plans.free.background,
      borderWidth: 4,
      borderRadius: imageSize,
    },

    planName: {
      position: 'absolute',
      top: imageSize - 18 - 4,
      right: imageSize / 2.5,

      borderColor: colors.plans.free.border,
      borderWidth: 3.5,
      borderRadius: 100,

      backgroundColor: colors.plans.free.background,
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignItems: 'center',
      justifyContent: 'center',

      zIndex: 2,
    },
    skeleton: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: imageSize,
      width: imageSize,
    },
  });

  return (
    <UISkeleton
      loading={
        //TODO: Implement loading state with subscription store
        false
      }
      style={styles.skeleton}
      borderRadius={imageSize}>
      <View style={styles.container}>
        <View style={styles.planName}>
          <UIText weight="semibold" color={colors.plans.free.text}>
            Free
          </UIText>
        </View>

        <FastImage style={styles.image} resizeMode={'cover'} />
      </View>
    </UISkeleton>
  );
};
