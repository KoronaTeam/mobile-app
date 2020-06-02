<template>
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
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import * as app from 'tns-core-modules/application';
  import * as platform from 'tns-core-modules/platform';
  import { AnimationCurve } from 'tns-core-modules/ui/enums';

  @Component
  export default class Waves extends Vue {
    public loaded() {
      // HACK: nowy android przycina elementy do rodzica
      // source: https://github.com/nativescript-vue/nativescript-vue/issues/434
      const absolute = (this.$refs.absolute as any).nativeView;
      const wave1 = (this.$refs['wave-1'] as any).nativeView;
      const wave2 = (this.$refs['wave-2'] as any).nativeView;
      const wave3 = (this.$refs['wave-3'] as any).nativeView;

      // Needed to avoid masking child components on Android
      if (app.android && platform.device.sdkVersion >= '21') {
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