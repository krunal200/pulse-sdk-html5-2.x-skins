var AdCounter = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._label = document.createElement('div');
    this._label.className = 'pulse-ad-counter';
    this._parent.appendChild(this._label);
    this._adBreak = null;
}

AdCounter.prototype = {
    show: function() {
        this._label.className = 'pulse-ad-counter pulse-visible pulse-ad-counter-slide';
    },
    hide: function() {
        this._label.className = 'pulse-ad-counter';
    },
    setAdBreak: function(adBreak) {
        this._adBreak = adBreak;
        this.update();
    },
    update: function() {
        var position = this._adBreak.getPlayableAdsTotal() - this._adBreak.getPlayableAdsRemaining() + 1;
        this._label.innerHTML = SKIN_STRINGS.AD_COUNTER
            .replace('[position]', position)
            .replace('[total]', this._adBreak.getPlayableAdsTotal());
    }
};