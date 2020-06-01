<template>
  <Page @loaded="loaded">
    <Navigator :defaultRoute="defaultRoute"
               v-if="ready" />
  </Page>

</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import { hasKey, setString } from 'tns-core-modules/application-settings';
  import * as firebase from 'nativescript-plugin-firebase';

  @Component
  export default class App extends Vue {
    private ready = false;

    private get defaultRoute() {
      return hasKey('phone')
        ? (hasKey('pendingRequestToken') ? '/takephoto' : '/noaction')
        : '/login';
    }

    private navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
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

      this.ready = true;
    }
  }
</script>