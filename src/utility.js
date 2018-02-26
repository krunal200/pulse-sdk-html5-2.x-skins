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
		document.exitFullscreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen();
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
		return 0;
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