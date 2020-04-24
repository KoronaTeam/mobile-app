<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*">
      <Label class="message" :text="$store.getters.getDupa" col="0" row="0"/>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class Home extends Vue {

  }
</script>

<style lang="scss" scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20px;
    color: #333333;
  }
</style>
