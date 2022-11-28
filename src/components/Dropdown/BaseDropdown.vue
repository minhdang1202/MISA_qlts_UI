<template>
  <div :class="['dropdown-list', property]">
    <div class="dropdown-list__field-label" v-if="fieldLabel">
      {{ fieldLabel
      }}<span class="input-important" v-if="showImportant"> *</span>
    </div>
    <div class="dropdown-list__input">
      <div v-show="hasFilterIcon" class="filter_icon"></div>

      <input
        :title="hasFilterIcon ? inputValue : null"
        :class="['input', classError, hasFilterIcon && 'placeholder']"
        type="text"
        :placeholder="placeholderText"
        :maxlength="inputMaxLenght"
        v-on:click="showComboDrop"
        :value="inputValue"
        @input="(e) => onChange(e.target.value.trim().toLowerCase())"
        :style="{ paddingLeft: hasFilterIcon ? '35px' : '12px' }"
      />
      <div
        class="m-icon icon-arrow-drop"
        :style="{ right: hasFilterIcon ? '10px' : '14px' }"
      ></div>
      <div v-show="listData != null && show" class="dropdown-list__data">
        <div class="item-data item-data-head">
          <div class="item-data-text">
            <div class="code">Mã</div>
            <div class="name">Tên</div>
          </div>
        </div>
        <div
          :class="['item-data', active[index]]"
          v-for="(item, index) in listFilter"
          :key="index"
          v-on:click.stop="clickOnDataDrop(item, index)"
        >
          <div class="item-data-text">
            <div class="code">{{ item[fieldCode] }}</div>
            <div class="name" :title="item[fieldName]">
              {{ item[fieldName] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="error-message" v-if="error">{{ error }}</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    property: String, //Thuộc tính
    fieldLabel: String, //Nhãn DropdownList
    fieldCode: String, //Trường hiện thị mã
    fieldName: String, //Trường hiện thị tên
    placeholderText: String, //Chữ hiện thị khi chưa có dữ liệu
    inputMaxLenght: Number, //Độ dài tối đa
    showImportant: Boolean, //Validate bắt buộc
    valueDefaut: String, //Giá trị mặc định (chưa dùng)
    showErrorInput: Boolean, //Trạng thái hiện thị lỗi
    modelValue: String, //Giá trị nhận
    error: String, //Thông tin lỗi
    hasFilterIcon: Boolean, //Có icon filter hay không
  },

  created() {
    this.fieldCode === "department_code"
      ? axios
          .get("http://localhost:5137/api/Department")
          .then((response) => {
            this.listData = response?.data;
            this.listFilter = response?.data;
          })
          .catch((e) => {
            console.log(e);
          })
      : axios
          .get("http://localhost:5137/api/FixedAssetCategory")
          .then((response) => {
            this.listData = response?.data;
            this.listFilter = response?.data;
          })
          .catch((e) => {
            console.log(e);
          });
    /**
     * Click on sreen đóng comboBox
     * Author: VuMinhDang(26/11/2022)
     */
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    });
  },

  watch: {
    /**
     * Thêm viền đỏ khi validateData
     * Author: VuMinhDang(26/11/2022)
     */
    showErrorInput: function () {
      if (this.showErrorInput == true) {
        this.classError = "input-error";
      } else {
        this.classError = "";
      }
    },
  },
  methods: {
    onChange(str) {
      this.inputValue = str;
      this.show = true;
      this.$emit("update:modelValue", this.inputValue);
      this.listFilter = this.listData.filter((data) =>
        this.fieldCode === "department_code"
          ? data.department_code.toLowerCase().includes(str) ||
            data.department_name.toLowerCase().includes(str)
          : data.fixed_asset_category_name.toLowerCase().includes(str) ||
            data.fixed_asset_category_code.toLowerCase().includes(str)
      );
    },
    /**
     * Show DropdownList
     * Author: VuMinhDang(26/11/2022)
     */
    showComboDrop() {
      this.show = !this.show;
    },

    /**
     * Thêm Data vào input khi click
     * @param {Object} item Data trong comboBox
     * Author: VuMinhDang(26/11/2022)
     */
    clickOnDataDrop(item, index) {
      this.$emit("update:modelValue", item[this.fieldCode]);
      this.inputValue = this.hasFilterIcon
        ? item[this.fieldName]
        : item[this.fieldCode];
      this.show = !this.show;
      this.showImg.fill(false);
      this.showImg[index] = true;
      this.active.fill("");
      this.active[index] = "bg-blue";
    },
  },
  data() {
    return {
      show: false,
      showImg: [],
      active: [],
      classError: "",
      inputValue: this.modelValue,
      listFilter: [],
      listData: [],
    };
  },
};
</script>
<style scoped lang="css">
.icon-arrow-drop {
  position: absolute;
  top: 40%;
  background: url("../../assets/qlts-icon.svg") no-repeat -72px -338px;
  width: 7px;
  height: 5px;
}
.filter_icon {
  background: url("../../assets/qlts-icon.svg") no-repeat -243px -69px;
  width: 17px;
  height: 16px;
  position: absolute;
  margin-left: 10px;
  top: 10px;
}
.error-message {
  font-size: 10px;
  position: absolute;
  bottom: -16px;
  color: #e92e2e;
}
.dropdown-list {
  outline: none;
  position: relative;
  align-items: center;
}

