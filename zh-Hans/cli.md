---
nav: zh-Hans
search: zh-Hans
---

# 赛亚命令行指令指南

## 启动cli_wallet

对Seer的命令行钱包`cli_wallet`常用指令进行说明，便于普通用户查阅。`cli_wallet`为命令行版本客户端钱包，所有操作都通过输入指令形式执行。

请下载最新版的钱包文件：https://github.com/seer-project/seer-core-package/releases

### Windows下启用cli_wallet

#### 方法1 命令启动
1. 启动windows命令提示符: 打开`“我的电脑”`->在地址栏里输入`”cmd”`并确定；

2. 在弹出的cmd窗口切换到`cli_wallet.exe`所在目录,比如说`d:\seer\`，通过以下命令可以切换命令路径：`”d:\”`->`”cd seer”`；

3. 带参数启动`cli_wallet`:

```cmd
cli_wallet.exe -s ws://123.207.146.191:9999
```
其中`” ws://123.207.146.191:9999”`为API链接

#### 方法2 预设命令启动

1. 在`cli_wallet.exe`所在目录创建文件`”run.cmd”`；

2. 用记事本打开`run.cmd`，输入以下内容后保存退出:
```cmd
cli_wallet.exe -s ws://123.207.146.191:9999
```
3. 点击`run.cmd`即可运行。

### Linux下启用cli_wallet

1. 进入`cli_wallet`所在目录

2. 带参数启动cli_wallet:
```cmd
./cli_wallet -s ws://123.207.146.191:9999
```
其中`” ws://123.207.146.191:9999”`为API链接

### 启动成功后的回显
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

## 使用cli_wallet操作完整流程

### 系统状态指令

#### 1. variant Info()
参数：无

作用：显示当前Seer区块链的状态

示例：`info`

返回信息示例：
```cmd
 info
{
  "head_block_num": 2084691,//当前块高
  "head_block_id": "001fcf539d9b3593e31abd604c11fdd57f0bbffe",//当前块号
  "head_block_age": "0 second old",//上一个区块生成时间
  "next_maintenance_time": "21 hours in the future",//计票更新时间
  "chain_id": "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91",//链号
  "participation": "100.00000000000000000",//区块生产参与率
  "active_witnesses": [//活跃见证人ID
    "1.5.22",
    ......
    "1.5.73"
  ],
  "active_committee_members": [//活跃理事会成员ID
    "1.4.0",
    ......
    "1.4.6"
  ]
}
```

#### 2. variant_object about()
参数：无

作用：显示当前Seer链相关的版本号

示例：`about`

```cmd
about
{
  "client_version": "v0.02-8-gb681e10",
  "graphene_revision": "b681e10b5492e879889a0b854e05bc292b3415bc",
  "graphene_revision_age": "41 days ago",
  "fc_revision": "cb627980a5ff5f65fe129414dd96d3c2bd51b095",
  "fc_revision_age": "60 weeks ago",
  "compile_date": "compiled on Jun 17 2018 at 18:06:22",
  "boost_version": "1.58",
  "openssl_version": "OpenSSL 1.0.1g 7 Apr 2014",
  "build": "win32 64-bit"
}
```


#### 3. get_global_properties() const;
global_property_object get_global_properties() const;

参数：无

作用：列出链的当前全局参数

示例：`get_global_properties`

