import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

export class NotificationDispatcher
{
    public constructor(){}

    public async SendBloodSugarWarning(text: string)
    {
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

  async startApp() 
  {
    const permissions = await notifee.getNotificationSettings();
    if(permissions.authorizationStatus == AuthorizationStatus.NOT_DETERMINED)
    {
      // request permission
      await notifee.requestPermission();
    }
    else if(permissions.authorizationStatus == AuthorizationStatus.AUTHORIZED)
    {
      // grant entry to app
    }
    else if(permissions.authorizationStatus == AuthorizationStatus.DENIED)
    {
      // deny entry to app
    }
  }
}