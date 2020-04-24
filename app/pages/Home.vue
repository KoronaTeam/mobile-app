<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!" />
    <StackLayout backgroundColor="#3c495e">
      <Label backgroundColor="#43b883"
             text="Example1"
             @tap="navigateTo('/example1')" />
      <Label text="Example2"
             backgroundColor="#289062" />
      <Label text="Example3"
             backgroundColor="#1c6b48" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {
    navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' } });
    }
  }
</script>

<style lang="scss" scoped>
  ActionBar {
    background-color: #53ba82;
    color: #fff;
  }

  Label {
    height: 70;
    text-align: center;
    color: #fff;

    padding: 20;
    font-size: 20;
  }
</style>
