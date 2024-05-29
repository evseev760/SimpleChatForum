// apiService.js
const axios = require("axios");
const config = require("config");
const conf = {
  headers: {
    "X-CMC_PRO_API_KEY": config.get("X-CMC_PRO_API_KEY"),
  },
};

const getAvatar = async (id) => {
  const result = await axios(
    `https://api.dicebear.com/8.x/bottts-neutral/svg?size=96&seed=${id}&mouth=bite,diagram,grill01,grill02,grill03,square01,square02&eyes=eva,frame1,frame2,glow,robocop,round,roundFrame01,roundFrame02,sensor,shade01`
  );
  return result.data;
};

const getGeolocationData = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await axios.get(url);
    if (response.data) {
      const result = response.data;
      console.log(result.display_name); // Full address
      console.log(`Country: ${result.address.country}`);
      console.log(
        `City: ${
          result.address.city || result.address.town || result.address.village
        }`
      );
      return result;
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error("Error getting geolocation data:", error);
  }
};
const cache = {};
const getCryptoPrice = async (cryptoCurrency, currency) => {
  try {
    const cacheKey = `${cryptoCurrency}-${currency}`;
    const currentTime = Date.now();

    // Проверяем, есть ли закешированное значение и не истек ли срок его действия (5 минут)
    if (
      cache[cacheKey] &&
      currentTime - cache[cacheKey].timestamp < 60 * 60 * 1000
    ) {
      return cache[cacheKey].price;
    }

    // Если кешировано значение нет или срок его действия истек, делаем запрос к API
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${cryptoCurrency}&convert=${currency}`;
    const response = await axios.get(url, conf);
    const price = response.data.data[cryptoCurrency].quote[currency].price;

    // Сохраняем результат в кеш с текущим временным штампом
    cache[cacheKey] = {
      price: price,
      timestamp: currentTime,
    };

    return price;
  } catch (error) {
    console.error("Ошибка при получении цены криптовалюты:", error);
    throw error; // Пробрасываем ошибку дальше, чтобы обработать ее на уровне вызывающего кода
  }
};
// const getCryptoPrice = async (cryptoCurrency, currency) => {
//   try {
//     const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${cryptoCurrency}&convert=${currency}`;
//     const response = await axios.get(url, conf);
//     const price = response.data;

//     return price;
//   } catch (error) {
//     console.error("Ошибка при получении цены криптовалюты:", error);
//     throw error; // Пробрасываем ошибку дальше, чтобы обработать ее на уровне вызывающего кода
//   }
// };

module.exports = { getAvatar, getGeolocationData, getCryptoPrice };
