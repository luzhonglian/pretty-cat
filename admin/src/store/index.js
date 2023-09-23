import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    dynamicStatus: false,
    isCollapsed: false,
    userInfo: {},
  },
  getters: {},
  mutations: {
    setDynamicStatus(state, value) {
      state.dynamicStatus = value;
    },
    setCollapse(state, value) {
      state.isCollapsed = !state.isCollapsed;
    },
    setUserInfo(state, value) {
      if (value) {
        state.userInfo = {
          ...state.userInfo,
          ...value,
        };
      }else{
        state.userInfo = {};
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["isCollapsed", "userInfo"],
    }),
  ],
});
