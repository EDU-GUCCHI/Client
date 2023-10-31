import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {s} from 'react-native-wind';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  return (
    <View style={s`flex p-14 bg-emerald-600`}>
      {/* Profile Info */}
      <View style={myGotchiStyles.profileInfoContainer}>
        <View style={myGotchiStyles.profileImageContainer}>
          <Text>🙂</Text>
        </View>
        <Text style={myGotchiStyles.profileName}>Alex-GOTCHI</Text>
        <Text style={myGotchiStyles.profileDetails}>
          Young adult • Height 184 cm • Weight 65 kg
        </Text>
      </View>

      {/* Stats */}
      <View style={myGotchiStyles.statsRow}>
        <View style={myGotchiStyles.statContainerGreen}>
          <Text style={myGotchiStyles.statText}>85 bpm</Text>
          <Text style={myGotchiStyles.emojiStat}>❤️</Text>
        </View>
        <View style={myGotchiStyles.statContainerBlue}>
          <Text style={myGotchiStyles.statText}>480 kcal</Text>
          <Text style={myGotchiStyles.emojiStat}>🏃‍♂️</Text>
        </View>
      </View>
      <View style={myGotchiStyles.statsRow}>
        <View style={myGotchiStyles.statContainerPink}>
          <Text style={myGotchiStyles.statText}>1,7 L</Text>
          <Text style={myGotchiStyles.emojiStat}>💧</Text>
        </View>
        <View style={myGotchiStyles.statContainerLight}>
          <Text style={myGotchiStyles.statText}>8h 24m</Text>
          <Text style={myGotchiStyles.emojiStat}>🛌</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={myGotchiStyles.footerMenu}>
        <TouchableOpacity>
          <Text style={styles.color_white}>Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.color_white}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.color_white}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MyDayScreen;

const neonRed = '#FF2C55';
const neonBlue = '#0AD4FA';
const neonGreen = '#02E67E';
const neonPink = '#FF66D9';
const neonLight = '#E9F1F7';
const neonDark = '#1E2532';

const myGotchiStyles = StyleSheet.create({
  profileInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    backgroundColor: neonPink,
    padding: 20,
    borderRadius: 50,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  profileSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  profileDetails: {
    color: 'white',
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statContainerGreen: {
    flex: 1,
    backgroundColor: neonGreen,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  statContainerBlue: {
    flex: 1,
    backgroundColor: neonBlue,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  statContainerPink: {
    flex: 1,
    backgroundColor: neonPink,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  statContainerLight: {
    flex: 1,
    backgroundColor: neonLight,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  statText: {
    color: 'black',
    fontSize: 24,
  },
  emojiStat: {
    color: 'black',
    paddingTop: 15,
    fontSize: 28,
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
});
