import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import PropType from "prop-types";
import { Modal, Tooltip, message } from "antd";
import CryptoAccounts from "../services/cryptoaccount";

export const BtnAdjust = props => {
	const { actions } = useContext(Context);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const CryptoAccountsSVC = new CryptoAccounts();
	const [SuccessMsg, setMsg] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = data => {
		// console.log(data);
		// console.log(props);
		let model = {
			accountID: props.Account.accountID,
			newBalance: parseFloat(data.newBalance),
			reason: data.reason ? data.reason : "Transferencia"
		};
		//console.log(model);
		const response = CryptoAccountsSVC.AdjustBalance(model).then(res => {
			console.log(res);
			if (res.StatusID) {
				message.error({
					content: res.msg,
					style: {
						marginTop: "30vh"
					}
				});
			} else {
				setMsg(res.msg);
				reset();
				//setIsModalVisible(false);
			}
		});
	};

	const cleanFields = () => {
		setIsModalVisible(false);
		//setAmount("");
		reset();
		setMsg("");
	};
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = event => {
		cleanFields();
		event.preventDefault();
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
					<form onSubmit={handleSubmit(onSubmit)}>
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
						<div className="form-group input-group m-0">
							<div className="input-group-prepend">
								<span className="input-group-text">0.00</span>
							</div>
							<input
								defaultValue={props.Account.balance}
								type="number"
								{...register("newBalance", {
									validate: {
										positiveNumber: value => parseFloat(value) > 0
									}
								})}
								className="form-control"
							/>
						</div>
						<div className="form-group mb-3">
							{errors.amount &&
								errors.amount.type === "positiveNumber" && (
									<label className="col text-danger p-0">
										<i className="fas fa-times-circle" />
										El monto debe ser mayor a 0
									</label>
								)}
						</div>
						<div className="form-group input-group m-0">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="far fa-question-circle" />
								</span>
							</div>
							<input
								defaultValue=""
								placeholder="Detalle"
								{...register("reason")}
								className="form-control"
							/>
						</div>
						<div className="form-group text-center mt-3 mb-0">
							<button className="btn btn-outline-primary text-font-base btn-block" type="submit">
								Ajustar
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
			<a onClick={showModal}>Ajustar Balance</a>
			<Modal
				title={[
					<h3 key="title" className="text-center text-primary-color text-font-base m-0">
						Ajustar Balance
					</h3>
				]}
				visible={isModalVisible}
				centered
				onCancel={handleCancel}
				footer={[]}>
				<ModalContent />
			</Modal>
		</div>
	);
};

BtnAdjust.propTypes = {
	Account: PropType.object
	// 2) add here the new properties into the proptypes object
};
