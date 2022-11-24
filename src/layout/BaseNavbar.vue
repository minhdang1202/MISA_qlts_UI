<template lang="">
  <div :class="`${is_expanded && 'is_expanded'}`" class="navbar" id="my-navbar">
    <div class="nav-top">
      <div class="nav-header" :class="`${is_expanded && 'nav-item-expanded'}`">
        <button
          class="logo"
          @click="toggleMenu"
          :style="is_expanded && 'margin-left:7px'"
        >
          <div></div>
        </button>
        <p v-if="is_expanded">MISA QLTS</p>
      </div>
      <ul class="nav-items">
        <li
          v-for="(item, i) in SIDEBARS"
          :key="i"
          class="nav-item"
          :class="`${is_expanded && 'nav-item-expanded'}`"
        >
          <router-link :to="item.to" active-class="active">
            <div class="nav-item-left">
              <div
                :class="`${is_expanded && 'item-expanded'}  ${
                  route?.matched[0]?.name === item?.name
                    ? item.active
                    : item.icon
                } `"
                :title="item.title"
              ></div>
              <transition name="fade">
                <p
                  v-if="is_expanded"
                  :class="`${item.name === 'ht_db' && 'ht'}`"
                >
                  {{ item.title }}
                </p>
              </transition>
            </div>
            <div
              class="nav-item-right"
              v-if="item.arrow_down && is_expanded"
            ></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="nav-bottom"
      :style="{ justifyContent: is_expanded ? 'end' : 'center' }"
    >
      <button
        class="back-icon"
        @click="toggleMenu"
        v-show="is_expanded"
      ></button>
      <button
        class="show-icon"
        @click="toggleMenu"
        v-show="!is_expanded"
      ></button>
    </div>
  </div>
</template>
<script>
import { is_expanded, toggleMenu } from "../state";
import { SIDEBARS } from "../data";
import { useRoute } from "vue-router";

export default {
  name: "my-navbar",
  components: {},
  props: {},
  setup() {
    const route = useRoute();

    return { is_expanded, toggleMenu, SIDEBARS, route };
  },
};
</script>
<style scoped>
.ht {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 120px;
  overflow: hidden;
}
.navbar {
  width: 66px;
  height: 100vh;
  background-color: #1c3048;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s ease-out;
  position: relative;
}
.is_expanded {
  width: 275px;
}
.nav-top {
  margin: 0 11px;
}
.nav-header {
  display: flex;
  margin-top: 11px;
  margin-bottom: 19px;
  justify-content: center;
  align-items: center;
}
.nav-header > p {
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin: 0;
}
.logo {
  background: none;
  border: none;
  padding: 0px;
}
.logo > div {
  background-image: url("../assets/qlts-icon.svg");
  background-repeat: no-repeat;
  width: 36px;
  height: 36px;
  background-position: -20px -680px;

  cursor: pointer;
}
.nav-items {
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: center;
}
.nav-item {
  border-radius: 6px;
  width: 44px;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 13px;
  justify-content: center;
  transition: 0.2s ease-out;
}

.nav-item > a {
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}
.nav-item-expanded {
  width: 200px;
  justify-content: space-between;
  align-items: center;
}
.nav-item-expanded > a {
  justify-content: space-between;
}
.nav-item-right {
  background: url("../assets/qlts-icon.svg") no-repeat -158px -293px;
  width: 11px;
  height: 7px;
  margin-right: 13px;
}
.nav-item-left {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.nav-item-left > div {
  margin-right: 14px;
  margin-left: 14px;
}

.overview {
  background: url("../assets/qlts-icon.svg") no-repeat -21px -153px;
  width: 22px;
  height: 22px;
}
.overview-active {
  background: url("../assets/qlts-icon.svg") no-repeat -22px -198px;
  width: 20px;
  height: 21px;
}
.asset {
  background: url("../assets/qlts-icon.svg") no-repeat -65px -153px;
  width: 22px;
  height: 23px;
}
.asset-active {
  background: url("../assets/qlts-icon.svg") no-repeat -65px -197px;
  width: 22px;
  height: 23px;
}
.ht-db {
  background: url("../assets/qlts-icon.svg") no-repeat -110px -153px;
  width: 21px;
  height: 23px;
}
.ht-db-active {
  background: url("../assets/qlts-icon.svg") no-repeat -110px -197px;
  width: 21px;
  height: 22px;
}
.tool {
  background: url("../assets/qlts-icon.svg") no-repeat -153px -153px;
  width: 22px;
  height: 22px;
}
.tool-active {
  background: url("../assets/qlts-icon.svg") no-repeat -153px -197px;
  width: 22px;
  height: 22px;
}
.category {
  background: url("../assets/qlts-icon.svg") no-repeat -197px -155px;
  width: 22px;
  height: 18px;
}
.category-active {
  background: url("../assets/qlts-icon.svg") no-repeat -198px -200px;
  width: 20px;
  height: 17px;
}
.search {
  background: url("../assets/qlts-icon.svg") no-repeat -241px -153px;
  width: 22px;
  height: 22px;
}
.search-active {
  background: url("../assets/qlts-icon.svg") no-repeat -240px -196px;
  width: 23px;
  height: 23px;
}
.report {
  background: url("../assets/qlts-icon.svg") no-repeat -329px -153px;
  width: 22px;
  height: 22px;
}
.report-active {
  background: url("../assets/qlts-icon.svg") no-repeat -330px -198px;
  width: 20px;
  height: 20px;
}
.active {
  background-color: #1aa4c8;
  border-radius: 6px;
  /* width: 44px; */
  height: 40px;
  overflow: hidden;
  opacity: 1 !important;
}
.nav-bottom {
  border-top: 1px solid rgb(175, 175, 175, 0.3);
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 40px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-out;
}

.back-icon {
  background: url("../assets/qlts-icon.svg") no-repeat -285px -417px;
  width: 22px;
  height: 22px;
  border: none;
  float: right;
  margin-right: 13px;
  opacity: 0.8;
}
.show-icon {
  background: url("../assets/qlts-icon.svg") no-repeat -329px -417px;
  width: 22px;
  height: 22px;
  border: none;
  opacity: 0.8;
}
</style>
