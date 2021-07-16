import { Router } from "express";
const router = new Router();

router.get("/user/:userId", async (req, res) => {
	const userId = req.params.userId;
	let result = {
		userName: "",
		statistics: [],
	};
	const now = new Date();
	let time = req.query.time == "month" ? now.getMonth() : now.getDay();
	let latest = now / 1000;
	let oldest = latest - 60 * 60 * 24 * time;
	time = req.query.time == "month" ? 30 : 7;
	console.log("duration=", time, " latest=", latest, " oldest=", oldest);
	const userInfo = await getUserInfo(userId);
	const userName = userInfo.ok
		? userInfo.user.real_name
		: res.status(400).json("The user not found");
	result.userName = userName;
	console.log(userName);
	const findReaction = (reactions) => {
		return reactions.filter((reaction) => reaction.users.includes(userId));
	};
	let data = await getChannelHistory("C028DN05PUG");
	console.log(data);
	if (data.ok && data.messages) {
		const timestampOfJoin = data.messages.find(
			(message) =>
				message.type == "message" &&
				message.subtype &&
				message.subtype == "channel_join" &&
				message.user == userId
		);
		console.log(timestampOfJoin.ts);
		while (latest > timestampOfJoin.ts) {
			data = await getChannelHistory("C028DN05PUG", oldest, latest);
			const messageCount = data.messages.filter(
				(message) =>
					(message.user == userId && message.type == "message") ||
					(message.reply_users && message.reply_users.includes(userId))
			).length;
			console.log(messageCount);
			const reactionCount = data.messages.filter(
				(message) => message.reactions && findReaction(message.reactions)
			).length;
			latest = oldest;
			oldest -= -60 * 60 * 24 * time;
			const newCount = {
				messageCount: messageCount,
				reactionCount: reactionCount,
			};
			result.statistics.push(newCount);
			res.status(200).json(result);
		}
	}
});

export default router;
