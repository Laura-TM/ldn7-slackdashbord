import { Router } from "express";
import process from "process";

const router = new Router();
const axios = require("axios");

router.get("/", (_, res) => {
	res.json({
		message: "Hello, world!",
	});
});

router.get("/channelList", async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = "https://ldn7-test-workspace.slack.com/api/conversations.list";
	console.log(slackToken);
	console.log(process.env);
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
});

router.get("/userList", async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = "https://ldn7-test-workspace.slack.com/api/users.list";
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
});

router.get("/channelHistory", async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/conversations.history?channel=C027M110K9T`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
});

router.get("/userInfo", async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/users.info?user=U027Q1PF9D0`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
});


export default router;
