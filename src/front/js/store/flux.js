//import { CryptoUsers } from "../services/cryptouser.js";

import CoinMarketCap from "../services/coinmarketcap";
import CryptoAccounts from "../services/cryptoaccount";
import CryptoCoins from "../services/cryptocoins";

const getState = ({ getStore, getActions, setStore }) => {
	//const CryptoUsersSVC = new CryptoUsers();
	const CoinMarketCapSVC = new CoinMarketCap();
	const CryptoAccountsSVC = new CryptoAccounts();
	const CryptoCoinSVC = new CryptoCoins();

	return {
		store: {
			message: null,
			isLogged: false,
			Top5Coins: [],
			Top12Coins: [],
			UserAccounts: [],
			CryptoCoinsList: []
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
			},

			getCoinList: () => {
				CryptoCoinSVC.GetList().then(items => {
					const sorted = items.sort((a, b) => (a.name > b.name ? 1 : -1));
					setStore({ CryptoCoinsList: sorted });
				});
			},
			UpdateAccounts: () => {
				CryptoAccountsSVC.MainBalance(0).then(res => {
					const sorted = res.sort((a, b) => (a.coin.name > b.coin.name ? 1 : -1));
					//console.log(sorted);
					setStore({ UserAccounts: sorted });
				});
			}
		}
	};
};

export default getState;
