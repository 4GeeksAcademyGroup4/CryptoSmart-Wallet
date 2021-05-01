class CryptoCoins {
	constructor() {}
	async GetList() {
		let baseURL = process.env.BACKEND_URL + "/api/CryptoCoins";
		var myHeaders = new Headers();

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		return await fetch(baseURL, requestOptions)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(result => {
				return result;
			})
			.catch(error => console.log("error:", error));
	}
}

export default CryptoCoins;
