<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Label @tap="navigateTo('/takephoto')">TakePhoto.vue</Label>
      <Label class="title">Wielki Brat czuwa!</Label>
      <Label class="subtitle"
             textWrap>Nie stresuj się tak i nie zaglądaj tu dopóki Cię nie poprosimy</Label>
      <Label class="caption">Pooglądaj sobie zwierzątka:</Label>
      <GridLayout columns="125, 125"
                  rows="125, 125, 125">
        <Image :src="`http://www.randomkittengenerator.com/cats/rotator.php?t=${timestamp}&i=${index}`"
               stretch="fill"
               col="0"
               :row="index - 1"
               :key="index"
               v-for="index in 3" />
        <Image :src="`https://www.randomdoggiegenerator.com/randomdoggie.php?t=${timestamp}&i=${index}`"
               stretch="fill"
               col="1"
               :row="index - 1"
               :key="index"
               v-for="index in 3" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class NoAction extends Vue {
    get timestamp() {
      return Date.now();
    }

    private navigateTo(route: string) {
      this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    background-color: #F44336;
    color: #fff;

    & > * {
      horizontal-align: center;
      text-align: center;
    }
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