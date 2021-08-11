import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
	const user = useSelector(selectUser);
	const history = useHistory();
	async function loginUser(credentials) {
		return axios.post(`/api/login`, credentials);
	}
	const [name, setName] = useState(" ");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser({
			name,
			password,
		})
			.then((result) => {
				dispatch(
					login({
						name: name,
						password: password,
						loggedIn: true,
						message: "",
					})
				);
				history.push("/channels");
			})
			.catch(() => {
				dispatch(
					login({
						name: "",
						password: "",
						loggedIn: false,
						message: "Incorrect message",
					})
				);
			});
	};

	user && console.log(user && user.loggedIn);
	return (
		<form
			name="loginForm"
			className="mx-auto "
			onSubmit={(e) => handleSubmit(e)}
		>
			<div className="form-group-collection">
				<div className="form-group">
					<label htmlFor="username">
						user name:
						<input
							id="username"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></input>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="password">
						Password:
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</label>
				</div>
				{/* <Link to={user && user.loggedIn ? `/channels` : "#"}> */}
				<button type="submit" className="btn btn-success">
					submit
				</button>
				{/* </Link> */}
				<div className="message">{user && <div>{user.message}</div>}</div>
			</div>
		</form>
	);
};

export default Login;
// href={user && user.loggedIn ? "/channels" : "#"}
