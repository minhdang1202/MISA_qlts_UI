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
          v-model="asset.fixed_asset_code"
          :title="Enums.txtAssetCode"
          tabindex="0"
          ref="firstFocus"
          max="8"
          class="mr-20"
        />
        <InputModal
          v-model="asset.fixed_asset_name"
          :title="Enums.txtAssetName"
          :placeholder="Enums.txtTyingAssetName"
          class="grid-col-2-4"
          :error="!hasAssetName && Enums.txtValidateEmpty"
          max="255"
        />
        <BaseDropdown
          :fieldLabel="Enums.txtDepartmentCode"
          fieldCode="department_code"
          fieldName="department_name"
          :placeholderText="Enums.txtTypingDepartmentCode"
          showImportant="true"
          v-model="asset.department_code"
          class="mr-20 mt-20"
          :error="!hasDepartmentCode && Enums.txtValidateEmpty"
          inputMaxLenght="20"
        ></BaseDropdown>

        <InputModal
          v-model="asset.department_name"
          :title="Enums.txtDepartmentName"
          class="mt-20 grid-col-2-4"
          disabled
        />

        <BaseDropdown
          :fieldLabel="Enums.txtAssetTypeCode"
          fieldCode="fixed_asset_category_code"
          fieldName="fixed_asset_category_name"
          :placeholderText="Enums.txtTypingAssetTypeCode"
          showImportant="true"
          v-model="asset.fixed_asset_category_code"
          class="mr-20 mt-20"
          :error="!hasAssetTypeCode && Enums.txtValidateEmpty"
          inputMaxLenght="20"
        ></BaseDropdown>

        <InputModal
          v-model="asset.fixed_asset_category_name"
          class="mt-20 grid-col-2-4"
          disabled
          :title="Enums.txtAssetTypeName"
        />
        <InputModal
          :title="Enums.txtQuantity"
          class="mt-20 mr-20"
          inputType="number"
          show_icon_num
          @increaseData="increase"
          @decreaseData="decrease"
          max="4"
          v-model="asset.quantity"
        />
        <InputModal
          v-model="asset.cost"
          :title="Enums.txtPrice"
          class="mt-20 mr-20"
          inputType="number"
          :error="!hasPrice && Enums.txtValidateNumber"
          max="18"
        />
        <InputModal
          :title="Enums.txtNumberOfYears"
          class="mt-20"
          v-model="asset.life_time"
          inputType="number"
          :error="!hasNumberYear && Enums.txtValidateNumber"
          max="2"
        />
        <InputModal
          :title="Enums.txtDepreciation"
          v-model="asset.depreciation_rate"
          class="mt-20 mr-20"
          inputType="number"
          show_icon_num
          @increaseData="increase"
          @decreaseData="decrease"
          :error="
            (!hasDepreciation && Enums.txtValidateNumber) ||
            (!compare && Enums.txtValidateCompare)
          "
        />
        <InputModal
          :title="Enums.txtDepreciationValue"
          v-model="asset.depreciation_year"
          class="mt-20 mr-20"
          inputType="number"
          readonly
        />
        <InputModal
          :title="Enums.txtYearTracking"
          class="mt-20"
          disabled
          v-model="asset.tracked_year"
        />

        <InputModal
          :title="Enums.txtBuyingDate"
          class="mt-20 mr-20"
          inputType="date"
          v-model="asset.purchase_date"
          :error="!asset.purchase_date && Enums.txtValidateDate"
        />
        <InputModal
          :title="Enums.txtUsingDate"
          class="mt-20 mr-20"
          inputType="date"
          v-model="asset.production_time"
          :error="!asset.production_time && Enums.txtValidateDate"
        />
      </div>

      <div class="footer">
        <button class="btn-cancel" @click="setToggleConfirm()">
          {{ Enums.btnCancel }}
        </button>
        <button
          class="btn-save"
          @click="submitHandler()"
          @keydown.tab.prevent="focusInput"
        >
          {{ Enums.btnSave }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInputModal from "../../components/Input/BaseInputModal.vue";
import BaseNotification from "../Notification/BaseNotification.vue";
import { openToast, showError } from "../../js/state";
import BaseConfirm from "../Confirm/BaseConfirm.vue";
import { Enums } from "@/assets/Constants";
import axios from "axios";
import { NIL as NIL_UUID } from "uuid";
import BaseDropdown from "../../components/Dropdown/BaseDropdown.vue";
export default {
  data() {
    return {
      asset: {
        fixed_asset_code: "",
        fixed_asset_name: this.dataAsset?.fixed_asset_name || "",
        department_id: this.dataAsset?.department_id || NIL_UUID,
        department_code: this.dataAsset?.department_code || "",
        department_name: this.dataAsset?.department_name || "",
        fixed_asset_category_id:
          this.dataAsset?.fixed_asset_category_id || NIL_UUID,
        fixed_asset_category_code:
          this.dataAsset?.fixed_asset_category_code || "",
        fixed_asset_category_name:
          this.dataAsset?.fixed_asset_category_name || "",

        quantity: this.dataAsset?.quantity || 1,
        cost: this.dataAsset?.cost || 0,
        life_time: this.dataAsset?.life_time || 0,
        depreciation_rate: this.dataAsset?.depreciation_rate || 0,
        depreciation_year: this.dataAsset?.depreciation_year || 0,

        tracked_year:
          this.dataAsset?.tracked_year || String(new Date().getFullYear()),
        purchase_date: this.$props.dataAsset
          ? this.dateToString(new Date(this.dataAsset?.purchase_date))
          : this.dateToString(new Date()),
        production_time: this.$props.dataAsset
          ? this.dateToString(new Date(this.dataAsset?.production_time))
          : this.dateToString(new Date()),
      },
      isChangeData: false,
      isShowNotify: false,
      isShowConfirm: false,
      departments: [],
      categories: [],
      errorList: [],
      hasAssetName: true,
      hasDepartmentCode: true,
      hasAssetTypeCode: true,
      hasNumberYear: true,
      hasPrice: true,
      hasDepreciation: true,
      compare: true,
    };
  },

  watch: {
    /**
     * Thay đổi mã phòng ban
     * Author :  VuMinhDang(26/11/2022)
     */
    "asset.department_code": function () {
      if (this.asset.department_code !== "") this.hasDepartmentCode = true;
      var department = this.departments?.find(
        (department) =>
          this.asset.department_code == department?.department_code
      );
      if (department) {
        this.asset.department_name = department?.department_name;
        this.asset.department_id = department?.department_id;
      } else {
        this.asset.department_name = "";
        this.asset.department_code = "";
        this.asset.department_id = NIL_UUID;
      }
    },

    /**
     * Thay đổi mã loại tài sản
     * Author : VuMinhDang(26/11/2022)
     */
    "asset.fixed_asset_category_code": function () {
      if (this.asset.fixed_asset_category_code !== "")
        this.hasAssetTypeCode = true;

      var category = this.categories.find(
        (category) =>
          this.asset.fixed_asset_category_code ==
          category?.fixed_asset_category_code
      );
      if (category) {
        this.asset.fixed_asset_category_name =
          category?.fixed_asset_category_name;
        this.asset.fixed_asset_category_id = category?.fixed_asset_category_id;
        this.asset.life_time = category.life_time;
        this.asset.depreciation_rate = category.depreciation_rate;
      } else {
        this.asset.fixed_asset_category_name = "";
        this.asset.fixed_asset_category_code = "";
        this.asset.fixed_asset_category_id = NIL_UUID;
        this.asset.life_time = 0;
        this.asset.depreciation_rate = 0;
      }
    },

    /**
     * Sự kiện thay đổi nguyên giá
     * Author: VuMinhDang(14/11/2022)
     */
    "asset.cost": function () {
      if (this.asset.cost > 0) this.hasPrice = true;
      this.asset.depreciation_year =
        (this.asset.cost * this.asset.depreciation_rate) / 100;
    },

    /**
     * Sự kiện thay đổi tỷ lệ hao mòn
     * Author: VuMinhDang(14/11/2022)
     */
    "asset.depreciation_rate": function () {
      if (this.asset.depreciation_rate > 0) this.hasDepreciation = true;
      this.asset.depreciation_year =
        (this.asset.cost * this.asset.depreciation_rate) / 100;
    },

    /**
     * Sự kiện thay đổi năm sử dụng
     * Author : VuMinhDang(17/11/2022)
     */
    "asset.life_time": function () {
      if (this.asset.life_time > 0) this.hasNumberYear = true;
      this.asset.depreciation_rate =
        Math.round((1 / this.asset.life_time + Number.EPSILON) * 1000000) /
        10000;
    },

    /**
     * Sự kiện thay đổi tên tài sản
     * Author : VuMinhDang(17/11/2022)
     */
    "asset.fixed_asset_name": function () {
      this.hasAssetName = true;
    },
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
    Confirm: BaseConfirm,
    BaseNotification,
    BaseDropdown,
  },

  methods: {
    /**
     * Focus vào input đầu tiên
     * Author : VuMinhDang(02/11/2022)
     */
    focusInput() {
      this.$refs.firstFocus.$el.lastChild.firstChild.firstChild.focus();
    },

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
      this.hasAssetName = this.asset.fixed_asset_name !== "";
      this.hasDepartmentCode = this.asset.department_code !== "";
      this.hasAssetTypeCode = this.asset.fixed_asset_category_code !== "";
      this.hasDepreciation = this.asset.depreciation_rate > 0;
      this.hasNumberYear = this.asset.life_time > 0;
      this.hasPrice = this.asset.cost > 0;
      if (
        Math.round(this.asset.depreciation_rate * 100) / 100 !==
          Math.round((1 / this.asset.life_time + Number.EPSILON) * 10000) /
            100 &&
        this.asset.depreciation_rate !== 0 &&
        this.asset.life_time !== 0
      ) {
        this.compare = false;
      } else {
        this.compare = true;
      }
    },

    /**
     * Thêm mới tài sản
     * Author : Vu Minh Dang (25/10/2022)
     */
    addAsset() {
      axios
        .post("http://localhost:5137/api/FixedAsset/", {
          ...this.asset,
          purchase_date:
            this.dateToString(new Date()) !== this.asset.purchase_date
              ? new Date(this.asset.purchase_date)
              : new Date(this.stringToDate(this.asset.purchase_date)),

          depreciation_rate:
            Math.round((this.asset.depreciation_rate + Number.EPSILON) * 100) /
              100 ===
            Math.round((1 / this.asset.life_time + Number.EPSILON) * 10000) /
              100
              ? Math.round(
                  (1 / this.asset.life_time + Number.EPSILON) * 1000000
                ) / 10000
              : this.asset.depreciation_rate,

          production_time:
            this.dateToString(new Date()) !== this.asset.production_time
              ? new Date(this.asset.production_time)
              : new Date(this.stringToDate(this.asset.production_time)),

          active: true,
          created_by: "Minh Dang",
          modified_by: "Minh Dang",
        })
        .then(() => {
          openToast();
          this.toggleModal();
          this.emitter.emit("changeAsset");
        })
        .catch((e) => {
          this.errorList = showError(e);
          this.setIsShowNotify();
        });
    },

    /**
     * Sửa tài sản
     * Author : Vu Minh Dang (25/10/2022)
     */
    editAsset() {
      axios
        .put(
          `http://localhost:5137/api/FixedAsset/${this.$props.dataAsset.fixed_asset_id}`,
          {
            ...this.asset,
            fixed_asset_id: this.$props.dataAsset.fixed_asset_id,
            purchase_date:
              this.dateToString(new Date(this.dataAsset?.purchase_date)) !==
              this.asset.purchase_date
                ? new Date(this.asset.purchase_date)
                : new Date(this.stringToDate(this.asset.purchase_date)),
            depreciation_rate:
              Math.round(
                (this.asset.depreciation_rate + Number.EPSILON) * 100
              ) /
                100 ===
              Math.round((1 / this.asset.life_time + Number.EPSILON) * 10000) /
                100
                ? Math.round(
                    (1 / this.asset.life_time + Number.EPSILON) * 1000000
                  ) / 10000
                : this.asset.depreciation_rate,
            production_time:
              this.dateToString(new Date(this.dataAsset?.production_time)) !==
              this.asset.production_time
                ? new Date(this.asset.production_time)
                : new Date(this.stringToDate(this.asset.production_time)),
            active: true,
            modified_by: "Minh Dang",
          }
        )
        .then(() => {
          openToast();
          this.toggleModal();
          this.emitter.emit("changeAsset");
        })
        .catch((e) => {
          this.errorList = showError(e);
          this.setIsShowNotify();
        });
    },

    /**
     * Nhân bản tài sản
     * Author :  Vu Minh Dang (25/10/2022)
     */
    cloneAsset() {
      this.getAssetCode();

      axios
        .post("http://localhost:5137/api/FixedAsset/", {
          ...this.asset,
          purchase_date:
            this.dateToString(new Date(this.dataAsset?.purchase_date)) !==
            this.asset.purchase_date
              ? new Date(this.asset.purchase_date)
              : new Date(this.stringToDate(this.asset.purchase_date)),

          depreciation_rate:
            Math.round((this.asset.depreciation_rate + Number.EPSILON) * 100) /
              100 ===
            Math.round((1 / this.asset.life_time + Number.EPSILON) * 10000) /
              100
              ? Math.round(
                  (1 / this.asset.life_time + Number.EPSILON) * 1000000
                ) / 10000
              : this.asset.depreciation_rate,
          production_time:
            this.dateToString(new Date(this.dataAsset?.production_time)) !==
            this.asset.production_time
              ? new Date(this.asset.production_time)
              : new Date(this.stringToDate(this.asset.production_time)),
          active: true,
          created_by: "Minh Dang",
          modified_by: "Minh Dang",
        })
        .then(() => {
          openToast();
          this.toggleModal();
          this.emitter.emit("changeAsset");
        })
        .catch((e) => {
          this.errorList = showError(e);
          this.setIsShowNotify();
        });
    },

    /**
     * Sự kiện submit form
     * Author : Vu Minh Dang (25/10/2022)
     */
    submitHandler() {
      this.validateData();
      this.errorList = "";

      this.$props.title === Enums.txtEditAsset && this.editAsset();
      this.$props.title === Enums.txtCloningAsset && this.cloneAsset();
      this.$props.title === Enums.txtAddAsset && this.addAsset();
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

    /**
     * Lấy mã tài sản mới
     * Author : Vu Minh Dang (25/10/2022)
     */
    getAssetCode() {
      this.$props.title === Enums.txtEditAsset
        ? (this.asset.fixed_asset_code = this.dataAsset?.fixed_asset_code)
        : axios
            .get("http://localhost:5137/api/FixedAsset/lastest")
            .then((response) => {
              this.asset.fixed_asset_code = response.data?.lastestCode;
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

  created() {
    this.getAssetCode();
  },

  mounted() {
    this.focusInput();
    this.getAllDepartments();
    this.getAllCategories();
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
  background: url("../../assets/qlts-icon.svg") no-repeat -375px -287px;
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
  border-radius: 0 0 4px 4px;
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
