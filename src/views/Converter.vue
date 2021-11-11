<template>
  <div class="h-100 row align-items-center justify-content-center">
    <b-card class="mr-5">
      <span>{{ outCurrency }}</span>
      <b-row>
        <b-col>
          <b-select v-model="outCurrency" :options="currenciesToOptions" />
        </b-col>
        <b-col v-show="outCurrency">
          <b-input
            @input="convertCurrencies"
            v-model="outCurrencyCount"
            type="number"
            class="col-sm"
            style="border: none; border-bottom: 1px solid #666161"
          />
        </b-col>
      </b-row>
    </b-card>
    <b-icon
      @click="reverseCurrencies"
      cursor="pointer"
      icon="arrow-left-right"
      scale="2"
    />
    <b-card class="ml-5">
      <span>{{ inCurrency }}</span>
      <b-row>
        <b-col>
          <b-select v-model="inCurrency" :options="currenciesToOptions" />
        </b-col>
        <b-col v-show="inCurrency">
          <b-input
            v-model="inCurrencyCount"
            type="number"
            class="col-sm"
            disabled
          />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Converter",
  data() {
    return {
      outCurrency: null,
      inCurrency: null,
      outCurrencyCount: 0,
      inCurrencyCount: 0,
    };
  },
  methods: {
    convertCurrencies() {
      let outCurrencyValue = this.currencies.find(
        (item) => item.Name === this.outCurrency
      );
      let inCurrencyValue = this.currencies.find(
        (item) => item.Name === this.inCurrency
      );
      this.inCurrencyCount = (
        (Number(outCurrencyValue.Value) / Number(inCurrencyValue.Value)) *
        this.outCurrencyCount
      ).toFixed(4);
    },
    reverseCurrencies() {
      let inCurrency = this.inCurrency;
      this.inCurrency = this.outCurrency;
      this.outCurrency = inCurrency;
      return this.convertCurrencies();
    },
  },
  computed: {
    currencies() {
      return this.$store.state.currencies;
    },
    currenciesToOptions() {
      let currencies = [];
      if (this.$store.state.currencies) {
        this.$store.state.currencies.forEach((item) => {
          return currencies.push({
            value: item.Name,
            text: item.CharCode,
          });
        });
      }
      return currencies;
    },
  },
};
</script>
