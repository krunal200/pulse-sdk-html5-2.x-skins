var ProgressBarOverlay = function (div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._progressBarOverlay = document.createElement("div");
    this._progressBarOverlay.className = "pulse-progress-bar-overlay";
    
    this.hide();
    div.appendChild(this._progressBarOverlay);
}

ProgressBarOverlay.prototype = {
    show: function() {
        this._progressBarOverlay.className = "pulse-progress-bar-overlay pulse-visible";
    },
    hide: function() {
        this._progressBarOverlay.className = "pulse-progress-bar-overlay";
    }
};