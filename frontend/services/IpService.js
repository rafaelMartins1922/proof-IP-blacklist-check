import apiHost from "./apiHost";

export async function getAllIps() {
    const response = await fetch(apiHost + 'ips');
    return response.json();
}

export async function getNonBlacklistedIps() {
    const response = await fetch(apiHost + 'ips/nonBlacklisted');
    return response.json();
}

export async function putOnBlacklist(ipAddress) {
    const response = await fetch(apiHost + 'ips/putOnBlacklist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ipAddress })
    });

    return response.json();
}

export async function getBlacklist() {
    const response = await fetch('http://localhost:3333/ips/blacklist');

    return response.json();
}