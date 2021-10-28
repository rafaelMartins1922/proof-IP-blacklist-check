const BlacklistedIp = require('../models/BlacklistedIp');
const DansIp = require('../models/DansIp');
const axios = require('axios');
const fs = require('fs');
var util = require('util');
const { response } = require('express');
const DansApiCalls = require('../models/DansApiCalls');
 
const index = async(req,res) => {
    try {
        const allIps = await getIps();
        return res.status(200).json(allIps);
    }catch(err){
        return res.status(500).json({err});
    }
};

const getIps = async (includeBlacklisted = 1) => {
    const onionooIps = await getOnionooIps();
    const dansIps = await getDansIps();
    let allIps = concatUnique(onionooIps, dansIps);

    if(!includeBlacklisted) {
        let blacklist = await BlacklistedIp.findAll();
        blacklist = blacklist.map((ip) => ip.address);
        allIps = allIps.filter((address) => !blacklist.includes(address));
    }

    return allIps.filter((ip) => ip);
}

const concatUnique = (array0,array1) => {
    return array0.concat(array1.filter((element) => !array0.includes(element)));
}

const getDansIpsFromApi = async (ipAddressesFromDatabase) => {
    const response = await axios({
        url: 'https://www.dan.me.uk/torlist/',
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
    const response = await axios({
        url: 'https://onionoo.torproject.org/summary?limit=5000',
    });

    const ipAddresses = response.data.relays.map((relay) => relay.a[0]);

    return ipAddresses;
}

const nonBlacklistedIpsIndex = async(req,res) => {
        const ips = await getIps(0);
        return res.status(200).json(ips);
};
 
const blacklistIp = async (req,res) => {
    try {
        const {userId, ipAddress} = req.body;
        const dansIp = await DansIp.findOne({where: {address: ipAddress}});
        const dansIpId = dansIp?.id;
        const blacklistedIp = await BlacklistedIp.create({
            address: ipAddress,
            UserId: userId,
            DansIpId: dansIpId
        })
        return res.status(200).json(blacklistedIp);
    } catch(e) {
        return res.status(500).json(e);
    }
}

module.exports = {
    index,
    nonBlacklistedIpsIndex,
    blacklistIp
};