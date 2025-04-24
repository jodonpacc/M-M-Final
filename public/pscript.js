window.addEventListener("load", () =>  {
//Drawing Stuff
//This here probably looks like the most scuffed part of the entire project, and that is because it is! 
//Honestly, if the canvas wasn't a requirement, I would have scrapped it simply because of how NEEDY it 
// is and how it loves to break if i don't give it the perfect conditions!!!
if (window.location.href == "http://pandora00.cs.trinity.edu:3006/portrait"){ 
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
 
    statKeeper();
}

canvas.addEventListener('mousedown',startPosition)
canvas.addEventListener('mouseup',finishedPosition)
canvas.addEventListener('mousemove',draw);
});

function statKeeper(){
    console.log("Stat Keeper?")
    document.getElementById("cName").innerText = ""+localStorage.getItem("Name");
    strb = localStorage.getItem("strb")
    dexb = localStorage.getItem("dexb")
    conb = localStorage.getItem("conb")
    intb = localStorage.getItem("intb")
    wisb = localStorage.getItem("wisb")
    chab = localStorage.getItem("chab")
    race = localStorage.getItem("race")
    cClass = localStorage.getItem("class")
    back = localStorage.getItem("back")
    document.getElementById("desc").innerHTML = "Character Choices: " + race + " " + cClass + " - "+ back;
    raceEval();
    statUpdate();

}

function fullroll() {
    strb = Math.floor(Math.random() *18)+3;
    localStorage.setItem("strb",strb);
    dexb = Math.floor(Math.random() *18)+3;
    localStorage.setItem("dexb",dexb);
    conb = Math.floor(Math.random() *18)+3;
    localStorage.setItem("conb",conb);
    intb = Math.floor(Math.random() *18)+3;
    localStorage.setItem("intb",intb);
    wisb = Math.floor(Math.random() *18)+3;
    localStorage.setItem("wisb",wisb);
    chab = Math.floor(Math.random() *18)+3;
    localStorage.setItem("chab",chab);
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
}

function nameUpdate(){
    cName = document.getElementById("nform").value;
    document.getElementById("cName").innerText = ""+cName;
    localStorage.setItem("Name",cName);
    document.getElementById("nameField").hidden = true;
}

function nameClick(){
    console.log("Is this a real thing?")
    document.getElementById("nameField").hidden = false
}

function updateSheet(){
    cClass = document.getElementById("classform").value;
    localStorage.setItem("class",cClass);
    race = document.getElementById("raceform").value;
    localStorage.setItem("race",race);
    back = document.getElementById("backform").value;
    localStorage.setItem("back",back);
    document.getElementById("desc").innerHTML = "Character Choices: " + race + " " + cClass + " - "+ back;
    statUpdate();
}

function savePic(){
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    localStorage.setItem("pic",image);   
}
function getPic(){
    document.getElementById("charArt").src = localStorage.getItem("pic");
}



