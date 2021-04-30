import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropType from "prop-types";
import CoinMarketCap from "../services/coinmarketcap";
import rigoURL from "../../img/rigo-baby.jpg";

import { BtnDeposit } from "./btnDeposit";

export const CoinHome = props => {
	const { store, actions } = useContext(Context);
	const [Coin, setCoin] = useState({});
	const [ExistingAccount, SetExistingAcccount] = useState({});
	const CoinMarketCapSVC = new CoinMarketCap();

	function fnDetail() {
		CoinMarketCapSVC.Detail(props.CoinSymbol).then(res => {
			//console.log(res);
			setCoin(res);
		});
	}

	function CheckCurrentAccount() {
		store.UserAccounts.forEach(item => {
			if (item.coin.symbol == props.CoinSymbol) {
				//console.log(item.coin.symbol, ":", props.CoinSymbol);
				SetExistingAcccount(item);
			}
		});
	}

	useEffect(() => {
		//fnDetail();
		CheckCurrentAccount();
	}, []);

	if (ExistingAccount.accountID != undefined) {
		return (
			<div className="col-sm-4 text-center p-1 mw-coins">
				<div className="flip-box-homepage">
					<div className="flip-box-inner-homepage">
						<div className="flip-box-front-homepage">
							<img src={rigoURL} className="w-100 px-3 pt-3" />
							{/* <img src={Coin.logo} className="w-100 p-3 mw-100 mh-100" /> */}
						</div>
						<div className="flip-box-back-homepage p-3">
							<p className="text-font-base m-0 text-dark font-weight-bold fa-15x">{props.CoinSymbol}</p>
							<p className="text-font-base m-0 text-black-50 font-weight-bold">{props.CoinSymbol}</p>
							{/* <p className="text-font-base m-0 text-dark font-weight-bold fa-15x">{props.CoinSymbol}</p>
							<p className="text-font-base m-0 text-black-50 font-weight-bold">{Coin.name}</p> */}
							<BtnDeposit Account={ExistingAccount} TypeLink="btn" />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="col-sm-4 text-center p-1 mw-coins">
				<div className="flip-box-homepage">
					<div className="flip-box-inner-homepage">
						<div className="flip-box-front-homepage">
							<img src={rigoURL} className="w-100 px-3 pt-3" />
							{/* <img src={Coin.logo} className="w-100 p-3 mw-100 mh-100" /> */}
						</div>
						<div className="flip-box-back-homepage p-3">
							<p className="text-font-base m-0 text-dark font-weight-bold fa-15x">{props.CoinSymbol}</p>
							<p className="text-font-base m-0 text-black-50 font-weight-bold">{props.CoinSymbol}</p>
							{/* <p className="text-font-base m-0 text-dark font-weight-bold fa-15x">{props.CoinSymbol}</p>
							<p className="text-font-base m-0 text-black-50 font-weight-bold">{Coin.name}</p> */}
							<button className="btn btn-outline-dark my-3">Abrir cuenta</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

CoinHome.propTypes = {
	CoinSymbol: PropType.string
	// 2) add here the new properties into the proptypes object
};
