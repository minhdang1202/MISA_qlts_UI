<template lang="">
  <div class="container">
    <div class="search-icon"></div>
    <input
      type="text"
      class="input"
      :placeholder="Enums.txtSearch"
      :title="Enums.txtSearch"
    />
  </div>
</template>
<script>
import { Enums } from "@/assets/Constants";
export default {
  props: {
    name: String,
  },

  setup() {
    return { Enums };
  },
};
</script>
<style lang="css" scoped>
.container {
  border-radius: 2.5px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #afafaf;
  width: 179px;
  height: 33px;
  position: relative;
}
.search-icon {
  background: url("../assets/qlts-icon.svg") no-repeat -243px -23px;
  width: 18px;
  height: 18px;
  left: 15px;
  position: absolute;
}
.input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  padding-left: 40px;
  padding-right: 15px;
  overflow: hidden;
}
.input::placeholder {
  font-style: italic;
}
.container:hover {
  border-color: #037ad8;
}
</style>
