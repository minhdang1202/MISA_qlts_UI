<template id="App">
  <Navbar />
  <div style="width: 100%">
    <router-view />
  </div>
  <Modal
    :title="Enums.txtAddAsset"
    v-if="show_modal === true"
    :toggleModal="toggleModal"
    :type="TypeConfirm.addForm"
  />
</template>

<script>
import BaseNavbar from "./layout/BaseNavbar.vue";
import BaseModal from "./layout/BaseModal.vue";
import { show_modal, toggleModal } from "./state";
import { TypeConfirm } from "@/assets/Constants";
import { Enums } from "@/assets/Constants";
export default {
  name: "App",

  setup() {
    return {
      show_modal,
      toggleModal,
      TypeConfirm,
      Enums,
    };
  },

  components: {
    Navbar: BaseNavbar,
    Modal: BaseModal,
  },
};
</script>

<style>
#app {
  display: flex;
  box-sizing: border-box;
  height: 100%;
  margin: 0;
}
</style>
