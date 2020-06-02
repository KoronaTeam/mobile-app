import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NavigatorMixin extends Vue {
  protected navigateTo(route: string) {
    this.$navigator.navigate(route, { transition: { name: 'slide' }, clearHistory: true });
  }
}
