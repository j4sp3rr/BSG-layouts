'use strict';

const app = require('express')();

module.exports = function (nodecg) {
	const pulsing = nodecg.Replicant('nowPlayingPulsing', {defaultValue: false, persistent: false});
	const nowPlaying = nodecg.Replicant('nowPlaying', {defaultValue: {}, persistent: false});
	let pulseTimeout;

	nodecg.listenFor('pulseNowPlaying', pulse);

	app.post('/sgdq16-layouts/song', (req, res) => {
		nowPlaying.value = {
			game: req.query.game,
			title: req.query.title
		};

		// If the graphic is already showing, end it prematurely and show the new song
		if (pulsing.value) {
			clearTimeout(pulseTimeout);
			pulsing.value = false;
		}

		// Show the graphic
		pulse();

		res.sendStatus(200);
	});

	nodecg.mount(app);

	/**
	 * Shows the nowPlaying graphic for 12 seconds.
	 * @returns {undefined}
	 */
	function pulse() {
		// Don't stack pulses
		if (pulsing.value) {
			return;
		}

		pulsing.value = true;

		// Hard-coded 12 second duration
		pulseTimeout = setTimeout(() => {
			pulsing.value = false;
		}, 12 * 1000);
	}
};
