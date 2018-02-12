var PlayButton = function(div, adPlayer) {
    var playButton = document.createElement("div"); 
    playButton.className = "pulse-play-button";
    this._parent = div;
    this._adPlayer = adPlayer;
    this._button = document.createElement("div");
    this._button.className = "pulse-clickable-play-button";
    this._button.style.pointerEvents = "all";
    this.hide();

    this._button.appendChild(playButton);
    this._parent.appendChild(this._button);

    this._onClick = function() {
        this._adPlayer.play();
    }.bind(this);
};

PlayButton.prototype = {
    show: function() {
        this._button.style.display = "block";
        this._button.addEventListener("click", this._onClick);
    },
    hide: function() {
        this._button.style.display = "none";
        this._button.removeEventListener("click", this._onClick);
    }
};