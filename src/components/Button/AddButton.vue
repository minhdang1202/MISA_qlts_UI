<template lang="">
  <button class="btn btn-add" @click="toggleModal" title="Thêm tài sản">
    + {{ Enums.btnAddAsset }}
  </button>
</template>
<script>
import { toggleModal } from "../../js/state";
import { Enums } from "@/assets/Constants";
export default {
  setup() {
    return { toggleModal, Enums };
  },
};
</script>
<style lang="css" scoped>
.btn {
  background-color: #1aa4c8;
  border-radius: 3px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.16);
  width: 110px;
  height: 36px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  font-size: 13px;
  color: #ffffff;
  margin: 1px;
}

.btn-add:hover {
  background-color: #0582a2;
}
.btn-add:active {
  background-color: #28b7dc;
}
</style>
