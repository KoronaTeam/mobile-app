<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <DockLayout stretchLastChild="false"
                backgroundColor="#3c495e">
      <Label :text="userGreet"
             @tap="onClick"
             dock="bottom"
             height="40"
             backgroundColor="#289062"/>
    </DockLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example1 extends Vue {
    private userName: string = 'Jacek';

    private names: string[] = [
      'Jacek',
      'Julian',
      'Radek',
      'Mateusz',
    ];

    get userGreet() {
      return `Witaj użytkowniku ${this.userName}`;
    }

    onClick() {
      const index = Math.floor(Math.random() * 4);
      this.userName = this.names[index];
    }
  }
</script>

<style lang="scss" scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
</style>