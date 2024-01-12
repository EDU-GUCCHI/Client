import notifee, { AndroidImportance, AuthorizationStatus, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { EventType } from '../../model/event/EventTypes';

/**
 * @type Controller
 * @description This class is responsible for performing all operations
 * related to notifications; scheduling, showing and canceling.
 */
export class NotificationController {

  public constructor() {
    this.checkNotificationPermission();
  }

  checkNotificationPermission = async () => {
    try {
      const settings = await notifee.getNotificationSettings();

      if (!(settings.authorizationStatus == AuthorizationStatus.AUTHORIZED)) {
        await notifee.requestPermission();
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  };

  /**
   * Sends a notification to the end-user. Takes
   * @param text as argument for the title of the notification
   */
  public async SendBloodSugarWarning(text: string) {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
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

  /**
 * This method schedules a notification using notifee and is
 * called when @class IntervalHandler finds an event that needs
 * scheduling.
 * 
 * @param description Description of the notification
 * @param type How the notification should be titled
 * @param timestamp When the notification should be triggered
 */

  public scheduleNotification(description: string, type: EventType, timestamp: Date) {
    async function onCreateTriggerNotification() {

      const trigger: TimestampTrigger =
      {
        type: TriggerType.TIMESTAMP,
        timestamp: timestamp.getTime(),
      };
      const channelId = await notifee.createChannel(
        {
          id: 'important',
          name: 'Important Notifications',
          importance: AndroidImportance.HIGH,
        });
      await notifee.createTriggerNotification(
        {
          title: type,
          body: description,
          android: {
            channelId,
          },
        },
        trigger,
      );
    }
    onCreateTriggerNotification();
  }

  /**
 * This method cancels all notifications present in the 
 * stack. To be called when @class IntervalHandler needs to
 * reschedule notifications.
 */
  public cancelAllNotifications() {
    const cancelAllTriggeredNotifications = async () => {
      try {
        await notifee.cancelAllNotifications();
        console.log('All triggered notifications cancelled successfully!');
      } catch (error) {
        console.error('Error cancelling notifications:', error);
      }
    };
    cancelAllTriggeredNotifications();
  }
}