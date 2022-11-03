<template lang="">
  <div class="table">
    <div class="container">
      <Modal
        :title="Enums.txtEditAsset"
        v-if="isShowModal"
        :toggleModal="toggleModal"
        :type="TypeConfirm.editForm"
      />

      <table class="m-table du-lieu">
        <thead>
          <tr class="table-title">
            <th class="text-align-center" style="border-radius: 3.5px 0 0">
              <div class="check">
                <input
                  type="checkbox"
                  class="check-box"
                  v-model="isSelectAll"
                  @click="onSelectAll"
                  :checked="onSelect()"
                  :id="`check`"
                  @change="onChange"
                />
                <label class="checkmark" for="check"></label>
              </div>
            </th>
            <th
              class="text-align-left"
              style="width: 25px; padding-left: 0px; padding-right: 20px"
              title="Số thứ tự"
            >
              STT
            </th>

            <th class="text-align-left" style="width: 160px">
              {{ Enums.txtAssetCode }}
            </th>
            <th class="text-align-left" style="width: 200px">
              {{ Enums.txtAssetName }}
            </th>
            <th class="text-align-left" style="width: 230px">
              {{ Enums.txtAssetType }}
            </th>
            <th class="text-align-left">{{ Enums.txtDepartment }}</th>
            <th class="text-align-right" style="width: 100px">
              {{ Enums.txtQuantity }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ Enums.txtPrice }}
            </th>
            <th
              class="text-align-right"
              style="width: 150px"
              title="Hao mòn/ Khấu hao"
            >
              {{ Enums.txtHmKh }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ Enums.txtRemainValue }}
            </th>
            <th
              class="text-align-center"
              style="width: 100px; border-radius: 0 3.5px 0 0"
            >
              {{ Enums.txtFunction }}
            </th>
          </tr>
        </thead>
      </table>

      <div class="my-table">
        <table class="m-table du-lieu">
          <tbody>
            <tr class="item" v-for="(item, i) in ASSETS" :key="item.id">
              <td class="text-align-center">
                <div class="check">
                  <input
                    v-model="selected"
                    type="checkbox"
                    class="check-box"
                    :value="item"
                    :id="`check${i}`"
                    @change="onChange"
                  />
                  <label class="checkmark" :for="`check${i}`"></label>
                </div>
              </td>
              <td
                class="text-align-left"
                style="width: 25px; padding-left: 0px; padding-right: 20px"
              >
                {{ i + 1 }}
              </td>
              <td class="text-align-left" style="width: 160px">
                {{ item.assetCode }}
              </td>
              <td class="text-align-left" style="width: 200px">
                {{ item.assetName }}
              </td>
              <td class="text-align-left" style="width: 230px">
                {{ item.assetType }}
              </td>
              <td class="text-align-left">{{ item.department }}</td>
              <td class="text-align-right" style="width: 100px">
                {{ item.quantity }}
              </td>
              <td class="text-align-right" style="width: 150px">
                {{ vueNumberFormat(item.price, {}) }}
              </td>
              <td class="text-align-right" style="width: 150px">
                {{ vueNumberFormat(item.mh_kh, {}) }}
              </td>
              <td class="text-align-right" style="width: 150px">
                {{ vueNumberFormat(item.remainValue, {}) }}
              </td>
              <td class="text-align-center" style="width: 100px">
                <button
                  class="btn btn-edit"
                  :title="Enums.txtEditAsset"
                  @click="toggleModal"
                ></button>
                <button
                  class="btn btn-other"
                  :title="Enums.txtAssetCloning"
                ></button>
              </td>
            </tr>
            <tr style="width: '37px'"></tr>
          </tbody>
        </table>
      </div>

      <table class="bang-thong-ke m-table">
        <thead>
          <tr class="hang-thong-ke">
            <th>
              <div class="thong-ke">
                <p>Tổng số: <b>200</b> bản ghi</p>
                <div
                  class="selector"
                  @click="toggle()"
                  tabindex="0"
                  id="select_num"
                  @blur="
                    {
                      visible = false;
                    }
                  "
                >
                  <div class="label_value">
                    <span>{{ value }}</span>
                  </div>

                  <div class="arrow"></div>

                  <ul class="items" v-if="visible">
                    <li
                      :class="{ current: item === value }"
                      v-for="(item, i) in numDoc"
                      :key="i"
                      @click="select(item)"
                      class="item_num"
                    >
                      <div class="checkNum"></div>
                      <span>
                        {{ item }}
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="m-paging">
                  <button>
                    <div class="m-btn-prev"></div>
                  </button>
                  <div class="m-page-number-group">
                    <button class="m-page-number m-page-number-selected">
                      1
                    </button>
                    <button class="m-page-number">2</button>
                    <button class="m-page-number">3</button>
                    <button class="m-page-number">4</button>
                  </div>
                  <button>
                    <div class="m-btn-next"></div>
                  </button>
                </div>
              </div>
            </th>

            <th class="text-align-right">{{ ASSETS.length }}</th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalPrice, {}) }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalAccumulated, {}) }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalRemainValue, {}) }}
            </th>
            <th class="text-align-center" style="width: 100px"></th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import { ASSETS } from "../data";
