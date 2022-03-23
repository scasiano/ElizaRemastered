const child_process = require("child_process")

let eliza;

const loadEliza = (callback) => {
    eliza = child_process.spawn('python',['-i', 'python/eliza.py']);
    eliza.stdout.on('data', (data) => {
        callback(data.toString().replace(/(\r\n|\n|\r)/gm, ""));
    });
}
exports.loadEliza = loadEliza;

const sendEliza = (text) => {
    eliza.stdin.write(text + "\n");
}
exports.sendEliza = sendEliza;

const killEliza = () => {
    eliza.stdin.end();
}
exports.killEliza = killEliza;

const translate = (text, language = "en") => {
    return child_process.execSync('python -X utf8 python/runnerTranslate.py "' + text + '" "' + language + '" ').toString().replace(/(\r\n|\n|\r)/gm, "");
}
exports.translate = translate;

const speechToText = (file="empty", language = "en") => {
    return child_process.execSync('python python/runnerSpeechToText.py "' + file + '" "' + language + '" ').toString().replace(/(\r\n|\n|\r)/gm, "");
}
exports.speechToText = speechToText;

const textToSpeech = (input, language = "en") => {
    child_process.execSync('python python/runnerTestToSpeech.py "' + input + '" "' + language + '" ');
}
exports.textToSpeech = textToSpeech;