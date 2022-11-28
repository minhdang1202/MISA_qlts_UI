<template lang="">
  <div>
    <Header />
    <Content />
  </div>
</template>
<script>
import BaseContent from "../layout/AssetPage/BaseContent.vue";
import BaseHeader from "../layout/AssetPage/BaseHeader.vue";

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
