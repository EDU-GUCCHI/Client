import React from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useNotification } from '../../hooks/useNotification';


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
        body: 'Take action immediately',
        android: {
          channelId,
          smallIcon: 'ic_small_icon', // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      });
    }
}