import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./Firebase";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const getBasketTotal = (basket) =>
		basket.reduce((amount, item) => item.price + amount, 0);

	const stripe = useStripe();
	const elements = useElements();

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);

	const [succeeded, setSucceeeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [clientSecret, SetClientSecret] = useState(true);

	useEffect(() => {
		const getClientSecret = async () => {
			try {
				const response = await axios({
					method: "post",
					url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
				});
				SetClientSecret(response.data.clientSecret);
			} catch (error) {
				console.log(error.message);
			}
		};
		getClientSecret();
	}, [basket]);
	const handlesubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/orders");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleChange = (e) => {
		// console.log(e);
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};
	return (
		<div className="payment">
			<div className="payment_container">
				<h1>
					Checkout (<Link to="/checkout"> {basket && basket.length} items</Link>
					)
				</h1>
				<div className="payment_section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user && user.email}</p>
						<p>123 React Lane</p>
						<p>New Orleans, LA</p>
					</div>
				</div>
				<div className="payment_section">
					<div className="payment__title">
						<h3> Review items and delivery </h3>
					</div>
					<div className="payment__items">
						{basket.map((item, i) => (
							<CheckoutProduct
								key={i}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className="payment_section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handlesubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total:{value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;

// import React, { useEffect, useState } from "react";
// import "./Payment.css";
// import { Link, useNavigate } from "react-router-dom";

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import CurrencyFormat from "react-currency-format";
// import { db } from "./Firebase";
// import CheckOutProduct from "./CheckoutProduct";
// import { useStateValue } from "./StateProvider";
// import instance from "./axios";

// function Payments() {
// 	const [{ basket, user }, dispatch] = useStateValue();
// 	const navigate = useNavigate();

// 	const getBasketTotal = (basket) =>
// 		basket?.reduce((amount, item) => item.price + amount, 0);
// 	const stripe = useStripe();
// 	const elements = useElements();

// 	const [error, setError] = useState(null);
// 	const [disabled, setDisabled] = useState(true);

// 	const [succeeded, setSucceeded] = useState(false);
// 	const [processing, setProcessing] = useState("");
// 	const [clientSecret, setClientSecret] = useState(true);

// 	useEffect(() => {
// 		// generate the special stripe secret which allows us to charge a customer
// 		const getClientSecret = async () => {
// 			const response = await instance({
// 				method: "post",
// 				// Stripe expects the total in a currencies subunits
// 				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
// 			});
// 			setClientSecret(response.data.clientSecret);
// 		};

// 		getClientSecret();
// 	}, [basket]);

// 	console.log("THE SECRET IS >>>", clientSecret);
// 	console.log("👱", user);

// 	const handleSubmit = async (event) => {
// 		// do all the fancy stripe stuff...
// 		event.preventDefault();
// 		setProcessing(true);

// 		const payload = await stripe
// 			.confirmCardPayment(clientSecret, {
// 				payment_method: {
// 					card: elements.getElement(CardElement),
// 				},
// 			})
// 			.then(({ paymentIntent }) => {
// 				//  paymentIntent = payment confirmation

// 				// db.collection("users")
// 				// 	.doc(user?.uid)
// 				// 	.collection("orders")
// 				// 	.doc(paymentIntent.id)
// 				// 	.set({
// 				// 		basket: basket,
// 				// 		amount: paymentIntent.amount,
// 				// 		created: paymentIntent.created,
// 				// 	});

// 				setSucceeded(true);
// 				setError(null);
// 				setProcessing(false);

// 				dispatch({
// 					type: "EMPTY_BASKET",
// 				});

// 				navigate("/orders");
// 			});
// 	};

// 	const handleChange = (event) => {
// 		console.log(event);
// 		// Listen for changes in the CardElement
// 		// and display any errors as the customer types their card details
// 		setDisabled(event.empty);
// 		setError(event.error ? event.error.message : "");
// 	};
// 	return (
// 		<div className="payment">
// 			<div className="payment__container">
// 				<h1>
// 					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
// 				</h1>

// 				/* Payment section - delivery address */

// 				<div className="payment__section">
// 					<div className="payment__title">
// 						<h3>Delivery Address</h3>
// 					</div>
// 					<div className="payment__address">
// 						<p>{user?.email}</p>
// 						<p>123 React Lane</p>
// 						<p>Los Angeles, CA</p>
// 					</div>
// 				</div>

// 				{/* Payment section - Review Items */}

// 				<div className="payment__section">
// 					<div className="payment__title">
// 						<h3>Review items and delivery</h3>
// 					</div>

// 					<div className="payment__items">
// 						{basket.map((item) => (
// 							<CheckOutProduct
// 								id={item.id}
// 								title={item.title}
// 								image={item.image}
// 								price={item.price}
// 								rating={item.rating}
// 							/>
// 						))}
// 					</div>
// 				</div>
// 				<div className="payment__section">
// 					<div className="payment__title">
// 						<h3> Payment Method</h3>
// 					</div>
// 					<div className="payment__details">
// 						<form onSubmit={handleSubmit}>
// 							<CardElement onChange={handleChange} />
// 							<div className="payment__priceContainer">
// 								<CurrencyFormat
// 									renderText={(value) => <h3> Order Total: {value}</h3>}
// 									decimalScale={2}
// 									value={getBasketTotal(basket)}
// 									displayType={"text"}
// 									thousandSeparator={true}
// 									prefix={"$"}
// 								/>
// 								<button disabled={processing || disabled || succeeded}>
// 									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
// 								</button>
// 							</div>
// 							{error && <div>{error}</div>}
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Payments;
