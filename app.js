const form = document.querySelector(".js_conLineForm");
const input = form.querySelector("input");
const h3 = document.querySelector(".js_startWord");
const startBtn = document.querySelector(".js_startBtn");
const stopBtn = document.querySelector(".js_stopBtn");

let wordArray = [];
let 제시어 = ["가나다", "리어카", "자동차", "아파트","화장지","컴퓨터","복숭아","포르쉐"];
let stage2 = false;
let processKey = true;

let timer = null;

function saveWord(wordArray) {
    if(wordArray.length === 6) {
        alert("1단계 통과");
        input.value ="";
        h3.innerText = "슭곰발";
        stage2 = true;
        if(stage2) {
            alert("stage2 Go");
        }
    } else {
        localStorage.setItem("word", JSON.stringify(wordArray));
    }
}

function expressWord(inputWord) {
    if(processKey === true) {
    h3.innerText = inputWord;
    wordArray.push(inputWord);
    saveWord(wordArray);
    } else { // stop 버튼을 누르면 key가 false가 되서 아래 코드 실행됨. 
        alert("게임이 중지되었습니다.\nGame Start 버튼을 눌러주세요")
    }
}

function checkWord(inputWord) {
    if(inputWord[0] === h3.innerText[h3.innerText.length-1] && inputWord.length === 3) {
        if(wordArray.includes(inputWord)) {
            alert("이미 사용한 단어입니다.");
        } else {
            expressWord(inputWord);
        }
    } else {
        alert("끝말잇기가 맞지 않습니다.");
    }
}



function handleSubmit(event) {
    event.preventDefault();
    processKey = true;

    const inputWord = input.value;
    checkWord(inputWord);    
    input.value = "";

    timerStop = clearTimeout(timer);
    timer = setTimeout(handleStopGame, 5000)
    
}

function deleteArray() {
    wordArray = [];
}

function handleStopGame() {
    processKey = false;
    alert("게임 종료");
    localStorage.clear(); 
    deleteArray();
    timerStop = clearTimeout(timer);    
    init();
}


function startHandle() {
    h3.innerText = 제시어[Math.floor(Math.random()*7+1)]; //제시어 랜덤으로 
    alert("Game start\n 5초 안에 써야되");
    form.addEventListener("submit", handleSubmit);
    timer = setTimeout(handleStopGame, 5000)// 시간제한 기능 
}



function init() { 
    startBtn.addEventListener("click", startHandle);
    stopBtn.addEventListener("click", handleStopGame);
}
    
init();


