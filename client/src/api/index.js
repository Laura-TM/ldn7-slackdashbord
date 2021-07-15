import axios from "axios";

const urlChannelList = "/api/channelList";
const urlUserList = "/api/userList";
const urlChannelHistory = "/api/channelHistory";
const urlUserInfo = "/api/userInfo";

export const fetchChannelList = async () => {
	try {
		const {
			data: { channels },
		} = await axios.get(urlChannelList);
		return channels;
	} catch (error) {
		console.log(error);
	}
};

export const fetchUserList = async () => {
	try {
		const {
			data: { members },
		} = await axios.get(urlUserList);
		return members;
	} catch (error) {
		console.log(error);
	}
};

export const fetchChannelHistory = async () => {
	try {
		const response = await axios.get(urlChannelHistory);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const fetchUserInfo = async () => {
	try {
		const response = await axios.get(urlUserInfo);
		return response;
	} catch (error) {
		console.log(error);
	}
};
