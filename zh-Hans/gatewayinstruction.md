---
nav: zh-Hans
search: zh-Hans
---

# SEER交易所及第三方平台充提网关接入指南

本指南主要目的是帮助交易所和其它第三方平台（包括但不限于非SEER DAPPs应用、中心化应用等）搭建充提网关接入SEER主网，上线SEER主资产及基于SEER区块链发行的token，例如PFC、OPC等。

使用SEER主网进行充提等操作，手续费远远低于SEER的ERC-20token和BTS资产，且不受以太坊拥堵等事件的影响。

## 基本原理

大部分交易所及第三方平台使用的网关（充值提现）是一个中心化的应用服务。

以交易所充提为例，交易所为每位用户提供有一个平台id，任何用户向交易所的SEER主网账户转账，并在MEMO中填写该id，当交易所的SEER主网账户收到一笔转账时，可以根据MEMO中填写的信息确定是来自哪位用户的充值，从而在交易所平台内为用户上账。

举例：

1、小明从自己的SEER主网账户`xiaoming`充值`1000SEER`到交易所账户`seerdex`，MEMO中填写`10010`，交易所检测到主网账户`seerdex`收到一笔`1000SEER`的转账，MEMO为`10010`，则在小明的交易所账户`10010`中上账`1000SEER`；

2、小明请朋友小花帮自己充值，小花从自己的SEER主网账户`xiaohua`充值`1000SEER`到交易所账户`seerdex`，MEMO中填写`10010`，交易所检测到主网账户`seerdex`收到一笔`1000SEER`的转账，MEMO为`10010`，则在小明的交易所账户`10010`中上账`1000SEER`；

3、小明将自己玩大富翁游戏中赢得的SEER充值交易所，小明在大富翁游戏的提现页面中填写提现`1000SEER`到交易所账户`seerdex`，并填写MEMO`10010`，大富翁游戏在平台内扣除小明账户余额`1000SEER`，同时通过大富翁的SEER主网账户`dafuweng`向交易所账户`seerdex`转账`1000SEER`，MEMO为`10010`，交易所检测到主网账户`seerdex`收到一笔`1000SEER`的转账，MEMO为`10010`，则在小明的交易所账户`10010`中上账`1000SEER`。

`例子3`中，我们举例了用户从第三方平台提现到交易所的流程，从交易所提现到另一家交易所也是如此，这就需要交易所及第三方平台在设计提现功能时提供`MEMO功能`。为了资金安全，您可以部署两个或多个账号，其中一个账号负责用户充值，其它账号负责提现。

## 准备工作

### 运行环境

推荐服务器配置为：2vCPUs 4G内存 20G以上硬盘，Ubuntu 16.04.4 x64 系统。

### 获得账号及私钥

#### 注册账号

您可以通过SEER网页钱包 https://wallet.seer.best 注册账号，其中账号中带有横杠或数字的账号为普通账号名，可以直接<a href="https://docs.seerchain.org/#/zh-Hans/?id=%E6%B3%A8%E5%86%8C">免费注册（点击了解方法） </a> ，例如`seer-exchange`或`seerdex01` ，而由纯英文字母构成的账号名为高级用户名，例如`seerdex`，则需通过一个终身会员账户缴纳注册手续费来注册。

#### 获得私钥

在充提网关等功能中，我们需要账户的至少两对密钥，即当前资金密钥（Active key）和当前备注密钥（memo key），资金密钥让您拥有资金的转账及其他链上操作权限，备注密钥让您能生成和读取和该账号相关的MEMO信息。<a href="https://docs.seerchain.org/#/zh-Hans/?id=%E6%9F%A5%E7%9C%8B%E6%82%A8%E7%9A%84%E7%A7%81%E9%92%A5">点击这里了解获取私钥的方法 </a> 。

## 配置一个SEER全节点

1、在服务器新建一个名叫seer的窗口；

```linux
screen -S seer
```

2、在root目录下新建一个名叫seer的目录，下载`v0.0.7版本`的程序包到此目录，并更名为`seer.tar.gz`。（请到SEER软件发布页https://github.com/seer-project/seer-core-package/releases 复制最新的ubuntu版本程序包链接替换掉此下载链接。）