```cmd 
get_global_properties
{
  "id": "2.0.0",
  "parameters": {
    "current_fees": {
      "parameters": [[
          0,{//转账
            "fee": 200000,//手续费 单位为1/100000SEER，即2SEER
            "price_per_kbyte": 1000000 //每千字节手续费 10SEER
          }
        ],[
          1,{//发起限价单
            "fee": 500000 //手续费 5SEER
          }
        ],[
          2,{//取消限价单
            "fee": 100000 //手续费 1SEER
          }
        ],[
          3,{}
        ],[
          4,{//创建新账户
            "basic_fee": 500000,//普通账号名手续费 5SEER
            "premium_fee": 200000000,//高级账号名手续费 2000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          5,{//更新账户
            "fee": 2000000,//手续费 20SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          6,{//更新账户白名单
            "fee": 300000 //手续费
          }
        ],[
          7,{//升级账户
            "membership_annual_fee": 200000000,//年度会员手续费 2000SEER
            "membership_lifetime_fee": 1000000000//终身会员手续费 10000SEER
          }
        ],[
          8,{//账户转移
            "fee": 50000000 //手续费 500SEER
          }
        ],[
          9,{//UIA用户自定义资产创建
            "symbol3": "35000000000", //三字母资产名 手续费35万SEER
            "symbol4": "15000000000",//4字母资产名 手续费15万SEER
            "long_symbol": 1500000000,//更长资产名 手续费1.5万SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          10,{//更新资产
            "fee": 50000000,//手续费500SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          11,{//资产发行
            "fee": 2000000,//手续费20SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          12,{//销毁资产
            "fee": 2000000//手续费20SEER
          }
        ],[
          13,{//注资资产手续费池
            "fee": 100000//手续费1SEER
          }
        ],[
          14,{//创建见证人
            "fee": 2000000000//手续费2万SEER
          }
        ],[
          15,{//更新见证人
            "fee": 10000000//手续费100SEER
          }
        ],[
          16,{//增加抵押
            "fee": 1000000//手续费10SEER
          }
        ],[
          17,{//取消抵押
            "fee": 10000000//手续费100SEER
          }
        ],[
          18,{//领取抵押金和利息
            "fee": 20000000//手续费200SEER
          }
        ],[
          19,{//创建提案
            "fee": 2000000,//手续费20SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          20,{//更新提案
            "fee": 2000000,/手续费20SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          21,{//删除提案
            "fee": 100000//手续费1SEER
          }
        ],[
          22,{//授权提款
            "fee": 100000//手续费1SEER
          }
        ],[
          23,{//更新提款授权
            "fee": 100000//手续费1SEER
          }
        ],[
          24,{//行使提款授权
            "fee": 2000000,//手续费20SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          25,{//删除提款授权
            "fee": 0//手续费0
          }
        ],[
          26,{//创建理事会成员
            "fee": 500000000//手续费5000SEER
          }
        ],[
          27,{//更新理事会成员
            "fee": 2000000//手续费20SEER
          }
        ],[
          28,{//全局参数更新
            "fee": 100000//手续费1SEER
          }
        ],[
          29,{//创建冻结账目余额
            "fee": 100000//手续费1SEER
          }
        ],[
          30,{//提取解冻账户余额
            "fee": 2000000//手续费20SEER
          }
        ],[
          31,{//自定义项目
            "fee": 100000,//手续费10SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER	
          }
        ],[
          32,{//断言操作
            "fee": 100000//手续费1SEER
          }
        ],[
          33,{}
        ],[
          34,{//强制转账
            "fee": 2000000,//手续费20SEER
            "price_per_kbyte": 10//每千字节手续费 0.0001SEER
          }
        ],[
          35,{//向隐私账户转账
            "fee": 500000,//手续费5SEER
            "price_per_output": 500000
          }
        ],[
          36,{//隐私转账
            "fee": 500000,//手续费5SEER
            "price_per_output": 500000
          }
        ],[
          37,{//从隐私账户转出
            "fee": 500000//手续费5SEER
          }
        ],[
          38,{//领取资产手续费
            "fee": 2000000//手续费20SEER
          }
        ],[
          39,{}
        ],[
          40,{//创建预言机
            "fee": 1000000000,//手续费10000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          41,{//更新预言机
            "fee": 10000000,//手续费100SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          42,{//预言机输入结果
            "fee": 1000000//手续费10SEER
          }
        ],[
          43,{//创建房间
            "fee": 20000000,//手续费200SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          44,{//房间更新
            "fee": 10000000,//手续费10SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          45,{//房主输入预测结果
            "fee": 500000//手续费5SEER
          }
        ],[
          46,{//开启预测
            "fee": 10000000//手续费100SEER
          }
        ],[
          47,{//停止房间预测
            "fee": 500000//手续费5SEER
          }
        ],[
          48,{//对房间结算
            "fee": 1000000//手续费10SEER
          }
        ],[
          49,{//房间派奖
            "fee": 2000000//手续费200SEER
          }
        ],[
          50,{//参与预测
            "fee": 500000//手续费5SEER
          }
        ],[
          51,{//关闭房间
            "fee": 1000000//手续费10SEER
          }
        ],[
          52,{//从房间提取余额
            "fee": 2000000//手续费20SEER
          }
        ],[
          53,{//创建平台
            "fee": 3000000000,//手续费30000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          54,{//更新平台
            "fee": 100000000,//手续费1000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          55,{//申请认证
            "fee": 10000000//手续费100SEER
          }
        ],[
          56,{//创建监管者
            "fee": 1000000000,//手续费10000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          57,{//更新监管者
            "fee": 100000000,//手续费1000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          58,{//监管处理
            "fee": 100000//手续费1SEER
          }
        ],[
          59,{//创建认证者
            "fee": 1000000000,//手续费10000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          60,{//更新认证者
            "fee": 100000000,//手续费1000SEER
            "price_per_kbyte": 100000//每千字节手续费 1SEER
          }
        ],[
          61,{//认证处理
            "fee": 100000//手续费1SEER
          }
        ]
      ],
      "scale": 10000
    },
    "block_interval": 3,//块间隔时间，3秒
    "maintenance_interval": 86400,//计票更新时间 86400秒，一天
    "maintenance_skip_slots": 3,
    "committee_proposal_review_period": 1209600,//
    "maximum_transaction_size": 2048,//
    "maximum_block_size": 2000000,//
    "maximum_time_until_expiration": 86400,//
    "maximum_proposal_lifetime": 2419200,//
    "maximum_asset_whitelist_authorities": 50,//
    "maximum_authenticator_count": 1001,//
    "maximum_committee_count": 1001,//
    "maximum_authority_membership": 10,//
    "network_percent_of_fee": 6000,//
    "lifetime_referrer_percent_of_fee": 0,//
    "cashback_vesting_period_seconds": 31536000,//
    "cashback_vesting_threshold": 10000000,//
    "count_non_member_votes": true,//
    "allow_non_member_whitelists": false,//
    "witness_pay_per_block": 300000,//
    "max_predicate_opcode": 1,//
    "fee_liquidation_threshold": 10000000,//
    "accounts_per_fee_scale": 1000,//
    "account_fee_scale_bitshifts": 4,//
    "max_authority_depth": 2,//
    "min_guaranty_per_room": "10000000000",//
    "max_oracle_reward": 100000000,//
    "fixed_witness_count": 21,//
    "maximum_profit_witness_count": 101,//
    "maximun_seer_settles_per_block": 1000,//
    "supported_authenticate_types": 7,//
    "extensions": []
  },
  "next_available_vote_id": 8,
  "active_committee_members": [//活跃理事会成员
    "1.4.0",
......
    "1.4.6"
  ],
  "active_witnesses": [//活跃主力见证人
    "1.5.22",
   ......
    "1.5.73"
  ],
  "active_collateral_witnesses": [//活跃候选见证人
    "1.5.61",
......
    "1.5.67"
  ],
  "active_supervisors": [],
  "active_authenticators": [],
  "seer_exploded": false
}

```


