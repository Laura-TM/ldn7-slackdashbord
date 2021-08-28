import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "../pages/Home.css";

const CohortSearchField = () => {
	const [value, setValue] = useState("");

	function updateValue(event) {
		setValue(event.target.value);
	}

	return (
		<>
			<div>
				<TextField
					className="searchCohort"
					placeholder="Search a cohort"
					type="text"
					variant="outlined"
					size="small"
					onChange={updateValue}
					value={value}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),

						endAdornment: value && (
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setValue("")}
							>
								<CancelRoundedIcon />
							</IconButton>
						),
					}}
				/>
				<div>
					<hr className="dividerLine" />
				</div>
			</div>
		</>
	);
};

export default CohortSearchField;
