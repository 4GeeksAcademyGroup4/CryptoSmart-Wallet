import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import PropType from "prop-types";
import { Modal, Tooltip, message } from "antd";
import CryptoAccounts from "../services/cryptoaccount";

export const BtnTransfer = props => {
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
			amount: parseFloat(data.amount),
			UserCode: data.UserCode,
			reason: data.reason ? data.reason : "Transferencia"
		};
		console.log(model);
		const response = CryptoAccountsSVC.Transfer(model).then(res => {
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

	const TypeLinkBtn = () => {
		if (props.TypeLink === "btn") {
			return (
				<Tooltip placement="top" title="Transferir" color="red">
					<i className="link-a fas fa-angle-double-right fa-2x" onClick={showModal} />
				</Tooltip>
			);
		} else {
			return <a onClick={showModal}>Transferir</a>;
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
								defaultValue=""
								type="number"
								{...register("amount", {
									validate: {
										positiveNumber: value => parseFloat(value) > 0,
										maxAvailable: value => parseFloat(value) <= props.Account.balance
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
							{errors.amount &&
								errors.amount.type === "maxAvailable" && (
									<label className="text-danger p-0">
										<i className="fas fa-times-circle" />
										El monto excede su disponible
									</label>
								)}
						</div>
						<div className="form-group input-group m-0">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fas fa-user" />
								</span>
							</div>
							<input
								defaultValue=""
								placeholder="UserCode"
								{...register("UserCode", {
									validate: value => value.length >= 3
								})}
								className="form-control"
							/>
						</div>
						<div className="form-group mb-3">
							{errors.UserCode && (
								<label className="col text-danger p-0">
									<i className="fas fa-times-circle" />
									El UserCode debe tener al menos 3 caracteres
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
								Transferir
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
