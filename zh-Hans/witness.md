---
nav: zh-Hans
search: zh-Hans
---

# 赛亚见证人操作指南

## SEER的见证人设计

### 共识方式

在区块生产者的产生方式上，SEER采取了`PoS`的共识方式，用户通过智能合约抵押自己持有的SEER竞选主力见证人（区块生产者）。

对于SEER区块链来说，制约区块链TPS效率的主要是见证人所使用的设备和带宽，高并发的需求源于SEER的DAPP生态发展，当高并发的需求出现时，通过抵押竞选成功的`21位`见证人有足够的资金实力和动力为区块链底层基础设施提供最精良的运行环境，以达到更高的TPS。

在SEER系统中共有`21位`主力见证人和`80位`候选见证人，按抵押SEER数量排名`前21位`的见证人轮流负责打包确认区块，并计量获得目前每个块`3SEER`的区块生产奖励。

如果主力见证人节点异常下线，候选见证人将按排名顺位进行替补，以保证网络正常运行。同时，按抵押的SEER数量排名`前101位`的用户还能额外获得可观的抵押收益。

SEER的见证人设计，可以保证区块链网络能甄选出最能够维护好区块链基础设施的生态参与者。

### 见证人奖励公式

在SEER的token分配方案中，将有`20亿`SEER用作DAPP和见证人激励。

#### 出块奖励

按照目前每个块`3SEER`的奖励，目前的块间隔为`3秒`。即每年的出块奖励支出约为 `360`（日）x `24`（时）x `60`（分）x `60`（秒）/ `3`（块间隔）x `3`（出块奖励）= `3110.4万` SEER，每个主力见证人在未缺块的情况下，每年可以获得`约150万`SEER的出块奖励。

#### 抵押收益

主力见证人需要提供满足条件的联网计算机运行SEER的节点软件来维护SEER生态，如果有主力见证人在当天出块率`低于50%`（可能由设备网络故障、未及时更新理事会通过的新版本节点软件等原因引起），则剥夺该见证人`2天`的出块资格（从而损失2天的见证人收入），由抵押排名紧随其后的候选见证人顺位补缺。

因此，我们强烈建议候选见证人提供满足条件的联网计算机并配置好见证人节点随时候选，以免错失获得出块收益的机会。

SEER排名`前101位`的主力见证人和候选见证人可以获得抵押收益，抵押收益与抵押的排名和抵押的SEER数量有关，抵押收益将`每24小时`结算和发放一次。

主力见证人`20年`的出块奖励 = `31104000` x `20` = `622080000` ，`15`(年)x `360`(日) 等于`5400天`。

每天可支出的总抵押分红=（`资金池` – `622080000`）/ `5400`，用户可获得的抵押收益 = 每天可支出的总抵押分红 x（该用户抵押数 / 所有用户总抵押数）。

初始资金池为 `20亿` ，见证人奖励和抵押分红都从这里面扣除，所以资金池会逐渐减少，用户支付给SEER系统的手续费会补充到资金池，保守估计，平均每位见证人每年至少会获得`上百万`SEER抵押收益，头部主力见证人抵押收益每年可达`数百万`SEER。

候选见证人只有抵押收益，主力见证人可享受见证人出块奖励 + 抵押收益，主力见证人数、主力见证人收益、可享受抵押分红的候选见证人数等参数可由理事会进行调节。

## 见证人操作

### 创建新的见证人

抵押排名前21位的见证人为主力见证人，必须准备永不停机的服务器，用来运行见证人节点，对链上交易打包确认出块。排名靠前，但未入选主力见证人的候选见证人也建议用服务器运行见证人节点，以备主力见证人下线后替补出块。排名较后的候选见证人建议熟悉见证人节点的操作方式，但从节约成本的角度可以不使用服务器运行节点。

为了您的资金安全，避免服务器被黑客控制造成资金损失（尽管这种可能性极低），建议您将命令行钱包仅在本地计算机上进行操作，在服务器端仅运行见证人节点。

常用的服务器类型有两种，一是windows服务器，二是linux服务器，推荐使用ubuntu的服务器，在相同配置下，成本更低。

#### 命令行钱包操作

##### 下载并配置命令行钱包

成为SEER见证人，需要使用命令行钱包和见证人节点软件进行操作：https://github.com/seer-project/seer-core-package/releases

在上面的页面中，下载windows版本的软件，并解压缩。

**方法1** 命令启动

1. 启动windows命令提示符: 打开`“我的电脑”`->在地址栏里输入`”cmd”`并确定；

2. 在弹出的cmd窗口切换到`cli_wallet.exe`所在目录,比如说`d:\seer\`，通过以下命令可以切换命令路径：`”d:\”`->`”cd seer”`；

3. 带参数启动`cli_wallet`:

```cmd
cli_wallet.exe -s ws://123.207.146.191:9999
```
其中`” ws://123.207.146.191:9999”`为官方提供的API链接，如果此API链接无法使用，您可以使用社区提供的其他API链接，或在本地启动见证人节点，并用`cli_wallet.exe -s ws://localhost:8080`启动钱包，其中8080为您启动见证人节点时使用的rpc端口号。下同。

**方法2** 预设命令启动

