//import { CryptoUsers } from "../services/cryptouser.js";

const getState = ({ getStore, getActions, setStore }) => {
	//const CryptoUsersSVC = new CryptoUsers();

	return {
		store: {
			message: null,
			isLogged: false
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
			}
		}
	};
};

export default getState;