4,dynamic_global_property_object    get_dynamic_global_properties() const;
参数：无 
作用：列出链的当前全局动态参数
示例：get_dynamic_global_properties


区块链状态指令：
1，	optional<signed_block_with_info>  get_block(uint32_t num)
参数：块号
作用：显示第num个块的概况
示例：get_block  10000

2，	uint64_t  get_account_count()const;
参数：无
作用：显示当前链上有多少个注册账户
示例：get_account_count

3，	map<string, account_id_type>   list_accounts(const string& lowerbound, uint32_t limit);
参数：lowerbound账户名下标, limit 返回结果的数量上限
作用：列出账号名大于lowerbound的账户
示例：list_accounts  "" 100

4，	vector<asset>   list_account_balances(const string& id);
参数：id可以是账户名，也可以是账户的id
作用：列出账号为id的账户的各资产余额
示例：list_account_balances  abc

5，	vector<asset_object>  list_assets(const string& lowerbound, uint32_t limit)const;
参数：lowerbound资产名下标, limit 返回结果的数量上限
作用：列出资产名大于lowerbound的资产
示例：list_assets  ""  100

6，	vector<operation_detail>  get_account_history(string name, int limit)const;
参数：name可以是账户名或id,limit 为返回结果的数量上限
作用：列出账户name的操作历史记录
示例：get_account_history  abc  100

