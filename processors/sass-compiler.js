var fs = require('fs');
var sass = require('node-sass');

sass.render({
    file: '../styles/main.scss',
    outputStyle: 'compact'
}, function(error, result) {
    if (!error) {
        fs.writeFile('../assets/styles.css', result.css, function(err) {
            if(!err){
                console.log('SASS compiled successfully!');
            } else {
                console.log('There was an error when saving the styles to the disk.');
                console.log('Error %s, on path %s', err.code, err.path);
            }
        });
    } else {
        console.log('There was an error when compiling the styles.');
        console.log(error.formatted);
    }
});
