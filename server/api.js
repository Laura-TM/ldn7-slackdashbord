import { Router } from "express";
const router = new Router();

router.get("/user/:userId", async (req, res) => {
	const userId = req.params.userId;
	const duration =
		req.query.duration == "month"
			? new Date() / 1000 - 60 * 60 * 30 * 24
			: new Date() / 1000 - 60 * 60 * 7 * 24;
	console.log(duration);
	const findReaction = (reactions) => {
		return reactions.filter((reaction) => reaction.users.includes(userId));
	};
	const data = await getChannelHistory("C028DN05PUG", duration);
	if (data.ok) {
		const messageCount = data.messages.filter(
			(message) =>
				(message.user == userId && message.type == "message") ||
				(message.reply_users && message.reply_users.includes(userId))
		).length;

		const reactionCount = data.messages.filter(
			(message) => message.reactions && findReaction(message.reactions)
		).length;

		const userInfo = await getUserInfo(userId);
		if (userInfo.ok) {
			const result = {
				userName: userInfo.user.real_name,
				messageCount: messageCount,
				reactionCount: reactionCount,
			};
			res.json(result);
		} else {
			res.status(400).json("The data not found");
		}
	} else {
		res.status(400).json("The data not found");
	}
});



export default router;
