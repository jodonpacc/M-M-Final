window.addEventListener('load', () => {
    document.getElementById('search-button').addEventListener('click', searchHandler);
});

function searchHandler(event) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', searchResReceivedHandler);
    xhr.responseType = 'json';
    let name = document.getElementById('name');
    let charClass = document.getElementById('charClass');
    let race = document.getElementById('race');
    let background = document.getElementById('background');
    let queryString = `name=${encodeURIComponent(name.value)}&charClass=${encodeURIComponent(charClass.value)}&race=${encodeURIComponent(race.value)}&background=${encodeURIComponent(background.value)}`;
    xhr.open('GET', `/lookup?${queryString}`);
    xhr.send();
}

function searchResReceivedHandler() {
    let result = document.createElement('div');
    result.className = 'roster-table';
    if (this.status == 200 && this.response.length > 0) {
        let characters = this.response;
        let resultString = "<table><tr><th>Name</th><th>Portrait</th><th>Class</th><th>Race</th><th>Background</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>";
        for (index in characters) {
            let character = characters[index];
            let image;
            if (character.portrait !== '' && character.portrait !== 'placeholderstring') {
                let binary = '';
                for (let i = 0; i < character.portrait.data.data.length; i++) {
                    binary += String.fromCharCode(character.portrait.data.data[i]);
                }
                image = window.btoa(binary);
            }
            let imageString;
            if (image !== undefined) imageString = `data:${character.portrait.contentType};base64,${image}`;
            else imageString = './pictures/dice.png';
            resultString = resultString + `<tr><th>${character.name}</th><td class='portrait-cell'><img class='roster-portrait' alt='portrait' src='${imageString}'></td><td>${character.charClass}</td><td>${character.race}</td><td>${character.background}</td><td>${character.str}</td><td>${character.dex}</td><td>${character.con}</td><td>${character.intel}</td><td>${character.wis}</td><td>${character.cha}</td></tr>`;
        }
        result.innerHTML = resultString + '</table>';
    } else {
        result.innerHTML = 'Search failed :(';
    }
    document.getElementById('result-container').appendChild(result);
}