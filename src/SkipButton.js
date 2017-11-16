var SkipButton = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._button = document.createElement("div");
    this._button.className = "pulse-skip-button pulse-hidden";
    this._button.innerHTML = SKIN_STRINGS.SKIP_AD;
    this._parent.appendChild(this._button);

    this._onClick = function() {
        this._adPlayer.skipButtonClicked();
    }.bind(this);
}

SkipButton.prototype = {
    show: function () {
        this._button.className = "pulse-skip-button pulse-visible";
        setTimeout((function()  {
            this._button.className += ' pulse-skip-button-shrink';
        }).bind(this), 50);

        this._button.addEventListener("click", this._onClick);
        this._button.style.pointerEvents = "all";
    },
    hide: function() {
        this._button.className = "pulse-skip-button pulse-hidden";
        this._button.removeEventListener("click", this._onClick);
        this._button.style.pointerEvents = "none";
    }
};