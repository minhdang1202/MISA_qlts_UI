<template lang="">
  <div class="container__confirm">
    <div class="confirm">
      <div class="content">
        <i class="fa-solid fa-triangle-exclamation confirm_icon"></i>
        <div class="confirm_text" v-if="errorList">
          <div
            v-for="(error, i) in errorList"
            :key="i"
            style="margin-bottom: 6px"
          >
            {{ error }}!
          </div>
        </div>
        <div class="confirm_text" v-else>
          <b v-show="num > 1">{{ num }}</b>
          {{ textWarning }}
        </div>
      </div>
      <div class="footer">
        <button class="btn-save" @click="onClickClose()">
          {{ Enums.btnClose }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { openToast } from "../../js/state";
import { Enums, TypeConfirm } from "@/assets/Constants";

export default {
  data() {
    return {
      textWarning: "",
    };
  },
  methods: {
    /**
     * CLick vào nút đóng
     * Author : Vu Minh Dang (25/10/2022)
     */
    onClickClose() {
      this.setIsShowNotify();
      this.setToggleConfirm && this.setToggleConfirm();
    },
  },
  props: {
    type: Number,
    setIsShowNotify: Function,
    setToggleConfirm: Function,
    num: String,
    errorList: Array,
  },
  setup() {
    return {
      Enums,
      TypeConfirm,
      openToast,
    };
  },

  created() {
    switch (this.type) {
      case TypeConfirm.deleteAsset:
        return (this.textWarning = Enums.notifyDeleteAsset);
      case TypeConfirm.deleteMultipleAsset:
        return (this.textWarning = Enums.notifyDeleteMultipleAsset);
      default:
        return "";
    }
  },
};
</script>
<style lang="css" scoped>
.confirm_icon {
  color: #ffc502;
  scale: 2.5;
  margin: 0 20px;
}
.confirm_text {
  margin-left: 20px;
  font-size: 14px;
}
.container__confirm {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm {
  background-color: #fefefe;
  border: 1px solid #888;
  width: 435px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}
.content {
  display: flex;
  align-items: center;
  padding: 40px 30px 0px 30px;
  min-height: 55px;
}
.mr-20 {
  margin-right: 16px;
}
.mt-20 {
  margin-top: 20px;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  border-radius: 0 0px 4px 4px;
}
.btn-save {
  background-color: rgb(26, 164, 200);
  padding: 11px 0;
  border: none;
  border-radius: 3.5px;
  color: white;
  margin-right: 16px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  outline: none;
}
.btn-save:hover {
  background-color: #0582a2;
}
</style>
