
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question : "Quel Etat des Etats-Unis a pour capitale Montgomery ?",
        imgSrc : "img/etatsunis.jpg",
        choiceA : "L'Alabama",
        choiceB : "La Californie",
        choiceC : "L'Ohio",
        correct : "A"
    },{
        question : "Lequel des Etats suivants ne fait pas partie du Commonwealth ?",
        imgSrc : "img/common.jfif",
        choiceA : "L'Australie",
        choiceB : "Les Etats-Unis",
        choiceC : "Le Ghana",
        correct : "B"
    },{
        question : "Quel pays a pour capitale Gaborone ?",
        imgSrc : "img/gaborone.jfif",
        choiceA : "Le Lesotho",
        choiceB : "La Tanzanie",
        choiceC : "Le Botswana",
        correct : "C"
    },{
        question : "Où trouve-t-on le sultanat de Brunei ?",
        imgSrc : "img/brunei.png",
        choiceA : "L'île de Bornéo",
        choiceB : "La corne de l'Afrique",
        choiceC : "L'île de Java",
        correct : "A"
    },{
        question : "Dans quel Mer se jette le fleuve Méandre ?",
        imgSrc : "img/meandre.jfif",
        choiceA : "La mer Adriatique",
        choiceB : "La mer Noire",
        choiceC : "La mer Egée",
        correct : "B"
    },{
        question : "Quel est le plus grand Lac d'Amérique du Nord ?",
        imgSrc : "img/lacamerique.jfif",
        choiceA : "Le lac Majeur",
        choiceB : "Le lac Ontario",
        choiceC : "Le lac Supérieur",
        correct : "C"
    },{
        question : "Quel est la capitale de fait de la Suisse ?",
        imgSrc : "img/suisse.png",
        choiceA : "Berne",
        choiceB : "Bâle",
        choiceC : "Zurich",
        correct : "A"
    },{
        question : "Dans quel pays peut-on trouver la ville de Tchéliabinsk ?",
        imgSrc : "img/tchelianbinsk.png",
        choiceA : "Biélorussie",
        choiceB : "Russie",
        choiceC : "Ukraine",
        correct : "B"
    },{
        question : "Dans quel pays trouve-t-on la région de Hedjaz",
        imgSrc : "img/hedjaz.png",
        choiceA : "L'Irak",
        choiceB : " L'Egypte",
        choiceC : "L'Arabie Saoudite",
        correct : "C"
    },
    {
        question : "Combien d'états fédérés l'Inde compte-t-elle ?",
        imgSrc : "img/inde.png",
        choiceA : "29",
        choiceB : "28",
        choiceC : "30",
        correct : "A"
    },{
        question : "Dans quel ville peut admirer le Kinkaku-ji ?",
        imgSrc : "img/kinkakuji.jfif",
        choiceA : "Tokyo",
        choiceB : "Kyoto",
        choiceC : "Osaka",
        correct : "B"
    },{
        question : "Dans quel ville peut-on déambuler sur la place Nagsh-e Jahan ?",
        imgSrc : "img/nagsh.png",
        choiceA : "La Mecque",
        choiceB : "Istanbul",
        choiceC : "Isfahan",
        correct : "C"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;

        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
   
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){

        score++;
     
        answerIsCorrect();
    }else{
  
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
    
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}


function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


function scoreRender(){
    scoreDiv.style.display = "block";
    
 
    const scorePerCent = Math.round(100 * score/questions.length);
    

    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















