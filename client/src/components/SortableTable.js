import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import "../pages/Home.css";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Clear from "@material-ui/icons/Clear";
import Search from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const tableIcons = {
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

tableIcons.NextPage.displayName = "NextPage";
tableIcons.FirstPage.displayName = "FirstPage";
tableIcons.LastPage.displayName = "LastPage";
tableIcons.PreviousPage.displayName = "PreviousPage";
tableIcons.ResetSearch.displayName = "ResetSearch";
tableIcons.Search.displayName = "Search";
tableIcons.SortArrow.displayName = "SortArrow";

const useStyles = makeStyles((theme) => ({
	table: {
		textTransform: "capitalize",
	},
	removeButton: {
		background: "none",
		color: "inherit",
		border: "none",
		padding: 0,
		cursor: "pointer",
		outline: "inherit",
		textTransform: "capitalize",
		textDecoration: "none",
	},
}));

const SortableTable = ({ channelList }) => {
	const history = useHistory();
	const classes = useStyles();

	const [tableLayout] = useState("auto");
	const [emptyRowsWhenPaging] = useState(false);

	const [selectedRow, setSelectedRow] = useState(false);

	const [channelData, setChannelData] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);
	const [userList, setUserList] = useState([]);
	const [averageMessages, setAverageMessages] = useState([]);
	const [averageReactions, setAverageReactions] = useState([]);
	const user = useSelector(selectUser);
	const role = user.userId;

	function rowSelected() {
		setSelectedRow(!selectedRow);
	}

	let path = "";

	function handleClick(row) {
		path =
			role == "mentor"
				? `/channel/${row.name}/${row.id}`
				: `/user/${row.id}/${role}/${user.name}`;

		fetch(`/api/channelUser/${row.id}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUserList(body);
				setNumberOfUsers(body.length);
			})
			.catch((err) => {
				console.error(err);
			});
		fetch(`/api/channelSum/${row.id}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				let messagesArray = [];
				let reactionsArray = [];
				let lastTwoWeeks = body.slice(0, 2);
				lastTwoWeeks.forEach((element) => {
					messagesArray.push(element.total_message / numberOfUsers);
					reactionsArray.push(element.total_reaction / numberOfUsers);
				});
				setAverageMessages(messagesArray);
				setAverageReactions(reactionsArray);
				setChannelData(body.slice(0, 4));
			})
			.catch((err) => {
				console.error(err);
			});

		history.push(path);
	}

	return (
		<div className="p-2 containerSlackChannels">
			<Grid justify="center" className={selectedRow ? "selectedRow" : " "}>
				<MaterialTable
					onClick={rowSelected}
					icons={tableIcons}
					className={classes.table}
					fontFamily="Varela Round"
					title="Slack channels and members"
					columns={[
						{
							title: "Channel",
							field: "name",
							headerStyle: {
								backgroundColor: "#01579b",
								lineHeight: "30px",
								color: "#FFF",
								fontWeight: "900",
							},
							// eslint-disable-next-line react/display-name
							render: (row) => (
								<Link
									className={classes.removeButton}
									aria-hidden="true"
									onClick={() => handleClick(row)}
									to={{
										pathname: path,
										state: {
											channelData,
											numberOfUsers,
										},
									}}
								>
									{row.name}
								</Link>
							),
						},
						{
							title: "Users",
							field: "num_members",
							lineHeight: "30px",
							headerStyle: {
								backgroundColor: "#01579b",
								color: "#FFF",
								fontWeight: "900",
							},
						},
					]}
					data={channelList}
					options={{
						sorting: true,
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#01579b",
						},
						tableLayout: tableLayout,
						emptyRowsWhenPaging: emptyRowsWhenPaging,
					}}
				/>
			</Grid>
		</div>
	);
};

SortableTable.displayName = "SortableTable";

export default SortableTable;
