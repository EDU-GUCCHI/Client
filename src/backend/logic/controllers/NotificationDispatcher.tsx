import notifee, { AndroidImportance, AuthorizationStatus, TimestampTrigger, TriggerType } from '@notifee/react-native';

/**
 * @type Controller
 * @description
 * 
 * 
 */

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


  async testTriggerNotification(hour: number, minute: number) {

    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    const date = new Date(Date.now());
    date.setHours(hour);
    date.setMinutes(minute);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'YOU HAVE BEEN NOTIFIED',
        body: 'Today at ' + hour + ", " + minute,
        android: {
          channelId
        },
      },
      trigger,
    );
  }
}