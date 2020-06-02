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
               @tap="navigateTo('/takephoto')"/>
        <Waves ref="waves" />
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
  import Waves from './NoAction/Waves.vue';

  @Component({
    components: {
      Waves,
    },
  })
  export default class NoAction extends Vue {
    protected navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
    }

    private loaded(args: any) {
      // HACK: nowy android przycina elementy do rodzica
      // source: https://github.com/nativescript-vue/nativescript-vue/issues/434
      const dock = (this.$refs.dock as any).nativeView;
      const stack = (this.$refs.stack as any).nativeView;

      // Needed to avoid masking child components on Android
      if (app.android && platform.device.sdkVersion >= '21') {
        dock.android.setClipChildren(false);
        stack.android.setClipChildren(false);
      }

      (this.$refs.waves as any).loaded();
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
</style>