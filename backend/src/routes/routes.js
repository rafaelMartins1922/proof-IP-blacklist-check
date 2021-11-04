const { Router } = require('express');
const IpController = require('../controllers/IpController');

const router = Router();

router.get('/ips', IpController.index);
router.get('/ips/nonBlacklisted', IpController.nonBlacklistedIpsIndex);
router.post('/ips/putOnBlackList', IpController.putOnBlackList);
router.get('/ips/blacklist', IpController.blacklist);

module.exports = router;