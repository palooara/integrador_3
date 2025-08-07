const router = require ('express').Router();

const{
    homeApp,
} = require('../controllers/controllerRouter')

router.get('/', homeApp);
module.exports = router;