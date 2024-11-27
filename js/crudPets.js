const botaoSalvar = document.getElementById('salvar_bot');

const postPets = async function(petJSON) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/novo/pet';

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(petJSON)
    });

    if (response.status == 201) {
        alert('Registro salvo com sucesso');
        getPets();
        
        nome.value = ''
        cor.value = ''
        raca.value = ''
        image.value = ''

    } else {
        alert('Não foi possível salvar o registro, verifique os dados enviados');
    }
};

const putPets = async function(petJSON) {
    let id = sessionStorage.getItem('idPet');
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/atualizar/pet/${id}`;

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(petJSON)
    });

    if (response.status == 200) {
        alert('Registro atualizado com sucesso');
        getPets();

        nome.value = ''
        cor.value = ''
        raca.value = ''
        image.value = ''
        botaoSalvar.innerText = 'Salvar'

    } else {
        alert('Não foi possível atualizar o registro, verifique os dados enviados');
    }
};

const deletePet = async function(id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/excluir/pet/${id}`;

    let response = await fetch(url, {
        method: 'DELETE'
    });

    if (response.status == 200) {
        alert('Registro excluído com sucesso!');
        getPets();
    } else {
        alert('Não foi possível realizar a exclusão do registro.');
    }
};

const getPets = async function() {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/listar/pets';
    let response = await fetch(url);
    let dados = await response.json();

    let divListDados = document.getElementById('listDados');
    divListDados.innerHTML = '';  // Limpar a lista antes de atualizar

    dados.pets.forEach(function(pet) {
        let divDados = document.createElement('div');
        let divNome = document.createElement('div');
        let divCor = document.createElement('div');
        let divRaca = document.createElement('div');
        let divOpcoes = document.createElement('div');
        let spanEditar = document.createElement('span');
        let imgEditar = document.createElement('img');
        let spanExcluir = document.createElement('span');
        let imgExcluir = document.createElement('img');

        divDados.setAttribute('id', 'dados');
        divDados.setAttribute('class', 'linha dados');
        imgEditar.setAttribute('src', 'img/icons-editar.png');
        imgEditar.setAttribute('idPet', pet.id);
        imgExcluir.setAttribute('src', 'img/icons-lixeira.png');
        imgExcluir.setAttribute('idPet', pet.id);

        divNome.innerText = pet.nome;
        divCor.innerText = pet.cor;
        divRaca.innerText = pet.raca;

        divListDados.appendChild(divDados);
        divDados.appendChild(divNome);
        divDados.appendChild(divCor);
        divDados.appendChild(divRaca);
        divDados.appendChild(divOpcoes);
        divOpcoes.appendChild(spanEditar);
        spanEditar.appendChild(imgEditar);
        divOpcoes.appendChild(spanExcluir);
        spanExcluir.appendChild(imgExcluir);

        imgExcluir.addEventListener('click', function() {
            let resposta = confirm('Deseja realmente excluir esse item?');
            if (resposta) {
                let id = imgExcluir.getAttribute('idPet');
                deletePet(id);
            }
        });

        imgEditar.addEventListener('click', function() {
            let id = imgEditar.getAttribute('idPet');
            getBuscarPet(id);

        });
    });
};

const getBuscarPet = async function(idPet) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto3/fecaf/buscar/pet/${idPet}`;
    let response = await fetch(url);
    let dados = await response.json();

    if (response.status == 200) {
        document.getElementById('nome').value = dados.pet[0].nome;
        document.getElementById('cor').value = dados.pet[0].cor;
        document.getElementById('image').value = dados.pet[0].image;
        document.getElementById('raca').value = dados.pet[0].raca;
        document.getElementById('salvar_bot').innerText = 'Atualizar';
        sessionStorage.setItem('idPet', idPet);
    } else {
        alert('Não foi possível localizar o registro.');
    }
};

botaoSalvar.addEventListener('click', function() {

    let nome = document.getElementById('nome').value;
    let cor = document.getElementById('cor').value;
    let raca = document.getElementById('raca').value;
    let image = document.getElementById('image').value;

    let petJSON = {
        nome: nome,
        cor: cor,
        raca: raca,
        image: image
    };


    if (nome && cor && raca && image) {
        if (botaoSalvar.innerText === 'Salvar') {
            postPets(petJSON);


        } else if (botaoSalvar.innerText === 'Atualizar') {
            putPets(petJSON);
        }
    } else {
        alert('Todos os campos são obrigatórios.');
    }

    
});

window.addEventListener('load', function() {
    getPets();
});
