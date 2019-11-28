---
nav: zh-Hans
search: 
  - zh-Hans
  - zh-Hant
---

# SEER流量众筹模块（Attraction Crowdfunding Platform,ACP）使用指南

## 流量众筹模块介绍

SEER利用区块链奖励机制，可解决传统体育赛事痛点，提高行业运转效率。比如提高赛事方收入，让观众自由选择想看的比赛，给予赛事众筹的参与者贡献影响力，使其获得由智能合约量化的激励等。此功能可广泛应用于包括但不限于演出、赛事等文体产业中的各种场景。

只有资产发行者能够创建新众筹。在SEER开发者网页钱包中，可在资产发行者的资产页，看到资产功能中有“众筹列表”按钮，进入可查看当前用户已有众筹列表或创建新的众筹。

在创建众筹时，可设置众筹开始结束时间、代理人等。代理人的设计初衷，是出于安全考虑，资产拥有者账号/DAPP官方账号不可以长期在线，众筹创建后由代理者行使后续权力，同时，代理人也可以作为水龙头，负责推广和注册账号。

创建众筹时，还需要设置各种激励的名称及每份奖励数量。例如每次助力奖励10ABC，朋友助力奖励5ABC。

创建众筹时需要添加受益人角色，例如合作媒体、明星、举办方等，在创建时为这些角色设定众筹成功后，资金池的分配比例，并且可以单独为每位角色设置线性解锁、不锁定、到期解锁等锁定方式和锁定天数。

众筹进行中时，需要配合相应的前端程序和活动程序使用，在链上解决的主要是通过智能合约进行筹得资产的增发、销毁、分配、锁定等步骤。而用户贡献流量这一步，则需要特定的活动程序向区块链提供数据，由创建人或代理人权限根据活动数据为本场众筹注入新资产。

例如，一场活动在某一周期内有10000人通过微信授权登陆进行助力，另外这些用户产生了5000人次的邀请朋友助力数据，根据每次助力奖励10ABC，朋友助力奖励5ABC的设定，该周期共计为资金池注入10000 * 10 + 5000 * 5 = 125000 ABC，同时，另有 150 位用户通过参与众筹的形式，捐赠或打赏了 50000 ABC，该周期可供受益人各方分配的资产为175000 ABC，这些资产将在活动成功后将根据预先设定的比例进行分配，若失败，捐赠部分将退回给用户。根据活动数据，发起方可根据用户的捐赠和助力贡献或排名，给与大到冠名、广告露出，小到明星签名周边之类的各种名誉奖励。

若有问题，欢迎在开发者论坛参与讨论：https://forum.seerchain.org/t/topic/610

## 体验流程

开发者可首先在本地下载配置命令行钱包，连接到此测试网络。导入测试账号tester的私钥，生成多个密钥对，注册多个测试账号。使用tester向自行注册的账号转账测试的SEER，之后使用自行注册的账号创建资产，随后创建众筹，开启众筹。然后使用创建的多个其它账号向自行创建的众筹捐赠资产，使用代理账号或众筹发起账号模拟流量价值进行的增发，众筹到期后输入众筹成功或失败的结果，使用创建或更新时设置的受益人账号领取收益等。

## 接口说明

流量众筹模块需要配合链上原有的资产发行、销毁等功能使用，主要包含六个新的接口：competition_create、competition_update、competition_participate、competition_input、competition_claim、competition_result。其中创建众筹competition_create、更新众筹competition_update参数较复杂、连同收益领取competition_claim、输入结果competition_result，一般使用网页钱包操作即可。

以下介绍参与众筹competition_participate和注入新资产competition_input接口。

### competition_participate

格式：competition_participate(string account,competition_id_type competition,asset amount,bool broadcast = false);

参数： account：发起者、competition：众筹ID、amount：参与的数额（带精度）以及资产类型、broadcast：是否广播；

作用：普通用户参与众筹（向本次众筹资金池捐赠资产）。

命令行钱包示例：competition_participate 1.2.13 1.18.7 {"amount":10000000,"asset_id":"1.3.3"} true

RPC示例： `{"jsonrpc": "2.0", "method": "competition_participate", "params": ["1.2.13","1.18.7",{"amount":10000000,"asset_id":"1.3.3"},true], "id": 1}`


