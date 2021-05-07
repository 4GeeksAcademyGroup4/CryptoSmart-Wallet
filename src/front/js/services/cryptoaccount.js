import * as moment from "moment";
import { message } from "antd";

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

	async DirectDeposit(model) {
		let baseURL = process.env.BACKEND_URL + "/api/Deposit";
		var myHeaders = new Headers();
		var AuthUser = JSON.parse(localStorage.getItem("user"));
		let AuthHeader = "Bearer " + AuthUser.token;

		myHeaders.append("Authorization", AuthHeader);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			date: moment().format(),
			coinID: model.coinID,
			amount: model.amount
		});
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
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

	async Transfer(model) {
		let baseURL = process.env.BACKEND_URL + "/api/Transfer";
		var myHeaders = new Headers();
		var AuthUser = JSON.parse(localStorage.getItem("user"));
		let AuthHeader = "Bearer " + AuthUser.token;

		myHeaders.append("Authorization", AuthHeader);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			date: moment().format(),
			accountID: model.accountID,
			amount: model.amount,
			UserCode: model.UserCode,
			reason: model.reason
		});
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

	async CreateACcount(model) {
		let baseURL = process.env.BACKEND_URL + "/api/Account";
		var myHeaders = new Headers();
		var AuthUser = JSON.parse(localStorage.getItem("user"));
		let AuthHeader = "Bearer " + AuthUser.token;

		myHeaders.append("Authorization", AuthHeader);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			date: moment().format(),
			coinID: model.coinID,
			amount: model.amount
		});
		//console.log(model);
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

	async History(id) {
		let baseURL = process.env.BACKEND_URL + "/api/History/" + id;
		var myHeaders = new Headers();
		var AuthUser = JSON.parse(localStorage.getItem("user"));
		let AuthHeader = "Bearer " + AuthUser.token;

		myHeaders.append("Authorization", AuthHeader);

		var requestOptions = {
			method: "POST",
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
}

export default CryptoAccounts;
