import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/circularprogress";
import CohortSearchField from "../components/CohortSearchField";
import CohortCard from "../components/CohortCard";
import slack_logo from "../images/slack_logo.png";
import "./Home.css";
import mockCohortList from "../data/fakeData.json";

const Cohorts = () => {
	const [cohortList, setCohortList] = useState(mockCohortList);
	//
	//useEffect(() => {
	// fetch("/api/cohortList")
	// 	fetch()
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error(res.statusText);
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			console.log(data);
	// 			setCohortList(cohortList);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }, [cohortList]);

	const cohort_values = Object.values(mockCohortList);

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
				{mockCohortList ? (
					<Grid container spacing={4}>
						{cohort_values.map((value, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
								<CohortCard data={value[0]} />
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
