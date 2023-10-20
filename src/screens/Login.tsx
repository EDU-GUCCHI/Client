import {useState} from 'react';
import {
  Platform,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/style.js';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      {/* TODO: Add sign up link styling and change the style from forgot_button to sign_up_link */}
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Not a member? Sign up!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login_button}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
