import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Redirect } from "react-router-dom";
import rigoURL from "../../img/rigo-baby.jpg";

import CoinMarketCap from "../services/coinmarketcap";
import { CoinHome } from "../component/coinHome";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const user = localStorage.getItem("user");
	const CoinMarketCapSVC = new CoinMarketCap();

	if (user == undefined) {
		return <Redirect to={{ pathname: "/Login" }} />;
	} else {
		return (
			<div className="container">
				<div className="bg-dark text-center m-2 py-2 rounded">
					<h2 className="text-white">Resumen de productos</h2>
				</div>
				<div className="row m-0 p-0">
					{store.Top5Coins.map((item, i) => {
						return <CoinHome CoinID={item.id} key={i} />;
					})}
				</div>
			</div>
		);
	}
};
