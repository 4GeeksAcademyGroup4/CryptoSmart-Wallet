class CryptoAccounts {
	constructor() {}

	async MainBalance(id) {
		let baseURL = process.env.BACKEND_URL + "/api/MainBalance/" + id;
		var myHeaders = new Headers();
		var AuthUser = JSON.parse(localStorage.getItem("user"));
		let AuthHeader = "Bearer " + AuthUser.token;

		myHeaders.append("Authorization", AuthHeader);

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

export default CryptoAccounts;