7，	account_object   get_account(string account_name_or_id) const;
参数：account_name_or_id是账户名或id
作用：列出账户account_name_or_id的详细情况
示例：get_account  abc
      get_account  1.2.135

8，	asset_object    get_asset(string asset_name_or_id) const;
参数：asset_name_or_id是资产名或资产id
作用：列出资产asset_name_or_id的详细情况
示例：get_asset ABC
		  get_asset 1.3.31

9，	account_id_type   get_account_id(string account_name_or_id) const;
参数：account_name_or_id是账户名
作用：列出账户account_name_or_id的账户id
示例：get_account_id  abc

10，	asset_id_type   get_asset_id(string asset_name_or_id) const
参数：asset_name_or_id是资产名
作用：列出名为asset_name_or_id的资产的id
示例：get_asset_id ABC

11，	variant                           get_object(object_id_type id) const; 
参数：id是可以是任意SEER数据的id，比如account、asset、witness、balance、oracle……
作用：根据对象的id返回该对象
示例：get_object 1.2.0
get_object 2.13.3
说明：该接口不支持room类型,因room对象可能极其巨大,如需获取room对象请使用get_seer_room指令

钱包相关指令：
1，	string  get_wallet_filename() const;
参数：无
作用：列出当前钱包文件存放的路径
示例：get_wallet_filename

2，	vector<account_object>   list_my_accounts();
参数：无
作用：列出当前钱包里的所有账户
示例：list_my_accounts

3，	string  get_private_key(public_key_type pubkey)const
参数：pubkey为指定公钥
作用：列出钱包里pubkey所对应的私钥
示例：
get_private_key  SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ

4，	void    lock();
参数：无
作用：锁定当前钱包
示例：lock

5，	void    unlock(string password);
参数：password为钱包密码
作用：使用password解锁当前钱包
示例：unlock 1234567890

6，	void    set_password(string password);
参数：password为钱包密码
作用：设置或修改当前钱包密码为password, 新钱包及解锁状态下可使用
示例：set_password  1234567890

7，	map<public_key_type, string> dump_private_keys();
参数：无
作用：导出当前钱包所有私钥
示例：dump_private_keys

8，	brain_key_info  suggest_brain_key()const;
参数：无
作用：随机生成脑钱包密钥
示例：suggest_brain_key

9，	bool import_key(string account_name_or_id, string wif_key);
参数：account_name_or_id 为用户名或id，wif_key为私钥
作用：通过私钥wif_key往钱包里导入账户account_name_or_id
示例：import_key abc  5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY

10，	map<string, bool> import_accounts(string filename, string password); 
参数：filename 为钱包文件名，password为密码
作用：将钱包文件filename里的账户导入当前钱包
示例：import_accounts  "d:\wallet.json" 12345

11，	vector< signed_transaction > import_balance(string account_name_or_id, const vector<string>& wif_keys, bool broadcast);
参数：account_name_or_id 为账户名或id，wif_keys为私钥组(可含1到多个私钥)
作用：将私钥组wif_keys里的所有余额导入账户account_name_or_id
示例：
import_balance  abc  ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"]  true

import_balance  abc  ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"," 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUB"," 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUC"]  true

12，	signed_transaction  register_account(string name,
			public_key_type owner,
			public_key_type active,
			string  registrar_account,
			string  referrer_account,
			uint32_t referrer_percent,
			bool broadcast = false);
