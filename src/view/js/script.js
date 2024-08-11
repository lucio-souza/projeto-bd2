let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 15,
    minZoom: 14,
    maxZoom: 16
});

let marker = L.marker([-6.887698002563706, -38.56015173326553], {
    draggable: true,
}).addTo(map);

map.locate();

map.on('locationfound', e => {
    marker.setLatLng(e.latlng);
    map.setView(e.latlng);
});

map.on('click', l => {
    marker.setLatLng(l.latlng);
    map.setView(l.latlng);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function fetchData(){
    fetch("http://localhost:3000/pedidos")
    .then(response => response.json()) 
    .then(e=>displayData(e))
    .catch(e => console.log(e));
}

function displayData(data){
    const dados = document.getElementById('dados');
    dados.innerHTML = '';

    data.forEach(i => {
        const tr = document.createElement('tr');
        
        const id = document.createElement('td');
        const restaurante = document.createElement('td');
        const cliente = document.createElement('td');
        const cpf = document.createElement('td');
        const descricaoPedido=document.createElement('td');
        const latitude = document.createElement('td');
        const longitude = document.createElement('td');
        const apagar = document.createElement('td');
        const buttonApagar = document.createElement('button');
        const imgApagar = document.createElement('img');
        const atualizar=document.createElement('td')
        const buttonAtualizar = document.createElement('button');
        const imgAtualizar = document.createElement('img');

        imgApagar.classList.add('img');
        imgApagar.src = './imagens/54324.png';

        imgAtualizar.classList.add('img');
        imgAtualizar.src = './imagens/lapis.png';
        
        id.textContent = i.id;
        restaurante.textContent = i.restaurante;
        cliente.textContent = i.cliente;
        cpf.textContent = i.cpf;
        descricaoPedido.textContent=i.descricaoPedido
        latitude.textContent = i.localizacao.coordinates[1];
        longitude.textContent = i.localizacao.coordinates[0];
        
        buttonApagar.appendChild(imgApagar);
        buttonApagar.dataset.id = i.id;
        apagar.appendChild(buttonApagar);

        buttonAtualizar.appendChild(imgAtualizar);
        buttonAtualizar.dataset.id=i.id;
        atualizar.appendChild(buttonAtualizar);

        tr.appendChild(id);
        tr.appendChild(restaurante);
        tr.appendChild(cliente);
        tr.appendChild(cpf);
        tr.appendChild(descricaoPedido);
        tr.appendChild(latitude);
        tr.appendChild(longitude);
        tr.appendChild(apagar);
        tr.appendChild(atualizar);

        dados.appendChild(tr);
    })
}


const button = document.getElementById('button');

button.addEventListener('click',()=>{
    const restaurante=document.getElementById('restaurante').value;
    const cliente=document.getElementById('cliente').value;
    const cpf=document.getElementById('cpf').value;
    const descricaoPedido=document.getElementById('pedido').value;
    const coordinates=[marker.getLatLng().lng, marker.getLatLng().lat];

    const Pedido={
        restaurante,
        cliente,
        cpf,
        descricaoPedido,
        "localizacao":{
            "type":"Point",
            coordinates
        }
    }

    fetch("http://localhost:3000/pedidos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Pedido)
    })
    .then(data=> {
        const msg=document.getElementById('erro');
        if(data.status===400){
            msg.style.color='#ff0000';
            msg.textContent='Já existe um usuario com esse CPF';
        }
        msg.style.color='#32CD32';
        msg.textContent='Usuario criado com sucesso';
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
});

fetchData()