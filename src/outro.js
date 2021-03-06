};

if(OO && OO.Pulse) {
	OO.Pulse.Skin = {
		init: function init(components, config) {
			OO.Pulse.Skin.init = function() {}
			var defaultComponentState =  {
				playButton: true,
				loadingSpinner: true,
				skipButton: true,
				progressBar: true,
				skipCountdown: true,
				adCounter: true,
				muteButton: true,
				overlayCloseButton: true,
				pauseAdCloseButton: true,
				hoverOverlay: true,
				pauseButton: true,
				videoStartCountdown: true,
				clickThroughLink: true,
				controlContainer: true,
				fullScreenButton: true,
				progressBarOverlay: true,
			};
			if(typeof config !== 'object') {
				config = {};
			}
			if(typeof components !== 'object') {
				components = {};
			}
			for(var key in components) {
				if(!components.hasOwnProperty(key) || 
					!defaultComponentState.hasOwnProperty(key) || 
					typeof components[key] !== 'boolean') {
					continue;
				}
				defaultComponentState[key] = components[key];
			}
			OO.Pulse.adPlayerReady(function(adPlayer) {
		        var skin = new PulseAdPlayerSkin(adPlayer, defaultComponentState, config);
		    });
		},
		setRequestFullScreenImpl: function(implFn) {
			requestFullScreenImpl = implFn;
		},
		setVolumeController: function(implFn) {
			playerVolumeController = implFn;
		},
		setPlayerMuteController: function(implFn) {
			playerMuteController = implFn;
		}
	};
} else {
    throw new Error("The Pulse SDK is not ready. Make sure to include the skin script _after_ the SDK script.");
}

})();