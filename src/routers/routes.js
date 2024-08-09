import {Router} from 'express'
import PedidoController from '../controllers/PedidoController.js'


const router = Router()

router.get('/', async (req,res)=>{
    res.status(200).send('Bem Vindes!')
})

router.get('/pedidos', PedidoController.list)
router.post('/pedidos', PedidoController.add)
router.get('/pedidos/:id', PedidoController.find)
router.put('/pedidos/:id', PedidoController.update)
router.delete('/pedidos/:id', PedidoController.delete)

export default router