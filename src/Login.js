import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './Firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
function Login() {
	
const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				if (userCredential) navigate("/");
			})
			.catch((error) => alert(error.message));
	};
	const register = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				if (userCredential) navigate("/");
			})
			.catch((error) => {
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};

  return (
      	<div className="login">
			<Link to="/">
				<img
					className="login__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
					alt="Amazon Logo"
				/>
			</Link>
			<div className="login__container">
				<h1 className="log">Log-in</h1>

				<form>
					<h5>E-mail</h5>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						onClick={signIn}
						className="login__signInButton">
						Sign In
					</button>
				</form>

				<p>
					By signing in you agree to the AMAZON FAKE CLONE conditions of use
					sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest_based Ads Notice.
				</p>
				<button
					onClick={register}
					className="login__registerButton">
					Create Your AMAZON Account
				</button>
			</div>
		</div>
  )
}

export default Login