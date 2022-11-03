<template lang="">
  <div id="my-content" class="content">
    <transition name="toast">
      <Toast v-show="showToast" />
    </transition>
    <Confirm
      v-if="isShowConfirm"
      :type="typeDelete"
      :assetCode="listSelected.length <= 1 && listSelected[0].assetCode"
      :assetName="listSelected.length <= 1 && listSelected[0].assetName"
      :setToggleConfirm="setToggleConfirm"
      :listSelected="listSelected"
    />

    <div class="function-box">
      <div class="enter_text">
        <Input />

        <Combobox
          :options="departments"
          :option_default="Enums.txtAssetType"
          hideScroll
          hasCheck
          lineHeight="15px"
          :style="{ width: '219px' }"
          hasFilterIcon
          id="select_asset"
        />
        <Combobox
          :options="departments"
          :option_default="Enums.txtDepartment"
          hideScroll
          hasCheck
          lineHeight="15px"
          :style="{ width: '219px' }"
          hasFilterIcon
          id="select_department"
        />
      </div>
      <div class="enter_choice">
        <AddButton />
        <button class="btn btn_box" :title="Enums.txtExportFile">
          <div class="btn btn_excel"></div>
        </button>
        <button
          :disabled="listSelected.length === 0"
          class="btn_box"
          :title="Enums.txtDelete"
          @click="onClickDelete()"
        >
          <div class="btn_delete"></div>
        </button>
      </div>
    </div>
    <Table class="table" @listData="updateListSelected" />
  </div>
</template>
<script>
import { Enums, TypeConfirm } from "@/assets/Constants";
import BaseTable from "../components/BaseTable.vue";
import BaseInput from "../components/BaseInput.vue";
import AddButton from "../components/AddButton.vue";
import BaseCombobox from "../components/BaseCombobox.vue";
import BaseToast from "../components/BaseToast.vue";
import { showToast } from "../state";
import BaseConfirm from "../layout/BaseConfirm.vue";

export default {
  name: "my-content",
  data() {
    return {
      departments: ["A", "B", "C", "D", "E", "F"],
      listSelected: [],
      typeDelete: 0,
      isShowConfirm: false,
    };
  },
  components: {
    Table: BaseTable,
    Input: BaseInput,
    AddButton: AddButton,
    Combobox: BaseCombobox,
    Toast: BaseToast,
    Confirm: BaseConfirm,
  },
  methods: {
    updateListSelected(list) {
      this.listSelected = list;
    },

    onClickDelete() {
      this.setToggleConfirm();
      if (this.listSelected.length === 1) {
        this.typeDelete = TypeConfirm.deleteAsset;
      } else this.typeDelete = TypeConfirm.deleteMultipleAsset;
    },

    setToggleConfirm() {
      this.isShowConfirm = !this.isShowConfirm;
    },
  },
  setup() {
    return { showToast, Enums };
  },
};
</script>
<style lang="css" scoped>
.content {
  background-color: #f4f7ff;
  width: 100%;
}
.table {
  background-color: #ffffff;
  border-radius: 3.5px;
  border: 1px solid #afafaf;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);

  margin: 17px 20px;
}
.function-box {
  margin: 0px 20px;
  border-radius: 2.5px;
  display: flex;
  justify-content: space-between;
  padding-top: 17px;
}
.enter_text {
  display: flex;
}
.enter_text > *:not(:last-child) {
  margin-right: 11px;
}
.group-dropdown {
  display: flex;
  background-color: rgba(26, 164, 200, 0.2);
  overflow: hidden;
  align-items: center;
  background-color: #ffffff;
  border-radius: 2.5px;
  border: 1px solid #afafaf;
  width: 219px;
  height: 35px;
  justify-content: space-between;
}

.group-dropdown:hover {
  border-color: #1aa4c8;
}
.text {
  background: url("../assets/qlts-icon.svg") no-repeat -243px -69px;
  width: 17px;
  height: 16px;
  margin: 0 10px;
}

.dropdown {
  background: none;
  border: none;
  outline: none;
  width: 170px;
  margin-right: 12px;
  font-size: 13px;
}
.enter_choice {
  display: flex;
}
.enter_choice > button {
  outline: none;
}
.btn_box:active {
  background-color: #1aa4c8;
}
.enter_choice > *:not(:last-child) {
  margin-right: 11px;
}
.btn_box {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  width: 36px;
  height: 36px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}
.btn_box:disabled {
  background-color: #f5f5f5;
  cursor: no-drop;
}
.btn_excel {
  background: url("../assets/qlts-icon.svg") no-repeat -287px -111px;
  width: 18px;
  height: 17px;
}
.btn_delete {
  background: url("../assets/qlts-icon.svg") no-repeat -463px -111px;
  width: 18px;
  height: 18px;
}
</style>
