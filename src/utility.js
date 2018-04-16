function addClassToElement(element, className) {
    element.className +=" " + className;
}

function removeClassFromElement(element, className) {
    var replacementRegex = new RegExp("( " + className + ")", "g");
    element.className.replace(replacementRegex , '')
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);	
}

function getConfigValue(config, key, defaultValue) {
	return config.hasOwnProperty(key) ? config[key] : defaultValue;
}

function exitFullscreenImpl() {
	if(document.exitFullscreen) {
		document.exitFullscreen()
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen()
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen()
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen()
	}
}

function getAgregatedAdTime (adBreak) {
	return adBreak._playableAdsRemaining
		.reduce(function(aggregatedTime, ad) {
			try {
				return getCreativeDuration(ad) + aggregatedTime;
			} catch (e) {
				return aggregatedTime;
			}
	    }, 0)
}

function getCreativeDuration (ad) {
	try {
		return ad.creatives[0].duration;
	} catch (e) {
		return NaN;
	}
}

function getExtensionNode(ad) {
	try {
		return JSON.parse(ad.getCoreAd().customId);
	} catch (e) {
		return {};
	}
}

function getVideoAdTitle(extensionNode) {
	try {
		return extensionNode.videoAd.videoAdTitle;
	} catch (e) {
		return '';
	}
}

function isMobileOrTablet () {
	try {
		return bowser.mobile || bowser.tablet;
	} catch (e) {
		return false;
	} 
}

function inAggregatedMode (mode) {
	return mode === ENUM.AD_BREAK_MODE.AGGREGATED_MODE;
}

function isModeSet(mode) {
	return mode === ENUM.AD_BREAK_MODE.AGGREGATED_MODE || mode === ENUM.AD_BREAK_MODE.INDIVIDUAL_NODE
}

function getPlayerVolume () {
	var volume = 0.5;
	try {
		volume = playerVolumeController()
		if(typeof volume !== 'number' || volume < 0 || volume > 1) {
			volume = 0.5;
		}
	} catch (e) {
		volume = 0.5;
	}
	return volume;
}

function setPlayerVolume (volume) {
	try {
		if(typeof volume === 'number' && volume >= 0 && volume <= 1) {
			playerVolumeController(volume);
		}
	} catch (e) {}
}

function mutePlayer () {
	try {
		playerMuteController(true)
	} catch (e) {}
}

function unmutePlayer () {
	try {
		playerMuteController(false)
	} catch (e) {}
}

function getPlayerMuteState () {
	try {
		return playerMuteController()
	} catch (e) {}

	return false;
}