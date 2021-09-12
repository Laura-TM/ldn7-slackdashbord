import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { Button, DialogContentText } from "@material-ui/core";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(2, "auto"),
		lineHeight: "50px",
	},
}));

const PopUpMessage = ({ resetForm }) => {
	const [open, setOpen] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetForm();
	};

	const classes = useStyles();

	return (
		<div>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handleClickOpen}
			>
				Sign Up
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Your subscription is being reviewed. Soon, you will be able to
						login.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Understood.
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PopUpMessage;
