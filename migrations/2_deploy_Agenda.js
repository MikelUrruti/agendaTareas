const Agenda = artifacts.require("Agenda");

module.exports = function (deployer) {
  deployer.deploy(Agenda);
};
