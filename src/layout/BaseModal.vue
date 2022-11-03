<template lang="">
  <div class="container__modal">
    <Confirm
      v-show="isShowConfirm"
      :type="type"
      :toggleModal="toggleModal"
      :setToggleConfirm="setToggleConfirm"
    />
    <div class="modal">
      <div class="header">
        <p>
          {{ title }}
        </p>
        <button class="close-icon" @click="toggleModal"></button>
      </div>

      <div class="content">
        <InputModal
          :title="Enums.txtAssetCode"
          :value="assetCode"
          class="mr-20"
          tabindex="0"
          @inputData="updateInput"
          ref="firstFocus"
        />
        <InputModal
          :title="Enums.txtAssetName"
          :placeholder="Enums.txtTyingAssetName"
          class="grid-col-2-4"
          :value="assetName"
          :error="!hasAssetName && Enums.txtValidateEmpty"
          @inputData="updateInput"
          :isEmpty="hasAssetName"
        />
        <Combobox
          :title="Enums.txtDepartmentCode"
          :options="DEPARTMENT_CODE"
          :option_default="Enums.txtTypingDepartmentCode"
          class="mr-20 mt-20"
          id="combo1"
          hideScroll
          :value="departmentCode"
          @inputData="updateInput"
          :error="!hasDepartmentCode && Enums.txtValidateEmpty"
        />
        <InputModal
          :title="Enums.txtDepartmentName"
          class="mt-20 grid-col-2-4"
          :value="departmentName"
          disabled
        />
        <Combobox
          :title="Enums.txtAssetTypeCode"
          :options="DEPARTMENT_CODE"
          :option_default="Enums.txtTypingDepartmentCode"
          class="mr-20 mt-20"
          id="combo2"
          hideScroll
          :value="assetTypeCode"
          :error="!hasAssetTypeCode && Enums.txtValidateEmpty"
          @inputData="updateInput"
        />
        <InputModal
          :title="Enums.txtAssetTypeName"
          disabled
          class="mt-20 grid-col-2-4"
          :value="assetTypeName"
        />
        <InputModal
          :title="Enums.txtQuantity"
          :value="quantity"
          class="mt-20 mr-20"
          inputType="number"
          show_icon_num
          @inputData="updateInput"
          @increaseData="increase"
          @decreaseData="decrease"
        />
        <InputModal
          :title="Enums.txtPrice"
          class="mt-20 mr-20"
          inputType="number"
          :value="vueNumberFormat(price, {})"
          @inputData="updateInput"
        />
        <InputModal
          :title="Enums.txtNumberOfYears"
          class="mt-20"
          :value="numberOfYear"
          inputType="number"
          @inputData="updateInput"
        />
        <InputModal
          :title="Enums.txtDepreciation"
          :value="depreciation"
          class="mt-20 mr-20"
          inputType="number"
          show_icon_num
          @inputData="updateInput"
          @increaseData="increase"
          @decreaseData="decrease"
        />
        <InputModal
          :title="Enums.txtDepreciationValue"
          class="mt-20 mr-20"
          inputType="number"
          :value="depreciationValue"
          @inputData="updateInput"
          readonly
        />
        <InputModal
          :title="Enums.txtYearTracking"
          class="mt-20"
          :value="yearTracking"
          disabled
          @inputData="updateInput"
        />
        <InputModal
          :title="Enums.txtBuyingDate"
          class="mt-20 mr-20"
          inputType="date"
          :value="buyingDate"
          @inputData="updateInput"
          :error="!buyingDate && Enums.txtValidateDate"
        />
        <InputModal
          :title="Enums.txtUsingDate"
          class="mt-20 mr-20"
          inputType="date"
          :value="usingDate"
          @inputData="updateInput"
          :error="!usingDate && Enums.txtValidateDate"
        />
      </div>
      <div class="footer">
        <button class="btn-cancel" @click="setToggleConfirm()">
          {{ Enums.btnCancel }}
        </button>
        <button
          class="btn-save"
          @click="submitHandler()"
          @focus="this.$refs.firstFocus.$el.lastChild.firstChild.focus()"
        >
          {{ Enums.btnSave }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInputModal from "../components/BaseInputModal.vue";
import BaseCombobox from "../components/BaseCombobox.vue";
import { DEPARTMENT_NAME } from "../data";
import { openToast } from "../state";
import BaseConfirm from "./BaseConfirm.vue";
import { Enums } from "@/assets/Constants";
export default {
  data() {
    return {
      number: {
        decimal: ".",
        separator: ",",
        prefix: "$ ",
        precision: 2,
      },

      isShowConfirm: false,

      DEPARTMENT_CODE: ["A", "B", "C", "D", "E", "F"],
      assetCode: "TS000001",
      assetName: "",
      departmentCode: "",
      departmentName: "",
      assetTypeCode: "",
      assetTypeName: "",
      quantity: 1,
      price: 0,
      numberOfYear: 0,
      depreciation: 0,
      depreciationValue: 0,
      yearTracking: String(new Date().getFullYear()),
      buyingDate: this.getCurrentDate(),
      usingDate: this.getCurrentDate(),
      hasAssetName: true,
      hasDepartmentCode: true,
      hasAssetTypeCode: true,
    };
  },
  props: {
    title: String,
    toggleModal: Function,
    type: Number,
  },
  components: {
    InputModal: BaseInputModal,
    Combobox: BaseCombobox,
    Confirm: BaseConfirm,
  },

  methods: {
    calDepreciationValue() {
      if (this.depreciation !== 0 && this.price !== 0) {
        this.depreciationValue = this.depreciation * this.price;
      } else {
        this.depreciationValue = 0;
      }
    },

    setToggleConfirm() {
      this.isShowConfirm = !this.isShowConfirm;
    },
    /**
     * Validate dữ liệu sau khi submit
     * Author : Vu Minh Dang (25/10/2022)
     */
    validateData() {
      if (!this.assetName) {
        this.hasAssetName = false;
      } else {
        this.hasAssetName = true;
      }
      if (!this.departmentCode) {
        this.hasDepartmentCode = false;
      } else {
        this.hasDepartmentCode = true;
      }
      if (!this.assetTypeCode) {
        this.hasAssetTypeCode = false;
      } else {
        this.hasAssetTypeCode = true;
      }
    },

    /**
     * Sự kiện submit form
     * Author : Vu Minh Dang (25/10/2022)
     */

    submitHandler() {
      this.validateData();

      openToast();
      // setTimeout(() => this.toggleModal(), 500);
    },

    /**
     * Lấy ngày hiện tại
     * Author : Vu Minh Dang (25/10/2022)
     */
    getCurrentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;

      return date;
    },

    /**
     * Update các biến sau khi nhập các input
     * Author : Vu Minh Dang (25/10/2022)
     */

    increase(data, type) {
      switch (type) {
        case Enums.txtQuantity:
          this.quantity = data;
          return;
        case Enums.txtDepreciation:
          this.depreciation = data;
          this.calDepreciationValue();
          return;
      }
    },
    decrease(data, type) {
      switch (type) {
        case Enums.txtQuantity:
          this.quantity = data;
          return;
        case Enums.txtDepreciation:
          this.depreciation = data;
          this.calDepreciationValue();
          return;
      }
    },

    updateInput(data, type) {
      switch (type) {
        case Enums.txtBuyingDate:
          this.buyingDate = data;
          return;
        case Enums.txtUsingDate:
          this.usingDate = data;
          return;
        case Enums.txtAssetTypeCode:
          this.assetTypeCode = data;
          this.hasAssetTypeCode = true;
          this.assetTypeName =
            DEPARTMENT_NAME[this.DEPARTMENT_CODE.indexOf(data)];
          return;
        case Enums.txtQuantity:
          this.quantity = data;
          return;
        case Enums.txtDepreciationValue:
          this.depreciationValue = data;
          return;
        case Enums.txtPrice:
          this.price = data;
          this.calDepreciationValue();
          return;
        case Enums.txtNumberOfYears:
          this.numberOfYear = data;
          return;
        case Enums.txtDepreciation:
          this.depreciation = data;
          this.calDepreciationValue();
          return;

        case Enums.txtDepartmentCode:
          this.departmentCode = data;
          this.hasDepartmentCode = true;
          this.departmentName =
            DEPARTMENT_NAME[this.DEPARTMENT_CODE.indexOf(data)];
          return;
        case Enums.txtAssetName:
          this.assetName = data;
          this.hasAssetName = true;
          return;
      }
    },
  },
  setup() {
    return {
      DEPARTMENT_NAME,
      openToast,
      Enums,
    };
  },

  mounted() {
    this.$refs.firstFocus.$el.lastChild.firstChild.focus();
  },
};
</script>
<style lang="css" scoped>
.grid-col-2-4 {
  grid-column-start: 2;
  grid-column-end: 4;
}
.container__modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  padding: 20px 16px 0 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.modal {
  background-color: #fefefe;
  border: 1px solid #888;
  width: 50%;
  border-radius: 4px;
}

.mr-20 {
  margin-right: 16px;
}
.mt-20 {
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 0 16px;
}
.header > p {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}

.close-icon {
  background: url("../assets/qlts-icon.svg") no-repeat -375px -287px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: none;
}
.footer {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 8px 0;
  margin-top: 30px;
}
.btn-cancel {
  background-color: #fff;
  padding: 10px 35px;
  border: none;
  border-radius: 3.5px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
  outline: none;
}
.btn-cancel:hover,
:focus {
  background-color: #1aa4c8;
  color: #fff;
}
.btn-save {
  background-color: rgb(26, 164, 200);
  padding: 10px 35px;
  border: none;
  border-radius: 3.5px;
  color: white;
  margin-right: 16px;
  cursor: pointer;
  font-size: 14px;
  outline: none;
}
.btn-save:hover {
  background-color: #0582a2;
}
</style>
