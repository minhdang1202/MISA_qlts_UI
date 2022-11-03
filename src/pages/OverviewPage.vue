<template lang="">
  <Combobox />
  {{
    vueNumberFormat(275, {
      prefix: "0",
      decimal: ",",
      thousand: ".",
      precision: 2,
      acceptNegative: true,
      isInteger: false,
    })
  }}
  <button @click="openToast"></button>
</template>
<script>
import BaseCombobox from "../components/BaseCombobox.vue";
import { ref } from "vue";
export default {
  components: {
    Combobox: BaseCombobox,
  },
  methods: {
    openToast() {
      this.showToast = !this.showToast;
      setTimeout(() => (this.showToast = false), 1500);
    },
  },
  setup() {
    const showToast = ref(false);

    return { showToast };
  },
};
</script>
<style lang="css"></style>
