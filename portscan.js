const net = require('net');
const ip = require('ip');

async function checkExternalPort(address) {
    return new Promise(resolve => {
        const { host, protocol, port, pathname } = new URL(address);
        const socket = new net.Socket();
        socket.once('error', () => resolve(false));
        setTimeout(() => {
            resolve(false);
            socket.destroy();
        }, 1000);
        socket.connect(port || pathname, host || protocol.substr(0, protocol.length - 1), () => {
            resolve(true);
            socket.destroy();
        });
    });
}

function checkInternalPort(port) {
    return new Promise(resolve => {
        const server = net.createServer();
        server.once('error', (err) => {
            resolve(true);
            server.close();
        });
        server.listen(port, ip.address(), () => {
            resolve(false);
            server.close();
        });
    });
}

/**
 * Scan for open ports both locally and externally
 * @license MIT
 * @author Mark Auger <contact@swimauger.com>
 * 
 * @async
 * @param {string|number} entries - If a string is provided the url must be formatted as http://site.com or domain.ext:port.
 * @param {Function} callback - If a function is provided at the end of `entries`, this will be called whenever a port has been checked
 * 
 * @example // Check local port open and use callback as last argument to log outcome
 * portscan(5000, console.log);
 * 
 * @example // Check if an external addresses port is open and use async/await to get results
 * const result1 = await portscan("72.54.82.99:5000");
 * const result2 = await portscan("72.54.82.99:5000", "61.84.93.111:5000");
 * 
 * @example // Use a mix of checking local and external address ports
 * const results = await portscan("72.54.82.99:5000", "61.84.93.111:5000", 5000);
 * 
 * @returns {Promise<boolean[]|boolean>} Returns a Promise resolving in an array of booleans in order of the `entries` provided
 */
async function portscan(...entries) {
    const callback = entries[entries.length - 1] instanceof Function ? entries.pop() : null;

    const checks = await Promise.all(entries.map(async (port) => {
        let isUp = false;
        if (typeof port === "string") {
            isUp = await checkExternalPort(port);
        } else if (typeof port === "number") {
            isUp = await checkInternalPort(port);
        } else {
            throw `Invalid port option ${port}`;
        }

        if (callback) callback(isUp);
        return isUp;
    }));

    return checks.length === 1 ? checks[0] : checks;
}

module.exports = portscan;
