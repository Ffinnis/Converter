<template>
  <b-list-group>
    <b-list-group-item v-for="item in currencies" :key="item.ID">
      <div class="row">
        <h5 class="col">1 {{ !item.converted ? item.CharCode : "RUB" }}</h5>
        <b-icon
          class="col"
          icon="arrows-angle-expand"
          rotate="45"
          scale="2"
          cursor="pointer"
          @click="convert(item.CharCode, item.ID)"
        />
        <h5 class="col">
          <span>
            {{ Number(item.Value) }}
          </span>
          {{ !item.converted ? "RUB" : item.CharCode }}
          <span
            :class="
              (Number(item.Value) - Number(item.Previous)).toFixed(4) > 0
                ? 'green'
                : 'red'
            "
          >
            {{
              Math.abs((Number(item.Value) - Number(item.Previous)).toFixed(4))
            }}
            <b-icon
              :icon="
                (Number(item.Value) - Number(item.Previous)).toFixed(4) > 0
                  ? 'arrow-up'
                  : 'arrow-down'
              "
            />
          </span>
        </h5>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "CurrenciesList",
  computed: {
    currencies() {
      return this.$store.state.currencies;
    },
  },
  methods: {
    convert(charCode) {
      let currency = this.$store.state.currencies.find((item) => {
        return item.CharCode === charCode;
      });
      let { convertValue, Value, Previous, convertPrevious } = currency;
      currency.convertValue = Number(Value);
      currency.Value = Number(convertValue);
      currency.Previous = Number(convertPrevious);
      currency.convertPrevious = Previous;
      return (currency.converted = !currency.converted);
    },
  },
};
</script>

<style scoped>
.green {
  color: green;
}
.red {
  color: red;
}
</style>
