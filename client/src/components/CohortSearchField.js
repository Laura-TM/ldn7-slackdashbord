import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "../pages/Home.css";

const CohortSearchField = ({ searchValue, setSearchValue, updateValue }) => {
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
					searchValue={searchValue}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),

						endAdornment: searchValue && (
							<IconButton
								aria-label="toggle password visibility"
								onChange={() => setSearchValue("")}
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
