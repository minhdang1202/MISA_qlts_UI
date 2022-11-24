<template lang="">
  <div class="input" :style="{ width: width + '%' }">
    <div class="title">
      <p>{{ title }}</p>
      <p style="color: red; margin-left: 2px">*</p>
    </div>
    <div class="group-input">
      <VueNumberFormat
        v-if="inputType === 'number'"
        :value="value"
        v-model:value="tempInput"
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
        :value="disabled ? value : tempInput"
        :style="{
          textAlign: title === Enums.txtYearTracking ? 'right' : 'left',
          paddingRight: show_icon_num ? '40px' : '14px',
          height: inputType === 'date' && '36px',
        }"
        :class="error && 'error'"
        :type="inputType"
        v-model="tempInput"
        @input="onChange"
      />

      <div class="icons" v-show="show_icon_num" tabindex="-1">
        <button class="inc btn" tabindex="-1" @click="increase"></button>
        <button class="dec btn" tabindex="-1" @click="decrease"></button>
      </div>
      <div class="error-message" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>
<script>
import { Enums } from "@/assets/Constants";
import axios from "axios";

export default {
  data() {
    return {
      tempInput: this.inputType === "date" ? this.stringToDate() : this.value,
    };
  },
  props: {
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
  methods: {
    /**
     * convert String to Date input values
     * Author : Vu Minh Dang (25/10/2022)
     */
    stringToDate() {
      const [day, month, year] = this.value.split("/");

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
      if (this.title === Enums.txtDepreciation && this.tempInput > 99.99) {
        this.tempInput = 100;
      }
      if (this.title === Enums.txtQuantity) {
        if (this.tempInput < 1) {
          this.tempInput = 1;
        }
      } else {
        if (this.tempInput < 0) {
          this.tempInput *= -1;
        }
      }
      this.$emit("inputData", this.tempInput, this.title);
    },

    /**
     * Tăng 1 đơn vị
     * Author : Vu Minh Dang (25/10/2022)
     */
    increase() {
      if (this.title === Enums.txtDepreciation && this.tempInput >= 99.99) {
        this.tempInput = 100;
      } else {
        this.tempInput += 1;
      }
      this.$emit("increaseData", this.tempInput, this.title);
    },

    /**
     * Giảm 1 đơn vị
     * Author : Vu Minh Dang (25/10/2022)
     */
    decrease() {
      if (this.title === Enums.txtQuantity) {
        if (this.tempInput > 1) {
          this.tempInput -= 1;
        }
      } else {
        if (this.tempInput > 0) {
          this.tempInput -= 1;
        }
      }
      this.$emit("decreaseData", this.tempInput, this.title);
    },

    /**
     * Lấy mã tài sản lớn nhất
     * Author : Vu Minh Dang (25/11/2022)
     */
    getAssetCode() {
      axios
        .get("http://localhost:5137/api/FixedAsset/lastest")
        .then((response) => {
          this.tempInput = response?.data?.lastestCode;
          this.emitter.emit("changeCode", response?.data?.lastestCode);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  setup() {
    return { Enums };
  },
  mounted() {
    this.$props.value === "" &&
      this.$props.title === Enums.txtAssetCode &&
      this.getAssetCode();
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
  height: 14px;
  position: absolute;
  right: 12px;
}
.inc {
  background: url("../assets/qlts-icon.svg") no-repeat -26px -338px;
  width: 5px;
  height: 5px;
}
.dec {
  background: url("../assets/qlts-icon.svg") no-repeat -70px -338px;
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
  background: url("../assets/qlts-icon.svg") no-repeat -287px -67px;
  width: 18px;
  height: 18px;
}
input[type="date"] {
  font-family: Roboto;
}
</style>
