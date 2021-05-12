var source='';
const SOURCE_163=163;
const SOURCE_THB=0;

var songs = {

};

function loadSong() {
    if(lsg("source")==SOURCE_THB){
        source=sourceTHB;
    }else if(lsg("source")==SOURCE_163){
        source=source163;
    }

    var lines = source.trim().split("\n");
    for (var i = 0; i < lines.length; i++) {
        var part = lines[i].split("!!!");
        if (part.length<=1){
            continue;
        }
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

    if(lsg("source")==SOURCE_163){
        sound = new Howl({
            src: [nowSong.link],
            html5: true,
            preload: "metadata",
            format: ["mp3"]
        });
    }else{
        sound = new Howl({
            src: [nowSong.link],
            html5: true,
            preload: "metadata"
        });
    }
    

    sound.once('end', function () {
        $('#playbtn').text("播放片段");
    });

    var testlen = $('#scss')[0].checked ? 60 : parseFloat($('#len')[0].value);

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

function lss(pos,val){
    localStorage.setItem(pos,val);
}

function lsm(pos,val){
    lss(pos,lsg(pos)+val);
}

function lsg(pos){
    if(localStorage.getItem(pos)==null){
        lss(pos,0);
    }
    return parseInt(localStorage.getItem(pos));
}

function addToStat(real,sel,time){
    console.log(`add to stat ${real} <> ${sel} t=${time}`)
    lsm(real+"_meet",1);
    if(sel==real){
        lsm(real+"_correct",1);
        lsm(real+"_response",time);
    }else{
        lsm(sel+"_mistake",1);
    }
}

function addToStat2(real, score){
    console.log(`add to stat(sc) ${real} += ${score}`)
    lsm(real+"_scmeet",1);
    lsm(real+"_score",score);
}