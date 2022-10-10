import {MiniMaple} from "./miniMaple";
document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('calculateButton').onclick = calculate;
}

function calculate(){
    const miniMaple = new MiniMaple();
    let res = '';

    const expr = document.getElementById('expression').value;
    const diffVar = document.getElementById('variable').value;
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    try {
        res = miniMaple.diff(expr,diffVar);
        resultDiv.innerHTML = res === '0' ? diffVar + ` // => ` : diffVar + ` // => ` + res;
    } catch(e) {
        res = e.message;
        resultDiv.innerHTML = ` // => ` + res;
    }
    
    const container = document.getElementById('container');
    container.replaceChild(resultDiv,document.getElementsByClassName('result')[0]);
}