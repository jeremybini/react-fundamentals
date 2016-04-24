var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var sec = 'YOU_SECRET_ID';
var param = "?client_id=" + id + "&client_secret=" + sec;
var path = 'https://api.github.com/users/';

function getUserInfo(username) {
	return axios.get(path + username + param)
}

function getRepos(username) {
	return axios.get(path + username + '/repos' + param + '&per_page=100');
}


function getTotalStars(repos) {
	return repos.data.reduce(function(prev, current) {
		return prev + current.stargazers_count;
	}, 0)
}

function getPlayersData(player) {
	return getRepos(player.login)
	.then(getTotalStars)
	.then(function(totalStars) {
		return {
			followers: player.followers,
			totalStars: totalStars
		}
	})
}

function calculateScores(players) {
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	]
}

function extractArrayData(res) {
	return res.map(function(userRes) {
		return userRes.data;
	});
}

var helpers = {
	getPlayersInfo: function(players) {
		return axios.all(players.map(function(username) {
			return getUserInfo(username);
		}))
		.then(extractArrayData)
		.catch(function(err) {
			console.warn('Error in getPlayersInfo', err);
		})
	},

	battle: function(players) {
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);

		return axios.all([playerOneData, playerTwoData])
		.then(calculateScores)
		.catch(function(err) {
			console.warn('Error in battle', err);
		})
	}
};

module.exports = helpers;