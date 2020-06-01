<template>
  <Page actionBarHidden="true"
        @loaded="loaded">
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
                @tap="startProcess" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import {
    setNumber,
    setString,
    getString,
  } from 'tns-core-modules/application-settings';
  import { LocationInterface } from '@/@types/location.interface';
  import GeoLoc from '@/services/GeoLoc';
  import { API } from '@/consts';

  @Component
  export default class Login extends Vue {
    // TODO: <a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector created by freepik - www.freepik.com</a>

    private phone = '';
    private pin = '';
    private pushToken = '';

    private tokenCheckCount = 0;

    loaded() {
      this.waitForPushToken();
    }

    private waitForPushToken() {
      if (this.tokenCheckCount > 10) {
        alert('Nie udało się zarejestrować w Firebase!');
        return;
      }

      setTimeout(() => {
        const token = getString('pushToken');
        this.tokenCheckCount++;

        if (token) {
          this.pushToken = token;
        } else {
          this.waitForPushToken();
        }
      }, 500);
    }

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

    private async startProcess() {
      if (!await GeoLoc.getPermissions()) return;

      const loc = await GeoLoc.getLocation();
      this.saveData(loc);

      this.navigateTo('/noaction');
    }

    private saveData(loc: LocationInterface) {
      fetch(`${API}/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: this.phone,
          password: this.pin,
          pushToken: this.pushToken,
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
        }),
      });

      setString('phone', this.phone);
      setString('pin', this.pin);
      setNumber('location.latitude', loc.latitude);
      setNumber('location.longitude', loc.longitude);
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