```linux
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.07/witness_node-ubuntu-0.0.7.tar.gz
```

3、进入seer目录，解压此软件包。

```linux
cd seer
tar xzvf seer.tar.gz
```

4、带websocket参数启动witness_node：

```linux
witness_node --rpc-endpoint=127.0.0.1:9090 --partial-operations=true --track-account=\"1.2.9981\" --track-account=\"1.2.9982\" --max-ops-per-account=1000 
```
其中的`--rpc-endpoint`参数为节点监听的websocket RPC IP地址和端口号，需要您替换，此处`127.0.0.1`为本机，`9090`是为节点指定的WS端口。

对于处理充提业务的节点，我们并不需要保存全部数据，仅需要保存和交易所账户相关的账户数据以节省内存开支，因此我们需要设置`partial-operations`参数和`--track-account`参数，此处`partial-operations=true `表示只需要部分的数据，`\"1.2.9981\"`和`\"1.2.9982\"`表示要追踪的一个或多个账户id的数字object_ID，可以在浏览器-账户 https://wallet.seer.best/explorer/accounts 中输入账号名查询到 ，需要您替换。

`--max-ops-per-account`参数设定内存中保留账户的多少条操作记录，此处`1000`表示保留追踪账户的`1000`条操作记录，需要您按需求填写。

5、观察节点运行正常后，ctrl+A d隐藏screen，断开服务器。之后要再打开运行有节点的Sreeen，则使用 `screen -R` ，或 `screen -r seer`。 

节点正常启动后，会显示像下面一样的3秒一个的出块信息。

![节点正常启动的状态](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/640.gif)

如果要关闭节点，则使用`control` + `C` 。

## 配置一个SEER命令行钱包

0、提醒：通常情况下，在部署全节点时下载的最新程序包内会有`witness_node`和`cli_wallet`两个文件，因此此步骤可以省略，但有可能更新时仅升级了`witness_node`，所以最新的程序包内有可能没有`cli_wallet`（例`如v0.0.5`的程序包就名为`witness_node-ubuntu-0.0.5.tar.gz`，仅有`witness_node`），因此需要在上一个完整的程序包内获得`cli_wallet`用于接下来的步骤。
以下命令的作用是：建立一个名为`temp`的临时目录下载最新的带有有`cli_wallet`的程序包，并解压缩，然后复制`cli_wallet`到seer目录。（下载链接替换为https://github.com/seer-project/seer-core-package/releases 最新的带有有`cli_wallet`的程序包）
```linux
cd~
mkdir temp
curl -Lo temp/temp.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.07/cli_wallet-ubuntu.tar.gz
cd temp
tar xzvf temp.tar.gz
cp cli_wallet ../seer/cli_wallet
```

1、在服务器新建一个名叫cli的窗口，运行seer目录中的命令行钱包程序；

```linux
screen -S cli
cd~
seer/cli_wallet -s ws://127.0.0.1:9090 -r 127.0.0.1:9191 -H 127.0.0.1:9192
```

`-s`参数可以设置要连接的节点api地址及端口，此处`ws://127.0.0.1:9090`为上一步中运行的本地节点的websocket RPC地址和端口，您也可以在此处使用局域网或公网中的其他公共api地址，不过有因外部api无法提供服务而导致命令行钱包异常退出的风险；

`-r`参数可以设置命令行钱包要监听的websocket RPC地址和端口，此处设为`127.0.0.1:9191`，负责充提业务的程序可以使用此端口调用命令行钱包进行操作；

`-H`参数可以设置命令行钱包要监听的Http-RPC地址和端口，此处设为`127.0.0.1:9192`，负责充提业务的程序也可以使用此端口调用命令行钱包进行操作。

