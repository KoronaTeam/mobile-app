<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Button text="Zrób zdjęcie"
              @tap="onButtonTap" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import * as camera from 'nativescript-camera';
  import { Image } from 'tns-core-modules/ui/image';

  @Component
  export default class TakePhoto extends Vue {
    private async onButtonTap() {
      try {
        await this.requestPermissions();
      } catch {
        alert('Zazwól na dostęp do aparatu!');
        return;
      }

      const options = {
        cameraFacing: 'front',
      } as any;

      camera.takePicture(options)
        .then((imageAsset) => {
          alert('Mamy fotę!');
          const image = new Image();
          image.src = imageAsset;
        })
        .catch((err) => {
          alert('Błąd!');
        });
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