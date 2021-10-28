const { Router } = require('express');
const IpController = require('../controllers/IpController');

const router = Router();

router.get('/ips/index', IpController.index);
router.get('/ips/nonblacklisted', IpController.nonBlacklistedIpsIndex);
router.post('/ips/blacklist', IpController.blacklistIp);

module.exports = router;