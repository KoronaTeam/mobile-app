<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Button text="Zrób zdjęcie"
              @tap="onButtonTap"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import * as camera from 'nativescript-camera';
  import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
  import { ImageSource } from 'tns-core-modules/image-source';
  import GeoLoc from '@/services/GeoLoc';
  import { LocationInterface } from '@/@types/location.interface';
  import { API } from '@/consts';

  @Component
  export default class TakePhoto extends Vue {
    private async onButtonTap() {
      if (!await this.gainPermissions()) return;
      const base64 = await this.takePhoto();

      if (!base64) return;

      if (!await GeoLoc.getPermissions()) return;
      const loc = await GeoLoc.getLocation();

      await this.saveData(base64, loc);

      // TODO: przekierować użytkownika na NoAction.vue
    }

    private async gainPermissions() {
      try {
        await this.requestPermissions();
        return true;
      } catch {
        alert('Zazwól na dostęp do aparatu!');
        return false;
      }
    }

    private async takePhoto() {
      const options = {
        cameraFacing: 'front',
      } as any;

      try {
        const imageAsset = await camera.takePicture(options);
        return await this.getBase64From(imageAsset);
      } catch (err) {
        alert('Błąd!');
        return false;
      }
    }

    private async saveData(base64: string, loc: LocationInterface) {
      try {
        await fetch(`${API}/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            photo: base64,
            location: {
              latitude: loc.latitude,
              longitude: loc.longitude,
            },
          }),
        });

        return true;
      } catch (err) {
        return false;
      }
    }

    private async getBase64From(imageAsset: ImageAsset) {
      const imageSource = await ImageSource.fromAsset(imageAsset)
      return imageSource.toBase64String('jpg');
    }

    private requestPermissions() {
      return new Promise((resolve, reject) => {
        camera.requestPermissions().then(
          function success() {
            resolve();
          },
          function failure() {
            reject();
          },
        );
      });
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    background-color: #F44336;
    color: #fff;
  }
</style>