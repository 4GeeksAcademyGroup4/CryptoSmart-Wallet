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
	const [user, setUser] = useState(localStorage.getItem("user"));
	const params = useParams();
	const CryptoAccountsSVC = new CryptoAccounts();

	let baseURL = process.env.BACKEND_URL + "/api/History/" + params.accountID;

	const LoadPage = () => {
		CryptoAccountsSVC.History(params.accountID).then(res => {
			console.log(res);
			setTrans(res);
		});
	};

	useEffect(() => {
		LoadPage();
	}, []);

	return (
		<div className="container mx-auto">
			<div className="col-xl-2 main-column" />
			<div className="col-xl-10 main-column">
				<div className="bg-dark text-center my-2 py-2 rounded">
					<h2 className="text-primary-color text-uppercase text-font-base m-0">Historial de Transacciones</h2>
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
											{item.amount > 0 ? item.amount : ""}
										</td>
										<td className="text-danger text-center">
											{item.amount < 0 ? item.amount : ""}
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
		</div>
	);
};
