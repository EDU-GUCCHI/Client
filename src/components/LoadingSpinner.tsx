import { ActivityIndicator, View } from 'react-native';
import { s } from 'react-native-wind';


const LoadingSpinner = () => (
  <View style={s`flex justify-center items-center`}>
    <ActivityIndicator size="large" color="#121212" />
  </View>
);

export default LoadingSpinner;
