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

const btnEditar=document.getElementById('button-editar');
btnEditar.addEventListener('click',()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

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
    fetch(`http://localhost:3000/pedidos/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Pedido)
    })
    .then(data=> {
        const msg=document.getElementById('msg');
        if(data.status===200){
            msg.style.color='#057708';
            msg.textContent='Pedido editado com sucesso';
        }else{
            msg.style.color='#ff0000';
            msg.textContent='Erro ao editar Pedido';
        }
    })
})