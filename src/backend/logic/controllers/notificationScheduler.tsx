import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

export class NotificationScheduler
{
    public constructor(){}

    public scheduleNotification(date: Date)
    {
        // schedule notifications for a week
        async function onCreateTriggerNotification() 
        {

            // fetch dates for events in some form of for loop and then shedule trigger notifications with the dates

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
                title: 'Meeting with Jane',
                body: 'Today at 11:20am',
                android: {
                  channelId,
                },
              },
              trigger,
            );
          }
      onCreateTriggerNotification();
    }
    public cancelAllNotifications()
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