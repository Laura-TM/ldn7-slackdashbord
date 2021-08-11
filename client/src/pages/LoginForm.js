import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../redux/reducer";
import "./LoginForm.css";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let { userName, password } = this.state;
        let {isLoginPending,isLoginSuccess,loginError}=this.props;
		return (
			<form name="loginForm" onSubmit={this.onSubmit}>
				<div className="form-group-collection">
					<div className="form-group">
						<label id="userName" htmlFor="userName">
							userName:
							<input
								id="userName"
								type="text"
								name="userName"
								onChange={(e) => this.setState({ userName: e.target.value })}
								value={userName}
							/>
						</label>
					</div>

					<div className="form-group">
						<label id="password" htmlFor="password">
							Password:
							<input
								id="password"
								type="password"
								name="password"
								onChange={(e) => this.setState({ password: e.target.value })}
								value={password}
							/>
						</label>
					</div>
				</div>

				<input type="submit" value="Login" />

				<div className="message">
					{isLoginPending && <div>Please wait...</div>}
					{isLoginSuccess && <div>Success.</div>}
					{loginError && <div>{loginError.message}</div>}
				</div>
			</form>
		);
	}

	onSubmit = (e) => {
		e.preventDefault();
		let { userName, password } = this.state;
		this.props.login(userName, password);
		this.setState({
			userName: "",
			password: "",
		});
	};
}

const mapStateToProps = (state) => {
	return {
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		loginError: state.loginError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (userName, password) => dispatch(login(userName, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
