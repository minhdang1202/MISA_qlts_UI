<template lang="">
  <div>Tài sản HT-ĐB</div>
  <input type="text" v-model="inputData" />
  <div>
    {{ inputData }}
  </div>
  <input type="text" v-model="inputData" />
</template>
<script>
export default {
  data() {
    return {
      inputData: "",
    };
  },
};
</script>
<style lang=""></style>
