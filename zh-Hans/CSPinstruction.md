---
nav: zh-Hans
search: 
  - zh-Hans
  - zh-Hant
---

# SEER文体平台模块（Culture and Sports Platform,CSP）使用指南

## 文体平台模块介绍

在SEER文体平台模块中，任何SEER用户可以在主网抵押一笔保证金后获得文体平台权限，文体平台有平台资金池，其他SEER用户可以直接在链上授权一定资产额度给平台，能获得多少用户“授权”和其抵押的保证金有关。
平台通过调用接口控制用户授权的资产额度进行各种链上操作，且可以将亚秒时间内的操作统一打包，这些操作手续费都由平台支付。这样既能保证用户对资产的所有权，又能保证游戏等文体平台原有的游戏核心之类的应用逻辑不作太大的变化，具有很高的效率和可操作性，可以让游戏内积分等完全区块链化，第三方也可以很方便的做成完全合规的区块链应用。
文体平台不光可以应用到游戏领域，票务等文化体育领域的众多方向都可以进行扩展。

若有问题，欢迎在开发者论坛参与讨论：https://forum.seerchain.org/t/topic/534

## SEER开发测试网络

目前，文体平台模块开发中，开发者架设了测试网络，节点API如下：ws://192.144.171.138:8003 

若需使用测试网络网页钱包http://192.144.171.138 ，需要添加并切换到上面的API。

另外社区开发者还部署了一个公开命令行钱包服务，API如下：ws://tstn1.seerchain.org 可以调用此API控制服务器上的命令行钱包进行各种操作。

测试网络账号：cute 

私钥：5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci

wallet：https://github.com/seer-project/seer-core-package/releases

此测试网络可能会随时销毁或重置，请勿保存重要数据。

## 体验流程

开发者可首先在本地下载配置命令行钱包，连接到此测试网络。导入测试账号cute的私钥，生成多个密钥对，注册多个测试账号。使用cute向自行注册的账号转账测试的SEER，之后使用自行注册的账号创建平台，随后开启平台。然后使用创建的多个其它账号向自行创建的平台授权划转资产额度，使用平台账号执行内部划转操作等。

### 新手指南

考虑到有的小伙伴是第一次接触SEER，所以我们从头补一下课，如何使用命令行钱包，此处以windows为例。

首先，下载钱包https://github.com/seer-project/seer-core-package/releases 此页面最新的节点和钱包版本中文件名中有win的，并且以zip为后缀名的包。如果要用linux，则使用ubuntu版本。

解压后新建一个txt，内容填写`cli_wallet -s ws://192.144.171.138:8003 -r 127.0.0.1:5698 --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" 
`，另存为run.cmd，然后点击run.cmd，此方法通过为主网命令行钱包指定测试网络chain-id和API的方式连接到测试网络。

成功运行后，会显示new >> 

1. 输入`set_password 123`设置钱包密码；
https://docs.seerchain.org/#/zh-Hans/cli?id=_1-set_password
2. 输入`unlock 123`解锁钱包；
*** 记得每次看到locked>>的时候就解锁 *** https://docs.seerchain.org/#/zh-Hans/cli?id=_2-unlock
3. 输入`import_key cute 5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci`导入测试账号的私钥；
https://docs.seerchain.org/#/zh-Hans/cli?id=_5-import_key
4. 输入`suggest_brain_key`生成几对秘钥对，复制下来；
https://docs.seerchain.org/#/zh-Hans/cli?id=_4-suggest_brain_key
5. 用生成秘钥对中的公钥（SEER开头的一串数字字母字符），替换掉模板中的公钥`SEER......yVgnQ`，修改模板中的新账号用户名`name`，输入`register_account name SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ cute cute 20 true`，注册账号，多个账号多次注册；
https://docs.seerchain.org/#/zh-Hans/cli?id=_1-register_account
6. 输入`transfer cute name 1000000 SEER "" true`为你创建的账号name（需替换）转账 100万SEER 测试币，多个账号多次转账；
https://docs.seerchain.org/#/zh-Hans/cli?id=_2-transfer
7. 输入`import_key name 5Kb1...Rci`导入你刚刚注册的测试账号的私钥，多个账号多次导入；
8. 输入`sc_platform_create name "" 1000000000 ["SEER"] true`创建平台，详细参数说明参考下面的文档；
9. 输入`sc_platform_deal name 1.19.N 1 [] true`开启平台，详细参数说明参考下面的文档；
10. 输入`sc_platform_participate name 1.19.N {"amount": 2000000, "asset_id": "1.3.0"} true`向自行创建的平台授权划转资产额度，详细参数说明参考下面的文档；
11. 输入`sc_platform_divide name 1.19.N [{"payer": 1.2.N,"asset_id":1.3.0,"divide_amount":400000,"comment":"{\"result\":[{\"Version\":\"1.0.3\",\"uid\":\"0012\"}]}", "receivers":[["1.2.N",200000],["1.2.N",200000]]}] true`，详细参数说明参考下面的文档；

