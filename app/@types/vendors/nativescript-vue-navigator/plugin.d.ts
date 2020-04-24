import { NavigationEntryVue } from 'nativescript-vue';
import Vue from 'nativescript-vue';

declare module 'vue/types/vue' {
  interface Vue {
    $navigator: {
      navigate: (to: string, options?: NavigationEntryVue) => void;
      back: () => void;
      modal: (to: string, options?: any) => void;
    };
  }
}