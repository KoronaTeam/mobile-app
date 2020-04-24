<template>
  <Navigator :defaultRoute="'/home'"/>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {}
</script>