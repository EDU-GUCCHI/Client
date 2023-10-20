import {StyleSheet} from 'react-native';

const darkBlue = '#153243';
const lightBlue = '#284B63';
const lightBeige = '#E0DDD5';
const darkRed = '#800E13';
const lightRed = '#AD2831';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  input_container: {},

  input_view: {
    backgroundColor: lightBeige,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  text_input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 10,
    marginTop: 20,
  },

  sign_up_link: {
    height: 30,
    marginBottom: 30,
    marginTop: 10,
  },

  continue_button: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: lightBlue,
    color: lightBeige,
  },

  white_text: {
    color: 'white',
  },
});

export default styles;
