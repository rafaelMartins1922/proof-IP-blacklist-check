const BlacklistedIp = require('../models/BlacklistedIp');
const DansIp = require('../models/DansIp');
const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios');
const fs = require('fs');
var util = require('util');
const { response } = require('express');
const DansApiCalls = require('../models/DansApiCalls');
 
const index = async(req,res) => {
    try {
        const onionooIps = await getOnionooIps();
        const dansIps = await getDansIps();
        const allIps = concatUnique(onionooIps, dansIps);
        return res.status(200).json(allIps);
    }catch(err){
        return res.status(500).json({err});
    }
};

const concatUnique = (array0,array1) => {
    return array0.concat(array1.filter((element) => !array0.includes(element)));
}

const getDansIpsFromApi = async (ipAddressesFromDatabase) => {
    const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

    const response = await axios({
        url: 'https://www.dan.me.uk/torlist/',
        httpsAgent: agent,
    });

    let ipAddressesFromApi = response.data.split('\n');

    let ipAddressesToBeSaved = ipAddressesFromApi.filter((address) => !ipAddressesFromDatabase.includes(address));
    let ipAddressesToBeDeleted = ipAddressesFromDatabase.filter((address) => !ipAddressesFromApi.includes(address));

    ipAddressesToBeSaved = ipAddressesToBeSaved.map((address) => ({
        address: address,
        blacklisted: false,
        source: 'dan',
    }));
    
    await DansApiCalls.create({numberOfIps: ipAddressesFromApi.length});
    await DansIp.bulkCreate(ipAddressesToBeSaved);
    await DansIp.destroy({where:{address: ipAddressesToBeDeleted}});
    return ipAddressesFromApi;
}

const getDansIps = async () => {
    let thirty_min_in_ms = 30*60*1000;
    const now = new Date();
    const lastApiCallDateTime = await DansApiCalls.max('createdAt');
    const dansIps = await DansIp.findAll();

    if(dansIps.length == 0 || now - lastApiCallDateTime  > thirty_min_in_ms) {
        console.log('Getting ips from API');
        return getDansIpsFromApi(dansIps.map((ip) => ip.address));
    }else{
        console.log('Returning ips from database');
        return dansIps.map((ip) => ip.address);
    }
}
 
const getOnionooIps = async () => {
    const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');
    const response = await axios({
        url: 'https://onionoo.torproject.org/summary?limit=5000',
        httpsAgent: agent,
    });

    const ipAddresses = response.data.relays.map((relay) => relay.a[0]);

    return ipAddresses;
}

const nonBlacklistedIpsIndex = async(req,res) => {
        const ips = index(req,res);
        const blacklistedIps = await BlacklistedIp.findAll();
        const blackListedIpAddresses = blacklistedIps.map((ip) => ip.address);
        const nonBlackListedIpAddresses = ips.filter((address) => !blackListedIpAddresses.includes(address))
        return res.status(200).json(nonBlackListedIpAddresses);
};
 
const blacklistIp = async (req,res) => {
    const {userId, ipAddress} = req.body;
    const dansIp = await DansIp.findOne({where: {address: ipAddress}});
    const dansIpId = dansIp.id;
    const blacklistedIP = await blacklistIp.create({
        address: ipAdress,
        UserId: userId,
        DansIpId: dansIpId
    })
    return res.status(200).json(blacklistedIp);
}

module.exports = {
    index,
    nonBlacklistedIpsIndex,
    blacklistIp
};