参数：name为所注册账户名
      owner为所注册账户的owner
active为所注册账户的active
registrar_account为注册者
referrer_account为推荐人
referrer_percent为推荐人获取手续费的百分比  10表10%, 20表20%
作用：注册新账户
示例：
register_account bb SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ  abc cde 20 true

13，	signed_transaction  upgrade_account(string name, bool broadcast); 
参数：name为账户名或者id
作用：升级账户等级到终身会员
示例：upgrade_account abc true

14，	signed_transaction transfer(string from,
				string to,
				string amount,
				string asset_symbol,
				string memo,
				bool broadcast = false);
参数：from为转出账户,to为接收账户,amount为转账数量, asset_symbol为资产名,memo为备注。from/to 可以是用户名或者id。 
作用：转账
示例：transfer abc cde 100 SEER "give you 100 SEER" true



signed_transaction sell_asset(string seller_account,
				string amount_to_sell,
				string   symbol_to_sell,
				string min_to_receive,
				string   symbol_to_receive,
				uint32_t timeout_sec = 0,
				bool     fill_or_kill = false,
				bool     broadcast = false);
参数：seller_account为卖出账户, amount_to_sell为出售的资产数量, symbol_to_sell为想要出售的资产, min_to_receive为要购买的资产数量, symbol_to_receive要购买的资产 
作用：市场交易的卖出
示例：sell_asset tester 10 SEER 1000 ABCDE 0 false true

15，	signed_transaction create_asset(string issuer, 
				string symbol,
				uint8_t precision,
				asset_options common,
				bool broadcast = false);
参数：issuer为发行人, symbol为资产名, precision为精度, common为资产属性。 
作用：发行新资产
示例：create_asset good  ABCDE 5 {max_supply : 10000,market_fee_percent : 10,max_maarket_fee : 10000000,issuer_permissions : 31,flags : 0,core_exchange_rate : {base : {amount : 10,asset_id : 1.3.1},quote : {amount : 10,asset_id : 1.3.0}},whitelist_authorities : [],blacklist_authorities : [],whitelist_markets : [],blacklist_markets : [],description : "create test asset",extensions : [] } true


signed_transaction issue_asset(string to_account, string amount,
				string symbol,
				string memo,
				bool broadcast = false);
参数：to_account为接收账户名或id，amount为数量，symbol为资产名, memo为备注
作用：资产创建者给to_account派发数量为amount的symbol资产
示例：issue_asset good 0.0001 ABCDE  "memo"  true


signed_transaction update_asset(string symbol,
				optional<string> new_issuer,
				asset_options new_options,
				bool broadcast = false);
参数：symbol为资产名, new_issuer为新的资产拥有人账号，new_options为资产新属性
作用：更新资产
示例：update_asset ABCDE tester {max_supply : 100000000000,market_fee_percent : 10,max_maarket_fee : 10000000,issuer_permissions : 31,flags : 31,core_exchange_rate : {base : {amount : 10,asset_id : 1.3.1},quote : {amount : 10,asset_id : 1.3.0}},whitelist_authorities : [],blacklist_authorities : [],whitelist_markets : [],blacklist_markets : [],description : "a",extensions : [] } true


signed_transaction fund_asset_fee_pool(string from,
				string symbol,
				string amount,
				bool broadcast = false);
参数：from为账户名或id，symbol为资产名,amount为数量
作用：给资产手续费池注入资金
示例：fund_asset_fee_pool tester ABCDE 1000 true

signed_transaction create_committee_member(string owner_account,
				string url,
				bool broadcast = false);
参数：owner_account为账户名或id，url为链接
作用：创建理事会成员
示例：create_committee_member  tester "https://baidu.com" true


16，	map<string, witness_id_type>       list_witnesses(const string& lowerbound, uint32_t limit);
参数：lowerbound为账户名的下标，limit为返回结果的数量上限
作用：列出受托人成员列表
示例：list_witnesses "" 100

