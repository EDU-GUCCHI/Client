import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Alert } from 'react-native';

export class NotificationDispatcher {
  
  public constructor() {
    this.checkNotificationPermission();
  }

  checkNotificationPermission = async () => {
    try {
      const settings = await notifee.getNotificationSettings();

      if (!(settings.authorizationStatus == AuthorizationStatus.AUTHORIZED)) {
        // Permission is denied, you might want to inform the user
        await notifee.requestPermission();
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  };
  public async SendBloodSugarWarning(text: string) {
    await notifee.requestPermission();
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification
    await notifee.displayNotification({
      title: text,
      body: 'Din Gotchi behöver dig!',
      android: {
        channelId,
        smallIcon: 'ic_small_icon', // optional, defaults to 'ic_launcher'.
        pressAction: {
          id: 'MyDay',
          launchActivity: 'MyDay',
        },
      },
      data: {

      }
    });
  }
}