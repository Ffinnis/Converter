import axios from "axios";

const getCurrencies = async () => {
  try {
    const currencies = await axios.get(
      "https://www.cbr-xml-daily.ru/daily_json.js?convert=usd"
    );
    return currencies.data.Valute;
  } catch (e) {
    console.log(e);
  }
};

export { getCurrencies };
