import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51NStacCXxo6B03TXE0DofcbdpPoK9nTClua1YRQyuCQzyN0jYgWukpgaGPrfKVhlXpPsv99JUb0zdpbkceAqi6Oi00IFzfDp9b"
);
function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			// console.log("the user is >>>" ,authUser);
			if (authUser) {
				//the user just logged in / the user was logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						path="/orders"
						element={[<Header />, <Orders />]}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/payment"
						element={[
							<Header />,
							<Elements stripe={promise}>
								<Payment />
							</Elements>,
						]}
					/>
					<Route
						path="/"
						element={[<Header />, <Home />]}
					/>
					<Route
						path="/checkout"
						element={[<Header />, <Checkout />]}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