用户名的object_ID可通过`get_account_id name`查询。
https://docs.seerchain.org/#/zh-Hans/cli?id=_13-get_account_id

## 接口说明

sc_platform_create、sc_platform_update一般使用命令行操作即可。

### sc_platform_create

格式： sc_platform_create(string account,string description,int64_t guaranty,vector<string> assets,bool broadcast = false);

参数： account:创建者、description：平台描述、guaranty:保证金金额、assets：接受的资产列表；

作用： 创建文体平台

命令行钱包示例：sc_platform_create love "" 1000000000 ["SEER"] true

RPC示例： `{"jsonrpc": "2.0", "method": "sc_platform_create", "params": ["smile","",1000000000,["SEER"],true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_create",//接口名
	"params": [
	  "smile", //创建者用户名
	  "", //平台描述
	  1000000000,//保证金金额（5位精度，此处表示10000，保证金资产种类皆为SEER）
	  ["SEER"], //接受的资产类型列表
	  true//是否广播
	],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 61526,
		"ref_block_prefix": 2817252547,
		"expiration": "2019-08-14T15:53:12",
		"operations": [
			[69, {
				"fee": {
					"amount": 10021484,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.21",
				"description": "",
				"guaranty": 1000000000,
				"asset_ids": ["1.3.0"]
			}]
		],
		"extensions": [],
		"signatures": ["205fa030280cb8e381a311ec2bc885d96e0976713408e4f6d5db2fa60e683a28656b112e1522d99704599f4391f7f7fd0d1a27954eab2276e5ed1228ceb201013d"]
	}
}

```

### sc_platform_update

格式： sc_platform_update(string account,sc_platform_id_type sc_platform,optional<string> description,optional<int64_t> guaranty,optional<vector<string>> assets,bool broadcast = false);

参数： account:创建者、sc_platform:平台ID、description：平台描述、guaranty:保证金金额、assets：接受的资产列表；在用户不为空时，assets参数需要传null。eg：sc_platform_update love 1.19.3 "aaaaaa" 10000000000 null true

作用： 更新文体平台

命令行钱包示例：sc_platform_update love 1.19.3 "aaaaaa" 10000000000 ["SEER","SSE"] true

RPC示例：  `{"jsonrpc": "2.0", "method": "sc_platform_update", "params": ["smile","1.19.4","memeda",10000000000,["SEER","SSE"],true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_update",//接口名
	"params": [
	  "smile", //创建者用户名
	  "1.19.4", 
	  "memeda", //平台描述
	  10000000000,//新增的保证金金额，负数表减少（5位精度，此处表示10000，保证金资产种类皆为SEER）
	  ["SEER", "SSE"],  //修改后接受的资产类型列表
	  true//是否广播
	],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 61996,
		"ref_block_prefix": 3917363680,
		"expiration": "2019-08-14T16:16:42",
		"operations": [
			[70, {
				"fee": {
					"amount": 2032226,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.21",
				"sc_platform": "1.19.4",
				"description": "memeda",
				"guaranty": "10000000000",
				"asset_ids": ["1.3.0", "1.3.1"]
			}]
		],
		"extensions": [],
		"signatures": ["207be1acf500841735b303797fcccab5d4ceac8bc0c1f6250d06c91d1210d7f51960c7b3964f0ff7b8420a0b00c4dd9144ae6a7d47931eaa86b32861751e5e3390"]
	}
}

```