2、钱包启动成功后，会显示：
```cmd
Please use the set_password method to initialize a new wallet before continuing
3564395ms th_a       main.cpp:227                  main                 ] Listening for incoming RPC requests on 127.0.0.1:9191
3564396ms th_a       main.cpp:252                  main                 ] Listening for incoming HTTP RPC requests on 127.0.0.1:9192
new >>> 
```
先设置钱包解锁密码，123替换为你想设置的密码
```cmd
set_password 123
```
解锁钱包
```cmd
unlock 123
```
导入账号资金私钥和备注私钥
```cmd
import_key seerdex-withdraw 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
import_key seerdex-withdraw 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
```
显示如下：

```cmd
new >>> set_password 123
set_password 123
null
locked >>> unlock 123
unlock 123
null
unlocked >>> import_key seerdex-withdraw  5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
import_key okok 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
3572083ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
3572084ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1cd0784e.wallet
true
unlocked >>> import_key seerdex-withdraw  5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
import_key else 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
3572941ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to before-import-key-1bece5d8.wallet
3573189ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
3573191ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1bece5d8.wallet
true
unlocked >>> 
```

## 接入命令行钱包

可以使用Http-RPC或websocket RPC方式接入命令行钱包。使用JSON-RPC远程调用协议传入相应的指令，即可让命令行钱包进行相关操作或返回需要的信息。

格式如下（实际使用时不换行无注释）：

```json
{ 
    "jsonrpc" : 2.0,//定义JSON-RPC版本
    "method" : "get_block",//调用的方法名，例如转账 transfer ，列出账户余额 list_account_balances 等，此处get_block为返回指令块号的区块信息
    "params" : [1], //方法传入的参数，若无参数则为null，此处1表示块号
    "id" : 1//调用标识符
} 
```

### Http-RPC接入示例

可以使用curl命令来测试Http-RPC连接命令行钱包实现获取指定账户的各资产余额:

```linux
 curl http://127.0.0.1:9192 -d '{"jsonrpc": "2.0", "method": "list_account_balances", "params": ["seerdex-withdraw"], "id": 1}'

 {"id":1,"result":[{"amount":"7861151753754","asset_id":"1.3.0"},{"amount":97099800,"asset_id":"1.3.8"}]}
```

### websocket RPC接入示例

首先在服务器上安装使用wscat测试ws：
```linux
 apt install node-ws
```
测试通过websocket RPC连接命令行钱包实现一笔转账：
```json
wscat -c ws://127.0.0.1:9191
> {"jsonrpc": "2.0", "method": "transfer", "params": ["seerdex-withdraw","ffffff","500000","SEER","Welcome to SEERTALK. https://forum.seerchain.org",true], "id": 1}
< {"id":1,"jsonrpc":"2.0","result":{"ref_block_num":64292,"ref_block_prefix":1517346144,"expiration":"2018-10-12T07:33:12","operations":[[0,{"fee":{"amount":2136718,"asset_id":"1.3.0"},"from":"1.2.105","to":"1.2.138","amount":{"amount":"50000000000","asset_id":"1.3.0"},"memo":{"from":"SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDANxsGNxH","to":"SEER6QbqUZF6xzjdceVoLHS7K1KwvLyszVTZS8bbsQQQXcAm8L3aZp","nonce":"4469110159915322318","message":"482a7d070d298fe2a79d5f528f55778c62584d242274a7d697dae1ec63d7038b5a0b80dc9ba524e3f5f528bc717c60a635f89ff8af1cccbd1b4189f8ddc92e39"},"extensions":[]}]],"extensions":[],"signatures":["204e8746aac14a05fb3c66ac653429dead34bddac58911c53346feb365f0c7b5767ea870c1e5da6a104d8364e42f504fc1bdcfc442652f5c2e9bb9b26a858b0ccd"]}}                                           
```
切换回命令行钱包所在窗口，可以看到钱包内有如下信息：

```cmd
2230368ms th_a       websocket_api.cpp:109         on_message           ] API call execution time limit exceeded. method: transfer params: ["seerdex-withdraw","ffffff","500000","SEER","Welcome to SEERTALK. https://forum.seerchain.org",true] time: 2310335
```
实现了让钱包进行了一次转账操作。

## 常用指令

### get_dynamic_global_properties

作用：列出链的当前全局动态参数

示例：`{"jsonrpc": "2.0", "method": "get_dynamic_global_properties", "params": [], "id": 1}`

