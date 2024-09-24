import Pedido from "../model/Pedido.js";

class PedidoRepository {
  
  // Busca todos os pedidos
  async getAllPedidos() {
    try {
      const pedido = Pedido.find();
      return pedido;
    } catch (error) {
      console.error('Erro ao buscar todos os pedidos:', error);
      throw error;
    }
  }

  // Busca um pedido pelo cpf
  async getPedidoByCpfClient(cpf) {
    try {
      const pedido = await Pedido.findOne({ cpf }).exec();
      return pedido;
    } catch (error) {
      console.error('Erro ao buscar pedido do cliente por CPF', error);
      throw error;
    }
  }

  // Cria um novo pedido
  async createPedido (newPedidoData) {
    try {
    const pedido = await Pedido.create({
        restaurante: newPedidoData.restaurante,
        cliente: newPedidoData.cliente,
        cpf: newPedidoData.cpf,
        descricaoPedido: newPedidoData.descricaoPedido,
        localizacao: newPedidoData.localizacao
    });
      return {pedido,status:201};
    } catch (error) {
      return {status:500,error}
    }
  }

  // Atualiza um pedido pelo ID
  async updatePedido(newPedidoData,id ) {
    try {
      const updatedPedido = await Pedido.findByIdAndUpdate(id,{
        cliente:newPedidoData.cliente,
        restaurante:newPedidoData.restaurante,
        localizacao:newPedidoData.localizacao
      });
      if (!updatedPedido) {
        return {status:404,message:"usuario inexistente"};
      }
      return {message:"usuario atualizado com sucesso",status:200};
    } catch (error) {
      return {status:500,message:error}
    }
  };

  // Deleta um pedido pelo ID
  async deletePedido(id) {
    try {
      const deleted = await Pedido.findByIdAndDelete(id);
      if (!deleted) {
        return {status:404,message:"usuario inexistente"};
      }
      return {status:200,message:"usuario deletado com sucesso"}
    } catch (error) {
      return {status:500,message:error}
    }
  }

  async searchPedido(search) {
    try {
      const pedidos = await Pedido.find({
        $or: [
          { cliente: { $regex: search, $options: 'i' } },
          { restaurante: { $regex: search, $options: 'i' } }
        ]
      });
  
      if (pedidos.length === 0) {
        return { status: 404, message: 'Nenhum pedido encontrado.' };
      }
      
      return { status: 200, pedidos };
  
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Erro ao procurar pedidos.' };
    }
  }

}

export default new PedidoRepository;
