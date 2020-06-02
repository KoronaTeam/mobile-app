<template>
  <Page actionBarHidden="true"
        @loaded="loaded">
    <DockLayout stretchLastChild="true"
                ref="dock">
      <AbsoluteLayout dock="top"
                      height="100"
                      ref="absolute">
        <Image src="~/assets/images/korona-logo.png"
               stretch="aspectFit"
               class="big-camera"
               width="500"
               height="500"
               top="-90"
               left="-25"/>
      </AbsoluteLayout>
      <StackLayout dock="bottom"
                   ref="stack">
        <AbsoluteLayout width="250"
                        height="250"
                        class="counter-layout"
                        ref="absolute2">
          <Label class="counter-ring"
                 top="-15"
                 left="-15"
                 ref="ring"></Label>
          <Label class="counter">{{ timeLeft }}</Label>
        </AbsoluteLayout>
        <Label class="user-info"
               textWrap="true">Wykonaj zdjęcie swojej twarzy, tak aby była widoczna w całości i dobrze oświetlona. Pamiętaj by tło zdjęcia było takie same na każdym zdjęciu</Label>
        <SVGImage src="~/assets/images/photo-camera.svg"
                  width="500"
                  height="102"
                  @tap="onButtonTap"/>
        <Label class="icon-label"
               @tap="onButtonTap">Zrób zdjęcie</Label>
      </StackLayout>
    </DockLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Mixins, Component } from 'vue-property-decorator';
  import * as camera from 'nativescript-camera';
  import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
  import { ImageSource } from 'tns-core-modules/image-source';
  import GeoLoc from '@/services/GeoLoc';
  import { LocationInterface } from '@/@types/location.interface';
  import { API } from '@/consts';
  import { remove, getString } from 'tns-core-modules/application-settings';
  import NavigatorMixin from '@/pages/Mixins/NavigatorMixin';
  import * as app from 'tns-core-modules/application';
  import * as platform from 'tns-core-modules/platform';
  import { AnimationCurve } from 'tns-core-modules/ui/enums';

  @Component
  export default class TakePhoto extends Mixins(NavigatorMixin) {
    // TODO: Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    private time = 600;
    private counter: number | null = null;

    private get timeLeft() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time - (minutes * 60);

      return `${this.addLeadingZeros(minutes)}:${this.addLeadingZeros(seconds)}`;
    }

    private addLeadingZeros(num: number) {
      return ('00' + num).slice(-2);
    }

    private loaded() {
      const dock = (this.$refs.dock as any).nativeView;
      const absolute = (this.$refs.absolute as any).nativeView;
      const stack = (this.$refs.stack as any).nativeView;
      const absolute2 = (this.$refs.absolute2 as any).nativeView;

      if (app.android && platform.device.sdkVersion >= '21') {
        dock.android.setClipChildren(false);
        absolute.android.setClipChildren(false);
        stack.android.setClipChildren(false);
        absolute2.android.setClipChildren(false);
      }

      if (this.counter) return;
      this.makeAnimation();

      this.counter = setInterval(() => {
        this.time--;

        if (this.time <= 0) {
          clearInterval(this.counter);
        }
      }, 1000) as unknown as number;
    }

    private async makeAnimation() {
      const ring = (this.$refs.ring as any).nativeView;
      const animationOptions = {
        duration: 500,
        curve: AnimationCurve.easeInOut,
      };

      await ring.animate({
        scale: {
          x: 1,
          y: 1,
        },
        opacity: 1,
        ...animationOptions,
      });
      await ring.animate({
        scale: {
          x: 1.2,
          y: 1.2,
        },
        opacity: 0,
        ...animationOptions,
      });
      await ring.animate({
        scale: {
          x: 0.1,
          y: 0.1,
        },
        opacity: 0,
        duration: 1,
      });

      this.makeAnimation();
    }

    private async onButtonTap() {
      if (!await this.gainPermissions()) return;
      const base64 = await this.takePhoto();

      if (!base64) return;

      if (!await GeoLoc.getPermissions()) return;
      const loc = await GeoLoc.getLocation();

      if (await this.saveData(base64, loc)) {
        remove('pendingRequestToken');

        this.navigateTo('/noaction');
      }
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
        const token = getString('pendingRequestToken');
        await fetch(`${API}/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            photo: base64,
            token: token,
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
      const imageSource = await ImageSource.fromAsset(imageAsset);
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
  DockLayout {
    background-color: #F44336;
    color: #fff;
  }

  .big-camera {
    opacity: .3;
    transform: rotate(25deg);
  }

  .counter-layout {
    horizontal-align: center;
    margin-bottom: 45em;
  }

  .counter-ring {
    width: 280em;
    height: 280em;
    background-color: #fff;
    border-radius: 250em;
    transform: scale(0.1, 0.1);
    opacity: 0;
  }

  .counter {
    font-size: 80em;
    text-align: center;
    padding: 70em 0;
    width: 250em;
    height: 250em;
    color: #F44336;
    background-color: #fff;
    border-radius: 250em;
  }

  .user-info {
    font-size: 18em;
    text-align: center;
    padding: 0 16em;
    margin-bottom: 16em;
  }

  .icon-label {
    font-size: 30em;
    horizontal-align: center;
  }
</style>