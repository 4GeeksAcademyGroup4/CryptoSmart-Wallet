class CoinMarketCap {
	constructor() {}

	async Latest() {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "70bd17af-dfa8-4fb3-851d-e06c3fc0beed");

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
		myHeaders.append("X-CMC_PRO_API_KEY", "70bd17af-dfa8-4fb3-851d-e06c3fc0beed");

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
				//console.log(result);
				return result.data[id.toString()];
			})
			.catch(error => console.log("error", error));
	}

	async DetailQuote(id) {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "70bd17af-dfa8-4fb3-851d-e06c3fc0beed");

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
