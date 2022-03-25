const fetchPokemon = () => {
    const name = document.querySelector('#name');
    let nameValue = name.value.toLowerCase();
    let number = document.querySelector('#numberValue');
    let nameSpan = document.querySelector('#nameValue');
    let type = document.querySelector('#typeValue');
    let hp = document.querySelector('.progress-bar.ps');
    let atk = document.querySelector('.progress-bar.atk');
    let def = document.querySelector('.progress-bar.def');
    let satk = document.querySelector('.progress-bar.sp-atk');
    let sdef = document.querySelector('.progress-bar.sp-def');
    let speed = document.querySelector('.progress-bar.speed');
    let height = document.querySelector('.height-value');
    let weight = document.querySelector('.weight-value');
    let list = document.querySelector('.abilities-list');
    const url = `https://pokeapi.co/api/v2/pokemon/${nameValue}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            image("./images/pokeball.png");
            number.textContent = "";
            nameSpan.textContent = "";
            type.textContent = "";
            hp.setAttribute('style', 'width: 0;');
            atk.setAttribute('style', 'width: 0;');
            def.setAttribute('style', 'width: 0;');
            satk.setAttribute('style', 'width: 0;');
            sdef.setAttribute('style', 'width: 0;');
            speed.setAttribute('style', 'width: 0;');
            height.textContent = "";
            weight.textContent = "";
            list.innerHTML = "";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        // console.log(data);
        let pokeImage = data.sprites.front_default;
        let id = data.id;
        let name = data.name;
        let type = data.types;
        let stats = data.stats;
        let height = data.height;
        let weight = data.weight;
        let moves = data.abilities;
        image(pokeImage);
        showId(id);
        showName(name);
        showType(type);
        showStats(stats);
        showHeight(height);
        showWeight(weight);
        showMoves(moves);
    })
}

const image = (imageUrl) => {
    const image = document.querySelector('#image');
    image.src = imageUrl;
}

const showId = (idUrl) => {
    const id = document.querySelector('#numberValue');
    id.innerText = idUrl;
}

const showName = (idName) => {
    const name = document.querySelector('#nameValue');
    name.innerText = idName;
}

const showType = (idType) => {
    let typesArray = Array.from(idType);
    let types = "";
    const type = document.querySelector('#typeValue');

    for (var i = 0; i < typesArray.length; i++) {
        types += typesArray[i].type.name + " ";
        type.innerText = types;
    }
}

const showStats = (stats) => {
    let hp = (stats[0].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.ps').setAttribute('aria-valuenow', hp);
    document.querySelector('.progress-bar.ps').setAttribute('style', `width: ${hp}%`);
    let atk = (stats[1].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.atk').setAttribute('aria-valuenow', atk);
    document.querySelector('.progress-bar.atk').setAttribute('style', `width: ${atk}%`);
    let def = (stats[2].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.def').setAttribute('aria-valuenow', def);
    document.querySelector('.progress-bar.def').setAttribute('style', `width: ${def}%`);
    let satk = (stats[3].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.sp-atk').setAttribute('aria-valuenow', satk);
    document.querySelector('.progress-bar.sp-atk').setAttribute('style', `width: ${satk}%`);
    let sdef = (stats[4].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.sp-def').setAttribute('aria-valuenow', sdef);
    document.querySelector('.progress-bar.sp-def').setAttribute('style', `width: ${sdef}%`);
    let speed = (stats[5].base_stat*100/255).toFixed(2);
    document.querySelector('.progress-bar.speed').setAttribute('aria-valuenow', speed);
    document.querySelector('.progress-bar.speed').setAttribute('style', `width: ${speed}%`);
}

const showHeight = (idHeight) => {
    const height = document.querySelector('.height-value');
    height.innerText = `${idHeight/10}m`;
}

const showWeight = (idWeight) => {
    const weight = document.querySelector('.weight-value');
    weight.innerText = `${(idWeight/10)}kg`;
}

const showMoves = (idMoves) => {
    let list = document.querySelector('.abilities-list');
    list.innerHTML = "";
    const movesArray = idMoves.map(move => {
        let ability = move.ability.name;
        let li = document.createElement('li');
        li.innerText = ability;
        list.appendChild(li);
    })
}