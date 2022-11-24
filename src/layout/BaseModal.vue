<template lang="">
  <div class="container__modal">
    <Confirm
      v-if="isShowConfirm"
      :type="type"
      :toggleModal="toggleModal"
      :setToggleConfirm="setToggleConfirm"
    />
    <BaseNotification
      :errorList="errorList"
      :setIsShowNotify="setIsShowNotify"
      v-if="isShowNotify"
    />
    <div class="modal">
      <div class="header">
        <p>
          {{ title }}
        </p>
        <button class="close-icon" @click="setToggleConfirm()"></button>
      </div>

      <div class="content">
        <InputModal
          :title="Enums.txtAssetCode"
          :value="assetCode"
          class="mr-20"
          tabindex="0"
          @inputData="updateInput"
          ref="firstFocus"
          max="6"
        />
        <InputModal
          :title="Enums.txtAssetName"
          :placeholder="Enums.txtTyingAssetName"
          class="grid-col-2-4"
          :value="assetName"
          :error="!hasAssetName && Enums.txtValidateEmpty"
          @inputData="updateInput"
          :isEmpty="hasAssetName"
          max="255"
        />
        <Combobox
          :title="Enums.txtDepartmentCode"
          :options="departments"
          :option_default="Enums.txtTypingDepartmentCode"
          class="mr-20 mt-20"
          id="combo1"
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
          :options="categories"
          :option_default="Enums.txtTypingAssetTypeCode"
          class="mr-20 mt-20"
          id="combo2"
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
          max="4"
        />
        <InputModal
          :title="Enums.txtPrice"
          class="mt-20 mr-20"
          inputType="number"
          :value="price"
          @inputData="updateInput"
          :error="!hasPrice && Enums.txtValidateNumber"
          max="18"
        />
        <InputModal
          :title="Enums.txtNumberOfYears"
          class="mt-20"
          :value="numberOfYear"
          inputType="number"
          @inputData="updateInput"
          :error="!hasNumberYear && Enums.txtValidateNumber"
          max="2"
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
          :error="
            (!hasDepreciation && Enums.txtValidateNumber) ||
            (!compare && Enums.txtValidateCompare)
          "
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
          :value="purchaseDate"
          @inputData="updateInput"
          :error="!purchaseDate && Enums.txtValidateDate"
        />
        <InputModal
          :title="Enums.txtUsingDate"
          class="mt-20 mr-20"
          inputType="date"
          :value="productionTime"
          @inputData="updateInput"
          :error="!productionTime && Enums.txtValidateDate"
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
import BaseNotification from "../layout/BaseNotification.vue";
import { openToast } from "../state";
import BaseConfirm from "./BaseConfirm.vue";
import { Enums } from "@/assets/Constants";
import axios from "axios";
import { NIL as NIL_UUID } from "uuid";
export default {
  data() {
    return {
      isChangeData: false,
      isShowNotify: false,
      isShowConfirm: false,
      departments: [],
      categories: [],
      errorList: [],
      departmentId: this.dataAsset?.department_id || NIL_UUID,
      assetCode:
        this.title === Enums.txtEditAsset
          ? this.dataAsset?.fixed_asset_code
          : "",
      assetName: this.dataAsset?.fixed_asset_name || "",
      departmentCode: this.dataAsset?.department_code || "",
      departmentName: this.dataAsset?.department_name || "",
      assetTypeId: this.dataAsset?.fixed_asset_category_id || NIL_UUID,
      assetTypeCode: this.dataAsset?.fixed_asset_category_code || "",
      assetTypeName: this.dataAsset?.fixed_asset_category_name || "",
      quantity: this.dataAsset?.quantity || 1,
      price: this.dataAsset?.cost || 0,
      numberOfYear: this.dataAsset?.life_time || 0,
      depreciation: this.dataAsset?.depreciation_rate || 0,
      depreciationValue: this.dataAsset?.depreciation_year || 0,
      yearTracking:
        this.dataAsset?.tracked_year || String(new Date().getFullYear()),
      purchaseDate: this.$props.dataAsset
        ? this.dateToString(new Date(this.dataAsset?.purchase_date))
        : this.dateToString(new Date()),
      productionTime: this.$props.dataAsset
        ? this.dateToString(new Date(this.dataAsset?.production_time))
        : this.dateToString(new Date()),

      hasAssetName: true,
      hasDepartmentCode: true,
      hasAssetTypeCode: true,
      hasNumberYear: true,
      hasPrice: true,
      hasDepreciation: true,
      compare: true,
    };
  },
  props: {
    title: String,
    toggleModal: Function,
    type: Number,
    dataAsset: Object,
    isShowModal: Boolean,
  },
  components: {
    InputModal: BaseInputModal,
    Combobox: BaseCombobox,
    Confirm: BaseConfirm,
    BaseNotification,
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
     * Chuyển dateTime api trả về sang string
     * Author : Vu Minh Dang (25/10/2022)
     */
    dateToString(date) {
      const newDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return newDate;
    },

    /**
     * Tính giá trị hao mòn năm
     * Author : Vu Minh Dang (1/11/2022)
     */
    calDepreciationValue() {
      if (this.depreciation !== 0 && this.price !== 0) {
        this.depreciationValue = (this.depreciation * this.price) / 100;
      } else {
        this.depreciationValue = 0;
      }
    },

    /**
     * Ẩn hiện confirm hủy
     * Author : Vu Minh Dang (1/11/2022)
     */
    setToggleConfirm() {
      if (this.isChangeData) {
        this.isShowConfirm = !this.isShowConfirm;
      } else {
        this.toggleModal();
      }
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
      if (this.depreciation <= 0) {
        this.hasDepreciation = false;
      } else {
        this.hasDepreciation = true;
      }
      if (this.numberOfYear <= 0) {
        this.hasNumberYear = false;
      } else {
        this.hasNumberYear = true;
      }
      if (this.price <= 0) {
        this.hasPrice = false;
      } else {
        this.hasPrice = true;
      }

      if (
        Math.round(this.depreciation * 100) / 100 !==
          Math.round((1 / this.numberOfYear + Number.EPSILON) * 10000) / 100 &&
        this.depreciation !== 0 &&
        this.numberOfYear !== 0
      ) {
        this.compare = false;
      } else {
        this.compare = true;
      }
    },

    /**
     * Sự kiện submit form
     * Author : Vu Minh Dang (25/10/2022)
     */
    submitHandler() {
      this.validateData();
      this.errorList = "";

      this.$props.title === Enums.txtEditAsset &&
        axios
          .put(
            `http://localhost:5137/api/FixedAsset/${this.$props.dataAsset.fixed_asset_id}`,
            {
              fixed_asset_id: this.$props.dataAsset.fixed_asset_id,
              fixed_asset_code: this.assetCode,
              fixed_asset_name: this.assetName,
              department_id: this.departmentId || NIL_UUID,
              department_code: this.departmentCode,
              department_name: this.departmentName,
              fixed_asset_category_id: this.assetTypeId || NIL_UUID,
              fixed_asset_category_code: this.assetTypeCode,
              fixed_asset_category_name: this.assetTypeName,
              purchase_date:
                this.dateToString(new Date(this.dataAsset?.purchase_date)) !==
                this.purchaseDate
                  ? new Date(this.purchaseDate)
                  : new Date(this.stringToDate(this.purchaseDate)),
              cost: this.price,
              quantity: this.quantity,
              depreciation_rate:
                Math.round((this.depreciation + Number.EPSILON) * 100) / 100 ===
                Math.round((1 / this.numberOfYear + Number.EPSILON) * 10000) /
                  100
                  ? Math.round(
                      (1 / this.numberOfYear + Number.EPSILON) * 1000000
                    ) / 10000
                  : this.depreciation,
              tracked_year: this.yearTracking,
              life_time: this.numberOfYear,
              production_time:
                this.dateToString(new Date(this.dataAsset?.production_time)) !==
                this.productionTime
                  ? new Date(this.productionTime)
                  : new Date(this.stringToDate(this.productionTime)),
              active: true,
              modified_by: "Minh Dang",
            }
          )
          .then(() => {
            openToast();
            setTimeout(() => this.toggleModal(), 500);
            this.emitter.emit("changeAsset");
          })
          .catch((e) => {
            console.log(e);
            this.errorList = e.response.data.MoreInfo;
            this.setIsShowNotify();
          });

      this.$props.title === Enums.txtCloningAsset &&
        axios
          .post("http://localhost:5137/api/FixedAsset/", {
            fixed_asset_code: this.assetCode,
            fixed_asset_name: this.assetName,
            department_id: this.departmentId || NIL_UUID,
            department_code: this.departmentCode,
            department_name: this.departmentName,
            fixed_asset_category_id: this.assetTypeId || NIL_UUID,
            fixed_asset_category_code: this.assetTypeCode,
            fixed_asset_category_name: this.assetTypeName,
            cost: this.price,
            purchase_date:
              this.dateToString(new Date(this.dataAsset?.purchase_date)) !==
              this.purchaseDate
                ? new Date(this.purchaseDate)
                : new Date(this.stringToDate(this.purchaseDate)),
            quantity: this.quantity,
            depreciation_rate:
              Math.round((this.depreciation + Number.EPSILON) * 100) / 100 ===
              Math.round((1 / this.numberOfYear + Number.EPSILON) * 10000) / 100
                ? Math.round(
                    (1 / this.numberOfYear + Number.EPSILON) * 1000000
                  ) / 10000
                : this.depreciation,
            tracked_year: this.yearTracking,
            life_time: this.numberOfYear,
            production_time:
              this.dateToString(new Date(this.dataAsset?.production_time)) !==
              this.productionTime
                ? new Date(this.productionTime)
                : new Date(this.stringToDate(this.productionTime)),
            active: true,
            created_by: "Minh Dang",
            modified_by: "Minh Dang",
          })
          .then(() => {
            openToast();
            setTimeout(() => this.toggleModal(), 500);
            this.emitter.emit("changeAsset");
          })
          .catch((e) => {
            this.errorList = e.response.data.MoreInfo;
            this.setIsShowNotify();
          });
      this.$props.title === Enums.txtAddAsset &&
        axios
          .post("http://localhost:5137/api/FixedAsset/", {
            fixed_asset_code: this.assetCode,
            fixed_asset_name: this.assetName,
            department_id: this.departmentId || NIL_UUID,
            department_code: this.departmentCode,
            department_name: this.departmentName,
            fixed_asset_category_id: this.assetTypeId || NIL_UUID,
            fixed_asset_category_code: this.assetTypeCode,
            fixed_asset_category_name: this.assetTypeName,
            purchase_date:
              this.dateToString(new Date()) !== this.purchaseDate
                ? new Date(this.purchaseDate)
                : new Date(this.stringToDate(this.purchaseDate)),
            cost: this.price,
            quantity: this.quantity,
            depreciation_rate:
              Math.round((this.depreciation + Number.EPSILON) * 100) / 100 ===
              Math.round((1 / this.numberOfYear + Number.EPSILON) * 10000) / 100
                ? Math.round(
                    (1 / this.numberOfYear + Number.EPSILON) * 1000000
                  ) / 10000
                : this.depreciation,
            tracked_year: this.yearTracking,
            life_time: this.numberOfYear,
            production_time:
              this.dateToString(new Date()) !== this.productionTime
                ? new Date(this.productionTime)
                : new Date(this.stringToDate(this.productionTime)),
            active: true,
            created_by: "Minh Dang",
            modified_by: "Minh Dang",
          })
          .then(() => {
            openToast();
            setTimeout(() => this.toggleModal(), 500);
            this.emitter.emit("changeAsset");
          })
          .catch((e) => {
            this.errorList = e.response.data.MoreInfo;
            this.setIsShowNotify();
          });
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
     * Tăng giá trị trong input
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

    /**
     * Giảm giá trị trong input
     * Author : Vu Minh Dang (25/10/2022)
     */
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

    /**
     * Update các biến sau khi nhập các input
     * Author : Vu Minh Dang (25/10/2022)
     */
    updateInput(data, type) {
      this.isChangeData = true;
      switch (type) {
        case Enums.txtAssetCode:
          this.assetCode = data;
          return;
        case Enums.txtBuyingDate:
          this.purchaseDate = data;
          return;
        case Enums.txtUsingDate:
          this.productionTime = data;
          return;
        case Enums.txtAssetTypeCode:
          var category =
            this.categories[
              this.categories.findIndex(
                (category) => category.fixed_asset_category_code === data
              )
            ];
          this.assetTypeCode = data;
          this.hasAssetTypeCode = true;
          this.assetTypeName = category?.fixed_asset_category_name;
          this.assetTypeId = category?.fixed_asset_category_id;
          this.numberOfYear = category?.life_time;
          this.depreciation = category?.depreciation_rate;
          this.hasDepreciation = true;
          this.hasNumberYear = true;
          this.calDepreciationValue();
          return;
        case Enums.txtQuantity:
          this.quantity = data;
          return;
        case Enums.txtDepreciationValue:
          this.depreciationValue = data;
          return;
        case Enums.txtPrice:
          this.price = data;
          this.hasPrice = true;
          this.calDepreciationValue();
          return;
        case Enums.txtNumberOfYears:
          this.numberOfYear = data;
          this.hasNumberYear = true;
          this.hasDepreciation = true;

          this.depreciation =
            data === 0
              ? 0
              : Math.round((1 / data + Number.EPSILON) * 1000000) / 10000;
          this.calDepreciationValue();
          return;

        case Enums.txtDepreciation:
          this.depreciation = data;
          this.hasDepreciation = true;
          this.calDepreciationValue();
          return;
        case Enums.txtDepartmentCode:
          this.departmentCode = data;
          this.hasDepartmentCode = true;
          var department =
            this.departments[
              this.departments.findIndex(
                (department) => department.department_code === data
              )
            ];
          this.departmentName = department?.department_name;
          this.departmentId = department?.department_id;
          return;
        case Enums.txtAssetName:
          this.assetName = data;
          this.hasAssetName = true;
          return;
      }
    },

    /**
     * convert String to Date input values
     * Author : Vu Minh Dang (25/10/2022)
     */
    stringToDate(str) {
      const [day, month, year] = str.split("/");

      const date = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
      return date;
    },

    /**
     * Lấy tất cả các phòng ban
     * Create by Vu Minh Dang(15/11/2022)
     */
    getAllDepartments() {
      axios
        .get("http://localhost:5137/api/Department")
        .then((response) => {
          this.departments = response?.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Lấy tất cả các loại tài sản
     * Create by Vu Minh Dang(15/11/2022)
     */
    getAllCategories() {
      axios
        .get("http://localhost:5137/api/FixedAssetCategory")
        .then((response) => {
          this.categories = response?.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  setup() {
    return {
      openToast,
      Enums,
    };
  },

  mounted() {
    this.getAllDepartments();
    this.getAllCategories();
    this.$refs.firstFocus.$el.lastChild.firstChild.focus();
    this.emitter.on("changeCode", (payload) => (this.assetCode = payload));
    this.emitter.on("submit", () => {
      this.submitHandler();
    });
  },
  updated() {},
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
