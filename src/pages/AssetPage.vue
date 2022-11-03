<template lang="">
  <div>
    <Header />
    <Content />
  </div>
</template>
<script>
import BaseContent from "../layout/BaseContent.vue";
import BaseHeader from "../layout/BaseHeader.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header: BaseHeader,
    Content: BaseContent,
  },
};
</script>
<style lang=""></style>
