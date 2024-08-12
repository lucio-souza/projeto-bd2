import sequelize from "../database/Connection.js";
import Pedido from "../model/Pedido.js";


class PedidoRepository {
  
  // Busca todos os pedidos
  async getAllPedidos() {
    try {
      const pedido = Pedido.findAll();
      return pedido;
    } catch (error) {
      console.error('Erro ao buscar todos os pedidos:', error);
      throw error;
    }
  }

  // Busca um pedido pelo cpf
  async getPedidoByCpfClient(cpf) {
    try {
      const pedido = await Pedido.findOne({ where: { cpf } });
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
      return pedido;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }

  // Atualiza um pedido pelo ID
  async updatePedido(updatedData,id ) {
    try {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) {
        throw new Error('Pedido não encontrado');
      }
      pedido.restaurante = updatedData.restaurante;
      pedido.cliente = updatedData.cliente;
      pedido.descricaoPedido = updatedData.descricaoPedido;
      pedido.localizacao = updatedData.localizacao;
      const updatedPedido = await pedido.save();
      return updatedPedido;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    }
  };

  // Deleta um pedido pelo ID
  async deletePedido(id) {
    try {
      const deleted = await Pedido.destroy({
        where: { id }
      });
      if (deleted) {
        return 'Pedido deletado com sucesso';
      }
      throw new Error('Pedido não encontrado');
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      throw error;
    }
  }

}

// Inicializando o banco de dados e criando a tabela de pedidos
(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();


export default new PedidoRepository;
