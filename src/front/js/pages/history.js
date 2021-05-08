import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Redirect } from "react-router-dom";
import * as moment from "moment";
import "moment/locale/es";
moment.locale("es");
import "moment-timezone";
import { message } from "antd";

import CryptoAccounts from "../services/cryptoaccount";

export const History = () => {
	const { store, actions } = useContext(Context);
	const [trans, setTrans] = useState([]);
	const [Account, setAccount] = useState({
		accountID: 0,
		balance: 0.0,
		coin: {
			coinID: 0,
			name: "Coin",
			rank: 0,
			symbol: "XXX"
		},
		coinID: 0
	});
	const params = useParams();
	const CryptoAccountsSVC = new CryptoAccounts();

	const LoadPage = () => {
		CryptoAccountsSVC.History(params.accountID).then(res => {
			//console.log(res);
			setTrans(res);
		});
	};

	const LoadAccount = () => {
		//console.log(store.UserAccounts);
		store.UserAccounts.forEach(item => {
			if (item.accountID == params.accountID) {
				//console.log(item);
				setAccount(item);
			}
		});
	};

	useEffect(() => {
		actions.UpdateAccounts();
		LoadPage();
		LoadAccount();
	}, []);

	return (
		<div className="container mx-auto bg-white-50">
			<div className="bg-dark text-center my-2 py-2 rounded">
				<h2 className="text-primary-color text-uppercase text-font-base m-0">Historial de Transacciones</h2>
			</div>
			<div className="">
				<table>
					<thead>
						<tr>
							<td className="font-weight-bold">Producto: </td>
							<td>{Account.coin.name}</td>
						</tr>
						<tr>
							<td className="font-weight-bold">Saldo:</td>
							<td>{Account.balance + " " + Account.coin.symbol}</td>
						</tr>
					</thead>
				</table>
			</div>
			<div className="">
				<table className="table table-responsive-md table-hover">
					<thead>
						<tr className="text-center table-active">
							<th>Fecha</th>
							<th>Hora</th>
							<th>Débito</th>
							<th>Crédito</th>
							<th>De</th>
							<th>Para</th>
							<th>Detalle</th>
						</tr>
					</thead>
					<tbody>
						{trans.map((item, i) => {
							return (
								<tr key={i}>
									<td className="text-capitalize text-center">{moment(item.date).format("L")}</td>
									<td className="text-capitalize text-center">
										{moment(item.date)
											.utc()
											.format("h:mm:ss A")}
									</td>
									<td className="text-primary text-center">
										{item.amount > 0 ? item.amount + " " + Account.coin.symbol : ""}
									</td>
									<td className="text-danger text-center">
										{item.amount < 0 ? item.amount + " " + Account.coin.symbol : ""}
									</td>
									<td className="text-capitalize text-center">
										{item.from.firstname + " " + item.from.lastName}
									</td>

									<td className="text-capitalize text-center">
										{item.to.firstname + " " + item.to.lastName}
									</td>
									<td className="text-center">{item.reason}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
