import React from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useNotification} from '../hooks/useNotification';
import styles from '../styles/style';

function NotifeeScreen() {
  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  const handleDisplayNotification = async () => {
    // Display notification
    displayNotification('NotificationTitle', 'NotificationBody');
  };

  const handleCreateTriggerNotification = () => {
    // Display notification in 3 seconds
    displayTriggerNotification(
      'NotificationTitle',
      'NotificationBody',
      Date.now() + 3000,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, styles.center]}>
        <Button
          title="Display Notification"
          onPress={handleDisplayNotification}
        />
        <Button
          title="Create Trigger Notification"
          onPress={handleCreateTriggerNotification}
        />
        <Button
          title="Cancel All Notifications"
          onPress={cancelAllNotifications}
        />
      </View>
    </SafeAreaView>
  );
}

export default NotifeeScreen;