/*
progress bar logic - https://css-tricks.com/css3-progress-bars/
 */
var ProgressBar = function (div, adPlayer) {
    var childBar = document.createElement("span");
    this._parent = div;
    this._adPlayer = adPlayer;
    this._progress = document.createElement("div");
    this._progress.appendChild(childBar);
    this._progress.className = "pulse-progress-bar";
    this._progress.min = 0;
    this._progress.max = 1;
    this._progress.value = 0;
    this._aggregatedTime = 0;
    this._currentLinearAdDuration = 0;
    this._elapsedTime = 0;
    this.hide();
    div.appendChild(this._progress);
}

ProgressBar.prototype = {
    show: function() {
        this._progress.className = "pulse-progress-bar pulse-visible";
    },
    hide: function() {
        this._progress.className = "pulse-progress-bar";
    },
    setAggregatedTime: function (totalAdBreakTime) {
        this._elapsedTime = 0;
        this._aggregatedTime = totalAdBreakTime;
    },
    setCurrentAdDuration: function (duration) {
        this._currentLinearAdDuration = duration;
    },
    addAggregatedTime: function () {
        this._elapsedTime += this._currentLinearAdDuration;
        this._currentLinearAdDuration = 0;
    },
    setProgress: function(totalDuration, currentTime) {
        var time = (this._elapsedTime + currentTime) / this._aggregatedTime;
        this._progress.children[0].style.width = ( time * 100 ) + '%';
    }
};