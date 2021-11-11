import Vue from "vue";
import Vuex from "vuex";
import { getCurrencies } from "../utlis/ApiHelper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: null,
  },
  mutations: {
    loadCurrencies(state, currencies) {
      state.currencies = currencies;
    },
  },
  actions: {
    async loadCurrencies(context) {
      let currencies = await getCurrencies();
      currencies = Object.values(currencies);
      currencies.forEach((item) => {
        item.Value = (Number(item.Value) / Number(item.Nominal)).toFixed(4);
        item.Previous = (Number(item.Previous) / Number(item.Nominal)).toFixed(
          4
        );
        item.convertPrevious = (1 / Number(item.Previous)).toFixed(4);
        item.convertValue = (1 / Number(item.Value)).toFixed(4);
        item.converted = false;
      });
      return context.commit("loadCurrencies", currencies);
    },
  },
  modules: {},
});
