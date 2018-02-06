var MuteButton = function(div, adPlayer, isMuted) {
    this._mutedClassNames = 'pulse-mute-button pulse-mute-button-muted';
    this._unmutedClassNames = 'pulse-mute-button pulse-mute-button-unmuted';

    // if(!bowser && (!bowser.mobile || !bowser.tablet)) {
    //     this._mutedClassNames += ' allowHover';
    //     this._unmutedClassNames += ' allowHover';
    // }

    this._parent = div;
    this._adPlayer = adPlayer;

    this._button = document.createElement('div');
    this._button.addEventListener('click', this.click.bind(this));
    this.hide();
    
    div.appendChild(this._button);

    // reverted in click()
    this._muted = isMuted;
    if(this._adPlayer.getVolume){
        this._button.className = this._adPlayer.getVolume() ? this._unmutedClassNames : this._mutedClassNames;
    } else {
        this.click();
    }

};

MuteButton.prototype = {
    click: function() {
        if(this._adPlayer.getVolume){
            this._muted = this._adPlayer.getVolume() === 0;
        }

        if(this._muted) {
            this.unmute();
        } else {
            this.mute();
        }
    },

    mute: function() {
        if(this._adPlayer.mute) {
            this._adPlayer.mute();
            this._button.className = this._adPlayer.getVolume() ? this._unmutedClassNames : this._mutedClassNames;
        } else {
            this._button.className = this._mutedClassNames;
            this._adPlayer.setVolume(0);
        }
        this._muted = true;
    },

    unmute: function() {

        if(this._adPlayer.unmute) {
            this._adPlayer.unmute();
            this._button.className = this._adPlayer.getVolume() ? this._unmutedClassNames : this._mutedClassNames;
        } else {
            this._button.className = this._unmutedClassNames;
            this._adPlayer.setVolume(1);
        }
        this._muted = false;
    },

    show: function() {
        this._button.style.display = 'block';
        if(this._adPlayer.getVolume()){
            this._button.className = this._adPlayer.getVolume() ? this._unmutedClassNames : this._mutedClassNames;
        }
    },

    hide: function() {
        this._button.style.display = 'none';
    },

    onVolumeChanged: function(volume){
        this._button.className = volume ? this._unmutedClassNames : this._mutedClassNames;
    }
};