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
				return res.json();
			})
			.then(result => {
				return result;
			})
			.catch(error => console.log("error:", error));
	}

	async ForgotPassword(email) {
		let baseURL = process.env.BACKEND_URL + "/api/ForgotPassword/";
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		return await fetch(baseURL + email, requestOptions)
			.then(res => {
				return res.json();
			})
			.then(result => {
				return result;
			})
			.catch(error => console.log("error:", error));
	}

	async ValidateEmail(email) {
		let baseURL = process.env.BACKEND_URL + "/api/ValidateEmail/";
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		return await fetch(baseURL + email, requestOptions)
			.then(res => {
				return res.json();
			})
			.then(result => {
				return result;
			})
			.catch(error => console.log("error:", error));
	}

	async Register(model) {
		let baseURL = process.env.BACKEND_URL + "/api/Register";
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			firstName: model.FName.toLowerCase(),
			lastName: model.LName.toLowerCase(),
			email: model.Email.toLowerCase(),
			password: model.Password
		});
		//console.log(raw);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		return await fetch(baseURL, requestOptions)
			.then(res => {
				return res.json();
			})
			.then(result => {
				return result;
			})
			.catch(error => console.log("error:", error));
	}
}

export default CryptoUsers;