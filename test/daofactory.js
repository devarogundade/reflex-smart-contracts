const { assert } = require('chai');
const { utils, wallets } = require('@aeternity/aeproject');

const subdomainSource = utils.getContractContent('./contracts/RfDSubdomain.aes');
const tokenSource = utils.getContractContent('./contracts/RfDAOToken.aes');
const rewardSource = utils.getContractContent('./contracts/RfDAOReward.aes');
const daoSource = utils.getContractContent('./contracts/RfDAO.aes');
const factorySource = utils.getContractContent('./contracts/RfDAOFactory.aes');

describe('DAO contracts', () => {
    let aeSdk
    let sudomainContract, tokenContract, rewardContract, daoContract, factoryContract

    before(async () => {
        aeSdk = await utils.getSdk();
    });

    it('Deploying Contracts', async () => {
        sudomainContract = await aeSdk.getContractInstance({source: subdomainSource});
        tokenContract = await aeSdk.getContractInstance({source: tokenSource});
        rewardContract = await aeSdk.getContractInstance({source: rewardSource});
        daoContract = await aeSdk.getContractInstance({source: daoSource});
        factoryContract = await aeSdk.getContractInstance({source: factorySource});

        const subdomain = await sudomainContract.methods.init()
        const token = await tokenContract.methods.init('RfDAOToken', 18, 'RFD')
        const reward = await rewardContract.methods.init('RfDAOReward', 'RFDR', 10000000000)
        const dao = await dao.methods.init('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, false, false, 0, aeSdk.address, token.address, reward.address, subdomain.address)
        const factory = await factoryContract.methods.init(token.address, reward.address, dao.address, subdomain.address)

        assert.equal(factory.result.returnType, 'ok');
    });
})