.dropdown-list__field-label {
  margin-bottom: 8px;
  font-size: 13px;
}

.dropdown-list__input {
  height: 36px;
  width: 100%;
  box-sizing: border-box;
}

.dropdown-list__button {
  height: 36px;
  background-color: red;
  cursor: pointer;
}

.dropdown-list__button {
  width: 8px;
  height: 5px;
}

.dropdown-list__button:active {
  transform: rotate(180deg);
}

.dropdown-list__data {
  position: absolute;
  top: calc(100%);
  width: 150%;
  font-size: 14px;
  border: 1px solid #afafaf;
  box-shadow: 0 2px 6px #afafaf;
  box-sizing: border-box;
  max-height: 200px;
  overflow: auto;
  border-radius: 2.5px;
  z-index: 2;
  background-color: #fff;
}

.dropdown-list__data .item-data {
  height: 36px;
  padding-left: 8px;
  display: flex;
  border-radius: 3.5px;
}
.item-data-head {
  pointer-events: none;
  background-color: #96c6ee;
  font-weight: bold;
  position: sticky;
  top: 0;
}

.dropdown-list__data .item-data:hover {
  background-color: rgba(32, 193, 234, 0.2);
}

.dropdown-list__data .item-data .item-data-icon {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 36px !important;
  height: 36px !important;
}
.dropdown-list__data .item-data .item-data-icon img {
  width: 20px;
  height: 20px;
  margin: auto;
}

.dropdown-list .bg-blue {
  background-color: rgba(26, 164, 200, 0.2);
}

.dropdown-list__data .item-data .item-data-text {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0 8px;
  width: 100%;
  border-radius: 6px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-list__data .item-data .item-data-text .code {
  flex: 3;
}
.dropdown-list__data .item-data .item-data-text .name {
  flex: 7;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-list__input {
  position: relative;
}

.dropdown-list__input .input {
  width: 100%;
  outline: none;
  margin: auto;
  margin-right: 8px;
  box-sizing: border-box;
  height: 36px;
  border: 1px solid #afafaf;
  border-radius: 2.5px;
  font-size: 13px;
  padding-right: 31px;
}

.dropdown-list__input .m-icon {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
}

.dropdown-list__input .m-icon.icon-end {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  cursor: pointer;
}

.dropdown-list__input .m-icon.icon-start {
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translate(0%, -50%);
  cursor: pointer;
}
::-webkit-scrollbar {
  width: 9px;
  overflow: hidden;
}

.hide_scroll::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-track {
  background: #d1dae9;
}

::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background-color: #abb6c8;
}
.placeholder::placeholder {
  font-style: normal;
  color: black;
}
::placeholder {
  font-style: italic;
}
</style>
