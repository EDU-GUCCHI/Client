import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingSpinner = () => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