17，	map<string, committee_member_id_type>       list_committee_members(const string& lowerbound, uint32_t limit); 
参数：lowerbound为账户名的下标，limit为返回结果的数量上限
作用：列出理事会成员列表
示例：list_committee_members "" 100

18，	witness_object get_witness(string owner_account); 
参数：owner_account为账户名或者id
作用：列出账户为owner_account的受托人
示例：get_witness abc

19，	committee_member_object get_committee_member(string owner_account); 
参数：owner_account为账户名或者id
作用：列出账户为owner_account的理事会成员
示例：get_committee_member  abc


20，	signed_transaction create_witness(string owner_account,string url,bool broadcast = false); 
参数：owner_account为账户名或id,url为网址
作用：创建受托人
示例：create_witness abc  "http://www.baidu.com" true


21，	signed_transaction update_witness(string witness_name, 
				string url,
				string block_signing_key,
				bool broadcast = false);
参数：witness_name为账户名或id，url为网址, block_signing_key为出块时签名的公钥
作用：更新受托人资料
示例：
update_witness abc "http://www.google.com"  SEER 4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ true


22，	vector<vesting_balance_object_with_info> get_vesting_balances(string account_name); 
参数：account_name为账户名或id
作用：列出用户的锁定余额详情
示例：get_vesting_balances  abc

23，	signed_transaction withdraw_vesting(
				string witness_name,
				string amount,
				string asset_symbol,
				bool broadcast = false);
参数：witness _name为账户名或id,amount为数量, asset_symbol为资产名
作用：从锁定余额中领取余额，该命令仅供受托人使用
示例：withdraw_vesting  abc 1000 SEER true

24，	signed_transaction vote_for_committee_member(string voting_account, 
				string committee_member,
				bool approve,
				bool broadcast = false);
参数：voting _name为投票人账户名或id, committee_member为理事会成员用户名或id，approve为投票或者撤票
作用：对理事会成员进行投票
示例：vote_for_committee_member  abc  cde true true


25，	signed_transaction set_voting_proxy(string account_to_modify, 
				optional<string> voting_account,
				bool broadcast = false);
参数：account_to_modify为投票人账户名或id, voting_account为代理人用户名或id(为空时为取消代理人)
作用：设置投票代理人
示例：set_voting_proxy abc cde true
或    set_voting_proxy abc null true

Seer特有指令：
1，	signed_transaction witness_create_collateral(string account, 
				string amount,
				bool broadcast = false);
参数：account为受托人id或者账户名或账户id, amount为抵押的SEER数量
作用：增加受托人抵押
示例：witness_create_collateral abc 1000 true

2，	vector<witness_collateral_object>  	list_witness_collaterals(string account); 
参数：account为受托人id或者账户名或账户id
作用：列出指定受托人的抵押清单
示例：list_witness_collaterals abc


signed_transaction  witness_cancel_collateral(string account,
				string 	collateral_id,
				bool broadcast = false);
参数：account为受托人id或者账户名或账户id, collateral_id抵押项的id
作用：撤销指定的抵押项
示例：witness_cancel_collateral  abc  2.16.333  true

signed_transaction witness_claim_collateral(string account,
				string 	collateral_id,
				bool broadcast = false);
参数：account为受托人id或者账户名或账户id, collateral_id抵押项的id
作用：领取已经撤销抵押余额或者领取抵押利息
示例：

领取已撤销抵押余额：witness_claim_collateral  abc  "2.16.333" true
领取抵押利息：witness_claim_collateral  abc  "" true



map<string, seer_oracle_id_type> lookup_oracle_accounts(const string& lower_bound_name, uint32_t limit)const;
参数：lowerbound为账户名的下标，limit为返回结果的数量上限
作用：列出预言机成员列表
示例：lookup_oracle_accounts  "" 100

vector<optional<seer_oracle_object>> get_oracles(const vector<seer_oracle_id_type>& oracle_ids)const;
参数：oracle_ids为预言机的id集
作用：根据给定的id集列出预言机成员列表
示例：get_oracles  [1.13.1,1.13.2,1.13.4]

