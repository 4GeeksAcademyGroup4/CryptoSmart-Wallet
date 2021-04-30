import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import PropType from "prop-types";
import { Modal, message } from "antd";
import CryptoAccounts from "../services/cryptoaccount";

export const BtnCreateAccount = props => {
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
		console.log(data);
	};

	const cleanFields = () => {
		setIsModalVisible(false);
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
							<select {...register("coinID")} className="custom-select">
								<option value="female">female</option>
								<option value="male">male</option>
								<option value="other">other</option>
							</select>
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

						<div className="form-group text-center mt-3 mb-0">
							<button className="btn btn-outline-primary text-font-base btn-block" type="submit">
								Crear Cuenta
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
			<button className="btn btn-outline-dark my-3" onClick={showModal}>
				Abrir cuenta
			</button>
			<Modal
				title={[
					<h3 key="title" className="text-center text-primary-color text-font-base m-0">
						Crear Cuenta
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

BtnCreateAccount.propTypes = {
	CoinID: PropType.number
	// 2) add here the new properties into the proptypes object
};
