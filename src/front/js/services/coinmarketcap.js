class CoinMarketCap {
	constructor() {}

	async Latest() {
		var myHeaders = new Headers();
		myHeaders.append("X-CMC_PRO_API_KEY", "0a3549c4-3d25-4c8c-8315-8ec2baa5b2b6");

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
		myHeaders.append("X-CMC_PRO_API_KEY", "0a3549c4-3d25-4c8c-8315-8ec2baa5b2b6");

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
		myHeaders.append("X-CMC_PRO_API_KEY", "0a3549c4-3d25-4c8c-8315-8ec2baa5b2b6");

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
