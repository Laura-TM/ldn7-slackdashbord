import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import axios from "axios";
import "./Home.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, CssBaseline, TextField, Grid } from "@material-ui/core";
import { Avatar, Typography, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[800],
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, "auto"),
		lineHeight: "50px",
	},
}));

const Login = ({ setToken }) => {
	// const { roles } = useParams();
	// console.log(roles);
	const role = useLocation().pathname.split("/")[2];
	Login.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const classes = useStyles();
	const user = useSelector(selectUser);
	const history = useHistory();
	async function loginUser(credentials) {
		if (!validEmail) {
			return axios.post(`/api/login`, credentials);
		}
	}
	const [name, setName] = useState(" ");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const isValidEmail = (email) => {
		const result = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
		return result;
	};
	const validateEmail = (e) => {
		const email = e.target.value;
		if (!email || isValidEmail(email)) {
			setValidEmail(false);
		} else {
			setValidEmail(true);
		}
	};
	const dispatch = useDispatch();
	const handleClickSignUp = () => {
		setToken("signUp");
		history.push(`/signUp/${role}`);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser({
			email,
			password,
		})
			.then((result) => {
				console.log(result.data);
				setName(result.data.name);
				console.log("data:", result.data);
				dispatch(
					login({
						name: result.data.name,
						loggedIn: true,
						message: true,
						userId: result.data.userId,
					})
				);
				setToken("login");
				const path =
					result.data.role == "2"
						? "/cohorts"
						: result.data.role == "1"
						? `/channels/${result.data.userId}`
						: result.data.role == "3"
						? `/Approve`
						: "/";
				!validEmail && history.push(path);
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
	user && console.log(user && user.name);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => handleSubmit(e)}
				>
					<Grid container>
						<Grid item xs={12}>
							<div className="emailContainer">
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="none"
									value={email}
									error={validEmail}
									helperText={validEmail ? "Please enter a valid email" : " "}
									onChange={(e) => setEmail(e.target.value)}
									onBlur={validateEmail}
								/>
							</div>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<div className="message text-danger">
						{user && <div>{user.message}</div>}
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Login
					</Button>
				</form>
				<Grid container>
					<Grid item>
						<Link variant="body2" onClick={handleClickSignUp}>
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};
export default Login;
