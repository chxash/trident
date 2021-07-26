import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) {
  console.log("Running ConstantProductPoolWithTWAPFactory deploy script");
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const { address } = await deploy("ConstantProductPoolWithTWAPFactory", {
    from: deployer,
    deterministicDeployment: false,
  });

  const masterDeployer = await ethers.getContract("MasterDeployer");

  if (!(await masterDeployer.whitelistedFactories(address))) {
    console.log(
      "Add ConstantProductPoolWithTWAPFactory to MasterDeployer whitelist"
    );
    await masterDeployer.addToWhitelist(address);
  }
};

export default deployFunction;

deployFunction.dependencies = ["MasterDeployer"];

deployFunction.tags = ["ConstantProductPoolWithTWAPFactory"];