fc::optional<seer_oracle_object> get_oracle_by_account(account_id_type account)const;
参数：account为账户id
作用：根据对方账户id查询预言机
示例：get_oracle_by_account 1.2.135


map<string, seer_house_id_type> lookup_house_accounts(const string& lower_bound_name, uint32_t limit)const;
参数：lowerbound为账户名的下标，limit为返回结果的数量上限
作用：列出SEER平台列表
示例：lookup_ house _accounts "" 100


	vector<optional<seer_house_object>> get_houses(const vector<seer_house_id_type>& house_ids)const;
参数：house _ids为平台的id集
作用：根据给定的id集列出平台列表
示例：get_oracles  [1.14.1,1.14.2,1.14.4]

	fc::optional<seer_house_object> get_house_by_account(account_id_type account)const;
参数：account为账户id
作用：根据对方账户id查询平台
示例：get_ house _by_account 1.2.135


optional<seer_room_object> get_seer_room(const seer_room_id_type& room_id, uint32_t start_index, uint32_t limit)const;
参数：room_id为房间id，start_index为投注记录的开始索引,limit为返回结果中投注记录的最大数量
作用：根据房间id查询房间详情（不是完整的房间,因投注太多的情况下房间空间会非常大）
示例：get_seer_room  1.15.3  0   100


vector<seer_room_id_type>  get_rooms_by_label(const string& label, uint32_t limit)const;
参数：label为需要查找的索引, limit为返回结果的最大数量
作用：查询标签为label的房间
示例：get_rooms_by_label "football"  100


signed_transaction  oracle_create(string account,
				int64_t	guaranty,
				string   description,
				string 	script,
				bool broadcast = false);
参数：account为账户名或账户id, guaranty为保证金, description为描述，script为脚本
作用：创建预言机
示例：oracle_create abc 100000 "the first oracle" "http://www.a.com/show_me.jpg"  true

			signed_transaction oracle_update(string account,
				string   oracle_id,
				int64_t	guaranty,
				optional<string>   description,
				optional<string>   script,
				bool broadcast = false);
参数：account为账户名或账户id, oracle_id为预言机id,guaranty为保证金, description为描述，script为脚本
作用：更新预言机,guaranty负数时为提取保证金,为正为添加保证金
示例：oracle_ update abc 1.13.5 0  "not the first oracle"  {}  true

	signed_transaction oracle_input(string account,
				string   oracle_id,
				string	room_id,
				vector<uint8_t>   input,
				bool broadcast = false);
参数：account为账户名或账户id, oracle_id为预言机id, room_id为房间id, input为输入数据
作用：预言机给房间输入预测结果
示例：oracle_ input  abc 1.13.5  1.15.3  [0]  true


signed_transaction house_create(string account,
				int64_t	guaranty,
				string   description,
				string 	script,
				bool broadcast = false);
参数：account为账户名或账户id, guaranty为保证金, description为描述，script为脚本
作用：创建平台
示例：house _create abc 100000 “the first house” “http://www.a.com/show_me.jpg”  true

signed_transaction house_update(string account,
				string   house_id,
				int64_t	guaranty,
				optional<string>   description,
				optional<string>   script,
				bool broadcast = false);
参数：account为账户名或账户id, house_id为平台id,guaranty为保证金, description为描述，script为脚本
作用：更新平台,guaranty负数时为提取保证金,为正为添加保证金
示例：house_update abc 1.14.5 0  "not the first house"  {}  true

		
signed_transaction room_create(string account,
				vector<string>			label,
				string   		  		description,
				string 					script,
				uint8_t					room_type,
				room_option				option,
				optional<seer_room_option_lmsr>		room_lmsr,
				optional<seer_room_option_type1>	room_type1,
				optional<seer_room_option_type2>	room_type2,
				optional<seer_room_option_type3>	room_type3,
				bool broadcast = false);