返回信息示例：
```json
{
		"id": 1,
		"result": {
			"id": "2.1.0",
			"head_block_number": 3678309,//当前区块高度
			"head_block_id": "00382065d1057b13415518f913ce26e46fe45cac",//当前块号
			"time": "2018-10-12T16:37:30",//链上时间（格林尼治时间）
			"current_witness": "1.5.4",//当前出块的见证人
			"next_maintenance_time": "2018-10-13T00:00:00",//下次维护更新时间
			"last_budget_time": "2018-10-12T00:00:00",//上次维护时间
			"witness_budget": 3398400000,//本期见证人预算总额
			"accounts_registered_this_interval": 1,//账户注册间隔
			"recently_missed_count": 0,//最近缺失区块数
			"current_aslot": 4762199,//当前总块（丢掉的块加实际块高）
			"recent_slots_filled": "340240787892099949526793007880921399231",//用于计算见证人参与度的参数
			"dynamic_flags": 0,
			"last_irreversible_block_num": 3678305//最近一个不可逆块块号
		}
}
```

充提业务需关注 `head_block_number` 当前区块高度， `last_irreversible_block_num` 最近一个不可逆块块号。用于判断是否是可信充值操作以及提现是否已处理。

### info

作用：显示当前Seer区块链的状态

示例：`{"jsonrpc": "2.0", "method": "info", "params": [], "id": 1}`

返回信息示例：
```json
 {"id":1,
 	"result":
 	{
 		"head_block_num":3678258,//当前块高
 		"head_block_id":"00382032d0bfee243b0c5f6b37e3fd6f29682e6e",//当前块号
 		"head_block_age":"0 second old",//上一个区块生成时间
 		"next_maintenance_time":"7 hours in the future",//维护更新时间
 		"chain_id":"da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf",//链号
 		"participation":"88.28125000000000000",//区块生产参与率
 		"active_witnesses"://活跃见证人ID
 		["1.5.1","1.5.2","1.5.3","1.5.4","1.5.5","1.5.6","1.5.7","1.5.8"],
 		"active_committee_members"://活跃理事会成员ID
 		["1.4.0","1.4.1","1.4.2","1.4.3","1.4.4","1.4.5","1.4.6","1.4.7"]
 	}
 }
```

充提业务需关注 `head_block_age` 上一个区块生成时间，`participation` 区块生产参与率。 提现操作前判断区块链是否正常运行。

### list_account_balances

格式：`list_account_balances` name

参数：name可以是账户名，也可以是账户的id

作用：列出账号为id的账户的各资产余额

示例：`{"jsonrpc": "2.0", "method": "list_account_balances", "params": ["abc"], "id": 1}` 

返回信息示例：
```json
{
		"id": 1,
		"result": [{
			"amount": "7861177753754",//余额，精度5,amount没有小数点，其数值被乘以了10000 此处即78611777.53754
			"asset_id": "1.3.0"//资产类型 此处为SEER
		}, {
			"amount": 97099800,//余额，精度5,amount没有小数点，其数值被乘以了10000 
			"asset_id": "1.3.8"//资产类型 此处为测试链上的ABC资产
		}]
}
```
充提业务需关注`asset_id`为1.3.0(即SEER)的`amount` (余额)是否足够并支付网络手续费，若涉及SEER链上其他资产的充提业务，则还需要关注相应资产的余额是否足够。

### transfer2

格式：`transfer2` from to amount asset_symbol memo broadcast(true/false)

参数：from为转出账户,to为接收账户,amount为转账数量, asset_symbol为资产名,memo为备注。from/to 可以是用户名或者id，broadcast设置是否广播。 

作用：转账

