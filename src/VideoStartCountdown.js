var VideoStartCountdown = function (div, adPlayer) {
	this._time = 0;
    this._parent = div;
    this._adPlayer = adPlayer;
    this._vsOverlay = document.createElement("div");
    this._vsOverlay.className = "pulse-video-start-countdown";
    this.hide();
    div.appendChild(this._vsOverlay);
};

VideoStartCountdown.prototype = {
    show: function() {
    	this._vsOverlay.className = "pulse-video-start-countdown pulse-visible";
    },
    hide: function() {
        this._vsOverlay.className = "pulse-video-start-countdown";
    },
    setRemainingTime: function(totalDuration, currentTime) {
    	this._vsOverlay.innerHTML = SKIN_STRINGS.VIDEO_START_COUNTDOWN.replace('[countdown]', Math.round(totalDuration - currentTime));
    },
};