var PauseButton = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._button = document.createElement("div");
    this._button.className = "pulse-pause-button";
    this._button.style.pointerEvents = "all";
    this.hide();

    this._parent.appendChild(this._button);

    this._onClick = function() {
        this._adPlayer.pause();
    }.bind(this);
};

PauseButton.prototype = {
    show: function() {
        this._button.style.display = "block";
        this._button.addEventListener("click", this._onClick);
    },
    hide: function() {
        this._button.style.display = "none";
        this._button.removeEventListener("click", this._onClick);
    }
};