示例：`{"jsonrpc": "2.0", "method": "transfer2", "params": ["seerdex-withdraw","ffffff","500000","SEER","Welcome to SEERTALK. https://forum.seerchain.org",true], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result":[
		"7ab0e58b6391a770cb62f432e0f2aef93de4d18e",//交易id
		{
		"ref_block_num": 64292,//引用的区块号
		"ref_block_prefix": 1517346144,//引用的区块头
		"expiration": "2018-10-12T07:33:12",//交易过期时间
		"operations": [
			[0, {//0表示转账
				"fee": {//手续费
					"amount": 2136718,//金额 ,amount没有小数点，其数值被乘以了10000 
					"asset_id": "1.3.0"//资产 此处表示SEER
				},
				"from": "1.2.105",//转出账户id
				"to": "1.2.138",//转入账户id
				"amount": {
					"amount": "50000000000",//金额 amount没有小数点，其数值被乘以了10000 
					"asset_id": "1.3.0"//资产 此处表示SEER
				},
				"memo": {//memo权限相关
					"from": "SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDANxsGNxH",
					"to": "SEER6QbqUZF6xzjdceVoLHS7K1KwvLyszVTZS8bbsQQQXcAm8L3aZp",
					"nonce": "4469110159915322318",
					"message": "482a7d070d298fe2a79d5f528f55778c62584d242274a7d697dae1ec63d7038b5a0b80dc9ba524e3f5f528bc717c60a635f89ff8af1cccbd1b4189f8ddc92e39"
				},
				"extensions": []
			}]
		],
		"extensions": [],
		"signatures": ["204e8746aac14a05fb3c66ac653429dead34bddac58911c53346feb365f0c7b5767ea870c1e5da6a104d8364e42f504fc1bdcfc442652f5c2e9bb9b26a858b0ccd"]
		}
	]
}

```

充提业务需关注返回信息的第一个字符串，即交易id，另`expiration` 交易过期时间。

### get_account_id

格式：`get_account_id` name

参数：name是账户名

作用：列出账户name的账户id

示例：`{"jsonrpc": "2.0", "method": "get_account_id", "params": ["seerdex-withdraw"], "id": 1}`

返回信息示例：
```json
{"id":1,"result":"1.2.105"}
```

### get_relative_account_history

格式：`get_relative_account_history` name start limit end

参数：name可以是账户名或id,start为返回结果的最小编号，limit 为返回结果的数量上限，end为返回结果的最大编号；

返回数据排序方式为按时间顺序，越新的越靠前；

编号从1开始，若end = 0，则返回最新的limit条操作信息；

若end - start > limit，则返回满足条件的最新的limit条操作信息。

作用：列出账户name的操作历史记录

<p class="tip">
  请避免一次性返回超过100条数据，以免节点或钱包报错。同时，在命令行钱包中使用此命令时只会返回 "description"中的数据，用RPC调用方能返回完整数据。
</p>

示例：`{"jsonrpc": "2.0", "method": "get_relative_account_history", "params": ["seerdex-withdraw",15,1,30], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"result": [
		{
		"memo": "give you 980 SEER",//解锁并有相应私钥的钱包方能显示MEMO
		"description": "Transfer 980 SEER from alice to okok -- Memo: give	ou 980 SEER   (Fee: 21.05468 SEER)",//钱包一般只显示此内容
		"op": {
			"id": "1.9.703568",//该操作的对象id，可通过get_object	.9.703568查看此操作
			"op": [
				0, //操作类型，0表示转账
				{
				"fee": {//手续费
					"amount": 2105468,//数额
					"asset_id": "1.3.0"//资产类型
				},
				"from": "1.2.109",//转出id
				"to": "1.2.105",//接收id
				"amount": {
					"amount": 98000000,//转账数额
					"asset_id": "1.3.0"//资产类型
				},
				"memo": {//MEMO权限相关
					"from": "SEER6sJwPuSSayEzHXLbVgw9HJsDnGBk5Dup5bq3ns1Yzi	DMKMgU",
					"to": "SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDAN	GNxH",
					"nonce": "394073041834538",
					"message": "485e630438b9a38c94c12afd9b15007845484d7f0c8	c29c135f4f9a155a1ee"
				},
				"extensions": []
			}],
			"result": [//操作返回结果
				0, 
				{				}
			],
			"block_num": 3674099,//入块高度
			"trx_in_block": 0,//操作所属交易在区块内的位置
			"op_in_trx": 0,//操作在交易内的位置
			"virtual_op": 52924//虚拟操作编号
		}
	}]
}
```
`get_relative_account_history`会列出和此账户有关的所有操作，例如自己转账给别人（包括提现）、别人转账给自己（包括充值）、账号注册、参与预测等；

