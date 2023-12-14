import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { EventType } from '../../data/event/EventTypes';

/**
 * @type Controller
 * @description
 * This class is responsible for scheduling a given notification
 * and canceling all notifications present in the stack provided
 * by @class notifee. 
 * 
 * @note Could likely be merged with NotificationDispatcher
 */

export class NotificationScheduler {
  
  public constructor() {

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

  public static scheduleNotification(description : string, type : EventType, timestamp : Date) {
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

  public static cancelAllNotifications() {
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