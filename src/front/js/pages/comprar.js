import React from "react";
import { ReactTinyLink } from "react-tiny-link";

export const DondeComprar = () => {
	return (
		<div className="jumbotron">
			<h1>Donde Comprar Cryptomonedas??</h1>
			<h4> Las mejores paginas para comprar Cryptomonedas: </h4>

			<div className="row my-5">
				<div className="col">
					<ReactTinyLink
						cardSize="large"
						showGraphic={true}
						maxLine={2}
						minLine={1}
						url="https://www.coinbase.com/es/?clickId=S0sSb2WPpxyLUwnwUx0Mo3YpUkBxlR0f%3A094wQ0&irgwc=1&utm_campaign=rt_p_m_w_d_acq_imp_gro_aff_Dotdash&utm_content=992624&utm_creative=US%202021%20BTC%20Incentive%20-%20Video%20-%20500x500&utm_medium=growthp&utm_source=impact"
					/>
				</div>
				<div className="col">
					<ReactTinyLink
						cardSize="large"
						showGraphic={true}
						maxLine={2}
						minLine={1}
						url="https://go.etoro.com/en/cryptobonus/50/trade1000?gc=usa&utm_medium=Networks&utm_source=104871&utm_content=15672&utm_serial=&utm_campaign=&utm_term="
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
						url="https://join.robinhood.com/robinhood/?irclickid=3ud0-gWPuxyLTXDxTSQPxVT4UkBxlRVH%3A094wQ0&irgwc=1&utm_source=impact&utm_campaign=328256&utm_content=Investopedia&utm_term=748415&back_to_signup=1"
					/>
				</div>
				<div className="col">
					<ReactTinyLink
						cardSize="large"
						showGraphic={true}
						maxLine={2}
						minLine={1}
						url="https://www.coinmama.com/?cxd=64282_635594&affid=64282"
					/>
				</div>
			</div>
		</div>
	);
};
