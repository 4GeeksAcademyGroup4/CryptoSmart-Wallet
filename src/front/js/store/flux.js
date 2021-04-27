//import { CryptoUsers } from "../services/cryptouser.js";

import CoinMarketCap from "../services/coinmarketcap";

const getState = ({ getStore, getActions, setStore }) => {
	//const CryptoUsersSVC = new CryptoUsers();
	const CoinMarketCapSVC = new CoinMarketCap();

	return {
		store: {
			message: null,
			isLogged: false,
			Top5Coins: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			LoginStore: () => {
				setStore({ isLogged: true });
			},
			LogoutStore: () => {
				setStore({ isLogged: false });
			},
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getTop5: () => {
				CoinMarketCapSVC.Latest().then(items => {
					setStore({ Top5Coins: items });
				});
			}
		}
	};
};

export default getState;
