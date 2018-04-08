var VideoStartCountdown = function (div, adPlayer) {
	this._time = 0;
    this._parent = div;
    this._adPlayer = adPlayer;
    this._vsOverlay = document.createElement("div");
    this._vsOverlay.className = "pulse-video-start-countdown";
    this._aggregatedTime = 0;
    this._message = '';
    this._currentLinearAdDuration = 0;
    this._mode = undefined;
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
        var countdown = 'shortly';
        if(inAggregatedMode(this._mode)) {
            countdown = 'in ' + Math.round(this._aggregatedTime - spentTime) + 's';
        }
    	this._vsOverlay.innerHTML = this._message
    		.replace('[countdown]', countdown);
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
   		this._aggregatedTime -= this._currentLinearAdDuration;
   		this._currentLinearAdDuration = 0;
   	},
   	setCurrentAdDuration: function (duration) {
   		this._currentLinearAdDuration = duration;
   	},
    setMode: function (mode) {
        this._mode = mode;
    }
};