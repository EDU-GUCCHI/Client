import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

export class NotificationScheduler
{
    public constructor(){}

    public scheduleNotifications()
    {
        // schedule notifications for a week
        async function onCreateTriggerNotification() {
            const date = new Date(Date.now());
            date.setHours(11);
            date.setMinutes(10);
        
            // Create a time-based trigger
            const trigger: TimestampTrigger = {
              type: TriggerType.TIMESTAMP,
              timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
            };
        
            const channelId = await notifee.createChannel({
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
                  channelId: 'your-channel-id',
                },
              },
              trigger,
            );
          }
    }    
}