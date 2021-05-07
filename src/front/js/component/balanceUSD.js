import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropType from "prop-types";

import CurrencyFormat from "react-currency-format";
import CoinMarketCap from "../services/coinmarketcap";

export const BalanceUSD = props => {
	const { actions } = useContext(Context);
	const [NewBalanceUSD, setNewBalance] = useState(0);
	const CoinMarketCapSVC = new CoinMarketCap();

	function fnDetail() {
		CoinMarketCapSVC.DetailQuote(props.Account.coin.symbol).then(res => {
			setNewBalance(res.price * props.Account.balance);
		});
	}

	useEffect(() => {
		fnDetail();
	}, []);

	return (
		<span>
			<CurrencyFormat
				value={NewBalanceUSD}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
				decimalScale={0}
			/>
		</span>
	);
};

BalanceUSD.propTypes = {
	Account: PropType.object
	// 2) add here the new properties into the proptypes object
};
