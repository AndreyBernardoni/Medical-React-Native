import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@react-navigation/native';
import { RefreshStatus } from '../../RefreshStatus';

export const UIScroll = ({
  isFlex,
  isSafe,
  isKeyboard,
  isTransparent,
  children,
  onRefresh,
  refreshing,
  ...props
}) => {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: isFlex ? 1 : 0,
      backgroundColor: isTransparent
        ? 'transparent'
        : colors.background.primary,
    },
    content: {
      flexGrow: 1,
      paddingBottom: isSafe ? insets.bottom : 0,
    },
  });

  return (
    <>
      {isSafe && <View style={{ height: insets.top }} />}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={isKeyboard && 'always'}
        keyboardDismissMode={isKeyboard && 'on-drag'}
        refreshControl={onRefresh && RefreshStatus({ onRefresh, refreshing })}
        {...props}>
        {children}
      </ScrollView>
    </>
  );
};
