import React from "react";
import { ReactTinyLink } from "react-tiny-link";
import ScrollAnimation from "react-animate-on-scroll";

export const DondeComprar = () => {
	return (
		<div>
			<div className="bg-light p-3">
				<div className="jumbotron bg-pcolor">
					<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
						<h1 className="text-light">Donde Comprar Cryptomonedas??</h1>
						<h4 className="text-light"> Las mejores paginas para comprar Cryptomonedas: </h4>
					</ScrollAnimation>
					<ScrollAnimation animateIn="fadeIn" duration="3" animateOnce="true">
						<div className="row my-5">
							<div className="col">
								<ReactTinyLink
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="https://9to5mac.com/wp-content/uploads/sites/6/2021/01/Robinhood-app-controversy.jpg?quality=82&strip=all"
									url="https://join.robinhood.com/robinhood/"
								/>
							</div>
							<div className="col">
								<ReactTinyLink
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="https://www.techwalls.com/wp-content/uploads/2017/05/coinmama.jpg"
									url="https://www.coinmama.com/"
								/>
							</div>
						</div>

						<div className="row my-5">
							<div className="col">
								<ReactTinyLink
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="https://www.coinbase.com/img/og-default.jpg"
									url="https://www.coinbase.com/es/"
								/>
							</div>
							<div className="col">
								<ReactTinyLink
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="https://www.etoro.com/wp-content/uploads/2019/03/social-portfolio.png"
									url="https://go.etoro.com/en/"
								/>
							</div>
						</div>
						<div className="row my-5 rounded">
							<div className="col rounded">
								<ReactTinyLink
									className="rounded"
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="data:image/png;base64,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"
									url="https://localbitcoins.com/"
								/>
							</div>
							<div className="col">
								<ReactTinyLink
									cardSize="large"
									showGraphic={true}
									maxLine={2}
									minLine={1}
									defaultMedia="https://inversionesencriptomonedas.com/wp-content/uploads/2020/01/Cex.io-tutorial-en-espa%C3%B1ol.jpg"
									url="https://cex.io/"
								/>
							</div>
						</div>
					</ScrollAnimation>
				</div>
			</div>
		</div>
	);
};
