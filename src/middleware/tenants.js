const identifyTenant = (req, res, next) => {
    const tenantId = req.subdomains[0];
    req.tenantId = tenantId;
    next();
};

module.exports = identifyTenant;