1. 在`cli_wallet.exe`所在目录创建文件`”run.cmd”`；

2. 用记事本打开`run.cmd`，输入以下内容后保存退出:
```cmd
cli_wallet.exe -s ws://123.207.146.191:9999
```
3. 点击`run.cmd`即可运行。

**Linux下启用cli_wallet**

当然，您需要下载linux版本的软件，并解压缩。

1. 进入`cli_wallet`所在目录

2. 带参数启动cli_wallet:
```cmd
./cli_wallet -s ws://123.207.146.191:9999
```

**启动成功后的回显**
以windows为例：
```cmd
D:\SEER>cli_wallet -s ws://123.207.146.191:9999
Logging RPC to file: logs\rpc\rpc.log
3209149ms th_a       main.cpp:131                  main                 ] key_to_wif( committee_private_key ): 5KCBDTcyDqzsqehcb52tW5nU6pXife6V2rX9Yf7c3saYSzbDZ5W
3209150ms th_a       main.cpp:135                  main                 ] nathan_pub_key: SEER6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
3209150ms th_a       main.cpp:136                  main                 ] key_to_wif( nathan_private_key ): 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
Starting a new wallet with chain ID cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91 (from egenesis)
3209157ms th_a       main.cpp:183                  main                 ] wdata.ws_server: ws://123.207.146.191:9999
3209198ms th_a       main.cpp:188                  main                 ] wdata.ws_user:  wdata.ws_password:
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

##### 设置钱包密码 set_password
void `set_password`(string password);

参数：password为钱包密码

作用：设置或`修改`当前钱包密码为password, 新钱包及解锁状态下可使用

示例：`set_password` 1234567890

返回信息示例：
```json
new >>> set_password 1234567890
set_password 1234567890
null
locked >>>
```

##### 解锁钱包 unlock
void `unlock`(string password);

参数：password为钱包密码

作用：当钱包为`locked`状态时，使用password解锁当前钱包

示例：`unlock` 1234567890

返回信息示例：
```json
locked >>> unlock 1234567890
unlock 1234567890
null
unlocked >>>
```

##### 导入资金私钥 import_key
bool `import_key`(string account_name_or_id, string wif_key);

参数：account_name_or_id 为用户名或id，wif_key为私钥

作用：通过私钥wif_key往钱包里导入账户account_name_or_id

<p class="tip">
  不知道怎么获得你的私钥？<a router-link="/zh-Hans/?id=查看您的私钥">`点击这里`</a> 了解。
</p>

示例：`import_key` abc  5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY

返回信息示例：

```json

unlocked >>> import_key abc 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY
import_key abc 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY
1983068ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
1983069ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-4b839f25.wallet
true

```

##### 升级账号为终身会员 upgrade_account
signed_transaction  `upgrade_account`(string name, bool broadcast); 

参数：name为账户名或者id

作用：升级账户等级到终身会员，可能您已经在网页钱包`菜单-会员页面`进行过账号升级，和这一步的作用一样，就不用再次升级了。

示例：upgrade_account abc true

返回信息示例：
```json
upgrade_account abc true
{
  "ref_block_num": 50465,//引用的区块号
  "ref_block_prefix": 3987236035,//引用的区块头
  "expiration": "2018-07-30T14:25:12",//交易过期时间
  "operations": [[
      7,{//升级
        "fee": {//手续费
          "amount": 1000000000,//金额
          "asset_id": "1.3.0"//资产
        },
        "account_to_upgrade": "1.2.108",//升级的账户
        "upgrade_to_lifetime_member": true,//是否升级到终生会员
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f1c79777d8ae33d26bff69716aa1303e37b780b893f05eb291f0bc4c8f0d7efb01fb196f8011d31233ba202f53e12d8b469f7b96438b9b00da6bb65d0c3270078"
  ]
}
```

##### 创建见证人 create_witness
signed_transaction `create_witness`(string owner_account,string url,bool broadcast); 

参数：owner_account为账户名或id,url为网址

作用：创建见证人

示例：`create_witness` abc  "http://www.baidu.com" true

返回信息示例：
```json
create_witness abc  "http://www.baidu.com" true
{
  "ref_block_num": 4730,
  "ref_block_prefix": 3148322765,
  "expiration": "2018-07-31T06:55:24",
  "operations": [[
      14,{
        "fee": {
          "amount": 2000000000,
          "asset_id": "1.3.0"
        },
        "witness_account": "1.2.6",
        "url": "http://www.baidu.com",
        "block_signing_key": "SEER5hYpWtqYyLgyWBzKy2SNcKSt3Qn4yDDrYiM8gqaHZwtgGnudGs"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f6c3c05635021a123b954a5b1ea63003999ad450f0107fb3f7ca64e7cefae939b0c6679ffd7c477587cb9d64c31e0664385d360321cd414af9b14952cadd98e4d"
  ]
}
```

##### 创建抵押



#### 服务器端操作

##### 从ISP租用云服务器


##### windows服务器配置参数

##### linux服务器配置参数

连接linux服务器，建议使用termius终端软件。

### 见证人节点更新

### 见证人领取收益

#### 领取抵押收益

#### 领取出块收益

### 取回见证人抵押

#### 解锁见证人抵押

#### 将解锁的抵押领回余额
