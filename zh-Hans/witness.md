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
  "ref_block_num": 50465,
  "ref_block_prefix": 3987236035,
  "expiration": "2018-07-30T14:25:12",
  "operations": [[
      7,{
        "fee": {
          "amount": 1000000000,
          "asset_id": "1.3.0"
        },
        "account_to_upgrade": "1.2.108",
        "upgrade_to_lifetime_member": true,
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

##### 创建抵押 witness_create_collateral
signed_transaction `witness_create_collateral`(string account,  string amount, bool broadcast = false);

说明：若您不竞争抵押排名前21位的主力见证人，到这一步即可，不用继续修改签名公钥和服务器端操作。您的抵押数量不要超过目前排名第21位的见证人。另外，SEER见证人抵押是以笔计算的，建议分批抵押，日后解锁也是按笔解锁。例如，抵押400万SEER，您可以分为两次，每次抵押200万SEER，日后若需要解锁200万SEER则解锁其中一笔即可；若一次性抵押400万，日后想只解锁200万的话，则需要将400万一起解锁，解锁周期到以后，才能重新将其中200万抵押。解锁周期为15天。

参数：account为见证人id或者账户名或账户id, amount为抵押的SEER数量

作用：增加见证人抵押项

示例：`witness_create_collateral` abc 1000 true

返回信息示例：
```json
witness_create_collateral abc 1000 true
{
  "ref_block_num": 5437,
  "ref_block_prefix": 347254870,
  "expiration": "2018-07-31T07:30:45",
  "operations": [[
      16,{
        "fee": {
          "amount": 1000000,
          "asset_id": "1.3.0"
        },
        "witness": "1.5.8",
        "witness_account": "1.2.6",
        "amount": 100000000
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "206a08b57ff8bff588bb812dd07a0e90a6ebacf749d9600a241c4033bbd39cfaae1d55ae3fc6977f5486b4c09c51f31b9609801e7c0aa3d8e16b2c67ebb7ff6fc9"
  ]
}
```

##### 生成一对用于见证人签名的秘钥对 suggest_brain_key
brain_key_info  `suggest_brain_key`()const;

参数：无

作用：随机生成脑钱包密钥

示例：`suggest_brain_key`

返回信息示例：
```json
suggest_brain_key
{
  "brain_priv_key": "UNLISTY BLOOMER ANGSTER ENOLIC PILE EVEQUE STRE LECTERN CITRON GARETTA FRECKLE TELEDU JOKE AUNT OFT FOUNDRY",//脑钱包秘钥（助记词）
  "wif_priv_key": "5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci",//私钥
  "pub_key": "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"//公钥
}
```

##### 将生成的公钥设置为见证人签名 update_witness
signed_transaction `update_witness`(string witness_name,  string url, string block_signing_key, bool broadcast);

参数：witness_name为账户名或id，url为网址, block_signing_key为出块时签名的公钥

作用：更新见证人资料

示例：`update_witness` abc "http://www.google.com"  SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5 true

返回信息示例：
```json
update_witness abc "http://www.google.com" SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5 true
{
  "ref_block_num": 4870,
  "ref_block_prefix": 1016406219,
  "expiration": "2018-07-31T07:02:24",
  "operations": [[
      15,{
        "fee": {
          "amount": 10000000,
          "asset_id": "1.3.0"
        },
        "witness": "1.5.8",
        "witness_account": "1.2.6",
        "new_url": "http://www.google.com",
        "new_signing_key": "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f677827fc57e4628e8cf61a25d40eecee120860e6d5a7fee6e1c6998b52c792fc28a977bcdefd87de3af5c754912a7766f69d6a376ace6b6b8dba042b9e0a05a6"
  ]
}
```
##### 需要在以上两步中记录的信息

1、见证人id：此例中为"witness": "1.5.8"，1.5.8就是在下一步操作中需要填入见证人节点参数的；

2、见证人公私钥：即您suggest_brain_key生成，并在update_witness时填入的公钥和该公钥对应的私钥。本例中为 "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"和"5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci"。

#### 服务器端操作

##### 从ISP租用云服务器

根据目前SEER见证人节点的需求，您需要租用一台2核心4G内存的服务器，此配置的windows主机报价约为每月36美元，同样配置的linux（ubuntu）主机配置约为每月20美元。

推荐以下ISP的服务器：阿里云 aliyun.com / 腾讯云 cloud.tencent.com / GCP cloud.google.com / AWS aws.amazon.com / Azure azure.microsoft.com / Vultr.com / Linode.com / Digitalocean.com

##### windows服务器配置节点参数

使用windows服务器，则使用远程桌面连接软件输入ISP提供的服务器地址和账号密码，连接到服务器，如操作一台普通windows系统PC一样的操作远程服务器，比较简单。

成为SEER见证人，需要使用命令行钱包和见证人节点软件进行操作：https://github.com/seer-project/seer-core-package/releases

在上面的页面中，下载windows版本的软件，并解压缩到服务器端。

**方法1** 命令启动

1. 启动windows命令提示符: 打开`“我的电脑”`->在地址栏里输入`”cmd”`并确定；

2. 在弹出的cmd窗口切换到`witness_node.exe`所在目录,比如说`d:\seer\`，通过以下命令可以切换命令路径：`”d:\”`->`”cd seer”`；

3. 带参数启动`witness_node.exe`:

```cmd
witness_node.exe --enable-stale-production --p2p-endpoint=0.0.0.0:1888 --witness-id=\"1.5.8\" --rpc-endpoint=0.0.0.0:9090 --private-key=[\""SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"\",\""5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci\""]
```
其中`1.5.8`为您的见证人id，在命令行钱包操作中可以获取，`SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5`为您的见证人签名公钥，`5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci`为您的见证人签名公钥对应的私钥，皆需要替换为您自己的参数。`1888`为和其他节点连接的p2p监听端口，`9090`为rpc监听端口，用于钱包连接，此两个端口如果和其他程序发生冲突，或需要在同一服务器运行两个节点进行热切换可以修改，下同。

**方法2** 预设命令启动

1. 在`witness_node.exe`所在目录创建文件`”witness.cmd”`；

2. 用记事本打开`witness.cmd`，输入以下内容后保存退出:
```cmd
witness_node.exe --enable-stale-production --p2p-endpoint=0.0.0.0:1888 --witness-id=\"1.5.8\" --rpc-endpoint=0.0.0.0:9090 --private-key=[\""SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"\",\""5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci\""]
```
其中的见证人id、签名公钥、签名私钥参数需要您替换。

3. 每次点击`witness.cmd`即可运行。

##### linux服务器配置节点参数

连接linux服务器，建议使用termius终端软件。termius不仅有windows版本，也有Mac甚至IOS和安卓版本，让您随时随地都能管理服务器。

若使用termius终端软件，则进入该软件后点击`new host`，新建一个服务器连接，在设置页面的`address`填入ISP提供的服务器IP，port端口用默认的`22`，username填入ISP提供的账号，一般为`root`，密码也是由ISP提供。填入后点`save`保存。双击或点connect便可连接到您的远程服务器。

部分ISP可能会要求您首次登陆服务器时修改初始密码，照提示操作即可。

登陆服务器后，分别输入以下指令：

1、新建一个名叫seer的窗口；

```linux
screen -S seer
```

2、在root目录下新建一个名叫seer的目录，复制`v0.0.4版本`的程序包到此目录，并更名为`seer.tar.gz`。（此处注意，若有了更新的程序包版本，则到SEER软件发布页https://github.com/seer-project/seer-core-package/releases 复制最新的ubuntu版本程序包链接替换掉此下载链接。）

```linux
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz 
```

3、解压此软件包。

```linux
tar xzvf seer/seer.tar.gz
```

4、带参数启动witness_node，其中的见证人id、签名公钥、签名私钥参数需要您替换。

```linux
seer/witness_node --enable-stale-production --p2p-endpoint=0.0.0.0:1888 --witness-id=\"1.5.8\" --rpc-endpoint=0.0.0.0:9090 --private-key=[\""SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"\",\""5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci\""] 

