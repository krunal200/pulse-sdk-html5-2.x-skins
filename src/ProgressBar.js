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
    setProgress: function(progress) {
        this._progress.children[0].style.width = Math.round(progress * 100) + '%';
    }
};