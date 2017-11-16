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