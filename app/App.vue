<template>
  <Navigator :defaultRoute="defaultRoute" />
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';
  import { hasKey } from 'tns-core-modules/application-settings';

  @Component
  export default class App extends Vue {
    private get defaultRoute() {
      return hasKey('phone') ? '/noaction' : '/login';
    }
  }
</script>