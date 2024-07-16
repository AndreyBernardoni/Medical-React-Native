import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';

function App(): JSX.Element {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Navigation />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
