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

function getDomain (url) {
	var regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(.*?)\//;
	return url.match(regex)[1];
}

function getClickThroughURL (ad) {
	var creative =  ad._ad.creatives[0];
	return creative
		? creative.clickThroughUrl
		: '';
}