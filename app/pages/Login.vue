<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Image src="~/assets/images/korona-logo.png"
             stretch="none" />
      <StackLayout class="form">
        <Label text="Numer telefonu" />
        <TextField :text="phone"
                   keyboardType="phone"
                   @textChange="onPhoneChange" />
        <Label text="Kod PIN"
               class="mt" />
        <TextField :text="pin"
                   maxLength="4"
                   keyboardType="number"
                   secure
                   @textChange="onPinChange" />
        <Button text="Rozpocznij kwarantannę"
                @tap="onButtonTap" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import * as geolocation from 'nativescript-geolocation';
  import { Accuracy } from 'tns-core-modules/ui/enums'; // used to describe at what accuracy the location should be get
  import {
    setNumber,
    setString,
  } from 'tns-core-modules/application-settings';

  @Component
  export default class Login extends Vue {
    // TODO: <a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector created by freepik - www.freepik.com</a>

    private phone = '';
    private pin = '';

    private navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
    }

    private onPhoneChange({ value }: any) {
      this.phone = value;
      // TODO: sprawdzanie czy telefon poprawnie zapisany
    }

    private onPinChange({ value }: any) {
      this.pin = value;
    }

    private async onButtonTap() {
      try {
        await geolocation.enableLocationRequest();
      } catch {
        alert('Zazwól na dostęp do GPS!');
        return;
      }
      const loc = await geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000,
      });

      // TODO: podać prawdziwy adres backendu
      fetch('https://postman-echo.com/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: this.phone,
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude
          },
        }),
      });

      setString('phone', this.phone);
      setNumber('location.latitude', loc.latitude);
      setNumber('location.longitude', loc.longitude);

      this.navigateTo('/noaction');
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    background-color: #F44336;
    color: #fff;
  }

  Image {
    horizontal-align: center;
    margin-top: 56em;
  }

  Label {
    margin-left: 4em;
    margin-bottom: -8em;
  }

  Button {
    margin-top: 16em;
  }

  .form {
    margin: 28em;
    padding: 16em;
    background-color: #fff;
    color: #222;
    border-radius: 5%;
  }

  .mt {
    margin-top: 16em;
  }
</style>
