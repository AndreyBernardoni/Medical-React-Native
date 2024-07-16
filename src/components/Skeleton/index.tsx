import React, { memo, useEffect } from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { UIBlock } from '../UI/Block';
import { useTheme } from '@react-navigation/native';

export const UISkeleton = memo(
  ({
    loading = true,
    borderRadius,
    height,
    width,
    isFlex,
    style,
    children,
  }: {
    loading?: boolean;
    borderRadius?: any;
    height?: number | string;
    width?: number | string;
    isFlex?: boolean;
    style: any;
    children: React.ReactNode;
  }) => {
    const theme = useTheme();
    const animatedOpacity = useSharedValue(0.3);
    const animatedStyles = useAnimatedStyle(() => ({
      opacity: animatedOpacity.value,
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: borderRadius,
      height: height,
      width: '100%',
    }));

    useEffect(() => {
      if (loading) {
        animatedOpacity.value = withRepeat(
          withTiming(1, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        );
      } else {
        animatedOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });

        cancelAnimation(animatedOpacity);
      }
    }, [animatedOpacity, loading]);

    if (!loading) {
      return children;
    }

    return (
      <UIBlock
        radius={borderRadius}
        height={height}
        width={width}
        isFlex={isFlex}
        style={style}>
        <Animated.View style={[{ flex: 1 }, animatedStyles]} />
      </UIBlock>
    );
  },
);
