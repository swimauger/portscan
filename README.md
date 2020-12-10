# PortScan Node.js Package

![](https://img.shields.io/npm/dw/@swimauger/portscan?color=ac4b1c&style=for-the-badge)
![](https://img.shields.io/github/license/swimauger/portscan?color=fca652&style=for-the-badge)
![](https://img.shields.io/npm/v/@swimauger/portscan?color=ffd57e&style=for-the-badge)
![](https://img.shields.io/github/repo-size/swimauger/portscan?color=ffefa0&label=Size&style=for-the-badge)

 Node.js package built to scan for open ports on both local and external networks.

## Installation
**Install portscan Library**
```bash
    npm install @swimauger/portscan
```

#

## Examples
**Check local port open and use callback as last argument to log outcome**
```javascript
 portscan(5000, console.log);
```

**Check if an external addresses port is open and use async/await to get results**
```javascript
const result1 = await portscan("72.54.82.99:5000");
const result2 = await portscan("72.54.82.99:5000", "61.84.93.111:5000");
```

**Use a mix of checking local and external address ports**
```javascript
const results = await portscan("72.54.82.99:5000", "61.84.93.111:5000", 5000);
```