import BaseModal from "../layout/BaseModal.vue";
import { Enums } from "@/assets/Constants";
import { TypeConfirm } from "@/assets/Constants";

export default {
  data() {
    return {
      numDoc: [20, 50, 100],
      selected: [],
      isSelectAll: false,
      isShowModal: false,
      itemEditing: {},
      text: String,
      totalPrice: this.calTotalPrice(),
      totalAccumulated: this.calAccumulated(),
      totalRemainValue: this.calTotalRemainValue(),
      visible: false,
      value: 20,
    };
  },

  components: {
    Modal: BaseModal,
  },

  methods: {
    /**
     * Ẩn hiện select số bản ghi được liệt kê
     * Author : VMDANG (17/10/2022)
     */

    toggle() {
      this.visible = !this.visible;
    },
    /**
     * Chọn số bản ghi được liệt kê
     * Author : VMDANG (17/10/2022)
     */
    select(option) {
      this.value = option;
    },

    /**
     * Chọn tất cả các bản ghi trong table
     * @param
     * @returns
     * Author : VMDANG (17/10/2022)
     */
    onSelectAll() {
      this.selected = [];
      if (!this.isSelectAll) {
        for (let i in ASSETS) {
          this.selected.push(this.ASSETS[i]);
        }
      }
    },

    /**
     * Ẩn hiện Modal Sửa thông tin tài sản
     * Author : VMDANG (18/10/2022)
     */
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },

    /**
     * Nếu tất cả các tài sản được chọn thì button selectAll cũng được chọn
     * Author : VMDANG (17/10/2022)
     */
    onSelect() {
      if (this.selected.length === ASSETS.length) {
        this.isSelectAll = true;
      } else {
        this.isSelectAll = false;
      }
    },

    /**
     * Chọn các tài sản thực hiện xóa
     * Author : VMDANG (17/10/2022)
     */

    onChange() {
      this.$emit("listData", this.selected);
    },

    /**
     * Tổng nguyên giá của bảng
     * Author : VMDANG (17/10/2022)
     */
    calTotalPrice() {
      let cal = 0;
      ASSETS.forEach((item) => {
        cal += item.price;
      });
      return cal;
    },

    /**
     * Tổng lũy kế của bảng
     * Author : VMDANG (17/10/2022)
     */
    calAccumulated() {
      let cal = 0;
      ASSETS.forEach((item) => {
        cal += item.mh_kh;
      });
      return cal;
    },

    /**
     * Tổng giá trị còn lại của bảng
     * Author : VMDANG (17/10/2022)
     */
    calTotalRemainValue() {
      let cal = 0;
      ASSETS.forEach((item) => {
        cal += item.remainValue;
      });
      return cal;
    },
  },

  setup() {
    return { ASSETS, Enums, TypeConfirm };
  },
};
</script>
<style lang="css" scoped>
.item_num.current .checkNum {
  left: 9px;
  top: 4px;
  width: 6px;
  height: 14px;
  border: solid black;
  border-width: 0 2px 2px 0;
  border-radius: 1.5px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
}
.item_num {
  display: flex;
  padding: 7.5px 14px;
  color: black;
  border-radius: 2.5px;
  margin: 0 4px;
  position: relative;
  justify-content: end;
}
.label_value {
  display: block;
  font-size: 13px;
  font-weight: 700;
}
.selector {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #ffffff;
  border-radius: 2.625px;
  border: 1px solid #afafaf;
  width: 59px;
  height: 25px;
  justify-content: space-evenly;
}
.items {
  width: 120%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  border: none;
  position: absolute;
  z-index: 1;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  right: 0px;
  bottom: 26px;
  max-height: 175px;
  overflow-y: auto;
  border-radius: 2.5px;
}
.items:focus-visible {
  display: none;
}

