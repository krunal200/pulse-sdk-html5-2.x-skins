};

if(OO && OO.Pulse) {
    OO.Pulse.adPlayerReady(function(adPlayer) {
        var skin = new PulseAdPlayerSkin(adPlayer);
    });
} else {
    throw new Error("The Pulse SDK is not ready. Make sure to include the skin script _after_ the SDK script.");
}})();