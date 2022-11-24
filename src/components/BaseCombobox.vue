<template lang="">
  <div class="aselect" :data-value="value" :data-list="list">
    <div class="title" v-if="title">
      <p>{{ title }}</p>
      <p style="color: red; margin-left: 2px">*</p>
    </div>

    <div
      class="selector"
      @click="toggle()"
      :id="id"
      tabindex="0"
      :class="error && 'error'"
      @keyup.enter="toggle()"
      @blur="
        {
          visible = false;
        }
      "
    >
      <div v-if="hasFilterIcon" class="filter_icon"></div>
      <div
        class="label"
        :class="{
          label_selected: !hasFilterIcon && tempInput === option_default,
        }"
        :style="{
          lineHeight: lineHeight,
          marginLeft: hasFilterIcon && '25px',
          fontSize: hasFilterIcon && '13px',
        }"
      >
        <span>{{ tempInput }}</span>
        <!-- <input
          v-model="tempInput"
          type="text"
          @input="onChange"
          class="input"
        /> -->
        <!-- @blur="
            () => {
              if (tempInput === '') tempInput = option_default;
            }
          " -->
      </div>
      <div class="error-message" v-show="error">{{ error }}</div>

      <div class="arrow"></div>
      <div
        v-show="!hasCheck"
        class="item_suggest_box"
        :style="{
          width: !hasCheck && '170%',
        }"
      >
        <div v-show="visible" class="item_suggest">
          <div class="item_ma">
            <span>Mã</span>
          </div>
          <span>Tên </span>
        </div>
      </div>
      <ul
        v-show="visible"
        :class="{ hide_scroll: hideScroll }"
        :style="{
          top: hasCheck && '34px',
          width: !hasCheck && '170%',
        }"
      >
        <li
          v-for="(item, i) in options"
          :class="{
            current:
              item?.department_code === tempInput ||
              item?.fixed_asset_category_code === tempInput,
          }"
          :key="i"
          @click="select(item)"
          class="item"
        >
          <div
            class="item_ma"
            :style="{ width: hasCheck ? '34px' : '60px', minWidth: '34px' }"
          >
            <div v-if="hasCheck" class="checkmark"></div>
            <span v-else>{{
              item?.department_code || item?.fixed_asset_category_code
            }}</span>
          </div>
          <span class="item_name">
            {{ item?.department_name || item?.fixed_asset_category_name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Enums } from "@/assets/Constants";
export default {
  data() {
    return {
      tempInput: this.value || this.option_default,
      visible: false,
      listOption: this.$props.options,
    };
  },
  methods: {
    /**
     * Thay đổi input trong filter
     * Author : Vu Minh Dang (05/11/2022)
     */
    onChange() {
      this.listOption =
        this.option_default === Enums.txtAssetType
          ? this.options.filter(
              (option) =>
                option.fixed_asset_category_code
                  .toLowerCase()
                  .includes(this.tempInput.toLowerCase()) ||
                option.fixed_asset_category_name
                  .toLowerCase()
                  .includes(this.tempInput.toLowerCase())
            )
          : this.options.filter(
              (option) =>
                option.department_code
                  .toLowerCase()
                  .includes(this.tempInput.toLowerCase()) ||
                option.department_name
                  .toLowerCase()
                  .includes(this.tempInput.toLowerCase())
            );
    },

    /**
     * Ẩn hiện các options
     * Author : Vu Minh Dang (05/11/2022)
     */
    toggle() {
      this.visible = !this.visible;
    },

    /**
     * Chọn 1 option
     * Author : Vu Minh Dang (05/11/2022)
     */
    select(option) {
      console.log(option);
      if (this.tempInput === this.option_default) {
        this.tempInput =
          option?.department_code || option?.fixed_asset_category_code;
      } else {
        if (
          this.tempInput === option?.department_code ||
          this.tempInput === option?.fixed_asset_category_code
        ) {
          this.tempInput = this.option_default;
          option = null;
        } else {
          this.tempInput =
            option?.department_code || option?.fixed_asset_category_code;
        }
      }
      this.$emit(
        "inputData",
        this.tempInput === this.option_default ? "" : this.tempInput,
        this.title
      );
      this.$props.hasFilterIcon &&
        (this.$props.option_default === Enums.txtDepartment
          ? this.emitter.emit("changeDepartment", option?.department_id || "")
          : this.emitter.emit(
              "changeCategory",
              option?.fixed_asset_category_id || ""
            ));
    },
  },

  props: {
    title: String,
    option_default: String,
    hideScroll: Boolean,
    hasCheck: Boolean,
    lineHeight: String,
    hasFilterIcon: Boolean,
    error: String,
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    value: String,
  },

  created() {
    this.listOption = this.$props.options;
  },
  // beforeUpdate() {
  //   if (this.visible) {
  //     this.$refs.firstFocus.children[0].focus();
  //   }
  // },
};
</script>
<style lang="css" scoped>
.item_name {
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}
.input {
  border: none;
  outline: none;
  background-color: #f9fafc;
}
.item:focus {
  background-color: salmon;
}
.aselect {
  width: calc(100% - 16px);
}
.title {
  font-size: 13px;
  margin-bottom: 8px;
  display: flex;
}
.title > * {
  margin: 0;
}

.label_selected {
  font-style: italic;
  opacity: 0.8;
}
.selector {
  border: 1px solid #afafaf;
  background-color: #f9fafc;
  position: relative;
  border-radius: 2.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.filter_icon {
  background: url("../assets/qlts-icon.svg") no-repeat -243px -69px;
  width: 17px;
  height: 16px;
  position: absolute;
  margin-left: 10px;
}
.selector:focus {
  border-color: #1aa4c8;
  outline: none;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 40%;
  background: url("../assets/qlts-icon.svg") no-repeat -72px -338px;
  width: 7px;
  height: 5px;
}

.label {
  display: block;
  padding: 9px 14px;
  font-size: 14px;
  line-height: 16px;
}
ul {
  width: calc(100% + 2px);
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  border: none;
  position: absolute;
  z-index: 1;
  background: #f9fafc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  margin-top: 1px;
  left: -1px;
  top: 73px;
  max-height: 175px;
  overflow-y: auto;
  border-radius: 0 0 2.5px 2.5px;
}
ul:focus-visible {
  display: none;
}

li:hover {
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
.item_suggest_box {
  position: absolute;
  left: -1px;
  background-color: #f9fafc;
  width: calc(100% + 2px);
  top: 35px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 16%);
  border-radius: 2.5px 2.5px 0px 0px;
}
.item_suggest {
  font-weight: 700;
  background-color: #96c6ee;
  margin: 4px 4px 0 4px;
  font-size: 14px;
  display: flex;
  padding: 9px 14px;
  color: black;
  border-radius: 2.5px;
}

.item_suggest:hover {
  background-color: #96c6ee;
}

.item {
  display: flex;
  padding: 9px 14px;
  color: black;
  border-radius: 2.5px;
  margin: 0 4px;
}
.item_ma {
  position: relative;
  width: 60px;
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

.check-box {
  margin: 0;
}

input[type="checkbox"] {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: relative;
}

.item.current .checkmark {
  left: 6px;
  top: -2px;
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

.error-message {
  font-size: 10px;
  position: absolute;
  bottom: -16px;
  color: #e92e2e;
}
.error {
  border-color: #e92e2e !important;
}
</style>
