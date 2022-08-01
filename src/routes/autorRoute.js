
import controller from '../controllers/autenticacaoController'
import tokenValidate from '../utils/tokenValidate'

export default (app) => {
	// app.post('/autor/deletar', controller.deletar)
	app.post('/autenticacao',tokenValidate.validate, controller.getAll)
	// app.get('/autor/:id', controller.getById)
	app.post('/autenticacao/register', controller.create)
	app.post('/autenticacao/login', controller.login)
}