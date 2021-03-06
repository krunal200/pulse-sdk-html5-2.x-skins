var PauseButton = function(div, adPlayer) {
    var pauseButton = document.createElement("div"); 
    pauseButton.className = "pulse-pause-button";
    this._parent = div;
    this._adPlayer = adPlayer;
    this._button = document.createElement("div");
    this._button.className = "pulse-clickable-pause-button";
    this._button.style.pointerEvents = "all";
    this.hide();

    this._button.appendChild(pauseButton);
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