<template lang="">
  <div class="header" id="my-header">
    <div class="header-left">{{ Enums.txtAssets }}</div>
    <div class="header-right">
      <div class="group-year">
        <div class="label">{{ Enums.txtFinancialDepartment }}</div>
        <div class="group-dropdown">
          <div class="text">Năm</div>
          <div
            class="selector"
            @click="toggle()"
            tabindex="0"
            :id="id"
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
                v-for="(item, i) in years"
                :key="i"
                @click="select(item)"
                class="item"
              >
                <div class="checkmark"></div>
                <span>
                  {{ item }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <ul class="header-items">
          <li class="header-item" :title="Enums.txtNotification">
            <div class="notification"></div>
          </li>
          <li class="header-item" :title="Enums.txtSystem">
            <div class="system"></div>
          </li>
          <li class="header-item" :title="Enums.txtSupport">
            <div class="support"></div>
          </li>
          <li class="header-item" :title="Enums.txtProfile">
            <div class="profile"></div>
          </li>
        </ul>
        <div class="arrow-down"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Enums } from "@/assets/Constants";

export default {
  name: "my-header",
  components: {},
  data() {
    return {
      years: ["2022", "2021", "2019", "2018", "2017"],
      value: "2022",
      visible: false,
      id: "select_year",
    };
  },
  methods: {
    /**
     * Ẩn hiện select năm hiện tại
     * Author : Vu Minh Dang (25/10/2022)
     */
    toggle() {
      this.visible = !this.visible;
    },

    /**
     * chọn năm hiện tại
     * Author : Vu Minh Dang (25/10/2022)
     */
    select(option) {
      this.value = option;
    },
  },

  setup() {
    return { Enums };
  },
};
</script>
<style scoped>
.header {
  background-color: #fff;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
}
.header-right {
  display: flex;
  align-items: center;
  justify-self: center;
}
.group-year {
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  font-weight: 500;
  color: #001031;
  margin-right: 20px;
  font-size: 15px;
}
.group-dropdown {
  display: flex;
  padding: 0px 8px 0px 12px;
  background-color: rgba(26, 164, 200, 0.2);
  border-radius: 3px;
  width: 92px;
  height: 30px;
  align-items: center;
  font-size: 13px;
  justify-content: space-between;
  position: relative;
}

.selector {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.text {
  margin-right: 14px;
}
.dropdown {
  background: none;
  border: none;
  outline: none;
}
.item.current .checkmark {
  left: 14px;
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
.item {
  display: flex;
  padding: 7.5px 14px;
  color: black;
  border-radius: 2.5px;
  margin: 0 4px;
  position: relative;
  justify-content: center;
}
.item_ma {
  position: relative;
  width: 60px;
}
.label_value {
  display: block;
  font-size: 13px;
  font-weight: 700;
}
.items {
  width: calc(100%);
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  border: none;
  position: absolute;
  z-index: 1;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  left: 0px;
  top: 30px;
  max-height: 175px;
  overflow-y: auto;
  border-radius: 2.5px;
}
.items:focus-visible {
  display: none;
}

.item:hover {
  color: black;
  background-color: #c7e0f5;
}
.current {
  background: #eaeaea;
}
.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}

.header-items {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.header-item:not(:last-child) {
  margin-right: 20px;
}
.header-item {
  list-style-type: none;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notification {
  background: url("../../assets/qlts-icon.svg") no-repeat -332px -109px;
  width: 16px;
  height: 20px;
  transform: scale(1.2);
}
.system {
  background: url("../../assets/qlts-icon.svg") no-repeat -199px -23px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
}
.support {
  background: url("../../assets/qlts-icon.svg") no-repeat -67px -67px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
}
.profile {
  background: url("../../assets/qlts-icon.svg") no-repeat -23px -23px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
}
.arrow-down {
  background: url("../../assets/qlts-icon.svg") no-repeat -72px -338px;
  width: 7px;
  height: 5px;
  margin-left: 8px;
  margin-right: 24px;
}

.arrow {
  background: url("../../assets/qlts-icon.svg") no-repeat -204px -332px;
  width: 8px;
  height: 16px;
  margin-left: 12px;
}
::-webkit-scrollbar {
  display: none;
}
</style>
