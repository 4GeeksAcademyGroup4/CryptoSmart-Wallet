import React, { Component } from "react";
import cinde from "../../img/cinde.png";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p className="text-font-base">
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com" className="text-primary-color">
				4Geeks Academy Group 4
			</a>
		</p>

		<a href="http://cinde.org/en" target="rel=noopener">
			<img id="cinde" src={cinde} width="240" height="50" />
		</a>
	</footer>
);
