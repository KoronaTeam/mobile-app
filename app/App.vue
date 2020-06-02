<template>
  <Page @loaded="loaded">
    <Navigator :defaultRoute="defaultRoute" />
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Component, Mixins } from 'vue-property-decorator';
  import { hasKey, setString } from 'tns-core-modules/application-settings';
  import * as firebase from 'nativescript-plugin-firebase';
  import NavigatorMixin from '@/pages/Mixins/NavigatorMixin';

  @Component
  export default class App extends Mixins(NavigatorMixin) {
    private get defaultRoute() {
      return hasKey('phone')
        ? (hasKey('pendingRequestToken') ? '/takephoto' : '/noaction')
        : '/login';
    }

    private async loaded() {
      await firebase.init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onPushTokenReceivedCallback: (token) => {
          setString('pushToken', token);
        },
        onMessageReceivedCallback: (message: firebase.Message) => {
          const token = message.data?.['TicketToken'];
          if (!token) {
            alert('Zepsuty push!');
            return;
          }

          setString('pendingRequestToken', token);
          this.navigateTo('/takephoto');
        },
      });
    }
  }
</script>