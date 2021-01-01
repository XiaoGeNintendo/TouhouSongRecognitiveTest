var songs = {

};

function loadSong() {
    var lines = source.trim().split("\n");
    for (var i = 0; i < lines.length; i++) {
        var part = lines[i].split("!!!");
        if (songs[part[1]] == undefined) {
            songs[part[1]] = [];
        }
        songs[part[1]].push({
            name: part[0],
            cate: part[1],
            link: part[2]
        });
    }
}

var avSong = [];
var nowSong = null;
var sound = null;
var ready = false;
var start = 0;

function genProb() {

    if (avSong.length == 0) {
        alert("测试结束。请刷新以重置。");
        return;
    }
    ready = false;
    $('#playbtn')[0].disabled = true;

    id = Math.floor(Math.random() * avSong.length);
    nowSong = avSong[id];
    avSong.splice(id, 1);
    sound = new Howl({
        src: [nowSong.link],
        html5: true,
        preload: "metadata"
    });

    sound.once('end', function () {
        $('#playbtn').text("播放片段");
    });

    var testlen = parseFloat($('#len')[0].value);

    sound.once("load", function () {
        var len = sound.duration();
        start = Math.random() * (len - testlen);
        start = Math.round(start * 100) / 100;

        sound._sprite.test = [start * 1000, testlen * 1000];
        sound._sprite.test2 = [start * 1000 - 5000, 9999999];
        ready = true;
        $('#playbtn')[0].disabled = false;
        console.log("New song:" + JSON.stringify(nowSong) + " select from:" + start * 1000 + " " + len + " " + testlen);
    });
}