### sc_platform_divide

格式： sc_platform_divide(string account,sc_platform_id_type sc_platform,vector<sc_platform_divide_operation::share_divide> changes,bool broadcast = false);

参数： account 操作者、sc_platform 平台ID，changes 结构体：（payer 出资者、asset_id 资产名、divide_amount 金额、comment 操作描述、receivers 资产接受者）

作用： 文体平台资金池内部划转操作

命令行钱包示例：sc_platform_divide cute 1.19.2 [{"payer": 1.2.21,"asset_id":1.3.0,"divide_amount":400000,"comment":"{\"result\":[{\"Version\":\"1.0.3\",\"uid\":\"0012\"}]}", "receivers":[["1.2.22",200000],["1.2.24",200000]]}] true

RPC示例： `{"jsonrpc": "2.0", "method": "sc_platform_divide", "params": ["cute","1.19.2",[{"payer": "1.2.21","asset_id":"1.3.0","divide_amount":400000,"comment":"{\"result\":[{\"Version\":\"1.0.3\",\"uid\":\"0012\"}]}", "receivers":[["1.2.22",200000],["1.2.24",200000]]}],"true"], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_divide",//接口名
	"params": [
	  "cute", //操作者用户名
	  "1.19.2",//平台ID
	   [{
		"payer": "1.2.21",//出资者
		"asset_id": "1.3.0",//划出资产的object_ID
		"divide_amount": 400000,//划出资产总额
		"comment": "{\"result\":[{\"Version\":\"1.0.3\",\"uid\":\"0012\"}]}",//可选，可填入该次操作的一些备注信息，须在引号前加转义符。示例中是以JSON格式信息为例。此信息完全公开显示。
		"receivers": [//接受者信息结构体，内部可包含多个资产接受信息，资产接受者们所接受的资产总额应等于前面所划出的金额，且不为零。
			[//第一位接受者信息
			  "1.2.22",//账户object_ID
			  200000//接受资产数额
			],
			[//第二位接受者信息
			  "1.2.24",//账户object_ID
			 200000//接受资产数额
			]
		]
	}], 
			   "true"//是否广播
			  ],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 41756,
		"ref_block_prefix": 3130945490,
		"expiration": "2019-08-16T06:01:48",
		"operations": [
			[71, {
				"fee": {
					"amount": 1000000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.20",
				"sc_platform": "1.19.2",
				"changes": [{
					"payer": "1.2.21",
					"asset_id": "1.3.0",
					"divide_amount": 400000,
					"comment": "{\"result\":[{\"Version\":\"1.0.3\",\"uid\":\"0012\"}]}",
					"receivers": [
						["1.2.22", 200000],
						["1.2.24", 200000]
					]
				}]
			}]
		],
		"extensions": [],
		"signatures": ["1f240d0ec2b4e1f95f2cb6767f1070f1e4b3a45ed35a1a1dcfad40eb2205a1b7ea4b3e79a5f5d75b4fbc5cab01d56ae4f35a5a3b9e7b69e42db21611644d8ba486"]
	}
}

```

### sc_platform_deal

格式： sc_platform_deal(string account,sc_platform_id_type sc_platform,uint8_t code,map<account_id_type,vector<asset_id_type>>  backs,bool broadcast = false);

参数： account 操作者、sc_platform 平台ID、code 操作指令（0 停止接受新用户划转、1 启动接受新用户划转、2 退回赎回余额用户的资产、3 清理无余额的用户）结构体：（当操作指令为2时，包括账户OID，资产ID）、4 4，撤销文体平台（之后可以退回保证金）

