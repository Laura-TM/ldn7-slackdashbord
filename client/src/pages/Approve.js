import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveIcon from "@material-ui/icons/Save";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const Approve = () => {
	const classes = useStyles();
	const [changes, setChanges] = useState([]);
	const [tableData, setTableData] = useState([]);

	const [status, setStatus] = useState("0");

	const handleChange = (value, rowData) => {
		setStatus(value);
		const tempData = tableData;

		const index = rowData.tableData.id;
		tempData[index].city = value;
		setTableData(tempData);
		const newChange = { id: index, email: rowData.email, city: rowData.city };
		changes.push(newChange);
	};
	async function updateStatus(credentials) {
		return axios.put(`/api/approve`, credentials);
	}
	const handleClickSave = (event, rowData) => {
		const change = changes.find(
			(element) => element.id == rowData.tableData.id
		);

		const email = change.email;
		const city = change.city;

		updateStatus({ email, city })
			.then((result) => {
				// alert(`The new status is saved for ${rowData.user_name}`);
			})
			.catch(() => {});

		// alert("You saved status of" + rowData.city);
	};
	useEffect(() => {
		fetch(`/api/request`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setTableData(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div className="container pt-5">
			<MaterialTable
				icons={tableIcons}
				title=""
				columns={[
					{
						title: "Name",
						field: "user_name",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Role",
						field: "role",
						lookup: { 1: "Trainee", 2: "Mentor" },
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Email",
						field: "email",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Status",
						field: "city",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
						render: (rowData) => (
							<FormControl className={classes.formControl}>
								<Select
									labelId="label"
									id={rowData.email}
									value={rowData.city}
									onChange={(event) => {
										handleChange(event.target.value, rowData);
									}}
									className="text-secondary"
								>
									<MenuItem value={1}>Pending</MenuItem>
									<MenuItem value={2}>Reject</MenuItem>
									<MenuItem value={3}>Accept</MenuItem>
								</Select>
							</FormControl>
						),
					},
				]}
				data={tableData}
				actions={[
					{
						icon: SaveIcon,
						tooltip: "Save change status",
						onClick: handleClickSave,
					},
				]}
				options={{
					sorting: true,
					headerStyle: {
						backgroundColor: "#01579b",
						color: "#01579b",
					},
				}}
			/>
		</div>
	);
};
export default Approve;
