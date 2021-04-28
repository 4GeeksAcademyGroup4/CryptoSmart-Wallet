import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Redirect, Link } from "react-router-dom";
import { Tooltip, Menu, Dropdown } from "antd";

import { CoinHome } from "../component/coinHome";
import { BtnDeposit } from "../component/btnDeposit";
import { BtnTransfer } from "../component/btnTransfer";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const user = localStorage.getItem("user");

	async function GetAccount() {
		// const response = await CryptoAccountsSVC.MainBalance(0).then(res => {
		// 	setAccounts(res);
		// });
		actions.UpdateAccounts();
	}

	useEffect(() => {
		GetAccount();
	}, []);

	function DeleteAccount(id) {
		var x = confirm("Esta seguro que quiere eliminar esta cuenta???");
		if (x) {
			console.log(id);
		}
	}
	const menu = account => (
		<Menu>
			<Menu.Item key="0">
				<BtnDeposit Account={account} TypeLink="link" />
			</Menu.Item>
			<Menu.Item key="1">
				<a>Transferir </a>
			</Menu.Item>
			<Menu.Item key="3">{/* <BtnTransfer Account={account} TypeLink="link" /> */}</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="4">
				<a className="text-danger" onClick={() => DeleteAccount(account.accountID)}>
					Eliminar Cuenta <i className="far fa-times-circle align-middle" />
				</a>
			</Menu.Item>
		</Menu>
	);

	if (user == undefined) {
		return <Redirect to={{ pathname: "/Login" }} />;
	} else {
		return (
			<div className="container">
				<div className="row row-cols-2 mx-auto">
					<div className="col-xl-6 main-column">
						<div className="bg-dark text-center my-2 py-2 rounded">
							<h2 className="text-primary-color text-uppercase text-font-base m-0">Top 6 de Mercado</h2>
						</div>
						<div className="row row-cols-3 m-0 p-0 w-100">
							{store.Top5Coins.map((item, i) => {
								return <CoinHome CoinSymbol={item.symbol} key={i} />;
							})}
						</div>
					</div>
					<div className="col-xl-6 main-column">
						<div className="bg-dark text-center my-2 py-2 rounded">
							<h2 className="text-primary-color text-uppercase text-font-base m-0">
								Todas tus cryptomonedas
							</h2>
						</div>
						<div className="">
							<table className="table table-responsive-md table-hover">
								<thead className="text-uppercase">
									<tr className="table-active">
										<th>Producto</th>
										<th>Saldo</th>
										<th className="text-center">Ver</th>
										<th className="text-center">Transferir</th>
										<th className="text-center" />
									</tr>
								</thead>
								<tbody>
									{store.UserAccounts.map((item, i) => {
										return (
											<tr key={i}>
												<td>
													{item.coin.name} ({item.coin.symbol})
												</td>
												<td>
													{item.balance} {item.coin.symbol}
												</td>
												<td className="text-center">
													<Tooltip placement="top" title="Ver Historial" color="geekblue">
														<Link
															to={"/History/" + item.accountID}
															className="text-primary-color">
															<i className="fas fa-angle-double-right fa-2x" />
														</Link>
													</Tooltip>
												</td>
												<td className="text-center">
													<Tooltip placement="top" title="Transferir" color="red">
														{/* <BtnTransfer Account={item} TypeLink="btn" /> */}
													</Tooltip>
												</td>
												<td className="text-center">
													<Tooltip placement="top" title="Administrar" color="blue">
														<Dropdown overlay={menu(item)} trigger={["click"]}>
															<a
																className="ant-dropdown-link text-black"
																onClick={e => e.preventDefault()}>
																<i className="fas fa-sliders-h fa-2x" />
															</a>
														</Dropdown>
													</Tooltip>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
