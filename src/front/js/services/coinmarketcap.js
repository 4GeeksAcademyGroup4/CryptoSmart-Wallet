class CoinMarketCap {
	constructor() {}

	async Latest() {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "d23ea42b-4f22-47b3-8e28-4650f23c4096");

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		return await fetch(
			"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=6",
			requestOptions
		)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));
	}

	async Detail(id) {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "d23ea42b-4f22-47b3-8e28-4650f23c4096");

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		return await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=" + id, requestOptions)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(result => {
				return result.data[id.toString()];
			})
			.catch(error => console.log("error", error));
	}

	async DetailQuote(id) {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "d23ea42b-4f22-47b3-8e28-4650f23c4096");

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		return await fetch(
			"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + id,
			requestOptions
		)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(result => {
				return result.data[id.toString()].quote.USD;
			})
			.catch(error => console.log("error", error));
	}
}
export default CoinMarketCap;
