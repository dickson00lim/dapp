var Certs = artifacts.require("Certificates.sol");

module.exports = function(deployer) {
    deployer.deploy(Certs);
};