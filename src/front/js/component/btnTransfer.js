import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropType from "prop-types";
import { Modal } from "antd";
import CryptoAccounts from "../services/cryptoaccount";

export const BtnTransfer = props => {
	const { actions } = useContext(Context);
	const [inputAmount, setAmount] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const CryptoAccountsSVC = new CryptoAccounts();
	const [SuccessMsg, setMsg] = useState("");

	async function fnDetail() {
		// const response = await CoinMarketCapSVC.Detail(props.CoinID).then(res => {
		// 	//console.log(res);
		// 	setCoin(res);
		// });
	}

	const cleanFields = () => {
		setIsModalVisible(false);
		setAmount("");
		setMsg("");
	};
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = event => {
		//console.log(parseFloat(inputAmount));
		let model = {
			coinID: props.Account.coinID,
			amount: parseFloat(inputAmount)
		};
		const response = CryptoAccountsSVC.DirectDeposit(model).then(res => {
			if (res != undefined) {
				setMsg(res.msg);
				//setIsModalVisible(false);
			}
		});

		event.preventDefault();
	};

	const handleCancel = event => {
		cleanFields();
		event.preventDefault();
	};

	useEffect(() => {
		//fnDetail();
	}, []);

	const TypeLinkBtn = () => {
		if (props.TypeLink === "btn") {
			return <i className="fas fa-angle-double-right fa-2x" onClick={showModal} />;
		} else {
			return <a onClick={showModal}>Depositar</a>;
		}
	};

	const ModalContent = () => {
		if (SuccessMsg != "") {
			let secondsToGo = 2;
			const timer = setInterval(() => {
				secondsToGo -= 1;
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				actions.UpdateAccounts();
				cleanFields();
			}, secondsToGo * 1000);

			return (
				<article className="card-body mx-auto py-0">
					<h3 className="text-center text-font-base font-weight-light mt-3">{SuccessMsg}</h3>
				</article>
			);
		} else {
			return (
				<article className="card-body mx-auto py-0 card-body-deposit">
					<form className="" onSubmit={handleOk}>
						<div className="form-group input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fas fa-money-bill" />
								</span>
							</div>
							<input
								key="coinname"
								type="text"
								value={props.Account.coin.name + " (" + props.Account.coin.symbol + ")"}
								className="form-control"
								disabled
							/>
						</div>
						<div className="form-group input-group mb-0">
							<div className="input-group-prepend">
								<span className="input-group-text">0.00</span>
							</div>
							<input
								type="text"
								id="amount"
								//key={uuid()}
								value={inputAmount}
								placeholder="Monto"
								onChange={e => setAmount(e.target.value)}
								className="form-control"
								required
								autoFocus
							/>
						</div>

						<div className="form-group text-center mt-3 mb-0">
							<button
								className="btn btn-outline-primary text-font-base btn-block"
								onClick={handleOk}
								disabled={inputAmount > 0 ? false : true}>
								Depositar
							</button>
						</div>
						<div className="form-group text-center mt-2 mb-0">
							<button className="btn btn-outline-danger text-font-base btn-block" onClick={handleCancel}>
								Cancelar
							</button>
						</div>
					</form>
				</article>
			);
		}
	};

	return (
		<div>
			<TypeLinkBtn />
			<Modal
				title={[
					<h3 key="title" className="text-center text-primary-color text-font-base m-0">
						Transferencia
					</h3>
				]}
				visible={isModalVisible}
				onOk={handleOk}
				centered
				onCancel={handleCancel}
				footer={[]}>
				<ModalContent />
			</Modal>
		</div>
	);
};

BtnTransfer.propTypes = {
	Account: PropType.object,
	TypeLink: PropType.string
	// 2) add here the new properties into the proptypes object
};
