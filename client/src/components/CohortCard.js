import {
	Card,
	CardMedia,
	CardContent,
	makeStyles,
	Typography,
} from "@material-ui/core/";
import groupPeopleImage from "../images/group-of-people.png";
import "../pages/Home.css";

const useStyles = makeStyles({
	card: {
		width: 160,
		height: 160,
		margin: "20px auto",
		padding: "10px",
		transition: "0.2s",
		borderRadius: "5px",
		backgroundColor: "#f5f5f5",
		boxShadow: "0 4px 20px -10px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
		},
	},
	cardMedia: {
		paddingTop: "56.25%",
		margin: "auto",
	},
	typography: {
		fontFamily: ["Varela Round", "serif"].join(","),
		fontSize: 16,
		textAlign: "center",
	},
});

const CohortCard = ({ data }) => {
	const classes = useStyles();

	return (
		<div>
			<Card className={classes.card} onClick={() => history.push("/channels")}>
				<CardMedia
					className={classes.cardMedia}
					image={groupPeopleImage}
					title="representative group of people"
					description={`a given group of people`}
				/>
				<CardContent>
					<Typography className={classes.typography}>
						{data.channelName.charAt(0).toUpperCase() +
							data.channelName.slice(1)}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default CohortCard;
