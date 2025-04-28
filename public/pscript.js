window.addEventListener("load", () =>  {
//Drawing Stuff
//This here probably looks like the most scuffed part of the entire project, and that is because it is! 
//Honestly, if the canvas wasn't a requirement, I would have scrapped it simply because of how NEEDY it 
// is and how it loves to break if i don't give it the perfect conditions!!!
if (window.location.href == "http://localhost:3006/portrait"){ 
    console.log("Maybe???")
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 500;
    canvas.width = 500;

    let painting = false;

    function startPosition(){
        painting = true;
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting){
            return;
        }
        ctx.lineWidth = document.getElementById("linewidth").value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = document.getElementById("stroke").value;

        ctx.lineTo(e.clientX, (e.clientY-130));
        ctx.stroke();
    }
}
else {
    str=0; dex=0; con=0; int=0; wis=0; cha=0;
    strm; dexm; conm; intm; wism; cham;
    strs; dexs; cons; ints; wiss; chas;
    strb=0; dexb=0; conb=0; intb=0; wisb=0; chab=0;
    cName = ""; race = ""; cClass = "Mage"; back = "";
    document.getElementById('saveBtn').addEventListener('click', saveHandler);
    statKeeper();
}

canvas.addEventListener('mousedown',startPosition)
canvas.addEventListener('mouseup',finishedPosition)
canvas.addEventListener('mousemove',draw);
});

function statKeeper(){
    console.log("Stat Keeper?")
    document.getElementById("cName").innerText = ""+sessionStorage.getItem("Name");
    strb = sessionStorage.getItem("strb")
    dexb = sessionStorage.getItem("dexb")
    conb = sessionStorage.getItem("conb")
    intb = sessionStorage.getItem("intb")
    wisb = sessionStorage.getItem("wisb")
    chab = sessionStorage.getItem("chab")
    race = sessionStorage.getItem("race")
    cClass = sessionStorage.getItem("class")
    back = sessionStorage.getItem("back")
    document.getElementById("desc").innerHTML = "Character Choices: " + race + " " + cClass + " - "+ back;
    raceEval();
    statUpdate();
    document.getElementById('nameInput').value = sessionStorage.getItem('Name');
    document.getElementById('classInput').value = sessionStorage.getItem('class');
    document.getElementById('raceInput').value = sessionStorage.getItem('race');
    document.getElementById('backInput').value = sessionStorage.getItem('back');
    document.getElementById('picInput').value = sessionStorage.getItem('imgString');
}

function fullroll() {
    strb = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("strb",strb);
    dexb = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("dexb",dexb);
    conb = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("conb",conb);
    intb = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("intb",intb);
    wisb = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("wisb",wisb);
    chab = Math.floor(Math.random() *18)+3;
    sessionStorage.setItem("chab",chab);
    statUpdate();
}

function modEval(stat){
    if (stat > 21) {return +6}; 
    if (stat > 19) {return +5};
    if (stat > 17) {return +4};
    if (stat > 15) {return +3};
    if (stat > 13) {return +2};
    if (stat > 11) {return +1};
    if (stat > 9) {return 0};
    if (stat > 7) {return -1};
    if (stat > 5) {return -2};
    if (stat > 3) {return -3};
    if (stat > 1) {return -4}
}

function saveEval(){
    if(!cClass){
        strs = strm;
        cons = conm;
        dexs = dexm;
        ints = intm;
        wiss = wism;
        chas = cham;
    }
    else {
        if (cClass == "Warrior"){
            strs = strm+2
            cons = conm+2;
            dexs = dexm;
            ints = intm;
            wiss = wism;
            chas = cham;
        }
        if (cClass == "Mage"){
            strs = strm
            cons = conm;
            dexs = dexm;
            ints = intm+2;
            wiss = wism+2;
            chas = cham;
        }
        if (cClass == "Shadow"){
            strs = strm
            cons = conm;
            dexs = dexm+2;
            ints = intm;
            wiss = wism;
            chas = cham+2;
        }
        if (cClass == "Priest"){
            strs = strm
            cons = conm+2;
            dexs = dexm;
            ints = intm;
            wiss = wism+2;
            chas = cham;
        }
    }
    

}