作用： 文体平台发还用户赎回资产，平台开启及关闭等状态设置操作

命令行钱包示例：

设置平台状态：sc_platform_deal cute 1.19.2 1 [] true

RPC示例： `{"jsonrpc": "2.0", "method": "sc_platform_deal", "params": ["love","1.19.3",1,[],true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_deal",//接口名
	"params": [
	  	"love", //操作者
	  	"1.19.3",//平台ID
	  	1,//code 操作指令（0 停止接受新用户划转、1 启动接受新用户划转、2 退回赎回余额用户的资产、3 清理无余额的用户、4 退回保证金）
	  	[],//此处以0、1、3为例，留空
	  	true//是否广播
	],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 61942,
		"ref_block_prefix": 3738115572,
		"expiration": "2019-08-14T16:14:00",
		"operations": [
			[72, {
				"fee": {
					"amount": 500000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.22",
				"sc_platform": "1.19.3",
				"code": 1,
				"backs": []
			}]
		],
		"extensions": [],
		"signatures": ["200d7dde83894f1309a1625a109d04757b979e3cc1db7eb6d20f77249ba13cd5ff7444a064302a9b89822de6af8d7edb7f43d4b75c3377b8c1ed1761e9e1b48e05"]
	}
}

```

发还用户赎回资产：sc_platform_deal cute 1.19.2 2 [[ "1.2.21",[ "1.3.0" ]],[ "1.2.22",[ "1.3.0" ]]] true

RPC示例： `{"jsonrpc": "2.0", "method": "sc_platform_deal", "params": ["seer","1.19.2",2,[[ "1.2.21",[ "1.3.0" ]],[ "1.2.22",[ "1.3.0" ]]],true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_deal",//接口名
	"params": [
	  	"love", //操作者
	  	"1.19.3",//平台ID
	  	1,//code 操作指令（0 停止接受新用户划转、1 启动接受新用户划转、2 退回赎回余额用户的资产、3 清理无余额的用户，4，撤销文体平台（之后可以退回保证金））
	  	[//发还用户赎回资产结构体，此处以2为例，可一次发还多位用户的赎回资产，用,隔开
	  		[//第一位赎回用户信息
	  		 "1.2.21",//赎回用户的账户object_ID
	  		 	[ 
	  			 "1.3.0"//待赎回资产的object_ID
	  		 	]
	  		],
	  		[//第二位赎回用户信息
	  		 "1.2.22",//赎回用户的账户object_ID
	  		 	[ 
	  			 "1.3.0"//待赎回资产的object_ID
	  		 	]
	  		]
	  	],
	  	true//是否广播
	],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 42804,
		"ref_block_prefix": 4289136030,
		"expiration": "2019-08-16T06:54:12",
		"operations": [
			[72, {
				"fee": {
					"amount": 1000000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.13",
				"sc_platform": "1.19.2",
				"code": 2,
				"backs": [
					["1.2.21", ["1.3.0"]],
					["1.2.22", ["1.3.0"]]
				]
			}]
		],
		"extensions": [],
		"signatures": ["1f65fd93f15b1f4541bd8763b8b2a6d50ce2a10a86c7244c0b095dd862911cf5f96956ede73fa28993d6358b18ae6115adc01661a0e2fb451ea530bb9a5f2d4a97"]
	}
}
```

### sc_platform_participate

格式： sc_platform_participate(string account,sc_platform_id_type sc_platform,asset amount,bool broadcast = false);

参数： account 操作者、sc_platform 平台ID、amount 金额

作用： 用户授权划转资产给文体平台操作

命令行钱包示例：sc_platform_participate love 1.19.2 {"amount": 2000000, "asset_id": "1.3.0"} true

