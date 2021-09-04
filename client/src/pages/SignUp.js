import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import axios from "axios";
import { useLocation, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ setToken }) => {
	const classes = useStyles();
	SignUp.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const role = useLocation().pathname.split("/")[2];
	const user = useSelector(selectUser);
	const history = useHistory();
	async function SignUpUser(credentials) {
		return axios.post(`/api/signUp`, credentials);
	}
	const [name, setName] = useState(" ");
	const [userId, setUserId] = useState(role == 2 ? "mentor" : "");
	const [email, setEmail] = useState(" ");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("name", name, "userid", userId, email, password);
		SignUpUser({
			name,
			userId,
			email,
			password,
		})
			.then((result) => {
				dispatch(
					login({
						name: name,
						userId: userId,
						loggedIn: result.data.message,
						message: true,
					})
				);
				setToken("login");
				console.log(result.data.message);
				result.data.message == "Done" && history.push(`/channels/${userId}`);
			})
			.catch(() => {
				dispatch(
					login({
						name: "",
						loggedIn: false,
						message: "Please enter your correct password",
					})
				);
			});
	};
	// user && console.log(user && user.loggedIn);
	// user && console.log(user && user.mentor);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => handleSubmit(e)}
					noValidate
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								autoFocus
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="MemberID"
								label="Member ID"
								name="MemberID"
								autoComplete="Member-ID"
								disabled={role == "2"}
								value={role == "2" ? "mentor" : userId}
								onChange={(e) => setUserId(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
export default SignUp;
