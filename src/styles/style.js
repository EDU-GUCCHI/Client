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

  header_text: {
    fontSize: 42,
    textAlign: 'center',
    paddingTop: 30,
    color: darkRed,
    backgroundColor: 'white',
    fontWeight: 'bold',
  },

  input_container: {},

  input_view: {
    backgroundColor: lightBeige,
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'start',
  },

  text_input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 15,
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
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: lightBlue,
  },

  color_white: {
    color: 'white',
  },

  button_text: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },

  menu_button: {
    width: '70%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: lightBlue,
  },
});

export default styles;
