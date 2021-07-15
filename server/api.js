import { Router } from "express";
import process from "process";

const router = new Router();
const axios = require("axios");

router.get("/", (_, res) => {
	res.json({
		message: "Hello, world!",
	});
});

const getChannelList = async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/conversations.list`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
};

const getUserList = async (request, response) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = "https://ldn7-test-workspace.slack.com/api/users.list";
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
};

const getUserInfo = async (request, response, userName) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/users.info?user=${userName}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
}

const getChannelHistory = async (request, response, channel, oldest) => {
	const slackToken = process.env.SLACK_API_TOKEN;
	const url = `https://ldn7-test-workspace.slack.com/api/conversations.history?channel=${channel}&oldest=${oldest}`;
	const res = await axios.get(url, {
		headers: { Authorization: `Bearer ${slackToken}` },
	});
	response.json(res.data);
}


router.get("/channelList", async (request, response) => {
	getChannelList(request, response);
});


router.get("/userList", async (request, response) => {
	getUserList(request, response);
});


router.get("/userInfo", async (request, response) => {
	getUserInfo(request, response, "U027Q1PF9D0",)
});


router.get("/channelHistory", async (request, response) => {
	getChannelHistory(request, response, "C028DN05PUG", "1626167749.804")
});


export default router;
