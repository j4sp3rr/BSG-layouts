/* global define */
define([
	'components/background',
	'components/speedrun',
	'components/nameplates'
], (setBackground, speedrun, nameplates) => {
	'use strict';

	const LAYOUT_NAME = '16x9_2';
	const COLUMN_WIDTH = 420;
	const sponsorsAndTwitter = document.getElementById('sponsorsAndTwitter');
	const sponsorDisplay = document.querySelector('sponsor-display');
	const twitterDisplay = document.querySelector('twitter-display');

	return {
		attached() {
			setBackground(LAYOUT_NAME);

			speedrun.configure(0, 447, COLUMN_WIDTH, 218, {
				nameY: 41,
				categoryY: 133,
				nameMaxHeight: 100
			});

			nameplates.configure({
				nameFontSize: 28,
				estimateFontSize: 18,
				timeFontSize: 48,
				width: COLUMN_WIDTH,
				height: 51,
				y: 394,
				bottomBorder: true,
				audioIcon: true
			}, [
				{
					x: 0,
					alignment: 'right'
				}, {
					x: 860,
					alignment: 'left'
				}
			]);

			sponsorsAndTwitter.style.top = '447px';
			sponsorsAndTwitter.style.left = '860px';
			sponsorsAndTwitter.style.width = `${COLUMN_WIDTH}px`;
			sponsorsAndTwitter.style.height = '218px';

			sponsorDisplay.orientation = 'horizontal';
			sponsorDisplay.style.padding = '20px 20px';

			twitterDisplay.bodyStyle = {
				fontSize: 26,
				top: 18,
				horizontalMargin: 17
			};
			twitterDisplay.namebarStyle = {
				top: 161,
				width: 358,
				fontSize: 25
			};
		}
	};
});