充提业务只需关注`op.op.N`（操作类型）为`0`,即转账的操作；

当然最重要的是`memo`（转账MEMO）和`op.op.amount.amount`（转账数额）以及`op.op.amount.asset_id`（资产类型）；

以及`op.op.from`（转出id），若同一个账号即负责充值又负责提现，则判断`op.op.from`是否和`get_account_id`获得的当前账户一样来区分该笔操作是否是本帐户发起的提现操作；

`op.id`为该操作的对象id，也是该转账操作的唯一id；

另外，还需要关注`op.block_num`，即该操作的入块高度，
`op.trx_in_block` 该操作所属交易在该区块内的位置，
`op.op_in_trx` 该操作在该交易内的位置，
以及`op.virtual_op` 该操作的虚拟操作编号。

以上四个数据可以和其他指令配合获得该操作所属的txid及判断该操作的唯一性。

### get_block

格式：`get_block` num

参数：块号

作用：显示第num个块的概况

示例：`get_block` 2090482

返回信息示例：
```json
get_block 2090482
{
  "previous": "001fe5f1e1dd8d195af805484ee8038a09866b76",//上一个块的块号
  "timestamp": "2018-07-30T07:31:54",//时间戳
  "witness": "1.5.22",//见证人
  "transaction_merkle_root": "72756b0f1f1711622c8030eae65e6db055200320",
  "extensions": [],
  "witness_signature": "200d202d735de10f4f8213d71a8f946a2cc49bc02e930f682bea74321819b4bc7c4d436e366f1cad962f214eeaa42b5030fd716f692077f135b3cf33c688f68f1f",//见证人签名
  "transactions": [{
      "ref_block_num": 58864,//引用的区块号
      "ref_block_prefix": 2207768636,//引用的区块头
      "expiration": "2018-07-30T07:33:51",//交易过期时间
      "operations": [[
          0,{
            "fee": {
              "amount": 200000,//手续费 
              "asset_id": "1.3.0"//资产类型 1.3.0指SEER
            },
            "from": "1.2.1250",//发起用户ID
            "to": "1.2.1292",//接收用户ID
            "amount": {
              "amount": 2000000000,//金额20000
              "asset_id": "1.3.0"//资产类型 1.3.0指SEER
            },
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "205c1f92cd9eebba507094c0fe4a05be47d301b6b2e989f4f0fdcfc8acef69ceec5356faf1667b5576629bfbc29ee5a257dbfac935c5a8fef588e32d7a7902c2b3"//交易签名集合
      ],
      "operation_results": [[
          0,{}
        ]
      ]
    }
  ],
  "block_id": "001fe5f26d0f3ee5b1569a1618fe903e4dc5aef0",//块号
  "signing_key": "SEER5oyAoCzw5GRD9unKK6vsLXkPVx1aKU7i3hX19E8BRU5u3FoAoA",//见证人签名公钥
  "transaction_ids": [
    "30e73f68d163398005557a21c58bd751db22eb53"//交易id集
  ]
}
```
充提业务需需配合`get_relative_account_history`中获取的`op.block_num`来关注`get_block`获取的`transaction_ids`数据，若同一个块里有多笔交易，则会有多个`transaction_id`，需配合`get_relative_account_history`中获取到的`op.trx_in_block`来得到该操作所对应的txid。

## 处理充值业务

1、通过`get_relative_account_history`查询账户相关历史。

返回结果中并没有直接显示每条记录的序号，需要自行获取和记录。

建议：从start = 1，limit = 1， end = 2开始以一定时间间隔发送请求，每次start 和 end 各自 +1，limit恒等于1，若返回信息不为空，则将该条信息编号并存储。若返回信息为空：`{"id":1,"jsonrpc":"2.0","result":[]}`，则表示没有新的操作，等待有新的操作信息时继续记录存储。

2、判断是否为充值业务。