```

5、观察节点运行正常后，ctrl+A d隐藏screen，断开服务器。之后要再打开运行有节点的Sreeen，则使用 `screen -R` ，或 `screen -r seer`。 


##### 节点正常启动的状态

节点正常启动后，会显示像下面一样的3秒一个的见证人出块。申请见证人的第二天，如果您的见证人节点成功出块，出块时会显示“......block_production_loo ] Generated block......”表示这个块由当前见证人节点确认打包生产。

![节点正常启动的状态](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/640.gif)

##### 首次创建见证人的生效时间

SEER区块链的维护周期为24小时，对主网参数的修改会在下一个周期开始时生效。每个周期开始于格林尼治时间0点整（GMT+0）,即新加坡时间早上8点。

您的见证人如果参数设置无误，将在第二天早上8点正常出块，如果设置有误，将在第二天早上8点开始丢块。

##### 解决造成见证人丢块的一些问题

丢块是见证人应该避免的问题，见证人丢块不光影响区块链效率，损失该块的奖励，还会被记录到区块链上对外显示，影响见证人的可靠程度。

如果见证人在一天内丢块数量丢块超过50%，将被系统判定停止出块2天，由候选见证人替补，丢块过多的见证人将损失2天的出块收益。

见证人节点启动成功后，请观察节点和其他节点之前的同步时间latency，一般不得超过±500ms，否则容易因延时过大而丢块频繁。

延时较大的原因主要有：设备或带宽配置过低、ntp服务未启用、服务器机房和其他节点延时较大。

**服务器机房和其他节点延时较大的解决方法**

更换服务器机房，分别选择新加坡、香港、日本等亚洲机房和美国、欧洲机房尝试延时。GCP、AWS、DO、Vultr等ISP大多都是按分钟付费，随时切换机房很方便。**但这可能不是您的主要问题。**

**ntp服务未启用的解决方法**

**windows下使用以下方法：**

在windows系统默认情况下，系统时间是每周（每7天）自动同步Internet时间一次，需要需要设置系统时间默认的同步频率。

在“开始”菜单→“运行”→“Regedit”进入注册表编辑器
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W32Time\TimeProviders\NtpClient ] 分支，并双击 SpecialPollInterval 键值，将对话框中的“基数栏”选择到“十进制”上，将此值的数值数据604800改为300并选为“十进制”。键值意思是时间同步的间隔，单位为秒原来7天就是7243600=604800秒，5分钟就是5*60=300秒

检查是否设置成功：在桌面右下角打开系统时间→更改时期和时间设置→Internet 时间，查看验证时间是否5分钟同步一次。

此外，您需要选择一个可靠的NTP服务器，推荐大家使用阿里云的NTP服务器：time.pool.aliyun.com

**linux（ubuntu）下输入以下命令，确认时间是否准确：**

```linux
timedatectl status
```

### 见证人节点更新

SEER的区块链底层目前还处于不断完善中，节点版本更换将会比较频繁。一些新的完善更新会为区块链的基础设施——节点软件添加新的功能。理事会将会就是否接受新的节点版本进行共识投票，如果提案投票通过，将要求所有见证人在指定时间前将节点软件切换到新的版本，未升级的主力见证人节点将会离线。这种设计也是SEER保护区块链不分叉的共识机制。

每次节点发布更新后，理事会将通过提案，要求所有见证人在指定时间前切换到新的节点软件版本，未切换的见证人节点将离线。未按要求更新的见证人节点将大量丢块，损失出块收益。

每次更新的最新版本节点软件请在以下页面下载：

https://github.com/seer-project/seer-core-package/releases

#### windows版本节点更新

1、首先下载当次更新的软件包到服务器；

2、解压缩zip文件；

3、ctrl+C 关闭现在的见证人节点；

使用压缩包内的witness_node.exe替换掉当前见证人节点目录下的witness_node.exe文件；

使用原参数重新启动见证人节点。正常出块后断开服务器。

若新的节点不能正常同步，重启后仍不能正常启动的话，则关闭节点，删除节点目录下的 `witness_node_data_dir`、`object_database` 和 `data` 文件夹，并重启节点，以重新同步启动节点。

#### linux版本节点更新

1、切换到见证人节点的screen，例如  `screen -R` ，或 `screen -r seer`，ctrl+C 关闭节点，然后用cd切换到根目录。

输入以下命令：

2、在`root`目录创建一个`temp`目录，用来存放临时文件。

```linux
mkdir temp
```

3、下载最新的节点软件包到temp目录（此例中最新的节点软件包是v0.04，若有了更新的程序包版本，则到SEER软件发布页https://github.com/seer-project/seer-core-package/releases 复制最新的ubuntu版本程序包链接替换掉此下载链接），重命名，并解压缩：

```linux
curl -Lo temp/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz 
tar xzvf temp/seer.tar.gz
```
4、复制temp目录中的witness_node到seer目录。（seer目录为您存放见证人节点的目录，若您放在其他目录请自行修改）

```linux
cp temp/witness_node seer/witness_node
```

5、使用原参数启动witness_node，例子中的见证人id、签名公钥、签名私钥参数需要您替换。

```linux
seer/witness_node --enable-stale-production --p2p-endpoint=0.0.0.0:1888 --witness-id=\"1.5.8\" --rpc-endpoint=0.0.0.0:9090 --private-key=[\""SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5"\",\""5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci\""] 