RPC示例： `{"jsonrpc": "2.0", "method": "sc_platform_participate", "params": ["smile","1.19.2",{"amount": 2000000, "asset_id": "1.3.0"},true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "sc_platform_participate",//接口名
	"params": [
		"smile",  //操作者
		"1.19.2",//平台ID
		 {
		"amount": 2000000,//授权并划转给平台的资产额度
		"asset_id": "1.3.0"//授权并划转给平台的资产类型
				},
			   true//是否广播
			  ],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 61817,
		"ref_block_prefix": 364626865,
		"expiration": "2019-08-14T16:07:45",
		"operations": [
			[73, {
				"fee": {
					"amount": 500000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.21",
				"sc_platform": "1.19.2",
				"amount": {
					"amount": 2000000,
					"asset_id": "1.3.0"
				}
			}]
		],
		"extensions": [],
		"signatures": ["1f5ebdb0935eadc49428d12042c3dcba10e194f2dba4f463b5e1f9a19473158f24201f211f805bbab993cea2c6b834c3337c464be52e3b4e6045fc4a445a3531ed"]
	}
}

```

### get_sc_platform_by_account

格式： get_sc_platform_by_account(account_id_type account)const;

参数： 账户object_ID

作用： 根据平台所有者账户的object_ID返回平台信息。

命令行钱包示例：get_sc_platform_by_account 1.2.20

RPC示例： `{"jsonrpc": "2.0", "method": "get_sc_platform_by_account", "params": ["1.2.20"], "id": 1}`

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"id": "1.19.2",//文体平台ID
		"owner": "1.2.20",//所有者ID
		"description": "test1",//平台描述
		"guaranty": "100001000000",//平台保证金，精度100000，此处实际为1000010 SEER
		"assets": [//已被划转的资产类型列表
			[
			"1.3.0",//资产ID
			 63600000//已被划转的资产金额，精度100000，此处实际为636
			 ],
			[
			"1.3.1",//资产ID
			 0//已被划转的资产金额
			 ]
		],
		"status": 1,//平台状态，0 停止接受新用户划转、1 启动接受新用户划转。
		"users": 4//已被划转授权的用户数
	}
}
```


### list_sc_records_by_account

格式： list_sc_records_by_account(account_id_type account)const;

参数： 账户object_ID

作用： 根据SEER用户的object_ID返回其在文体平台的参与情况。

命令行钱包示例：list_sc_records_by_account 1.2.22

RPC示例： `{"jsonrpc": "2.0", "method": "list_sc_records_by_account", "params": ["1.2.22"], "id": 1}`

返回信息示例：

```

{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "2.21.0",
		"player": "1.2.22",//用户的账户object_ID
		"sc_platform": "1.19.2",//文体平台ID
		"balance": [
			[
			"1.3.0",//资产ID
			 2000000//已划转的资产金额
			 ]
		]
	}]
}
```

### list_sc_records_by_platform

格式：list_sc_records_by_platform(sc_platform_id_type platform,account_id_type start,uint32_t limit)const;

参数： platform：文体平台object_ID；start：参与者账号object_ID；limit：返回结果数量。

作用：根据平台object_ID返回参与者的情况。

命令行钱包示例：list_sc_records_by_platform 1.19.2 1.2.20 100

RPC示例： `{"jsonrpc": "2.0", "method": "list_sc_records_by_platform", "params": ["1.19.2","1.2.20",100], "id": 1}`

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "2.21.1",
		"player": "1.2.21",//用户的账户object_ID
		"sc_platform": "1.19.2",//文体平台ID
		"balance": [
			[
			"1.3.0", //资产ID
			497800000//已划转的资产金额
			]
		]
	}, {
		"id": "2.21.0",
		"player": "1.2.22",//用户的账户object_ID
		"sc_platform": "1.19.2",//文体平台ID
		"balance": [
			[
			"1.3.0", //资产ID
			43200000//已划转的资产金额
			]
		]
	}, {
		"id": "2.21.3",
		"player": "1.2.24",//用户的账户object_ID
		"sc_platform": "1.19.2",//文体平台ID
		"balance": [
			[
			"1.3.0", //资产ID
			3000000//已划转的资产金额
			]
		]
	}]
}

```
