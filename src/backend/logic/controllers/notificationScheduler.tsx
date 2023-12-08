import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

export class NotificationScheduler
{
    public constructor(){}

    public static scheduleNotification(date: Date) // parse an object with timestamp and some other info about event
    {
      // schedule notifications for a week
      async function onCreateTriggerNotification() 
      {
        let _date = date;
        // Create a time-based trigger
        const trigger: TimestampTrigger = 
        {
          type: TriggerType.TIMESTAMP,
          timestamp: _date.getTime(), // fire at 11:10am (10 minutes before meeting)
        };
        const channelId = await notifee.createChannel(
          {
            id: 'important',
            name: 'Important Notifications',
            importance: AndroidImportance.HIGH,
          });
          // Create a trigger notification
          await notifee.createTriggerNotification(
          {
            title: 'Meeting with Jane', // take from parsed object
            body: 'Today at 11:20am', // same here
            android: {
              channelId,
            },
          },
            trigger,
          );
      }
        onCreateTriggerNotification();
    }
    public static cancelAllNotifications()
    {
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