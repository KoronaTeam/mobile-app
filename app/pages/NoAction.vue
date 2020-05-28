<template>
  <Page actionBarHidden="true"
        @loaded="loaded">
    <DockLayout stretchLastChild="true"
                ref="dock">
      <StackLayout class="header"
                   dock="top"
                   ref="stack">
        <Image src="~/assets/images/korona-logo.png"
               stretch="none"
               class="logo"
               @tap="navigateTo('/takephoto')" />
        <AbsoluteLayout ref="absolute">
          <AbsoluteLayout class="wave-1"
                          ref="wave-1">
            <SVGImage src="~/assets/images/wavy-bg-1.svg"
                      width="500"
                      height="102"
                      left="-53" />
            <SVGImage src="~/assets/images/wavy-bg-1.svg"
                      width="500"
                      height="102"
                      left="338" />
          </AbsoluteLayout>
          <AbsoluteLayout class="wave-2"
                          ref="wave-2">
            <SVGImage src="~/assets/images/wavy-bg-2.svg"
                      width="500"
                      height="102"
                      left="-53" />
            <SVGImage src="~/assets/images/wavy-bg-2.svg"
                      class="second"
                      width="500"
                      height="102"
                      left="384" />
          </AbsoluteLayout>
          <AbsoluteLayout class="wave-3"
                          ref="wave-3">
            <SVGImage src="~/assets/images/wavy-bg-3.svg"
                      width="500"
                      height="102"
                      left="-53" />
            <SVGImage src="~/assets/images/wavy-bg-3.svg"
                      width="500"
                      height="102"
                      left="447" />
          </AbsoluteLayout>
        </AbsoluteLayout>
      </StackLayout>
      <StackLayout class="content"
                   dock="bottom">
        <Label class="title">Wielki Brat czuwa!</Label>
        <Label class="subtitle"
               textWrap>Nie stresuj się tak i nie zaglądaj tu dopóki Cię nie poprosimy</Label>
      </StackLayout>
    </DockLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';

  import * as app from 'tns-core-modules/application';
  import * as platform from 'tns-core-modules/platform';

  import {
    AnimationCurve
  } from "tns-core-modules/ui/enums";

  @Component
  export default class NoAction extends Vue {
    private navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
    }

    private loaded(args: any) {
      // HACK: nowy android przycina elementy do rodzica
      // source: https://github.com/nativescript-vue/nativescript-vue/issues/434
      const dock = (this.$refs.dock as any).nativeView;
      const stack = (this.$refs.stack as any).nativeView;
      const absolute = (this.$refs.absolute as any).nativeView;
      const wave1 = (this.$refs['wave-1'] as any).nativeView;
      const wave2 = (this.$refs['wave-2'] as any).nativeView;
      const wave3 = (this.$refs['wave-3'] as any).nativeView;

      // Needed to avoid masking child components on Android
      if (app.android && platform.device.sdkVersion >= '21') {
        dock.android.setClipChildren(false);
        stack.android.setClipChildren(false);
        absolute.android.setClipChildren(false);
        wave1.android.setClipChildren(false);
        wave2.android.setClipChildren(false);
        wave3.android.setClipChildren(false);
      }

      // HACK: cssowa animacja - nie działa infinity
      // source: https://docs.nativescript.org/ui/components/animations
      wave1.animate({
        translate: {
          x: -392,
          y: 2
        },
        duration: 6000,
        iterations: Number.POSITIVE_INFINITY,
        curve: AnimationCurve.linear
      });
      wave2.animate({
        translate: {
          x: 0,
          y: 2
        },
        duration: 8000,
        iterations: Number.POSITIVE_INFINITY,
        curve: AnimationCurve.linear
      });
      wave3.animate({
        translate: {
          x: -492,
          y: 2
        },
        duration: 3000,
        iterations: Number.POSITIVE_INFINITY,
        curve: AnimationCurve.linear
      });
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    & > * {
      horizontal-align: center;
      text-align: center;
    }
  }

  .header {
    background-color: #222838;

    .logo {
      horizontal-align: center;
      margin: 56em 0;
    }
  }

  .content {
    background-color: #F44336;
    color: #fff;
  }

  .title {
    font-size: 24em;
    margin-top: 56em;
  }

  .subtitle {
    font-size: 16em;
  }

  .caption {
    margin-top: 24em;
    margin-bottom: 12em;
  }

  .wave-1,
  .wave-2,
  .wave-3 {
    transform: translate(0, 2em);
  }

  .wave-2 {
    transform: translate(-438em, 2em);
  }

  .wave-2 > * {
    opacity: .5;
  }

  .wave-3 > * {
    opacity: .1;
  }

  .wave-2 > .second {
    margin-left: .8em;
  }
</style>