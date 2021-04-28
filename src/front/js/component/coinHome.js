import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import CoinMarketCap from "../services/coinmarketcap";
import rigoURL from "../../img/rigo-baby.jpg";

export const CoinHome = props => {
	const [Coin, setCoin] = useState({});

	const CoinMarketCapSVC = new CoinMarketCap();

	async function fnDetail() {
		const response = await CoinMarketCapSVC.Detail(props.CoinID).then(res => {
			//console.log(res);
			setCoin(res);
		});
	}

	useEffect(() => {
		fnDetail();
	}, []);

	return (
		<div className="col-sm-4 text-center p-1 mw-coins">
			<div className="flip-box">
				<div className="flip-box-inner">
					<div className="flip-box-front">
						{/* <img src={rigoURL} className="w-100 px-3 pt-3" /> */}
						<img src={Coin.logo} className="w-100 p-3 mw-100 mh-100" />
					</div>
					<div className="flip-box-back p-3">
						{/* <p className="text-font-base m-0 text-dark font-weight-bold fa-15x">Bitcoin</p>
						<p className="text-font-base m-0 text-black-50 font-weight-bold">(BTC)</p> */}
						<p className="text-font-base m-0 text-dark font-weight-bold fa-15x">{Coin.name}</p>
						<p className="text-font-base m-0 text-black-50 font-weight-bold">({Coin.symbol})</p>
						<button className="btn btn-outline-dark my-3">Abrir cuenta</button>
					</div>
				</div>
			</div>
			{/* <div className="bg-dark rounded">
                <img src={Coin.logo} className="w-100 px-4 pt-3" />
                <img src={rigoURL} className="w-100 px-3 pt-3" />
                <p className="m-0 text-white">{Coin.name}</p>
                <p className="m-0 text-white">Bitcoin (BTC)</p>
            </div> */}
		</div>
	);
};

CoinHome.propTypes = {
	CoinID: PropType.number
	// 2) add here the new properties into the proptypes object
};
