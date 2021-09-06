import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CohortSearchField from "../components/CohortSearchField";
import CohortCard from "../components/CohortCard";
import slack_logo from "../images/slack_logo.png";
import "./Home.css";
// import mockCohortList from "../data/fakeData.json";

const Cohorts = () => {
	// To BE USED with
	// const [cohortList, setCohortList] = useState(mockCohortList);
	const [cohortList, setCohortList] = useState([]);

	useEffect(() => {
		fetch("/api/cohortList")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((data) => {
				setCohortList(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// console.log(cohortList);
	// const cohort_values = Object.values(mockCohortList);

	return (
		<div>
			<h1 className="cohortTitle">
				<img className="slack_logo" src={slack_logo} alt="Slack logo" />
				Cohorts
			</h1>
			<div className="cohortContainer">
				<CohortSearchField />
			</div>
			<div className="cohortCardContainer">
				{cohortList.length > 0 ? (
					<Grid container spacing={4}>
						{cohortList.map((cohort, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
								<CohortCard
									cohortName={cohort.cohort_name}
									cohortId={cohort.id}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<CircularProgress className="circularProgress" />
				)}
			</div>
		</div>
	);
};

export default Cohorts;
