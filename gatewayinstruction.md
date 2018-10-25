# Guide to add SEER gateway access for exchanges and third-party platforms

The main purpose of this guide is to help exchanges and other third-party platforms (including but not limited to non-SEER DAPPs applications, centralized applications, etc.) to build a gateway to the SEER main network, list SEER main asset and tokens based on the SEER blockchain, such as PFC, OPC, etc.
Using SEER main network for charging and other operations, and the handling fee is far lower than SEER's ERC-20token and BTS asset, not affected by events such as Ethereum congestion.

## Fundamental

Gateway (deposits and withdrawals) used by most exchanges and third-party platforms is a centralized application service.
Taking the exchange as an example, the exchange provides a platform id for each user. Any user transfers money to the SEER main network account of the exchange and fills in the id in MEMO. When the SEER main network account of the exchange receives a transfer, the user can be credited according to the information filled in the MEMO, so that the user can be credited in the exchange platform.

## Ready to work

### Operating environment

The recommended server configuration is: 2vCPUs 4G memory 20G or more hard disk, Ubuntu 16.04.4 x64 system.

### Get account and private key

#### Register an account

Register the account through the SEER web wallet https://wallet.seer.best, where the account with the bar or number in the account is a common account name, which can be registered directly for free, such as `seer-exchange` or `seerdex01` and composed of pure English letters. The account name is the advanced user name, such as seerdex, needing to register through a lifetime membership account to pay the registration fee.

#### Get the private key

In the function of gateway, we need at least two pairs of keys of the account, namely the current active key and the current memo key. The active key allows you to transfer funds and other on-chain operation rights, and the memo key allows you to generate and read MEMO information associated with the account. <a href="https://docs.seerchain.org/#/zh-Hans/?id=%E6%9F%A5%E7%9C%8B%E6%82%A8%E7%9A%84%E7%A7%81%E9%92%A5">点击这里了解获取私钥的方法 </a> 。

## Configure a SEER full node

1、Create a new window called seer on the server；

```linux
screen -S seer
```

2、 Create a new directory named seer in the root directory, download the `v0.0.5 version` of the package to this directory, and rename it to `seer.tar.gz`. (Please go to the SEER Software Release page at https://github.com/seer-project/seer-core-package/releases and copy the latest ubuntu version package link to replace this download link.) 
