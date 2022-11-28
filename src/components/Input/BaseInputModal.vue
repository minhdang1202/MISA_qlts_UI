<template lang="">
  <div class="input" :style="{ width: width + '%' }">
    <div class="title">
      <p>{{ title }}</p>
      <p style="color: red; margin-left: 2px">*</p>
    </div>
    <div>
      <div class="group-input">
        <VueNumberFormat
          v-if="inputType === 'number'"
          :value="modelValue"
          v-model:value="valueInput"
          :maxlength="max"
          :options="{
            decimal:
              (title === Enums.txtDepreciation ||
                title === Enums.txtDepreciationValue) &&
              ',',
            thousand: '.',
            precision: title === Enums.txtDepreciation && 2,
          }"
          :style="{
            textAlign: 'right',
            paddingRight: show_icon_num ? '40px' : '14px',
          }"
          @change="onChange"
          :min="2"
        ></VueNumberFormat>
        <input
          v-else
          :title="title"
          :placeholder="[placeholder]"
          :readonly="readonly"
          :disabled="disabled"
          :class="error && 'error'"
          :type="inputType"
          :value="modelValue"
          v-model="valueInput"
          @input="onChange"
          :style="{
            textAlign: title === Enums.txtYearTracking ? 'right' : 'left',
            paddingRight: show_icon_num ? '40px' : '14px',
            height: inputType === 'date' && '36px',
          }"
          :maxlength="max"
        />
        <div class="icons" v-show="show_icon_num" tabindex="-1">
          <button class="inc btn" tabindex="-1" @click="increase"></button>
          <button class="dec btn" tabindex="-1" @click="decrease"></button>
        </div>
        <div class="error-message" v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Enums } from "@/assets/Constants";

export default {
  data() {
    return {
      valueInput:
        this.inputType === "date"
          ? this.stringToDate(this.modelValue)
          : this.modelValue,
    };
  },
  setup() {
    return { Enums };
  },
  props: {
    modelValue: String,
    title: String,
    width: Number,
    value: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    textAlign: String,
    inputType: String,
    show_icon_num: Boolean,
    show_icon_date: Boolean,
    error: String,
    autofocus: Boolean,
    max: Number,
  },
  watch: {
    valueInput: function () {
      this.$emit("update:modelValue", this.valueInput);
    },
  },
  emits: ["update:modelValue"],

  methods: {
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
     * convert Date to String input values
     * Author : Vu Minh Dang (25/10/2022)
     */
    dateToString(date) {
      const newDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return newDate;
    },

    /**
     * Thay đổi giá trị trong input
     * Author : Vu Minh Dang (25/10/2022)
     */
    onChange() {
      if (this.title === Enums.txtDepreciation && this.valueInput > 99.99) {
        this.valueInput = 100;
      }
      if (this.title === Enums.txtQuantity) {
        if (this.valueInput < 1) {
          this.valueInput = 1;
        }
      } else {
        if (this.valueInput < 0) {
          this.valueInput *= -1;
        }
      }
      this.$emit("update:modelValue", this.valueInput);
    },

    /**
     * Tăng 1 đơn vị
     * Author : Vu Minh Dang (25/10/2022)
     */
    increase() {
      if (this.title === Enums.txtDepreciation && this.valueInput >= 99.99) {
        this.valueInput = 100;
      } else {
        this.valueInput += 1;
      }
    },

    /**
     * Giảm 1 đơn vị
     * Author : Vu Minh Dang (25/10/2022)
     */
    decrease() {
      if (this.title === Enums.txtQuantity) {
        if (this.valueInput > 1) {
          this.valueInput -= 1;
        }
      } else {
        if (this.valueInput > 0) {
          this.valueInput -= 1;
        }
      }
    },
  },
};
</script>
<style lang="css" scoped>
.group-input {
  display: flex;
  align-items: center;
  position: relative;
}
input {
  padding: 9px 14px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2.5px;
  border: 1px solid #afafaf;
  font-size: 14px;
  outline: none;
}

input:hover {
  border-color: #1aa4c8;
}

input:disabled {
  background-color: #f5f5f5;
  pointer-events: none;
}

input:focus {
  border-color: #1aa4c8;
}

input::-webkit-input-placeholder {
  font-style: italic;
}

.title {
  font-size: 13px;
  margin-bottom: 8px;
  display: flex;
}
.title > * {
  margin: 0;
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
.icons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15px;
  position: absolute;
  right: 12px;
}
.inc {
  background: url("../../assets/qlts-icon.svg") no-repeat -26px -338px;
  width: 5px;
  height: 5px;
}
.dec {
  background: url("../../assets/qlts-icon.svg") no-repeat -70px -338px;
  width: 5px;
  height: 5px;
}
.btn {
  border: none;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  background: url("../../assets/qlts-icon.svg") no-repeat -287px -67px;
  width: 18px;
  height: 18px;
}
input[type="date"] {
  font-family: Roboto;
}
</style>
