<template lang="">
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
import { ref } from "vue";
export default {
  components: {},
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
