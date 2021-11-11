<template>
  <div class="currencies">
    <CurrenciesList />
  </div>
</template>

<script>
import CurrenciesList from "../components/currenciesComponents/CurrenciesList";
export default {
  name: "Currencies",
  components: { CurrenciesList },
};
</script>