参数：account为账户名或账户id, label为标签,description为描述，script为脚本, room_type为房间类型，option为房间通用参数，room_type为0时表示LMSR
类型则room_lmsr必须有值，room_type为1时表示简单竞猜玩法则room_type1必须有值，room_type为2时表示创建者自定义赔率的简单竞猜类型则room_ type2必须有值，room_type为3时表示彩票类型玩法则room_ type3必须有值
作用：创建房间
示例：
room_create good ["football","basketball","games"] "test room create" "show me"  0  {"result_owner_percent":0,"reward_per_oracle":"2000000","accept_asset":"1.3.0","minimum":"1","maximum":"100000000","start":"2018-03-26T07:17:31","stop":"2018-03-26T07:17:31","input_duration_secs":0,"filter":{"reputation":"0","guaranty":"0","volume":"0"},"allowed_oracles":["1.13.0"]}  {"selection_description":["No","Yes"],"L":"100000","total_shares":"1","items":["1"],"range":2,"participators":[],"solds":[],"settled_balance":"0","settled_index":0,"settled_sold_index":0,"histories":[]} null null null true 

signed_transaction room_update(string account,
				seer_room_id_type		room,
				optional<string>  		description,
				optional<string>		script,
				optional<room_option>	 option,
				optional<vector<uint64_t>>	new_awards,
				bool broadcast = false);
参数：account为账户名或账户id, label为标签,description为描述，script为脚本, room_type为房间类型，option为房间通用参数，new_awards为 room_ type2的自定义赔率
作用：更新房间
示例：room_update good 1.15.1 "change the description" null null null true

signed_transaction  room_open(string account,
				seer_room_id_type		room,
				fc::time_point_sec		start,
				fc::time_point_sec		stop,
				uint32_t 	            input_duration_secs,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id, start为房间预测开启时间，stop为停止预测时间, input_duration_secs为停止参与预测以后预言机和创建者输入结果的时限
作用：开启房间
示例： room_open abc 1.15.3 “2018.4.1 21:00:00”  “2018.4.5 21:00:00”  86400 true
			
signed_transaction room_stop_participate(string account,
				seer_room_id_type		room,
				uint32_t 	            input_duration_secs,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id, input_duration_secs为停止参与预测以后预言机和创建者输入结果的时限
作用：停止参与预测
示例： room_stop_participate abc 1.15.3 86400 true
			
signed_transaction  room_input(string account,
				seer_room_id_type		room,
				vector<uint8_t>			input,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id, input为结果
作用：创建者输入预测结果
示例： 
单选：room_ input  abc 1.15.3  [3]  true
彩票：room_ input  abc 1.15.3  [1,5,3]  true

signed_transaction room_final(string account,
				seer_room_id_type		room,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id
作用：创建者统计预测结果,以及room_type3时计算预测正确的参与者详情)
示例：room_ final abc 1.15.3 true

			
signed_transaction room_settle(string account,
				seer_room_id_type		room,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id
作用：创建者派发奖励
示例：room_ settle  abc 1.15.3 true

			
signed_transaction  room_participate(string account,
				seer_room_id_type		room,
				uint8_t				   	type,
				vector<uint8_t>		   	input,
				vector<set<uint8_t>>    input1,
				vector<vector<uint8_t>> input2,
				int64_t				   	amount,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id,type为输入类型,type为0时为单选input必须有值, type为1时为多选input1必须有值, type为2时为复选input2必须有值, amount为参与数量
作用：普通用户参与预测
示例：room_participate  abc 1.15.3  0  [1]  []  []  1000 true

			
signed_transaction room_close(string account,
				seer_room_id_type		room,
				bool 					remove,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id, remove为是否从平台删除该房间
作用：创建者关闭房间
示例：room_close abc 1.15.3  false true
			
signed_transaction room_claim(string  account,
				seer_room_id_type		room,
				int64_t 				amount,
				bool broadcast = false);
参数：account为账户名或账户id, room为房间id, amount为金额
作用：创建者从房间奖金池领取金额 
示例：room_claim abc 1.15.3  1000 true
注意：该指令只对room_type2和room_type3有效，而且amount是包括资产精度的，比如room_claim 1 SEER时amount值为100000