```

6、观察节点运行正常后，ctrl+A d 隐藏screen，断开服务器。

### 见证人领取收益

见证人收益分为抵押收益和出块收益，可以分别通过命令行钱包和网页钱包领取。

#### 领取抵押收益

领取抵押收益需要从命令行钱包操作，平时您可以在https://wallet.seer.best/explorer/witnesses 查看自己的抵押利息收入。

##### 启动命令行钱包

从cmd启动或点击之前创建的run.cmd。详情 <a router-link="./witness?id=命令行钱包操作">`点击这里`</a> 了解。

##### 输入领取见证人利息命令 witness_claim_collateral
signed_transaction `witness_claim_collateral`(string account, string 	collateral_id, bool broadcast = false);

参数：account为见证人id或者账户名或账户id, collateral_id抵押项的id

作用：领取抵押利息，<a router-link="./witness?id=将解锁的抵押领回余额 witness_claim_collateral">`领取已经撤销抵押余额`</a> 也是同一个命令。

示例：

领取抵押利息：`witness_claim_collateral`  abc  "" true

返回信息示例：
```json
witness_claim_collateral abc  "" true
{
  "ref_block_num": 22273,
  "ref_block_prefix": 2876124369,
  "expiration": "2018-07-31T07:39:51",
  "operations": [[
      18,{
        "fee": {
          "amount": 20000000,
          "asset_id": "1.3.0"
        },
        "witness": "1.5.8",
        "witness_account": "1.2.6"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2052bc058ea6f7125b5c2baf935ff9332cd43f352b4efe986fd8d776004164249110ac2e171698ca5a867ba1629c6b080f35027ec23c2b1ea66cddcf69cc492b1d"
  ]
}
```
#### 领取出块收益

领取出块收益，最简单的方法是，在网页钱包，点击`菜单`-`待解冻余额`，第一栏约几千SEER，解锁周期一年的是您的终身会员折扣待解锁余额。

第二栏，99.99%都可以即时领取的，便是您的出块收益，点击`立即领取`，即可将出块收益领取到余额。

### 取回见证人抵押

取回见证人抵押分为三步，首先需查询到您的抵押项id，然后要解除抵押，解锁周期为15天，解锁后，需要领取，已将解锁的抵押领取到余额。

#### 查询抵押项id list_witness_collaterals
vector<witness_collateral_object>  `list_witness_collaterals`(string account); 

参数：account为见证人id或者账户名或账户id

作用：列出指定见证人的抵押清单

示例：`list_witness_collaterals` abc

返回信息示例：
```json
list_witness_collaterals abc
[{
    "id": "2.16.0",
    "owner": "1.2.6",
    "amount": 100000000,
    "status": 0,
    "start": "2018-07-31T07:30:15",
    "expiration": "1970-01-01T00:00:00"
  }
]
```

#### 解锁见证人抵押 witness_cancel_collateral
signed_transaction  `witness_cancel_collateral`(string account, string 	collateral_id, bool broadcast = false);

参数：account为见证人id或者账户名或账户id, collateral_id抵押项的id

作用：撤销指定的抵押项

示例：`witness_cancel_collateral`  abc  2.16.0  true

返回信息示例：
```json
witness_cancel_collateral  abc  2.16.0  true
{
  "ref_block_num": 5517,
  "ref_block_prefix": 1913095735,
  "expiration": "2018-07-31T07:34:45",
  "operations": [[
      17,{
        "fee": {
          "amount": 10000000,
          "asset_id": "1.3.0"
        },
        "witness": "1.5.8",
        "witness_account": "1.2.6",
        "collateral_id": "2.16.0"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2014b4b48c9c789ae2f5da5e0bb11875e21232b00fd9b38642bd500cf7ade08aad789dffcc54a023ae41559f452fbc6f27b54481ba7c4b591ab03c9da8c8d7cc6d"
  ]
}
```
#### 将解锁的抵押领回余额 witness_claim_collateral
signed_transaction `witness_claim_collateral`(string account, string 	collateral_id, bool broadcast = false);

参数：account为见证人id或者账户名或账户id, collateral_id抵押项的id

作用：领取已经撤销抵押余额，<a router-link="./witness?id=输入领取见证人利息命令 witness_claim_collateral">`领取抵押利息`</a> 也是他同一个命令。

示例：

领取已撤销抵押余额：`witness_claim_collateral`  abc  "2.16.0" true

返回信息示例：
```json
witness_claim_collateral abc  "" true
{
  "ref_block_num": 22273,
  "ref_block_prefix": 2876124369,
  "expiration": "2018-07-31T07:39:51",
  "operations": [[
      18,{
        "fee": {
          "amount": 20000000,
          "asset_id": "1.3.0"
        },
        "witness": "1.5.8",
        "witness_account": "1.2.6"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2052bc058ea6f7125b5c2baf935ff9332cd43f352b4efe986fd8d776004164249110ac2e171698ca5a867ba1629c6b080f35027ec23c2b1ea66cddcf69cc492b1d"
  ]
}
```

