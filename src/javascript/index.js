// SELECTORS
const body = document.querySelector('body');
const mainContent = document.querySelector('main');
const algoBox = document.querySelector('.algo-box');
const logo = document.querySelector('.terminal-logo');
const article = document.querySelector('article');
const articleCard = document.querySelector('.card-inst');
const articleCardHeader = document.querySelector('.card-inst > .card-header');
const articleSVG = document.querySelector('.project-svg');
const articleLinks = document.querySelectorAll('.link-p')
const inputMain = document.querySelector('#input-string');
const inputSecondary = document.querySelector('#input-string2');
const resultMain = document.querySelector('.result-main');
const resultSecondary = document.querySelector('.result-secondary');
const resultMatch = document.querySelector('.result-match');
const algo = document.querySelector('.algo-choice');
const comparison = document.querySelector('.comparison-choice');
const theme = document.querySelector('.toggle-theme-logo');

// HASH
function updateResult(data, res, algorithm) {
    if (!data) {
        res.innerHTML = '';
        return
    }
    fetch('https://api-hash-machine.cmalaga.com/hash', {
        method: "POST",
        body: JSON.stringify({
            item: data,
            algorithm: algorithm
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(r => {
        if (res.classList.contains('result-main'))
            res.innerHTML = `Result A: <span class="hash-value">${r.result}</span>`;
        else if (res.classList.contains('result-secondary'))
            res.innerHTML = `Result B: <span class="hash-value">${r.result}</span>`;
    })
}

inputMain.addEventListener('keyup', (event) => {
    updateResult(event.target.value, resultMain, algo.value);
    if (comparison.value === 'true')
        resultMatch.innerHTML = inputMain.value === inputSecondary.value ? `<span class='match'>100% Match</span>` : `<span class='match'>Not the same</span>`;
});

inputSecondary.addEventListener('keyup', (event) => {
    updateResult(event.target.value, resultSecondary, algo.value);
    console.log(inputSecondary.value)
    resultMatch.innerHTML = inputMain.value === inputSecondary.value ? `<span class='match'>100% Match</span>` : `<span class='match'>Not the same</span>`;
})

comparison.addEventListener('change', (event) => {
    if (event.target.value === "true") {
        inputSecondary.classList.remove('disappear');
        inputSecondary.value = '';
        resultSecondary.innerHTML = '';
        resultMatch.innerHTML = '';
        resultSecondary.classList.remove('disappear');
        resultMatch.classList.remove('disappear')
    } else {
        resultMatch.classList.add('disappear')
        inputSecondary.classList.add('disappear');
        resultSecondary.classList.add('disappear');
    }
})

theme.addEventListener('click', (event) => {
    if (event.target.src.includes('toggle-off-solid.svg')) {
        event.target.src = './../../assets/toggle-on-solid.svg';
        event.target.classList.add('light');
        logo.classList.add('light-term')
        articleSVG.classList.add('light-term')
        article.classList.add('dark-theme');
        inputMain.classList.add('dark-theme');
        inputSecondary.classList.add('dark-theme');
        resultMain.classList.add('dark-theme');
        resultSecondary.classList.add('dark-theme');
        resultMatch.classList.add('dark-theme');
        algo.classList.add('dark-theme');
        comparison.classList.add('dark-theme');
        body.classList.add('dark-theme');
        algoBox.classList.add('dark-theme');
        articleCard.classList.add('dark-theme');
        articleCardHeader.classList.add('dark-theme');
        articleLinks.forEach((e) => e.classList.add('dark-theme'));
        return
    } 
    event.target.src = './../../assets/toggle-off-solid.svg';
    event.target.classList.remove('light');
    logo.classList.remove('light-term')
    articleSVG.classList.remove('light-term')
    article.classList.remove('dark-theme');
    inputMain.classList.remove('dark-theme');
    inputSecondary.classList.remove('dark-theme');
    resultMain.classList.remove('dark-theme');
    resultSecondary.classList.remove('dark-theme');
    resultMatch.classList.remove('dark-theme');
    algo.classList.remove('dark-theme');
    comparison.classList.remove('dark-theme');
    body.classList.remove('dark-theme');
    algoBox.classList.remove('dark-theme');
    articleCard.classList.remove('dark-theme');
    articleCardHeader.classList.remove('dark-theme');
    articleLinks.forEach((e) => e.classList.remove('dark-theme'));
    return
});

// MOBILE
const configMobile = function() {
    if (window.innerWidth === 1162) { 
        article.classList.add('mobile-font')
    } else if (window.innerWidth <= 1020) {
        article?.classList.add('disappear');
        mainContent.classList.add('full-view-port')
    }
}
window.addEventListener("resize", (event) => {
    configMobile()
});

configMobile()