function raceEval(){
    if(!race){
        str = strb;
        con = conb;
        dex = dexb;
        int = intb;
        wis = wisb;
        cha = chab;
    }
    else {
        if (race == "Human"){
            
            str = parseInt(strb)+(1);
            con = parseInt(conb)+1;
            dex = parseInt(dexb)+1;
            int = parseInt(intb)+1;
            wis = parseInt(wisb)+1;
            cha = parseInt(chab)+1;
            console.log("Race Eval Human: " + str)
        }
        if (race == "Dwarf"){
            str = parseInt(strb)+1;
            con = parseInt(conb)+2;
            dex = dexb;
            int = intb;
            wis = parseInt(wisb)+1;
            cha = chab;
        }
        if (race == "Elf"){
            str = strb;
            con = conb;
            dex = dexb;
            int = parseInt(intb)+2;
            wis = wisb;
            cha = parseInt(chab)+1;
        }
        if (race == "Orc"){
            str = parseInt(strb)+2;
            con = parseInt(conb)+1;
            dex = dexb;
            int = intb;
            wis = wisb;
            cha = chab;
        }
        
    }
    

}

function statUpdate() {
    raceEval();
    strm = modEval(str);
    dexm = modEval(dex);
    conm = modEval(con);
    intm = modEval(int);
    wism = modEval(wis);
    cham = modEval(cha);
    saveEval();
    statSheetUpdate(str,strm,strs,"str","strm","strs");
    statSheetUpdate(dex,dexm,dexs,"dex","dexm","dexs");
    statSheetUpdate(con,conm,cons,"con","conm","cons");
    statSheetUpdate(int,intm,ints,"int","intm","ints");
    statSheetUpdate(wis,wism,wiss,"wis","wism","wiss")
    statSheetUpdate(cha,cham,chas,"cha","cham","chas")
}

function statSheetUpdate(score,mod,save,scoretag,modtag,savetag){
    document.getElementById(scoretag).innerHTML = ""+score
    document.getElementById(modtag).innerHTML = ""+mod
    document.getElementById(savetag).innerHTML = ""+save
    document.getElementById(scoretag+'i').value = score
}

function nameUpdate(){
    cName = document.getElementById("nform").value;
    document.getElementById("cName").innerText = ""+cName;
    sessionStorage.setItem("Name",cName);
    document.getElementById('nameInput').value = cName;
    document.getElementById("nameField").hidden = true;
}

function nameClick(){
    console.log("Is this a real thing?")
    document.getElementById("nameField").hidden = false
}

function updateSheet(){
    cClass = document.getElementById("classform").value;
    sessionStorage.setItem("class",cClass);
    document.getElementById('classInput').value = cClass;
    race = document.getElementById("raceform").value;
    sessionStorage.setItem("race",race);
    document.getElementById('raceInput').value = race;
    back = document.getElementById("backform").value;
    sessionStorage.setItem("back",back);
    document.getElementById('backInput').value = back;
    document.getElementById("desc").innerHTML = "Character Choices: " + race + " " + cClass + " - "+ back;
    statUpdate();
}

function savePic(){
    let imgString = canvas.toDataURL('image/png');
    sessionStorage.setItem('imgString', imgString)
    var image = imgString.replace("image/png", "image/octet-stream"); 
    sessionStorage.setItem("pic",image);   
}
function getPic(){
    document.getElementById("charArt").src = sessionStorage.getItem("pic");
    document.getElementById('picInput').value = sessionStorage.getItem('imgString');
}

function saveHandler(event) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', saveResReceivedHandler);
    xhr.responseType = 'json';
    let reqString = 'charName='+encodeURIComponent(document.getElementById('nameInput').value) +
                    '&charClass='+encodeURIComponent(document.getElementById('classInput').value) + 
                    '&charRace='+encodeURIComponent(document.getElementById('raceInput').value) + 
                    '&charBack='+encodeURIComponent(document.getElementById('backInput').value) +
                    '&portrait='+encodeURIComponent(document.getElementById('picInput').value) + 
                    '&str='+encodeURIComponent(document.getElementById('stri').value) + 
                    '&dex='+encodeURIComponent(document.getElementById('dexi').value) + 
                    '&con='+encodeURIComponent(document.getElementById('coni').value) + 
                    '&intel='+encodeURIComponent(document.getElementById('inti').value) + 
                    '&wis='+encodeURIComponent(document.getElementById('wisi').value) + 
                    '&cha='+encodeURIComponent(document.getElementById('chai').value)
    ;
    xhr.open('POST', '/saveChar', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send(reqString);
}

function saveResReceivedHandler() {
    let result = document.createElement('p');
    if (this.status == 200) {
        let res = this.response;
        result.textContent = 'Character creation successful!';
    } else {
        result.textContent = 'Character creation failed! Please ensure information is complete.';
    }
    document.getElementById('log').appendChild(result);
}

