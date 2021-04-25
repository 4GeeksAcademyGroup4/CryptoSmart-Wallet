class CryptoUsers {
	constructor() {}
	async Login(model) {
		let baseURL = process.env.BACKEND_URL + "/api/Login";
		var myHeaders = new Headers();
		let AuthHeader = "Basic " + window.btoa(model.email + ":" + model.password);
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

export default CryptoUsers;
