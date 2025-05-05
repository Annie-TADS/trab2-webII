export default function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).render('erro', {
      erro: err.message || 'Ocorreu um erro inesperado.'
    });
  }