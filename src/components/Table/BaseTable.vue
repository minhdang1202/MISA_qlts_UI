<template lang="">
  <div class="table">
    <div class="container">
      <Modal
        :title="title"
        v-if="isShowModal"
        :toggleModal="toggleModal"
        :type="
          title === Enums.txtEditAsset
            ? TypeConfirm.editForm
            : TypeConfirm.cloningForm
        "
        :dataAsset="dataAsset"
      />

      <LoadingScreen v-if="loading === true" />

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

            <th class="text-align-left" style="width: 120px">
              {{ Enums.txtAssetCode }}
            </th>
            <th class="text-align-left">
              {{ Enums.txtAssetName }}
            </th>
            <th
              class="text-align-left"
              style="width: 300px; max-width: 300px; min-width: 300px"
            >
              {{ Enums.txtAssetType }}
            </th>
            <th
              class="text-align-left"
              style="width: 204px; max-width: 204px; min-width: 204px"
            >
              {{ Enums.txtDepartment }}
            </th>
            <th
              class="text-align-right"
              style="width: 100px; max-width: 100px; min-width: 100px"
            >
              {{ Enums.txtQuantity }}
            </th>
            <th
              class="text-align-right"
              style="width: 150px; max-width: 150px; min-width: 150px"
            >
              {{ Enums.txtPrice }}
            </th>
            <th
              class="text-align-right"
              style="width: 150px; max-width: 150px; min-width: 150px"
              title="Hao mòn/ Khấu hao"
            >
              {{ Enums.txtHmKh }}
            </th>
            <th
              class="text-align-right"
              style="width: 150px; max-width: 150px; min-width: 150px"
            >
              {{ Enums.txtRemainValue }}
            </th>
            <th
              class="text-align-center"
              style="width: 100px; border-radius: 0 3.5px 0 0 max-width: 100px; min-width: 100px"
            >
              {{ Enums.txtFunction }}
            </th>
          </tr>
        </thead>
      </table>

      <div class="my-table">
        <table class="m-table du-lieu" v-if="listAsset.length > 0">
          <tbody>
            <tr
              class="item"
              v-for="(item, i) in listAsset"
              :key="item.id"
              :style="{
                backgroundColor: selected.some(
                  (select) => select.fixed_asset_id === item.fixed_asset_id
                )
                  ? 'rgba(26, 164, 200, 0.2)'
                  : '#fff',
              }"
              v-on:dblclick="() => toggleModal(item, Enums.txtEditAsset)"
            >
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
                <label class="labelBox" :for="`check${i}`">
                  {{ i + pageSize * (currentPage - 1) + 1 }}
                </label>
              </td>
              <td class="text-align-left" style="width: 120px">
                <label :for="`check${i}`">
                  <div class="labelBox">
                    {{ item.fixed_asset_code }}
                  </div>
                </label>
              </td>
              <td class="text-align-left">
                <label :for="`check${i}`">
                  <div class="labelBox">
                    {{ item.fixed_asset_name }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-left"
                style="width: 300px; max-width: 300px; min-width: 300px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox">
                    {{ item.fixed_asset_category_name }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-left department"
                style="width: 200px; max-width: 200px; min-width: 200px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox">
                    {{ item.department_name }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-right"
                style="width: 100px; max-width: 100px; min-width: 100px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox justify-end">
                    {{ vueNumberFormat(item.quantity, {}) }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-right"
                style="width: 150px; max-width: 150px; min-width: 150px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox justify-end">
                    {{ vueNumberFormat(item.cost, {}) }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-right"
                style="width: 150px; max-width: 150px; min-width: 150px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox justify-end">
                    {{
                      vueNumberFormat(
                        calAccumulated(item.cost, item.depreciation_rate),
                        {}
                      )
                    }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-right"
                style="width: 150px; max-width: 150px; min-width: 150px"
              >
                <label :for="`check${i}`">
                  <div class="labelBox justify-end">
                    {{
                      vueNumberFormat(
                        remainValue(item.cost, item.depreciation_rate),
                        {}
                      )
                    }}
                  </div>
                </label>
              </td>
              <td
                class="text-align-center"
                style="width: 100px; max-width: 100px; min-width: 100px"
              >
                <button
                  class="btn btn-edit"
                  :title="Enums.txtEditAsset"
                  @click="() => toggleModal(item, Enums.txtEditAsset)"
                ></button>
                <button
                  class="btn btn-other"
                  :title="Enums.txtCloningAsset"
                  @click="() => toggleModal(item, Enums.txtCloningAsset)"
                ></button>
              </td>
            </tr>
            <tr style="height: '37px'"></tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          <div class="no-data-icon"></div>
        </div>
      </div>

      <table class="bang-thong-ke m-table">
        <thead>
          <tr class="hang-thong-ke">
            <th>
              <div class="thong-ke">
                <p>
                  Tổng số: <b>{{ totalAsset }}</b> bản ghi
                </p>
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
                    <span>{{ pageSize }}</span>
                  </div>

                  <div class="arrow"></div>

                  <ul class="items" v-if="visible">
                    <li
                      :class="{ current: item === pageSize }"
                      v-for="(item, i) in numDoc"
                      :key="i"
                      @click="handleSizeChange(item)"
                      class="item_num"
                    >
                      <div class="checkNum"></div>
                      <span>
                        {{ item }}
                      </span>
                    </li>
                  </ul>
                </div>

                <el-pagination
                  v-model:currentPage="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="totalAsset"
                  :disabled="false"
                  @current-change="handleCurrentChange"
                />
              </div>
            </th>

            <th class="text-align-right">
              {{ vueNumberFormat(totalQuantity, {}) }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalPrice, {}) }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalAccumulated, {}) }}
            </th>
            <th class="text-align-right" style="width: 150px">
              {{ vueNumberFormat(totalRemainValue, {}) }}
            </th>
            <th
              class="text-align-center"
              style="width: 100px; max-width: 100px; min-width: 100px"
            ></th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import { ASSETS } from "../../js/data";
import BaseModal from "../../layout/Modal/BaseModal.vue";
import { Enums } from "@/assets/Constants";
import { TypeConfirm } from "@/assets/Constants";
import axios from "axios";
import LoadingScreen from "../../layout/Loading/LoadingScreen.vue";
import { openToast } from "../../js/state";

export default {
  data() {
    return {
      dataAsset: {},
      numDoc: [20, 50, 100],
      selected: [],
      isSelectAll: false,
      isShowModal: false,
      itemEditing: {},
      text: String,
      totalPrice: 0,
      totalAccumulated: 0,
      totalRemainValue: 0,
      totalQuantity: 0,
      visible: false,
      totalAsset: 0,
      currentPage: 1,
      pageSize: 20,
      listAsset: [],
      loading: false,
      departmentId: "",
      categoryId: "",
      keyword: "",
      title: "",
    };
  },

  components: {
    Modal: BaseModal,
    LoadingScreen,
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
     * Chọn tất cả các bản ghi trong table
     * @param
     * @returns
     * Author : VMDANG (17/10/2022)
     */
    onSelectAll() {
      this.selected = [];
      if (!this.isSelectAll) {
        for (let i in this.listAsset) {
          this.selected.push(this.listAsset[i]);
        }
      }
    },

    /**
     * Ẩn hiện Modal Sửa thông tin tài sản
     * Author : VMDANG (18/10/2022)
     */
    toggleModal(dataAsset, title) {
      this.isShowModal = !this.isShowModal;
      this.dataAsset = dataAsset;
      this.title = title;
    },

    /**
     * Nếu tất cả các tài sản được chọn thì button selectAll cũng được chọn
     * Author : VMDANG (17/10/2022)
     */
    onSelect() {
      if (this.selected.length === this.listAsset.length) {
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
     * Tính lũy kế của hàng
     * Author : VMDANG (17/10/2022)
     */
    calAccumulated(cost, rate) {
      return (cost * rate) / 100;
    },

    /**
     * Tổng lũy kế của bảng
     * Author : VMDANG (17/10/2022)
     */
    calTotalAccumulated() {
      this.totalAccumulated = 0;
      this.listAsset?.forEach((item) => {
        this.totalAccumulated += this.calAccumulated(
          item.cost,
          item.depreciation_rate
        );
      });
    },

    /**
     * Tính còn lại của hàng
     * Author : VMDANG (17/10/2022)
     */
    remainValue(cost, rate) {
      return cost - (cost * rate) / 100;
    },

    /**
     * Tổng giá trị còn lại của bảng
     * Author : VMDANG (17/10/2022)
     */
    calTotalRemainValue() {
      this.totalRemainValue = this.totalPrice - this.totalAccumulated;
    },

    /**
     * Tổng giá Số lượng và giá của bảng
     * Author : VMDANG (17/10/2022)
     */
    calTotalCostAndQuantity() {
      this.totalPrice = 0;
      this.totalQuantity = 0;
      this.listAsset?.forEach((item) => {
        this.totalPrice += item?.cost;
        this.totalQuantity += item?.quantity;
      });
    },

    /**
     * Thay đổi pageSize
     * @param val : Size thay đổi
     * Author : VMDANG (10/11/2022)
     */
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getListAsset();
    },

    /**
     * Thay đổi trang hiện tại
     * @param val :  Page thay đổi
     * Author : VMDANG (10/11/2022)
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListAsset();
      this.selected = [];
      this.onChange();
    },

    /**
     * Lấy danh sách tài sản
     * Author : VMDANG (10/11/2022)
     */
    getListAsset() {
      this.loading = true;
      axios
        .get(
          `http://localhost:5137/api/FixedAsset/filter?pageSize=${this.pageSize}&pageIndex=${this.currentPage}&keyword=${this.keyword}&departmentId=${this.departmentId}&categoryId=${this.categoryId}`
        )
        .then((response) => {
          this.listAsset = response?.data?.fixedAssets;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },

    /**
     * Lấy tổng số tài sản
     * Author : VMDANG (10/11/2022)
     */
    getTotalAsset() {
      this.loading = true;
      axios
        .get(
          `http://localhost:5137/api/FixedAsset/total?keyword=${this.keyword}&departmentId=${this.departmentId}&categoryId=${this.categoryId}`
        )
        .then((response) => {
          this.totalAsset = response?.data?.totalAsset;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
  },

  setup() {
    return { ASSETS, Enums, TypeConfirm, openToast };
  },

  created() {},

  mounted() {
    this.getListAsset();
    this.getTotalAsset();
    this.emitter.on("changeAsset", () => {
      this.loading = true;
      this.getListAsset();
      this.getTotalAsset();
      this.selected = [];
      this.onChange();
    });

    this.emitter.on("deleteAsset", (assetDeletes) => {
      assetDeletes?.length === 1
        ? axios
            .delete(`http://localhost:5137/api/FixedAsset/${assetDeletes[0]}`)
            .then(() => {
              this.getListAsset();
              this.getTotalAsset();
              this.selected = [];
              this.onChange();
              openToast();
              this.emitter.emit("deleteSuccess");
            })
            .catch((e) => {
              console.log(e);
            })
        : axios
            .delete(`http://localhost:5137/api/FixedAsset/multiple`, {
              data: assetDeletes,
            })
            .then(() => {
              this.getListAsset();
              this.getTotalAsset();
              this.selected = [];
              this.onChange();
              openToast();
              this.emitter.emit("deleteSuccess");
            })
            .catch((e) => {
              console.log(e);
            });
    });
    this.emitter.on("changeSearchKeyword", (payload) => {
      this.keyword = payload;
      this.getListAsset();
      this.getTotalAsset();
    });
    this.emitter.on("changeDepartment", (payload) => {
      this.departmentId = payload;
      this.getListAsset();
      this.getTotalAsset();
    });
    this.emitter.on("changeCategory", (payload) => {
      this.categoryId = payload;
      this.getListAsset();
      this.getTotalAsset();
    });
  },
  beforeUpdate() {
    this.calTotalCostAndQuantity();
    this.calTotalAccumulated();
    this.calTotalRemainValue();
  },
};
</script>

<style lang="css" scoped>
.no-data {
  width: 100%;
  height: calc(100vh - 174px);
}
.no-data-icon {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img-EmptyData-L.svg");
  background-repeat: no-repeat;
  background-position: center center;
}
.department {
  width: calc(100% - 1352px);
}
.justify-end {
  justify-content: end;
}
.labelBox {
  width: 100%;
  height: 37px;
  display: flex;
  align-items: center;
}
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
  background-color: #f9fafc;
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
  background: url("../../assets/qlts-icon.svg") no-repeat -72px -338px;
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
  border-bottom: 1px solid #f1f1f1;
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

.m-table tbody label tr:hover {
  background-color: #e9ebee;
  cursor: pointer;
}

.m-table tbody tr.selected {
  background-color: rgba(26, 164, 200, 0.2);
}

.item:hover {
  background-color: rgba(26, 164, 200, 0.2) !important;
}
.item:focus {
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
  background: url("../../assets/qlts-icon.svg") no-repeat -206px -248px;
  width: 5px;
  height: 8px;
}
.m-btn-next {
  background: url("../../assets/qlts-icon.svg") no-repeat -250px -248px;
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

  display: none;
}
.btn-edit {
  background: url("../../assets/qlts-icon.svg") no-repeat -156px -68px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
.btn-other {
  background: url("../../assets/qlts-icon.svg") no-repeat -244px -112px;
  width: 16px;
  height: 16px;
  margin-left: 8px;
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
.check input:checked ~ .checkmark:after {
  display: block;
}
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

<style lang="css">
.el-pager li.is-active {
  font-weight: 700;
  color: black;
  background-color: #ede3e3;
  border-radius: 3px;
}
ul > li.number {
  width: 20px;
  height: 20px;
  padding: 0;
  font-size: 13px;
  min-width: 0;
  margin-right: 7px;
}
</style>
