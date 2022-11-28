<template lang="">
  <div class="container__confirm">
    <Notification
      v-if="isShowNotify"
      :setIsShowNotify="setIsShowNotify"
      :type="type"
      :setToggleConfirm="setToggleConfirm"
      :num="
        listSelected?.length < 10
          ? `0${listSelected?.length}`
          : listSelected?.length
      "
    />
    <div class="confirm">
      <div class="content">
        <i class="fa-solid fa-triangle-exclamation confirm_icon"></i>
        <div class="confirm_text">
          <b v-if="type === TypeConfirm.deleteMultipleAsset">
            {{
              listSelected?.length < 10
                ? `0${listSelected?.length}`
                : listSelected?.length
            }}
          </b>
          {{ textWarning }}
          <b v-if="type === TypeConfirm.deleteAsset">
            {{ listSelected[0]?.fixed_asset_code }} -
            {{ listSelected[0]?.fixed_asset_name }}
          </b>
          ?
        </div>
      </div>
      <div class="footer">
        <div
          v-if="
            type === TypeConfirm.addForm || type === TypeConfirm.cloningForm
          "
        >
          <button class="btn-cancel" @click="setToggleConfirm()">
            {{ Enums.btnNo }}
          </button>
          <button class="btn-save" @click="onClickCancel()">
            {{ Enums.btnCancel }}
          </button>
        </div>
        <div v-if="type === TypeConfirm.editForm">
          <button class="btn-cancel" @click="onClickCancel()">
            {{ Enums.btnCancel }}
          </button>
          <button class="btn-unCancel" @click="setToggleConfirm()">
            {{ Enums.btnUnSave }}
          </button>
          <button class="btn-save" @click="onClickSave()">
            {{ Enums.btnSave }}
          </button>
        </div>
        <div
          v-if="
            type === TypeConfirm.deleteAsset ||
            type === TypeConfirm.deleteMultipleAsset
          "
        >
          <button class="btn-cancel" @click="setToggleConfirm()">
            {{ Enums.btnNo }}
          </button>
          <button class="btn-save" @click="onClickDelete()">
            {{ Enums.btnDelete }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { openToast } from "../../js/state";
import { Enums, TypeConfirm } from "@/assets/Constants";
import BaseNotification from "../Notification/BaseNotification.vue";
// import axios from "axios";
export default {
  data() {
    return {
      textWarning: "",
      isShowNotify: false,
    };
  },
  components: {
    Notification: BaseNotification,
  },
  methods: {
    /**
     * Ẩn hiện cảnh báo
     * Create by Vu Minh Dang (15/11/2022)
     */
    setIsShowNotify() {
      this.isShowNotify = !this.isShowNotify;
    },

    /**
     * Thực hiện khi click vào nút cancel
     * Create by Vu Minh Dang (15/11/2022)
     */
    onClickCancel() {
      this.setToggleConfirm();
      this.toggleModal();
    },

    /**
     * Thực hiện khi click vào nút save
     * Create by Vu Minh Dang (15/11/2022)
     */
    onClickSave() {
      this.emitter.emit("submit");
      this.setToggleConfirm();
    },

    /**
     * Thực hiện khi click vào nút delete
     * Create by Vu Minh Dang (15/11/2022)
     */
    onClickDelete() {
      this.setToggleConfirm();
      const assetDeletes = [];
      this.listSelected?.forEach((select) => {
        assetDeletes.push(select.fixed_asset_id);
      });
      this.emitter.emit("deleteAsset", assetDeletes);
    },
  },
  props: {
    type: Number,
    toggleModal: Function,
    setToggleConfirm: Function,
    listSelected: Array,
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
      case TypeConfirm.addForm:
        return (this.textWarning = Enums.quesCancelDeclaration);
      case TypeConfirm.cloningForm:
        return (this.textWarning = Enums.quesCancelDeclaration);
      case TypeConfirm.editForm:
        return (this.textWarning = Enums.quesCancelChange);
      case TypeConfirm.deleteAsset:
        return (this.textWarning = Enums.quesDeleteAsset);
      case TypeConfirm.deleteMultipleAsset:
        return (this.textWarning = Enums.quesDeleteMultipleAsset);
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
  margin-top: 20px;
}
.container__confirm {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
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
  padding: 30px 30px 20px 30px;
  line-height: 1.5;
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
  padding: 10px 0 25px 0px;
  border-radius: 0 0px 4px 4px;
}
.btn-cancel {
  background-color: #fff;
  padding: 10px 0px;
  border: 1px solid #b1b1b1;
  border-radius: 3.5px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  outline: none;
}
.btn-unCancel {
  background-color: #fff;
  padding: 10px 0;
  border: 1px solid #1ba4c8;
  border-radius: 3.5px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #1ba4c8;
  width: 100px;
  outline: none;
}

.btn-unCancel:hover {
  background-color: #d1edf4;
}

.btn-cancel:hover,
:focus {
  background-color: #1aa4c8;
  color: #fff;
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
