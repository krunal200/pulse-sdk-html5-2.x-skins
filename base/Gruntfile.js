module.exports = function(grunt) {
    const pkg = grunt.file.readJSON('package.json');
    const date = grunt.template.today('yyyy-mm-dd');
    const sourceBanner = `/**\n * !${pkg.name} v${pkg.version} / ${date} / Ooyala Pulse Ad Player Base Skin\n */\n`;
    const sourceFiles = [
        'src/intro.js',
        'src/PlayButton.js',
        'src/SkipButton.js',
        'src/SkipCountdown.js',
        'src/ProgressBar.js',
        'src/LoadingSpinner.js',
        'src/AdCounter.js',
        'src/MuteButton.js',
        'src/utility.js',
        'src/strings.js',
        'src/skin.js',
        'src/outro.js'
    ];

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        pkg: pkg,
        concat: {
            skin: {                    
                options: {
                    banner: sourceBanner
                },
                src: sourceFiles,
                dest: 'js/skin.js'
            }
        }
    });

    grunt.registerTask('default', ['concat']);
};