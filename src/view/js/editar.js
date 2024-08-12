import {lat,lng} from './map.js'

const btnEditar=document.getElementById('button-editar');
btnEditar.addEventListener('click',()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const restaurante=document.getElementById('restaurante').value;
    const cliente=document.getElementById('cliente').value;
    const descricaoPedido=document.getElementById('pedido').value;
    const coordinates=[lat,lng];

    const Pedido={
        restaurante,
        cliente,
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