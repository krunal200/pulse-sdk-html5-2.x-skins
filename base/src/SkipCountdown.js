var SkipCountdown = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._label = document.createElement('span');
    this._label.className = 'pulse-skip-countdown';
    this._parent.appendChild(this._label);
    this._ad = null;
}

SkipCountdown.prototype = {
    show: function() {
        this._label.className = 'pulse-skip-countdown pulse-visible pulse-skip-countdown-slide';
    },
    hide: function() {
        this._label.className = 'pulse-skip-countdown';
    },
    setAd: function(ad) {
        this._ad = ad;
        this.update(0);
    },
    update: function(position) {
        if(!this._ad) {
            return;
        }
        
        var remaining = Math.ceil(this._ad.getSkipOffset() - position);
        var template = SkipCountdown.getStringTemplate(remaining);

        if(template) {
            this.show();
            this._label.innerHTML = template.replace('[countdown]', remaining);
        } else {
            this.hide();
        }
    }
};

SkipCountdown.getStringTemplate = function(seconds) {
    if(seconds === 1) {
        return SKIN_STRINGS.SKIP_COUNTDOWN_SINGULAR;
    } else if(seconds === 2) {
        return SKIN_STRINGS.SKIP_COUNTDOWN_DUAL;
    } else if(seconds > 2) {
        return SKIN_STRINGS.SKIP_COUNTDOWN_PLURAL;
    }

    return null;
}