参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "competition_participate",
	"params": [
	  "1.2.13",//发起者
		"1.18.7", {//众筹ID
			"amount": 10000000,//参与的数额
			"asset_id": "1.3.3"//资产类型
		},
		true
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
		"ref_block_num": 3404,
		"ref_block_prefix": 135777280,
		"expiration": "2019-10-16T15:32:36",
		"operations": [
			[65, {
				"fee": {//手续费
					"amount": 500000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.13",//发起者
				"competition": "1.18.7",//众筹ID
				"amount": {
					"amount": 10000000,//参与的数额
					"asset_id": "1.3.3"//资产类型
				}
			}]
		],
		"extensions": [],
		"signatures": ["2071d05......2e491"]
	}
}
```


### competition_input

格式：competition_input(string account,competition_id_type competition,map<uint8_t,uint32_t> input,bool broadcast = false);
			
参数： account：发起者、competition：众筹ID、input：每种激励新增的数额、broadcast：是否广播；

作用： 因为用户贡献了关注度，增发新的资产注入众筹资金池

命令行钱包示例：competition_input 1.2.13 1.18.7 [[0,100],[1, 200]] true

RPC示例： `{"jsonrpc": "2.0", "method": "competition_input", "params": ["1.2.13","1.18.7",[[0,100],[1, 200]],true], "id": 1}`

参数说明（RPC形式）：

```
{
	"jsonrpc": "2.0",
	"method": "competition_input",
	"params": [
        "1.2.13",//发起者
         "1.18.7", //众筹ID
         [
		    [0, 100],//第一种激励新增的数额
	    	[1, 200]//第二种激励新增的数额
	    ], 
        true],
	"id": 1
}
```

返回信息示例：

```
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 3370,
		"ref_block_prefix": 1021658047,
		"expiration": "2019-10-16T15:30:54",
		"operations": [
			[66, {
				"fee": {//手续费
					"amount": 500000,
					"asset_id": "1.3.0"
				},
				"issuer": "1.2.13",//发起者
				"competition": "1.18.7", //众筹ID
				"input": [
					[0, 100],//第一种激励新增的数额
					[1, 200]//第二种激励新增的数额
				]
			}]
		],
		"extensions": [],
		"signatures": ["2054f3......f765c15"]
	}
}
```

## SEER开发测试网络

目前，SEER流量众筹模块开发中，开发者架设了测试网络，节点API如下：ws://192.144.171.138:8003 

若需使用测试网络网页钱包http://192.144.171.138 ，需要添加并切换到上面的API。

测试网络账号：tester 

私钥：5HxSqrcNu6nZ5xaLK9f6RTVKghJsVGZejz8CnC8e3qnPc14LUdP

win wallet：https://cdn.jsdelivr.net/gh/akirasen/W1@master/cli_test.zip

此测试网络可能会随时销毁或重置，请勿保存重要数据。


### 新手指南

考虑到有的小伙伴是第一次接触SEER，所以我们从头补一下课，如何使用开发者网络钱包和命令行钱包，此处命令行钱包以windows为例。

首先，下载钱包https://cdn.jsdelivr.net/gh/akirasen/W1@master/cli_test.zip

解压后新建一个文本文档，输入`cli_wallet.exe -s ws://192.144.171.138:8003 -r 127.0.0.1:9991 -H 127.0.0.1:9992`，另存为run.cmd，点击run.cmd。

成功运行后，会显示new >> 

1. 输入`set_password 123`设置钱包密码；
https://docs.seerchain.org/#/zh-Hans/cli?id=_1-set_password
2. 输入`unlock 123`解锁钱包；
*** 记得每次看到locked>>的时候就解锁 *** 
https://docs.seerchain.org/#/zh-Hans/cli?id=_2-unlock
3. 输入`import_key tester 5HxSqrcNu6nZ5xaLK9f6RTVKghJsVGZejz8CnC8e3qnPc14LUdP`导入测试账号的私钥；
https://docs.seerchain.org/#/zh-Hans/cli?id=_5-import_key
4. 输入`suggest_brain_key`生成几对秘钥对，复制下来；
https://docs.seerchain.org/#/zh-Hans/cli?id=_4-suggest_brain_key
5. 用生成秘钥对中的公钥（SEER开头的一串数字字母字符），替换掉模板中的公钥`SEER......yVgnQ`，修改模板中的新账号用户名`name`，输入`register_account name SEER4xBLW....yVgnQ SEER4....yVgnQ tester tester 20 true`，注册账号，多个账号多次注册；
https://docs.seerchain.org/#/zh-Hans/cli?id=_1-register_account
6. 输入`transfer tester name 1000000 SEER "" true`为你创建的账号name（需替换）转账 100万SEER 测试币，多个账号多次转账；
https://docs.seerchain.org/#/zh-Hans/cli?id=_2-transfer
7. 输入`import_key name 5Kb1...Rci`导入你刚刚注册的测试账号的私钥，多个账号多次导入；
8. 在测试网络网页钱包http://192.144.171.138 设置-接入点中，添加 API 服务器节点 ws://192.144.171.138:8003 并切换；
9. 设置-恢复/导入 - 导入私钥，粘贴 `5HxSqrcNu6nZ5xaLK9f6RTVKghJsVGZejz8CnC8e3qnPc14LUdP` 提交，可以导入测试账号 tester，当然你也可以导入自己创建的其它账号；
10. 菜单 - 资产 页 创建资产，填入资产代码，创建一个资产；
11. 点击新创建资产后方的“众筹列表”按钮，进入列表页，创建众筹。在创建页面根据提示添加各种参；
12. 创建好后开启众筹，开启后的众筹，可以在网页钱包中进行输入、参与操作，但因为这些操作在实际操作中需要程序控制，因此使用命令行钱包和RPC接口来模拟操作；
13. 命令行钱包中输入`competition_participate 1.2.N 1.18.N {"amount":N,"asset_id":"1.3.N"} true`参与众筹（捐赠打赏），详细参数说明参考上面的文档；
10. 输入`competition_input 1.2.N 1.18.N [[0,100],[1, 200]] true`向本次众筹资产池输入各个激励名目的新增数量，注入新的资产，详细参数说明参考上面的文档。

用户名的object_ID可通过`get_account_id name`查询。
https://docs.seerchain.org/#/zh-Hans/cli?id=_13-get_account_id
