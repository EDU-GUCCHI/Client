import React from 'react';
import {Button, SafeAreaView, StatusBar, View} from 'react-native';
import {useNotification} from '../hooks/useNotification';
import styles from '../styles/style';
import notifee, {AndroidImportance} from '@notifee/react-native';

function NotifeeScreen() {
  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Yor blud sugar is low',
      body: 'Take action immediately',
      android: {
        channelId,
        smallIcon: 'ic_small_icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

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
      <View style={[styles.container]}>
        <Button title="Display Notification" onPress={onDisplayNotification} />
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
