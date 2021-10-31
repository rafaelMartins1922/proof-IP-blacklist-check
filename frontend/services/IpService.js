export async function getAllIps() {
    const response = await fetch('http://localhost:3333/ips');
    return response.json();
}

export async function getNonBlacklistedIps() {
    const response = await fetch('http://localhost:3333/ips/nonBlacklisted');
    return response.json();
}

export async function putOnBlacklist(userId, ipAddress) {
    const response = await fetch('http://localhost:3333/ips/putOnBlacklist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, ipAddress })
    });

    return response.json();
}

export async function getBlacklist() {
    const response = await fetch('http://localhost:3333/ips/blacklist');

    return response.json();
}