`get_relative_account_history`会列出和此账户有关的所有操作，例如自己转账给别人（包括提现）、别人转账给自己（包括充值）、账号注册、参与预测等，充提业务只需要`op.op.N`（操作类型）为`0`（转账）的操作数据；

若同一个账号即负责充值又负责提现，则需要区分`op.op.from`是否和当前账户id一样，，若一样，则是本帐户发起的提现操作，需要排除掉；

剩下的便是待处理的充值操作。

3、获得相关充值数据。

通过Http-RPC或websocket-RPC连接的命令行钱包在unlocked状态时，在`get_relative_account_history`返回的信息中可以查看`memo`内容，用户填写的交易所ID等入账信息便从此处获取；

通过`op.op.amount.amount`（转账数额）加上小数点，便是充值数额；

通过`op.op.amount.asset_id`（资产类型）来判断是否是平台支持的正确资产类型。

4、判断是否为可信操作。

不同于比特币和以太坊采用确认数来从概率上降低交易被退回的可能性，像SEER这样的石墨烯项目中有`不可逆块`的概念，`不可逆块`及更早区块中的交易，可以保证不会发生回退。

`get_relative_account_history`会返回该笔操作所属的`op.block_num`(入块高度)，但即使交易未入块，仍然可能出现在账户历史中，因此需要和通过`get_dynamic_global_properties`获取到的`last_irreversible_block_num`（最近一个不可逆块块号）比较，`op.block_num`必须小于或等于`last_irreversible_block_num`，才能被视为可信操作。

5、记录下该操作的相关信息。

`get_relative_account_history`中获取到的`op.block_num`+`op.trx_in_block` + `op.op_in_trx` + `op.virtual_op` 组合到一起，标识该操作的唯一性，可识别避免重复操作；

`get_relative_account_history`中获取到的`op.id`也是该转账操作的唯一id；

可以通过`get_block` `op.block_num` 获取该转账操作所在块的信息，再通过`op.trx_in_block`的数值来获取到块信息中`transaction_ids`数组里该转账操作对应的txid，同一个txid可能对应多个操作。

6、如果有充值的MEMO或资产类型不正确，建议不要直接退回，而是等待用户主动联系确认退回路径，因为用户可能是通过交易所或第三方平台提现过来充值的，直接退回但没有对方MEMO可能会造成处理困难甚至资产损失。

## 处理提现业务

1、提现操作前检查区块链网络是否正常运行

提现业务需关注区块链网络是否正常运行状态，只在网络正常时处理提现。

通过`info`指令获取到`head_block_age`（上一个区块生成时间），须在1分钟以内，`participation`（区块生产参与率）须在80以上，表示80%的区块生产者在正常工作。

同时`get_dynamic_global_properties`指令获取到的 `head_block_number`（当前区块高度）和 `last_irreversible_block_num`（最近一个不可逆块）相差不会太大，一般在30以内。

2、检查提现账户余额

通过`list_account_balances`列出账户各资产余额，检查`asset_id`为1.3.0(即SEER)的`amount` (余额)是否足够并支付网络手续费，若涉及SEER链上其他资产的充提业务，则还需要关注相应资产的余额是否足够。

3、转账并跟踪操作是否成功

通过`transfer2`向用户转账相应数额的指定资产。

需关注返回信息中的`交易id`，向用户提供此信息可以让用户在区块浏览器查询自己的提现操作在区块链上的状态和信息，在转出目标未到账的情况下确定该笔操作是否已出账；

关注`transfer2`返回信息中的`expiration`（交易过期时间），转账操作发出后，一般很快可以从`get_relative_account_history`中获取到该笔转账操作的信息，并通过`op.block_num`和`last_irreversible_block_num`比较来确认入块；

（1）若确认入块，则返回信息中的`交易id`应该已经存在于`get_object` `op.block_num` 获取该转账操作所在块信息的`transaction_ids`数组中。

（2）若发出的转账操作超过了`expiration`还未确认入块，则这笔交易可能由于您同时广播的操作太多等各种原因未被区块链打包并已经被丢弃，此时重新发起转账是安全的。

