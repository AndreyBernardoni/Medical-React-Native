import { UIBlockProps } from './types';

import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

import { SIZING } from '../../../constants/sizing';

export const UIBlock = ({
  gap,
  color,
  align,
  hAlign,
  vAlign,
  padding,
  hPadding,
  vPadding,
  lPadding,
  tPadding,
  rPadding,
  bPadding,
  position,
  margin,
  radius,
  border,
  borderColor,
  shadow,
  shadowColor,
  shadowOpacity,
  shadowBlur,
  height,
  width,
  secondary,
  tertiary,
  isKeyboard,
  isAbsolute,
  isFlex,
  isRow,
  isSafe,
  isSafeTop,
  isSafeBottom,
  isSafeRight,
  isSafeLeft,
  isSquare,
  isBetween,
  isCenter,
  isWrap,
  isHidden,
  style,
  children,
  onPress,
  ...rest
}: UIBlockProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const safeTop = isSafe || isSafeTop ? insets.top : 0;
  const safeBottom = isSafe || isSafeBottom ? insets.bottom : 0;
  const safeLeft = isSafe || isSafeLeft ? insets.left : 0;
  const safeRight = isSafe || isSafeRight ? insets.right : 0;

  if (isHidden) {
    return null;
  }

  const positionStyle = {
    position: isAbsolute ? 'absolute' : 'relative',

    // Position is a string of 'top', 'left', 'right' or 'bottom'
    ...(!Array.isArray(position) && {
      ...(position === 'top' && { top: 0 }),
      ...(position === 'left' && { left: 0 }),
      ...(position === 'right' && { right: 0 }),
      ...(position === 'bottom' && { bottom: 0 }),
    }),

    // Position is an array of [top, left, right, bottom]
    ...(Array.isArray(position) && {
      top: position[0],
      left: position[1],
      right: position[2],
      bottom: position[3],
    }),
  };

  const marginStyle = {
    ...(margin &&
      Array.isArray(margin) && {
        marginTop: margin[0],
        marginRight: margin[1],
        marginBottom: margin[2],
        marginLeft: margin[3],
      }),
    ...(margin && !Array.isArray(margin) && { margin: margin }),
  };

  const flexStyle = {
    ...(isFlex && { flex: 1, flexGrow: 1 }),
  };

  const layoutStyle = {
    ...(isWrap && { flexWrap: 'wrap' }),
    flexDirection: isRow ? 'row' : 'column',

    gap: (typeof gap === 'string' && SIZING[gap]) || gap,

    justifyContent:
      align ||
      (isRow
        ? (hAlign === 'end' && 'flex-end') ||
          (hAlign === 'between' && 'space-between') ||
          hAlign
        : vAlign),

    alignItems:
      align || (isRow ? (vAlign === 'end' && 'flex-end') || vAlign : hAlign),

    ...(isBetween && { justifyContent: 'space-between' }),
    ...(isCenter && { justifyContent: 'center', alignItems: 'center' }),
  };

  const sizeStyle = {
    height: height || 'auto',
    width: width || 'auto',
    aspectRatio: isSquare && 1,
  };

  const colorStyle = {
    backgroundColor:
      (secondary && colors.background.secondary) ||
      (tertiary && colors.background.tertiary) ||
      color ||
      'transparent',
  };

  const borderStyle = {
    borderColor: borderColor || 'transparent',

    // Border is a number
    borderWidth:
      !Array.isArray(border) && typeof border === 'number' ? border : undefined,

    // Border is an array of [top, left, right, bottom]
    ...(Array.isArray(border) && {
      borderTopWidth: border[0],
      borderLeftWidth: border[1],
      borderRightWidth: border[2],
      borderBottomWidth: border[3],
    }),

    // Radius is a number
    ...(radius &&
      typeof radius === 'number' && {
        borderRadius: radius,
      }),

    ...(radius &&
      typeof radius === 'string' && {
        borderRadius: SIZING[radius],
      }),

    // Radius is an array of [topLeft, topRight, bottomRight, bottomLeft]
    ...(Array.isArray(radius) && {
      borderTopLeftRadius: radius[0],
      borderTopRightRadius: radius[1],
      borderBottomLeftRadius: radius[2],
      borderBottomRightRadius: radius[3],
    }),
  };

  const paddingStyle = {
    ...(padding && typeof padding === 'string' && { padding: SIZING[padding] }),

    ...(hPadding &&
      typeof hPadding === 'string' && { paddingHorizontal: SIZING[hPadding] }),

    ...(vPadding &&
      typeof vPadding === 'string' && { paddingVertical: SIZING[vPadding] }),

    ...(lPadding &&
      typeof lPadding === 'string' && { paddingLeft: SIZING[lPadding] }),

    ...(tPadding &&
      typeof tPadding === 'string' && { paddingTop: SIZING[tPadding] }),

    ...(rPadding &&
      typeof rPadding === 'string' && { paddingRight: SIZING[rPadding] }),

    ...(bPadding &&
      typeof bPadding === 'string' && { paddingBottom: SIZING[bPadding] }),

    ...(safeTop && { paddingTop: safeTop }),

    ...(safeBottom && { paddingBottom: safeBottom }),

    // [top/bottom, left/right]
    ...(padding &&
      Array.isArray(padding) &&
      padding.length === 2 && {
        ...(padding?.[0] &&
          typeof padding[0] === 'string' && {
            paddingTop: SIZING[padding[0]] + safeTop,
            paddingBottom: SIZING[padding[0]] + safeBottom,
          }),

        ...(padding?.[1] &&
          typeof padding[1] === 'string' && {
            paddingRight: SIZING[padding[1]] + safeRight,
            paddingLeft: SIZING[padding[1]] + safeLeft,
          }),
      }),

    // [top, right, bottom, left]
    ...(padding &&
      Array.isArray(padding) &&
      padding.length === 4 && {
        ...(padding?.[0] &&
          typeof padding === 'string' && {
            paddingTop: SIZING[padding] + safeTop,
          }),

        ...(padding?.[1] &&
          typeof padding === 'string' && {
            paddingRight: SIZING[padding] + safeRight,
          }),

        ...(padding?.[2] &&
          typeof padding === 'string' && {
            paddingBottom: SIZING[padding] + safeBottom,
          }),

        ...(padding?.[3] &&
          typeof padding === 'string' && {
            paddingLeft: SIZING[padding] + safeLeft,
          }),
      }),
  };

  const shadowStyle = {
    ...(Array.isArray(shadow) && {
      shadowOffset: {
        width: shadow[0],
        height: shadow[1],
      },
    }),

    shadowColor: shadowColor || 'black',
    shadowOpacity,
    shadowRadius: shadowBlur,
  };

  const allStyles = [
    positionStyle,
    marginStyle,
    shadowStyle,
    flexStyle,
    layoutStyle,
    sizeStyle,
    colorStyle,
    borderStyle,
    paddingStyle,
    style,
  ];

  if (onPress) {
    return (
      <View
        style={
          StyleSheet.flatten([
            flexStyle,
            positionStyle,
            sizeStyle,
          ]) as StyleProp<ViewStyle>
        }
        {...rest}>
        <TouchableOpacity
          onPress={onPress}
          style={
            StyleSheet.flatten([flexStyle, sizeStyle]) as StyleProp<ViewStyle>
          }>
          <View style={StyleSheet.flatten([allStyles]) as StyleProp<ViewStyle>}>
            {children}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (isKeyboard) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={
          StyleSheet.flatten([
            flexStyle,
            positionStyle,
            sizeStyle,
          ]) as StyleProp<ViewStyle>
        }
        {...rest}>
        <View style={StyleSheet.flatten([allStyles]) as StyleProp<ViewStyle>}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View
      style={StyleSheet.flatten([allStyles]) as StyleProp<ViewStyle>}
      {...rest}>
      {children}
    </View>
  );
};

export const UIRow = ({ children, ...rest }: UIBlockProps) => (
  <UIBlock isRow {...rest}>
    {children}
  </UIBlock>
);

export const UICol = ({ children, ...rest }: UIBlockProps) => (
  <UIBlock {...rest}>{children}</UIBlock>
);
