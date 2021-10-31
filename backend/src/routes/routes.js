const { Router } = require('express');
const IpController = require('../controllers/IpController');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/ips', IpController.index);
router.get('/ips/nonBlacklisted', IpController.nonBlacklistedIpsIndex);
router.post('/ips/putOnBlackList', IpController.putOnBlackList);
router.get('/ips/blacklist', IpController.blacklist);

router.post('/users', UserController.create);
router.get('/users', UserController.index);
router.get('/user/:id', UserController.show);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;