.item_num:hover {
  color: black;
  background-color: #c7e0f5;
}
.current {
  background: #eaeaea;
}

.arrow {
  background: url("../assets/qlts-icon.svg") no-repeat -72px -338px;
  width: 7px;
  height: 5px;
}

.table {
  position: relative;
}

.my-table {
  overflow-y: auto;
  max-height: calc(100vh - 174px);
  min-height: calc(100vh - 174px);
}
.bang-thong-ke {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 3.5px;
}
.table-title {
  width: 38px;
  background-color: #f5f5f5;
  border-radius: 3.5px;
}
.table-title > th {
  font-size: 13px;
  font-weight: 700;
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e1e1e1;
}
.hang-thong-ke > th {
  font-size: 13px;
  font-weight: 700;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #e1e1e1;
  border-radius: 0 0 3.5px 3.5px;
}
td {
  border-bottom: 1px solid #e1e1e1;
}
.check-box {
  margin: 0;
}

.m-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: unset;
  border: unset;
}
.du-lieu {
  margin-bottom: 0 !important;
}

.m-table:not(:last-child) {
  margin-bottom: 40px;
}

::-webkit-scrollbar {
  background-color: #cdd3d6;
  border-radius: 1px;
  width: 3px;
  height: 30%;
  overflow: hidden;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #cdd3d6;
}

.m-table tr {
  border-bottom: 1px solid #edc8c8;
  height: 40px;
}

.du-lieu thead tr:first-child {
  height: 38px;
}

.m-table tr td:first-child,
.m-table th:first-child {
  width: 14px;
  padding: 0px 20px 0px 16px;
}

.m-table .text-align-left {
  text-align: left;
}
.m-table .text-align-right {
  text-align: right;
}
.m-table .text-align-center {
  text-align: center;
}

.m-table tbody tr:hover {
  background-color: #e9ebee;
  cursor: pointer;
}

.m-table tbody tr.selected {
  background-color: rgba(26, 164, 200, 0.2);
}

.item:hover {
  background-color: rgba(26, 164, 200, 0.2) !important;
}

.dropdown {
  background-color: #ffffff;
  border-radius: 2.625px;
  border: 1px solid #afafaf;
  width: 56px;
  height: 25px;
  overflow: hidden;
  margin-right: 20px;
  font-size: 12px;
  outline: none;
}
.thong-ke {
  display: flex;
  align-items: center;
}
p {
  width: 134px;
  font-size: 11px;
  font-weight: 500;
  text-align: left;
}
.m-paging {
  display: flex;
  margin-left: 20px;
}
.m-paging button {
  width: 20px;
  height: 20px;
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
}
.m-page-number-group {
  display: flex;
}
.m-page-number-group button.m-page-number {
  font-size: 11px;
}
.m-btn-prev {
  background: url("../assets/qlts-icon.svg") no-repeat -206px -248px;
  width: 5px;
  height: 8px;
}
.m-btn-next {
  background: url("../assets/qlts-icon.svg") no-repeat -250px -248px;
  width: 5px;
  height: 8px;
}
.hang-thong-ke {
  border-bottom: none !important;
}
.hang-thong-ke > td:not(:first-child) {
  font-size: 13px;
  font-weight: 700;
}
.item > td {
  font-size: 13px;
}
.m-page-number-selected {
  background-color: #f5f5f5 !important;
  border-radius: 3px !important;
  font-weight: 700 !important;
}
.item:hover .btn {
  display: inline;
}
.btn {
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  margin: 0 8px;
  display: none;
}
.btn-edit {
  background: url("../assets/qlts-icon.svg") no-repeat -156px -68px;
  width: 16px;
  height: 16px;
}
.btn-other {
  background: url("../assets/qlts-icon.svg") no-repeat -244px -112px;
  width: 16px;
  height: 16px;
}

input[type="checkbox"] {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  width: 13px;
  height: 13px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
}
.check {
  display: flex;
  justify-content: center;
  align-items: center;
}
.check:hover input ~ .checkmark {
  background-color: #fff;
}
.check input:checked ~ .checkmark {
  background-color: #31b9e2;
  border: 1px solid #31b9e2;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.check input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.check .checkmark:after {
  left: 5px;
  top: 1px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 1px 1px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
