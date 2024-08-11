import PedidoRepository from '../repositories/PedidoRepository.js';


class PedidoController {

    async list (req, res) {
        const data = await PedidoRepository.getAllPedidos()
        res.json(data)
    }

    async find (req,res){
        const id = req.params.id
        const data = await PedidoRepository.getPedidoByCpfClient(id)
        res.status(200).json(data)
    }

    async add (req, res) {
        const newPedido = req.body;
        const data = await PedidoRepository.createPedido(newPedido)
        res.json(data)
    }

    async update (req,res) {
        const id = req.params.id;
        const pedido = req.body;
        const data = await PedidoRepository.updatePedido(pedido, id);
        res.json(data)
    }

    async delete (req,res) {
        const id = req.params.id;
        const data = await PedidoRepository.deletePedido(id);
        res.json(data)
    }

}

export default new PedidoController