var VideoStartCountdown = function (div, adPlayer) {
	this._time = 0;
    this._parent = div;
    this._adPlayer = adPlayer;
    this._vsOverlay = document.createElement("div");
    this._vsOverlay.className = "pulse-video-start-countdown";
    this._currentSpentTime = 0;
    this._aggregatedTime = 0;
    this._message = '';
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
    updateTime: function (spentTime) {
    	this._currentSpentTime = spentTime;
    	this._vsOverlay.innerHTML = this._message
    		.replace('[countdown]', Math.round(this._aggregatedTime - spentTime));
    },
    setAggregatedTime: function (totalAdBreakTime) {
    	this._aggregatedTime = totalAdBreakTime;
    },
    setAdType: function (adType) {
    	switch(adType) {
    		case 'preroll':
    			this._message = SKIN_STRINGS.VIDEO_START_COUNTDOWN_PREROLL;
    			break;
    		case 'midroll':
    			this._message = SKIN_STRINGS.VIDEO_START_COUNTDOWN_MIDROLL;
    			break;
    	}
    },
   	reduceAggregatedTime: function () {
   		this._aggregatedTime -= this._currentSpentTime;
   		this._currentSpentTime = 0;
   	},
};