---
nav: zh-Hans
search: zh-Hans
---

# 赛亚命令行指令指南

<p class="danger">
  
 `json`格式的返回数据中本没有`//`形式的注释，是写文档时为了方便大家阅读所加，注释中若有错误请通过 <a href="https://github.com/akirasen/seerdocs"> **github** </a> 联系我们。
</p>

## 启动cli_wallet

对Seer的命令行钱包`cli_wallet`常用指令进行说明，便于普通用户查阅。`cli_wallet`为命令行版本客户端钱包，所有操作都通过输入指令形式执行。

请下载最新版的钱包文件：https://github.com/seer-project/seer-core-package/releases

请下载最新版的测试网络命令行钱包进行测试：https://github.com/akirasen/seertestnet/releases

测试网络账号：okok 私钥：5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ 内有上千万测试币，欢迎体验。

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

### 区块链系统状态指令

#### 1. Info
variant `Info`()

参数：无

作用：显示当前Seer区块链的状态

示例：`info`

返回信息示例：
```json
 info
{
  "head_block_num": 2084691,//当前块高
  "head_block_id": "001fcf539d9b3593e31abd604c11fdd57f0bbffe",//当前块号
  "head_block_age": "0 second old",//上一个区块生成时间
  "next_maintenance_time": "21 hours in the future",//维护更新时间
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

#### 2. about
variant_object `about`()

参数：无

作用：显示当前Seer链相关的版本号

示例：`about`

返回信息示例：
```json
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


#### 3. get_global_properties
global_property_object `get_global_properties`() const;

参数：无

作用：列出链的当前全局参数

示例：`get_global_properties`

<p class="tip">
  提示：`"fee"`、`"price_per_kbyte"`等费率相关参数值的单位均为 `1/100000` ，代表着SEER支持的最大小数点后数据精度。
</p>

返回信息示例：
```json 
get_global_properties
{
  "id": "2.0.0",
  "parameters": {
    "current_fees": {//当前费率
      "parameters": [[
          0,{//转账
            "fee": 200000,//手续费 2SEER 
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
    "maintenance_interval": 86400,//维护更新时间 86400秒，一天
    "maintenance_skip_slots": 3,//维护时跳过的块间隔数
    "committee_proposal_review_period": 1209600,//理事会提案审查期 1209600秒 14天
    "maximum_transaction_size": 2048,//最大交易大小 2048K 即2M
    "maximum_block_size": 2000000,//最大单个块数据大小 2000000K 即约1.9G
    "maximum_time_until_expiration": 86400,//在到期之前，交易有效的最长生命周期（以秒为单位）
    "maximum_proposal_lifetime": 2419200,//在到期之前，提议的交易的最长生命周期（以秒为单位）
    "maximum_asset_whitelist_authorities": 50,//资产可列为白名单或黑名单权限的最大帐户数
    "maximum_authenticator_count": 1001,//最多认证者的数量
    "maximum_committee_count": 1001,//参与理事会最大人数
    "maximum_authority_membership": 10,//权限(多签)可以设置的最大数量的密钥/帐户
    "network_percent_of_fee": 6000,//支付给网络的手续费比例 此处为60%
    "lifetime_referrer_percent_of_fee": 0,//终身会员推荐人手续费分成比例
    "cashback_vesting_period_seconds": 31536000,//待解冻余额解冻周期，31536000秒，一年
    "cashback_vesting_threshold": 10000000,//待解冻余额领取门槛，100SEER
    "count_non_member_votes": true,//非会员账户是否投票
    "allow_non_member_whitelists": false,//非会员帐户能否设置白名单和黑名单
    "witness_pay_per_block": 300000,//主力见证人出块的每个块奖励，3 SEER
    "max_predicate_opcode": 1,//断言操作码需小于此数值
    "fee_liquidation_threshold": 10000000,
    "accounts_per_fee_scale": 1000,
    "account_fee_scale_bitshifts": 4,
    "max_authority_depth": 2,//权限(多签)可以设置的最大深度（级别）
    "min_guaranty_per_room": "10000000000",//每个房间最少抵押金：10万SEER
    "max_oracle_reward": 100000000,//每个预言机最高奖励：1000SEER
    "fixed_witness_count": 21,//主力见证人数量
    "maximum_profit_witness_count": 101,//获息见证人总数
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
  "active_collateral_witnesses": [//活跃获息见证人（主力+候选）
    "1.5.61",
......
    "1.5.67"
  ],
  "active_supervisors": [],//活跃监管者
  "active_authenticators": [],//活跃认证者
  "seer_exploded": false
}

```


#### 4. get_dynamic_global_properties
dynamic_global_property_object `get_dynamic_global_properties`() const;

参数：无 

作用：列出链的当前全局动态参数

示例：`get_dynamic_global_properties`

返回信息示例：
```json
get_dynamic_global_properties
{
  "id": "2.1.0",
  "head_block_number": 2090373,//当前区块高度
  "head_block_id": "001fe58546d87ff984f7ca2102bd4ebdacdb2453",//当前块号
  "time": "2018-07-30T07:26:27",//链上时间
  "current_witness": "1.5.25",//当前出块的见证人
  "next_maintenance_time": "2018-07-31T00:00:00",//下次维护更新时间
  "last_budget_time": "2018-07-30T00:00:00",//上次更新时间
  "witness_budget": "5962500000",//本期见证人预算总额
  "accounts_registered_this_interval": 4,//账户注册间隔
  "recently_missed_count": 0,//最近缺失区块数
  "current_aslot": 2096707,//当前总块（丢掉的块加实际块高）
  "recent_slots_filled": "340282366920938463463374607431768211455",//用于计算见证人参与度的参数
  "dynamic_flags": 0,
  "last_irreversible_block_num": 2090363//最近一个不可逆块块号
}
```

#### 5. get_block
optional<signed_block_with_info>  `get_block`(uint32_t num)

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
  "transaction_merkle_root": "72756b0f1f1711622c8030eae65e6db055200320",//区块产生时的加密校验
  "extensions": [],
  "witness_signature": "200d202d735de10f4f8213d71a8f946a2cc49bc02e930f682bea74321819b4bc7c4d436e366f1cad962f214eeaa42b5030fd716f692077f135b3cf33c688f68f1f",//见证人签名
  "transactions": [{
      "ref_block_num": 58864,//引用的区块号
      "ref_block_prefix": 2207768636,//引用的区块头
      "expiration": "2018-07-30T07:33:51",//交易过期时间
      "operations": [[
          0,{
            "fee": {
              "amount": 200000,//手续费 2
              "asset_id": "1.3.0"//手续费类型 1.3.0指SEER
            },
            "from": "1.2.1250",//发起用户ID
            "to": "1.2.1292",//接收用户ID
            "amount": {
              "amount": 2000000000,//金额20000
              "asset_id": "1.3.1"//金额类型 1.3.1即OPC
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



#### 6. get_account_count
uint64_t `get_account_count`()const;

参数：无

作用：显示当前链上有多少个注册账户

示例：`get_account_count`

返回信息示例：
```json
get_account_count
13528
```

#### 7. list_accounts
map<string, account_id_type> `list_accounts`(const string& lowerbound, uint32_t limit);

参数：lowerbound:账户名下标, limit:返回结果的数量上限

作用：列出账号名大于lowerbound的账户

示例：`list_accounts` "" 100

返回信息示例：
```json
list_accounts "" 100
[[
    "a-1233",
    "1.2.11123"
  ],
  ......
  [
    "a45452352",
    "1.2.10241"
  ]
]
```
<p class="tip">
  此例未指定账号名，所以从a开始，若设置账号名大于test，则会列出从test开始的test01、test03等账户。
</p>

示例：`list_accounts` "seer" 10

返回信息示例：
```json
list_accounts "seer" 10
[[
    "seer",
    "1.2.16"
  ],
  ......
  [
    "seer-1017",
    "1.2.9189"
  ]
]
```

#### 8. list_account_balances
vector<asset>   `list_account_balances`(const string& id);

参数：id可以是账户名，也可以是账户的id

作用：列出账号为id的账户的各资产余额

示例：`list_account_balances` abc

返回信息示例：
```json
list_account_balances abc
84934.96329 SEER
144309.60000 ABC
```
#### 9. list_assets
vector<asset_object>  `list_assets`(const string& lowerbound, uint32_t limit)const;

参数：lowerbound资产名下标, limit 返回结果的数量上限

作用：列出资产名大于lowerbound的资产
示例：`list_assets` "SEER" 100

返回信息示例：
```json
list_assets "SEER" 100
[{
    "id": "1.3.0",//SEER的资产ID
    "symbol": "SEER",//资产名
    "precision": 5,//小数点后精度
    "issuer": "1.2.3",//创建者
    "options": {
      "max_supply": "1000000000000000",//最大供给量
      "market_fee_percent": 0,//交易手续费收取比例
      "max_market_fee": "1000000000000000",//最大市场手续费
      "issuer_permissions": 0,
      "flags": 0,
      "core_exchange_rate": {//发生手续费会按以下比例 从费用池自动将此资产换为核心资产（SEER）用于支付费用
        "base": {
          "amount": 1,//对标市场基准资产的比例
          "asset_id": "1.3.0"//资产ID SEER
        },
        "quote": {
          "amount": 1,
          "asset_id": "1.3.0"//资产ID SEER
        }
      },
      "whitelist_authorities": [],//一组帐户，此资产的白名单。如果白名单非空，则只允许白名单中的帐户保留、使用或转移资产。
      "blacklist_authorities": [],//一组帐户，此资产的黑名单。如果设置了白名单，则只有这些帐户能进行此资产的发送、接收、交易等，但如果该帐户被列入黑名单，即使该帐户也列入白名单，它也不能操作此资产。
      "whitelist_markets": [],//定义此资产可在市场上组成交易对的资产
      "blacklist_markets": [],//定义此资产在市场上不可进行交易的资产，不得与白名单重叠
      "description": "",//资产描述
      "extensions": []
    },
    "dynamic_asset_data_id": "2.3.0"
  }
]
```
#### 10. get_account_history
vector<operation_detail>  `get_account_history`(string name, int limit)const;

参数：name可以是账户名或id,limit 为返回结果的数量上限

作用：列出账户name的操作历史记录

示例：get_account_history abc 10

<p class="warning">
如果涉及大量数据操作推荐使用本地全节点否则 limit 上限太高容易导致节点报错退出
</p>

返回信息示例：
```json
get_account_history abc 10
2018-07-30T07:06:18 Transfer 38000 SEER from abc123 to abc -- Unlock wallet to see memo.   (Fee: 3.36718 SEER)//时间 转账 数额 资产名 从 某账户 到 某账户 - 解锁以查看memo （手续费）
......
2018-07-30T02:04:39 Transfer 359998 SEER from abc to cbe2 -- Unlock wallet to see memo.   (Fee: 3.05468 SEER)

```
#### 11. get_account
account_object   `get_account`(string account_name_or_id) const;

参数：account_name_or_id是账户名或id

作用：列出账户account_name_or_id的详细情况

示例：`get_account` abc
     `get_account` 1.2.9981

返回信息示例：
```json
get_account abc
{
  "id": "1.2.9981",
  "membership_expiration_date": "1969-12-31T23:59:59",//此帐户的会员资格到期的时间。
  "registrar": "1.2.9981",//注册人
  "referrer": "1.2.9981",//推荐人
  "lifetime_referrer": "1.2.9981",//终身会员推荐人
  "network_fee_percentage": 6000,//手续费分配给网络的百分比
  "lifetime_referrer_fee_percentage": 4000,//手续费分配给终身会员推荐人的百分比
  "referrer_rewards_percentage": 0,//推荐人获得的比例
  "name": "abc",//名称
  "owner": {//账户权限 多签管理
    "weight_threshold": 50,//阈值
    "account_auths": [[
        "1.2.9987",//控制人id
        25//权重
      ],[
        "1.2.9990",//控制人id
        25//权重
      ],[
        "1.2.10041",//控制人id
        25//权重
      ]
    ],
    "key_auths": [[
        "SEER4uy8k3qrVJVJG5a1Nif9fTi4FDVUnWgmqYoNapdxBagMsT3vRh",//账户权限公钥
        1
      ]
    ],
    "address_auths": []
  },
  "active": {
    "weight_threshold": 1,/阈值
    "account_auths": [[
        "1.2.9990",//控制人id
        1//权重
      ]
    ],
    "key_auths": [[
        "SEER646RGdL4gncz7y834wfGfcHECnKdbdVWd6gh9aEYdn3HWyhBjB",//资金权限公钥
        1
      ]
    ],
    "address_auths": []
  },
  "options": {
    "memo_key": "SEER646RGdL4gncz7y834wfGfcHECnKdbdVWd6gh9aEYdn3HWyhBjB",//备注权限公钥
    "voting_account": "1.2.5",
    "num_committee": 0,
    "num_authenticator": 0,
    "num_supervisor": 0,
    "votes": [],
    "extensions": []
  },
  "statistics": "2.5.9981",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "cashback_vb": "1.11.11",
  "owner_special_authority": [
    0,{}
  ],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0,
  "country": 0,
  "status": 0,
  "authentications": []
}
```
#### 12. get_asset
asset_object `get_asset`(string asset_name_or_id) const;

参数：asset_name_or_id是资产名或资产id

作用：列出资产asset_name_or_id的详细情况

示例：`get_asset` SEER
     `get_asset` 1.3.31

返回信息示例：
```json
get_asset SEER
{
  "id": "1.3.0",
  "symbol": "SEER",//资产名
  "precision": 5,//精度
  "issuer": "1.2.3",//发行人
  "options": {
    "max_supply": "1000000000000000",//最大供给
    "market_fee_percent": 0,
   ......
   ,
  "dynamic_asset_data_id": "2.3.0"
}
```
#### 13. get_account_id
account_id_type `get_account_id`(string account_name_or_id) const;

参数：account_name_or_id是账户名

作用：列出账户account_name_or_id的账户id

示例：`get_account_id` gateway

返回信息示例：
```json
get_account_id abc
"1.2.9981"
```
#### 14. get_object
variant `get_object`(object_id_type id) const; 

参数：id是可以是任意SEER数据的id，比如account、asset、witness、balance、oracle……

作用：根据对象的id返回该对象

示例：`get_object` 1.3.0  //资产

     `get_object` 1.2.9981 //账户
     
     `get_object` 1.5.55 //见证人
     
<p class="warning">
	说明：该接口不支持room类型,因room对象可能极其巨大,如需获取room对象请使用get_seer_room指令
</p>

返回信息示例：
```json
get_object 1.5.55//这是获取见证人信息
[{
    "id": "1.5.55",//见证人ID
    "witness_account": "1.2.10238",//见证人对应的用户id
    "last_aslot": 0,
    "signing_key": "SEER6EhrGFDawS3J1WfvTZVXDn44TD96PqvvbdRhkpz3EKxRcjR3v1",//见证人签名公钥
    "collaterals": [
      "2.16.110"//抵押号
    ],
    "collateral_profit": 751206254,//抵押收益 7512
    "total_collateral": "27000000000",//总抵押数 27万
    "cancelling_collateral": 0,//解锁中的抵押数
    "url": "https://weibo.com/p/1005055125210412/home?from=page_100505&mod=TAB&is_all=1#place",//见证人网页
    "total_missed": 0,//丢块数
    "last_confirmed_block_num": 0,//最后一次确认的块号
    "recent_maintenance_missed_blocks": [
      0,
      0
    ]
  }
]
```
### 钱包管理指令

#### 1. set_password
void `set_password`(string password);

参数：password为钱包密码

作用：设置或修改当前钱包密码为password, 新钱包及解锁状态下可使用

示例：`set_password` 1234567890

返回信息示例：
```json
new >>> set_password 1234567890
set_password 1234567890
null
locked >>>
```

#### 2. unlock
void `unlock`(string password);

参数：password为钱包密码

作用：使用password解锁当前钱包

示例：`unlock` 1234567890

返回信息示例：
```json
locked >>> unlock 1234567890
unlock 1234567890
null
unlocked >>>
```

#### 3. lock
void `lock`();

参数：无

作用：锁定当前钱包

示例：`lock`

返回信息示例：
```json
unlocked >>> lock
lock
null
locked >>>
```

#### 4. suggest_brain_key
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

#### 5. import_key
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

#### 6. get_private_key
string  `get_private_key`(public_key_type pubkey)const

参数：pubkey为指定公钥

作用：列出钱包里pubkey所对应的私钥

示例：`get_private_key`  SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ

返回信息示例：
```json
unlocked >>> get_private_key SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ
get_private_key SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ
"5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY"

```
#### 7. list_my_accounts
vector<account_object>   `list_my_accounts`();

参数：无

作用：列出当前钱包里的所有账户

示例：`list_my_accounts`

返回信息示例：
```json
list_my_accounts
[{
    "id": "1.2.11006",//账户ID
    "membership_expiration_date": "1970-01-01T00:00:00",//会员资格到期时间
    ......
    "top_n_control_flags": 0,
    "country": 0,
    "status": 0,
    "authentications": []
  },{
    "id": "1.2.10021",//账户id
    "membership_expiration_date": "1970-01-01T00:00:00",
    ......
    "top_n_control_flags": 0,
    "country": 0,
    "status": 0,
    "authentications": []
  }
]
```

#### 8. dump_private_keys
map<public_key_type, string> `dump_private_keys`();

参数：无

作用：导出当前钱包所有私钥

示例：`dump_private_keys`

返回信息示例：
```json
dump_private_keys
[[
    "SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ",
    "5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY"
  ],[
    "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5",
    "5Kb1PcVBpKWPacsgPwZ8KdesmBbvqnmAdYYKQtYVEpBJVF5GRci"
  ]
]
```

#### 9. import_balance
vector< signed_transaction > `import_balance`(string account_name_or_id, const vector<string>& wif_keys, bool broadcast);
	
参数：account_name_or_id 为账户名或id，wif_keys为私钥组(可含1到多个私钥)
	
作用：将私钥组wif_keys里的所有余额导入账户account_name_or_id

示例：
`import_balance`  abc  ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"]  true

`import_balance`  abc  ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"," 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUB"," 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUC"]  true

返回信息示例：
```json
unlocked >>> import_balance abc ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"]  true
import_balance abc ["5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUA"]  true
40119ms th_a       wallet.cpp:4234               import_balance       ] balances: []
[]
```
#### 10. import_accounts
map<string, bool> `import_accounts`(string filename, string password); 

参数：filename 为钱包文件名，password为密码

作用：将钱包文件filename里的账户导入当前钱包

示例：`import_accounts`  "d:\wallet.json" 12345

### 账户及资产管理指令

#### 1. register_account
signed_transaction  `register_account`(string name, public_key_type owner, public_key_type active, string  registrar_account, string  referrer_account, uint32_t referrer_percent, bool broadcast = false);

参数：name为所注册账户名 owner为所注册账户的owner active为所注册账户的active registrar_account为注册者 referrer_account为推荐人 referrer_percent为推荐人获取手续费的百分比 10表10%, 20表20%

作用：注册新账户

示例：`register_account` bb SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ abc cde 20 true

返回信息示例：
```json
register_account cba SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5 SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5 abc abc 20 true
{
  "ref_block_num": 50287,//引用的区块号
  "ref_block_prefix": 1187139268,//引用的区块头
  "expiration": "2018-07-30T14:16:18",//交易过期时间
  "operations": [[
      4,{//注册账户
        "fee": {
          "amount": 200014355,//手续费=2000SEER基础+0.14355字节手续费
          "asset_id": "1.3.0"
        },
        "registrar": "1.2.42",//注册人
        "referrer": "1.2.42",//推荐人
        "referrer_percent": 2000,//推荐人手续费分成=20%
        "name": "cba",//账户名
        "owner": {
          "weight_threshold": 1,//阈值
          "account_auths": [],
          "key_auths": [[
              "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5",
              1//权重
            ]
          ],
          "address_auths": []
        },
        "active": {
          "weight_threshold": 1,//阈值
          "account_auths": [],
          "key_auths": [[
              "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5",
              1//权重
            ]
          ],
          "address_auths": []
        },
        "options": {
          "memo_key": "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5",//备注公钥
          "voting_account": "1.2.5",
          "num_committee": 0,
          "num_authenticator": 0,
          "num_supervisor": 0,
          "votes": [],
          "extensions": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "20721186072027f779934b5a17c5272174b4338eadb946e3c326782d7e20b7f4d81068c2575e0194432750d12191cee33f483d1b01476b8700ae70233187635fb0"
  ]
}
```
#### 2. transfer
signed_transaction `transfer`(string from, string to, string amount, string asset_symbol, string memo, bool broadcast = false);

参数：from为转出账户,to为接收账户,amount为转账数量, asset_symbol为资产名,memo为备注。from/to 可以是用户名或者id。 

作用：转账

示例：`transfer` abc cde 100 SEER "give you 100 SEER" true

返回信息示例：
```json
transfer abc cde 100 SEER "give you 100 SEER" true
{
  "ref_block_num": 50522,//引用的区块号
  "ref_block_prefix": 3064116022,//引用的区块头
  "expiration": "2018-07-30T14:28:03",//交易过期时间
  "operations": [[
      0,{//转账
        "fee": {//手续费
          "amount": 2089843,//金额
          "asset_id": "1.3.0"//资产
        },
        "from": "1.2.42",//转出账户id
        "to": "1.2.108",//转入账户id
        "amount": {
          "amount": 10000000,//金额
          "asset_id": "1.3.0"//资产
        },
        "memo": {
          "from": "SEER7nLQYsQzsMRNxQCadGvzAoTXq9Wwep2wMYw59ttDCY7zxr19DK",
          "to": "SEER6xtsMY5DyhRokjGh6QbBhJ9aHNoY1UB2tFUZmMdKr8uN55j5q5",
          "nonce": "14989512520743889312",
          "message": "cbb1b8f0ca1dccb494a146a6076f30fb"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f53d69c8aeaeb94e531ff82f100fea2ba2f0e756199bc5120cc90c33001b5d95c055138ea309e692259e98cb3d77d6e219fc04feca32762cbfd72488bbc034bdc"
  ]
}
```

#### 3. upgrade_account
signed_transaction  `upgrade_account`(string name, bool broadcast); 

参数：name为账户名或者id

作用：升级账户等级到终身会员

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

#### 4. sell_asset
signed_transaction `sell_asset`(string seller_account, string amount_to_sell, string   symbol_to_sell, string min_to_receive, string   symbol_to_receive, uint32_t timeout_sec = 0, bool     fill_or_kill = false, bool     broadcast);

参数：seller_account为卖出账户, amount_to_sell为出售的资产数量, symbol_to_sell为想要出售的资产名, min_to_receive为要购买的资产数量, symbol_to_receive要购买的资产 ，timeout_sec 为订单在取消前留在列表中的时间（秒），fill_or_kill指是否启用“全额否则取消功能”，broadcast指是否广播。

作用：市场交易的卖出

示例：`sell_asset` abc 1000 SEER 1000 ABC 0 false true

返回信息示例：
```json
sell_asset abc 1000 SEER 1000 ABC 0 false true
{
  "ref_block_num": 51327,
  "ref_block_prefix": 2834879860,
  "expiration": "2018-07-30T15:08:18",
  "operations": [[
      1,{
        "fee": {//手续费
          "amount": 500000,//金额5
          "asset_id": "1.3.0"//SEER
        },
        "seller": "1.2.108",//卖出者ID
        "amount_to_sell": {//卖出数量
          "amount": 100000000,//金额100
          "asset_id": "1.3.0"//SEER
        },
        "min_to_receive": {//出售上述数量资产愿意收到的最低金额
          "amount": 10000000,//金额100
          "asset_id": "1.3.1"//测试网络此id对应的是ABC测试币
        },
        "expiration": "1969-12-31T23:59:59",
        "fill_or_kill": false,//未开启“全额否则取消”
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f202094a93aabdb303a0a6076014a14c3ef18c40927dfd9f8f1e83a0f98893083311f8d41a0665351be02ba2d5c6ea0e314d90deb7d2e612e2c79c3f3546c43cf"//交易签名
  ]
}
```
#### 5. create_asset
signed_transaction `create_asset`(string issuer,  string symbol, uint8_t precision, asset_options common, bool broadcast);

参数：issuer为发行人, symbol为资产名, precision为精度, common为资产属性。 

作用：发行新UIA资产

示例：`create_asset` good  ABCDE 5 {max_supply : 10000000000000,market_fee_percent : 10,max_market_fee : 1000000000,issuer_permissions : 31,flags : 0,core_exchange_rate : {base : {amount : 100,asset_id : 1.3.1},quote : {amount : 10,asset_id : 1.3.0}},whitelist_authorities : [],blacklist_authorities : [],whitelist_markets : [],blacklist_markets : [],description : "test",extensions : [] } true

返回信息示例：
```json
create_asset good ABCDE 5 {max_supply : 10000000000000,market_fee_percent : 10,max_market_fee : 1000000000,issuer_permissions : 31,flags : 0,core_exchange_rate : {base : {amount : 100,asset_id : 1.3.1},quote : {amount : 10,asset_id : 1.3.0}},whitelist_authorities : [],blacklist_authorities : [],whitelist_markets : [],blacklist_markets : [],description : "test",extensions : [] } true
{
  "ref_block_num": 3273,
  "ref_block_prefix": 3393339853,
  "expiration": "2018-07-31T05:42:33",
  "operations": [[
      9,{
        "fee": {
          "amount": "50000000000",//手续费50万
          "asset_id": "1.3.0"//SEER
        },
        "issuer": "1.2.42",//创建者
        "symbol": "ABCDE",//资产名
        "precision": 5,//精度
        "common_options": {
          "max_supply": "10000000000000",//最大供给
          "market_fee_percent": 10,//交易手续费比例 10表示0.1%手续费
          "max_market_fee": 1000000000,//最多收取的手续费
          "issuer_permissions": 31,
          "flags": 0,
          "core_exchange_rate": {
            "base": {
              "amount": 100,
              "asset_id": "1.3.1"
            },
            "quote": {
              "amount": 10,
              "asset_id": "1.3.0"
            }
          },
          "whitelist_authorities": [],
          "blacklist_authorities": [],
          "whitelist_markets": [],
          "blacklist_markets": [],
          "description": "test",
          "extensions": []
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f2e7425a639c4657d881f2ff6f80062c5d563cd7abc8e01dd04c62aeb6ee3861c0b9c557662e412b466bf956b6ae338621cf40579f0b11b1d491e9fb0d30cf88f"
  ]
}
```
#### 6. update_asset
signed_transaction `update_asset`(string symbol, optional<string> new_issuer, asset_options new_options, bool broadcast);
	
参数：symbol为资产名, new_issuer为新的资产拥有人账号，new_options为资产新属性

作用：更新资产

示例：`update_asset` ABCDE tester {max_supply : 100000000000,market_fee_percent : 10,max_market_fee : 10000000,issuer_permissions : 31,flags : 31,core_exchange_rate : {base : {amount : 10,asset_id : 1.3.1},quote : {amount : 10,asset_id : 1.3.0}},whitelist_authorities : [],blacklist_authorities : [],whitelist_markets : [],blacklist_markets : [],description : "a",extensions : [] } true

#### 7. issue_asset
signed_transaction `issue_asset`(string to_account, string amount, string symbol, string memo, bool broadcast);

参数：to_account为接收账户名或id，amount为数量，symbol为资产名, memo为备注

作用：资产创建者给to_account派发数量为amount的symbol资产

示例：`issue_asset` good 100000 ABCDE  "memo"  true

返回信息示例：
```json
issue_asset good 100000 ABCDE  "memo"  true
{
  "ref_block_num": 3441,
  "ref_block_prefix": 3230057673,
  "expiration": "2018-07-31T05:50:57",
  "operations": [[
      11,{
        "fee": {
          "amount": 2008984,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.42",
        "asset_to_issue": {
          "amount": "10000000000",
          "asset_id": "1.3.7"
        },
        "issue_to_account": "1.2.42",
        "memo": {
          "from": "SEER7nLQYsQzsMRNxQCadGvzAoTXq9Wwep2wMYw59ttDCY7zxr19DK",
          "to": "SEER7nLQYsQzsMRNxQCadGvzAoTXq9Wwep2wMYw59ttDCY7zxr19DK",
          "nonce": "73590610262939532",
          "message": "ef9c779f11166d2b97610103f23751d6"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "20705b0fa9a18cf51ccad528111b5dd76096eac2b3f83a8ef8e33dbdcc36e2ee1a3c1e2c8713016530a06527eef486dc269cecd71f280900d639451d970bf07e0c"
  ]
}
```

#### 8. fund_asset_fee_pool
signed_transaction `fund_asset_fee_pool`(string from, string symbol, string amount, bool broadcast);

参数：from为账户名或id，symbol为资产名,amount为数量

作用：给资产手续费池注入资金

示例：`fund_asset_fee_pool` tester ABCDE 1000 true
	
返回信息示例：
```json
fund_asset_fee_pool tester ABCDE 1000 true
{
  "ref_block_num": 4035,
  "ref_block_prefix": 4135131871,
  "expiration": "2018-07-31T06:20:39",
  "operations": [[
      13,{
        "fee": {
          "amount": 100000,
          "asset_id": "1.3.0"
        },
        "from_account": "1.2.42",
        "asset_id": "1.3.1",
        "amount": 100000000,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f652b152abf31fc5b5122d173ac6b93099441079eb659594c49e4f00da045362c074bf258fd0d54ef3715f90ca0b2f5543e09e6d1a84252d2186624f39dcd0732"
  ]
}
```

#### 9. asset_create_market

signed_transaction asset_create_market(string account, string origin_asset, int sequence, string target_asset, bool broadcast = false);

参数：account为资产所有者账户名，origin_asset为当前资产名,sequence为序号，需要≥1，target_asset为要创建交易对的目标资产。

作用：资产所有者创建交易对。（自定义资产需要资产所有者通过命令行钱包创建交易对才能在交易市场内交易）

示例：`asset_create_market` tester ABCDE 1 USDT true
	
返回信息示例：
```json

asset_create_market seer-community SCP 1 USDT true
{
  "ref_block_num": 50800,
  "ref_block_prefix": 3786166302,
  "expiration": "2019-09-26T12:42:24",
  "operations": [[
      62,{
        "fee": {
          "amount": 3000000000,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.20367",
        "asset_id": "1.3.6",
        "sequence": 1,
        "target": "1.3.5",
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "20189cc243b59d66135df57b47dc36865e5f68fb2f50997bba839c4d725fbaf8522eeb5d65f27fbaffa05fd77f5ab51851f264789c5ffb90c3017fd463793d2cd6"
  ]
}

```

### 系统治理指令

#### 1. create_committee_member
signed_transaction `create_committee_member`(string owner_account, string url, bool broadcast);

参数：owner_account为账户名或id，url为链接

作用：创建理事会成员

示例：`create_committee_member`  tester "https://baidu.com" true


返回信息示例：
```json
create_committee_member tester "https://baidu.com" true
{
  "ref_block_num": 4211,
  "ref_block_prefix": 390588442,
  "expiration": "2018-07-31T06:29:27",
  "operations": [[
      26,{
        "fee": {
          "amount": 500000000,
          "asset_id": "1.3.0"
        },
        "committee_member_account": "1.2.6",
        "url": "https://baidu.com"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f682f6567c05a720ef1f05d23b464d3290a1f6402f0170aeae4c24f44826f5dba209269b9c64d0ae18df18275076ebe48b88343741c5d1a71482b3173bb2c17e4"
  ]
}
```

#### 2. list_witnesses
map<string, witness_id_type> `list_witnesses`(const string& lowerbound, uint32_t limit);

参数：lowerbound为账户名的下标，limit为返回结果的数量上限

作用：列出见证人列表

示例：`list_witnesses` "" 100

返回信息示例：
```json
list_witnesses "" 100
[[
    "init0",
    "1.5.1"
  ],
  ......
  ,[
    "abc",
    "1.5.11"
  ]
]
```
#### 3. list_committee_members
map<string, committee_member_id_type>  `list_committee_members`(const string& lowerbound, uint32_t limit); 

参数：lowerbound为账户名的下标，limit为返回结果的数量上限

作用：列出理事会成员列表

示例：`list_committee_members` "" 100

返回信息示例：
```json
list_committee_members "" 100
[[
    "init0",
    "1.4.0"
  ],
  ......
  ,[
    "abc",
    "1.4.7"
  ]
]
```

#### 4. get_witness
witness_object `get_witness`(string owner_account); 

参数：owner_account为账户名或者id

作用：列出账户为owner_account的见证人

示例：`get_witness` abc

返回信息示例：
```json
get_witness abc
{
  "id": "1.5.11",
  "witness_account": "1.2.6",
  "last_aslot": 2648178,
  "signing_key": "SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ",
  "pay_vb": "1.11.3",
  "collaterals": [],
  "collateral_profit": 0,
  "total_collateral": 0,
  "cancelling_collateral": 0,
  "url": "",
  "total_missed": 13251,
  "last_confirmed_block_num": 1839550,
  "recent_maintenance_missed_blocks": [
    0,
    0
  ]
}

```

#### 5. get_committee_member
committee_member_object `get_committee_member`(string owner_account); 

参数：owner_account为账户名或者id

作用：列出账户为owner_account的理事会成员

示例：get_committee_member  abc

返回信息示例：
```json
get_committee_member abc
{
  "id": "1.4.7",
  "committee_member_account": "1.2.6",
  "vote_id": "0:7",
  "total_votes": 0,
  "url": "https://baidu.com"
}
```

#### 6. create_witness
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

#### 7. update_witness
signed_transaction `update_witness`(string witness_name,  string url, string block_signing_key, bool broadcast);

参数：witness_name为账户名或id，url为网址, block_signing_key为出块时签名的公钥

作用：更新见证人资料

示例：`update_witness` abc "http://www.google.com"  SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ true

返回信息示例：
```json
update_witness abc "http://www.google.com" SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ true
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
        "new_signing_key": "SEER4xBLWwa8Q42ZRnY2sFz5rywr16TG6WgbNSPDR5DodvNEQyVgnQ"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f677827fc57e4628e8cf61a25d40eecee120860e6d5a7fee6e1c6998b52c792fc28a977bcdefd87de3af5c754912a7766f69d6a376ace6b6b8dba042b9e0a05a6"
  ]
}
```
#### 8. get_vesting_balances
vector<vesting_balance_object_with_info> `get_vesting_balances`(string account_name); 

参数：account_name为账户名或id

作用：列出用户的锁定余额详情

示例：`get_vesting_balances`  abc

返回信息示例：
```json
get_vesting_balances abc
[{
    "id": "1.11.3",
    "owner": "1.2.7",
    "balance": {
      "amount": "77850000000",
      "asset_id": "1.3.0"
    },
    "policy": [
      1,{
        "vesting_seconds": 86400,
        "start_claim": "1970-01-01T00:00:00",
        "coin_seconds_earned": "6726214080000000",
        "coin_seconds_earned_last_update": "2018-07-31T07:09:51"
      }
    ],
    "allowed_withdraw": {
      "amount": "77850000000",
      "asset_id": "1.3.0"
    },
    "allowed_withdraw_time": "2018-07-31T07:10:00"
  }
]
```

#### 9. withdraw_vesting
signed_transaction `withdraw_vesting`(string witness_name, string amount, string asset_symbol, bool broadcast = false);
参数：witness _name为账户名或id,amount为数量, asset_symbol为资产名
作用：从锁定余额中领取余额，该命令仅供见证人使用
示例：`withdraw_vesting`  abc 1000 SEER true
	
返回信息示例：
```json
withdraw_vesting  abc 1000 SEER true
{
  "ref_block_num": 21775,
  "ref_block_prefix": 1566256200,
  "expiration": "2018-07-31T07:14:57",
  "operations": [[
      30,{
        "fee": {
          "amount": 2000000,
          "asset_id": "1.3.0"
        },
        "vesting_balance": "1.11.90",
        "owner": "1.2.6",
        "amount": {
          "amount": 100000000,
          "asset_id": "1.3.0"
        }
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f40c90c48b07c3d261b927603387e22a0fc7aa43c6787623a13f08f9105b6536652fc85e4a1cd3d15abc798a65b28bd8d33449dc15e11f5dfcb51be8929fba4e6"
  ]
}
```
#### 10. vote_for_committee_member
signed_transaction `vote_for_committee_member`(string voting_account,  string committee_member, bool approve, bool broadcast = false);

参数：voting _name为投票人账户名或id, committee_member为理事会成员用户名或id，approve为投票或者撤票

作用：对理事会成员进行投票

示例：`vote_for_committee_member`  abc  cde true true

返回信息示例：
```json
vote_for_committee_member abc  cde true true
{
  "ref_block_num": 5181,
  "ref_block_prefix": 2077283036,
  "expiration": "2018-07-31T07:17:57",
  "operations": [[
      5,{
        "fee": {
          "amount": 2005859,
          "asset_id": "1.3.0"
        },
        "account": "1.2.6",
        "new_options": {
          "memo_key": "SEER7nLQYsQzsMRNxQCadGvzAoTXq9Wwep2wMYw59ttDCY7zxr19DK",
          "voting_account": "1.2.5",
          "num_committee": 0,
          "num_authenticator": 0,
          "num_supervisor": 0,
          "votes": [
            "0:0"
          ],
          "extensions": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f206f69ee54fe145769515ff955e7aa343e9b9eb6eb2fbb3f0f0e5b25ca5e38a5765b8b9ff731d3ea46c5a0735ec32424a8c8ecff970c418126035111610d497c"
  ]
}
```
#### 11. set_voting_proxy
signed_transaction `set_voting_proxy`(string account_to_modify,  optional<string> voting_account, bool broadcast = false);
	
参数：account_to_modify为投票人账户名或id, voting_account为代理人用户名或id(为空时为取消代理人)

作用：设置投票代理人

示例：set_voting_proxy abc cde true

或   set_voting_proxy abc null true

返回信息示例：
```json
set_voting_proxy abc cde true
{
  "ref_block_num": 5282,
  "ref_block_prefix": 3854856229,
  "expiration": "2018-07-31T07:23:00",
  "operations": [[
      5,{
        "fee": {
          "amount": 2005468,
          "asset_id": "1.3.0"
        },
        "account": "1.2.6",
        "new_options": {
          "memo_key": "SEER7nLQYsQzsMRNxQCadGvzAoTXq9Wwep2wMYw59ttDCY7zxr19DK",
          "voting_account": "1.2.6",
          "num_committee": 0,
          "num_authenticator": 0,
          "num_supervisor": 0,
          "votes": [],
          "extensions": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f080a46abce73d107f19059015a1afe868d168e07d35d9c0894b97f991ea107c63c0b30f55624bdfc46cd47135ed162ae976a74e7eb37d72929671b6f750c876b"
  ]
}
```

#### 12. witness_create_collateral
signed_transaction `witness_create_collateral`(string account,  string amount, bool broadcast = false);

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
#### 13. list_witness_collaterals
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
#### 14. witness_cancel_collateral
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

#### 15. witness_claim_collateral
signed_transaction `witness_claim_collateral`(string account, string 	collateral_id, bool broadcast = false);

参数：account为见证人id或者账户名或账户id, collateral_id抵押项的id

作用：领取已经撤销抵押余额或者领取抵押利息

示例：

领取已撤销抵押余额：`witness_claim_collateral`  abc  "2.16.0" true

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

### 预测市场相关指令

#### 1. lookup_oracle_accounts
seer_oracle_id_type `lookup_oracle_accounts`(const string& lower_bound_name, uint32_t limit)const;

参数：lowerbound为账户名的下标，limit为返回结果的数量上限

作用：列出预言机成员列表

示例：`lookup_oracle_accounts`  "" 100

返回信息示例：
```json
lookup_oracle_accounts  "" 100
[[
    "tnt123456",
    "1.13.0"
  ],
  //......
  ,[
    "tnt23456",
    "1.13.1"
  ]
]
```
#### 2. get_oracles
seer_oracle_object `get_oracles`(const seer_oracle_id_type& oracle_ids)const;

参数：oracle_ids为预言机的id集

作用：根据给定的id集列出预言机成员列表

示例：`get_oracles`  [1.13.0,1.13.1]

返回信息示例：
```json
get_oracles  [1.13.0,1.13.1]
[{
    "id": "1.13.0",
    "owner": "1.2.63",
    "guaranty": "200001000000",
    "locked_guaranty": 0,
    "reputation": 1,
    "volume": 1,
    "description": "test",
    "script": ""
  },{
    "id": "1.13.1",
    "owner": "1.2.77",
    "guaranty": "801000000000",
    "locked_guaranty": 0,
    "reputation": 0,
    "volume": 0,
    "description": "",
    "script": ""
  }
]
```
#### 3. get_oracle_by_account
seer_oracle_object `get_oracle_by_account`(account_id_type account)const;

参数：account为账户id

作用：根据对方账户id查询预言机

示例：`get_oracle_by_account` 1.2.63

返回信息示例：
```json
get_oracle_by_account 1.2.63
{
  "id": "1.13.0",
  "owner": "1.2.63",
  "guaranty": "200001000000",
  "locked_guaranty": 0,
  "reputation": 1,
  "volume": 1,
  "description": "test",
  "script": ""
}
```

#### 4.  lookup_house_accounts
seer_house_id_type `lookup_house_accounts`(const string& lower_bound_name, uint32_t limit)const;

参数：lowerbound为账户名的下标，limit为返回结果的数量上限

作用：列出SEER平台列表

示例：`lookup_house_accounts` "" 100

返回信息示例：
```json
lookup_house_accounts "" 100
[[
    "cn-itata",
    "1.14.3"
  ],[
    "danilo3",
    "1.14.2"
  ],
  //......
  ,[
    "tnt23456",
    "1.14.6"
  ]
]
```


#### 5. get_houses
seer_house_object `get_houses`(const vector<seer_house_id_type>& house_ids)const;

参数：house_ids为平台的id集

作用：根据给定的id集列出平台列表

示例：`get_houses` [1.14.1,1.14.2,1.14.4]

返回信息示例：
```json
get_houses [1.14.3,1.14.2,1.14.6]
[{
    "id": "1.14.3",
    "owner": "1.2.30",
    "description": "test",
    "script": "",
    "reputation": 0,
    "guaranty": "300000000000",
    "volume": 0,
    "rooms": [
      "1.15.11"
    ],
    "finished_rooms": []
  },{
    "id": "1.14.2",
    "owner": "1.2.29",
    "description": "test",
    "script": "1",
    "reputation": 0,
    "guaranty": "10000000000",
    "volume": 0,
    "rooms": [
      "1.15.3"
    ],
    "finished_rooms": []
  },{
    "id": "1.14.6",
    "owner": "1.2.77",
    "description": "",
    "script": "",
    "reputation": 2,
    "guaranty": "10000000000",
    "volume": 2,
    "rooms": [
      "1.15.15"
    ],
    "finished_rooms": [
      "1.15.12",
      "1.15.13"
    ]
  }
]
```

#### 6. get_house_by_account
seer_house_object `get_house_by_account`(account_id_type account)const;

参数：account为账户id

作用：根据对方账户id查询平台

示例：`get_house_by_account` 1.2.77

返回信息示例：
```json
get_house_by_account 1.2.77
{
  "id": "1.14.6",
  "owner": "1.2.77",
  "description": "",
  "script": "",
  "reputation": 2,
  "guaranty": "10000000000",
  "volume": 2,
  "rooms": [
    "1.15.15"
  ],
  "finished_rooms": [
    "1.15.12",
    "1.15.13"
  ]
}
```

#### 7. get_seer_room
seer_room_object `get_seer_room`(const seer_room_id_type& room_id, uint32_t start_index, uint32_t limit)const;

参数：room_id为房间id，start_index为投注记录的开始索引,limit为返回结果中投注记录的最大数量

作用：根据房间id查询房间详情（不是完整的房间,因投注太多的情况下房间空间会非常大）

示例：`get_seer_room`  1.15.236 0 100

返回信息示例：
```json
get_seer_room  1.15.236 0 100
{
  "id": "1.15.236",
  "house_id": "1.14.1",
  "owner": "1.2.37",
  "label": [],
  "description": "国际冠军杯 曼联 vs 皇马 胜负",
  "script": "",
  "room_type": 2,
  "status": "opening",
  "option": {
    "result_owner_percent": 9000,
    "reward_per_oracle": 0,
    "accept_asset": "1.3.1",
    "minimum": 1000000,
    "maximum": 1000000000,
    "start": "2018-07-29T08:14:18",
    "stop": "2018-08-01T00:00:00",
    "input_duration_secs": 300,
    "filter": {
      "reputation": 0,
      "guaranty": 0,
      "volume": 0
    },
    "allowed_oracles": [],
    "allowed_countries": [],
    "allowed_authentications": []
  },
  "running_option": {
    "room_type": 2,
    "selection_description": [
      "home",
      "draw",
      "guest"
    ],
    "range": 3,
    "advanced": {
      "pool": "500000000000",
      "awards": [
        34000,
        37500,
        18500
      ]
    },
    "participators": [[{//显示当前的预测参与记录
          "player": "1.2.10936",
          "when": "2018-07-29T13:57:21",
          "amount": 1360000000,
          "paid": 400000000,
          "sequence": 0
        },
	//......
	,{
          "player": "1.2.11271",
          "when": "2018-07-31T04:55:57",
          "amount": 92500000,
          "paid": 50000000,
          "sequence": 0
        }
      ]
    ],
    "total_shares": "5461000000",
    "settled_balance": 0,
    "settled_row": -1,
    "settled_column": -1,
    "player_count": [
      3,
      1,
      16
    ],
    "total_player_count": 20,
    "advanced_running": {
      "total_participate": [[
          511000000,
          1737400000
        ],[
          100000000,
          375000000
        ],[
          "4850000000",
          "8972500000"
        ]
      ]
    }
  },
  "owner_result": [],
  "final_result": [],
  "committee_result": [],
  "oracle_sets": [],
  "final_finished": false,
  "settle_finished": false,
  "last_deal_time": "1970-01-01T00:00:00"
}
```
#### 8. get_rooms_by_label
seer_room_id_type `get_rooms_by_label`(const string& label, uint32_t limit)const;

参数：label为需要查找的索引, limit为返回结果的最大数量

作用：查询标签为label的房间

示例：`get_rooms_by_label` "football"  100

返回信息示例：
```json
get_rooms_by_label "football"  100
[
  "1.15.24"
]
```
#### 9. oracle_create
signed_transaction  `oracle_create`(string account, int64_t  guaranty, string   description, bool broadcast);

参数：account为账户名或账户id, guaranty为保证金, description为描述，script为脚本

作用：创建预言机

示例：`oracle_create` abc 100000 "the first oracle" "http://www.a.com/show_me.jpg"  true

返回信息示例：
```json
oracle_create abc 100000 "the first oracle" "http://www.a.com/show_me.jpg"  true
{
  "ref_block_num": 7768,
  "ref_block_prefix": 1942759640,
  "expiration": "2018-07-31T09:27:18",
  "operations": [[
      40,{
        "fee": {
          "amount": 1000006250,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.6",
        "guaranty": 100000,
        "description": "the first oracle",
        "script": "http://www.a.com/show_me.jpg"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "2048f860d79235803a323ff06cff9ecd5dac826b6c4b8811acc7f5ed3339992c9b0852d16c38fc1f8fbd83c6a535c6c8295ecac35e9102d1b720c3e593c5d16e2b"
  ]
}
```

#### 10. oracle_update
signed_transaction `oracle_update`(string account, string   oracle_id, int64_t	guaranty, optional<string>   description, optional<string>   script, bool broadcast = false);
	
参数：account为账户名或账户id, oracle_id为预言机id,guaranty为保证金, description为描述，script为脚本

作用：更新预言机,guaranty负数时为提取保证金,为正为添加保证金

示例：`oracle_update` abc 1.13.2 100000  "not the first oracle" “”  true
	
返回信息示例：
```json
oracle_update abc 1.13.2 100000  "not the first oracle"  ""  true
{
  "ref_block_num": 7848,
  "ref_block_prefix": 2978404298,
  "expiration": "2018-07-31T09:31:18",
  "operations": [[
      41,{
        "fee": {
          "amount": 100004199,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.6",
        "oracle": "1.13.2",
        "guaranty": 100000,
        "description": "not the first oracle",
        "script": ""
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f1969d6e5c35bb92be68f5e591b8b7ffe35fdea6db3962ae4af26e6c7cd288add66bd212683e56040a1a53a9a5a392efeb40f1de4f8c6a8cc8f360362269783d7"
  ]
}
```

#### 11. oracle_input
signed_transaction `oracle_input`(string account, string   oracle_id, string  room_id, vector<uint8_t>   input, bool broadcast = false);

参数：account为账户名或账户id, oracle_id为预言机id, room_id为房间id, input为输入数据

作用：预言机给房间输入预测结果

示例：`oracle_input`  abc 1.13.5  1.15.3  [2]  true

返回信息示例：
```json
oracle_input abc 1.13.5  1.15.3  [2]  true
{
  "ref_block_num": 14484,
  "ref_block_prefix": 273697911,
  "expiration": "2018-07-31T15:03:06",
  "operations": [[
      42,{
        "fee": {
          "amount": 1000000,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.105",
        "oracle": "1.13.5",
        "room": "1.15.3",
        "input": [
          2
        ]
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "207380baa9f724b1a97145c5384af0d2df16afde81be8510dbc6438af3113928082474f148ee3cb1b8b73e7b6ea570f262de39171203084d8e4c12c47f3ff3bda1"
  ]
}
```

#### 12. house_create
signed_transaction `house_create`(string account, int64_t  guaranty, string   description, string  script, bool broadcast = false);

参数：account为账户名或账户id, guaranty为保证金, description为描述，script为脚本

作用：创建平台

示例：`house_create` abc 100000 “the first house” “http://www.a.com/show_me.jpg”  true

返回信息示例：
```json
house_create abc 100000 "the first house" "http://www.a.com/show_me.jpg"  true
{
  "ref_block_num": 8770,
  "ref_block_prefix": 3930836429,
  "expiration": "2018-07-31T10:17:24",
  "operations": [[
      53,{
        "fee": {
          "amount": 3000006152,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.6",
        "guaranty": 100000,
        "description": "the first house",
        "script": "http://www.a.com/show_me.jpg"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "206208e8832e9c7a670ba3f15aa71ea114dab7353f8132c64af8014c21f709e889559c9e3f3ba69b51f09cc426fd67a7d4403c165c2bb53a2f9e755d54dac265ac"
  ]
}
```

#### 13. house_update
signed_transaction `house_update`(string account, string   house_id, int64_t  guaranty,int64_t  claim_fees,optional<string>   description, optional<string>   script, bool broadcast = false);
	
参数：account为账户名或账户id, house_id为平台id,guaranty为保证金,claim_fees为需要领取的手续费分成， description为描述，script为脚本

作用：更新平台,guaranty负数时为提取保证金,为正为添加保证金，claim_fees不为0时领取分成的手续费。

示例：`house_update` abc 1.14.5 -100000 0  "not the first house"  "" true

返回信息示例：
```json
house_update abc 1.14.5 -100000 0 "not the first house" "http://www.a.com/show_me.jpg" true
{
  "ref_block_num": 14976,
  "ref_block_prefix": 2925751998,
  "expiration": "2018-07-31T15:27:42",
  "operations": [[
      54,{
        "fee": {
          "amount": 100007617,
          "asset_id": "1.3.0"
        },
        "issuer": "1.2.105",
        "house": "1.14.5",
        "guaranty": -100000,
        "claim_fees": 0,
        "description": "not the first house",
        "script": "http://www.a.com/show_me.jpg"
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1f00da22724bb3d3e6654b95fea03b7c7dd40814a6a4612e87f304d4112692e37c6be3087afc06489c99e7e7fc5a9a328f8cfea6fa5d95df246aaf7bf5182c147b"
  ]
}

```
#### 14. room_create
signed_transaction room_create(string account, vector<string> label, string   description, string  script, uint8_t  room_type,  room_option  option,  optional<seer_room_option_lmsr>  room_lmsr,  optional<seer_room_option_type1>	room_type1,  optional<seer_room_option_type2>	room_type2,  optional<seer_room_option_type3>	room_type3,  bool broadcast );
	
参数：account为账户名或账户id, label为标签,description为描述，script为脚本, room_type为房间类型，option为房间通用参数，room_type为0时表示LMSR

类型则room_lmsr必须有值，room_type为1时表示简单竞猜玩法则room_type1必须有值，room_type为2时表示创建者自定义赔率的简单竞猜类型则room_ type2必须有值，room_type为3时表示彩票类型玩法则room_ type3必须有值

作用：创建房间

示例：
room_create abc ["football","basketball","games"] "test room create" "show me"  0  {"result_owner_percent":0,"reward_per_oracle":"2000000","accept_asset":"1.3.0","minimum":"1","maximum":"100000000","start":"2018-08-01T07:17:31","stop":"2018-08-01T07:01:33","input_duration_secs":0,"filter":{"reputation":"0","guaranty":"0","volume":"0"},"allowed_oracles":["1.13.0"]}  {"selection_description":["No","Yes"],"L":"100000","total_shares":"1","items":["1"],"range":2,"participators":[],"solds":[],"settled_balance":"0","settled_index":0,"settled_sold_index":0,"histories":[]} null null null true 

返回信息示例：
```json
{
      "ref_block_num": 8574,
      "ref_block_prefix": 1502983025,
      "expiration": "2018-08-15T19:34:26",
      "operations": [[
          43,{
            "fee": {
              "amount": 20017089,
              "asset_id": "1.3.0"
            },
            "issuer": "1.2.6",
            "label": [],
            "description": "test1 vs test2",
            "script": "",
            "room_type": 2,
            "option": {
              "result_owner_percent": 9000,
              "reward_per_oracle": 0,
              "accept_asset": "1.3.1",
              "minimum": 1000000,
              "maximum": 1000000000,
              "start": "2018-08-15T19:32:24",
              "stop": "2018-08-15T19:32:24",
              "input_duration_secs": 60,
              "filter": {
                "reputation": 0,
                "guaranty": 0,
                "volume": 0
              },
              "allowed_oracles": [],
              "allowed_countries": [],
              "allowed_authentications": []
            },
            "initial_option": {
              "room_type": 2,
              "selection_description": [
                "home",
                "draw",
                "guest"
              ],
              "range": 3,
              "advanced": {
                "pool": "500000000000",
                "awards": [
                  84600,
                  47400,
                  13200
                ]
              }
            },
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1f22944de2ab45fcc0e7ccb2d8ad697e3fd4100de8ce893052cd0ffbb52c7b61433a3a30ca7f219fa8ddae8898ff3aaf4389ff396c4a3064c242d33ca4d258ae41"
      ],
      "operation_results": [[
          0,{}
        ]
      ]
    }
```
#### 15. room_update
signed_transaction `room_update`(string account, seer_room_id_type  room,  optional<string>   description,  optional<string>  script,  optional<room_option>  option,  optional<vector<uint64_t>>  new_awards,  bool broadcast );
	
参数：account为账户名或账户id, label为标签,description为描述，script为脚本, room_type为房间类型，option为房间通用参数，new_awards为 room_ type2的自定义赔率

作用：更新房间

示例：room_update good 1.15.1 "change the description" null null null true

返回信息示例：
```json

```
#### 16. room_open
signed_transaction  `room_open`(string account,  seer_room_id_type  room,  time_point_sec start, time_point_sec	 stop,  uint32_t   input_duration_secs,  bool broadcast);

参数：account为账户名或账户id, room为房间id, start为房间预测开启时间，stop为停止预测时间, input_duration_secs为停止参与预测以后预言机和创建者输入结果的时限

作用：开启房间

示例： room_open abc 1.15.3 “2018.4.1 21:00:00”  “2018.4.5 21:00:00”  86400 true
	
返回信息示例：
```json

```
#### 17. room_stop_participate
signed_transaction `room_stop_participate`(string account,  seer_room_id_type	 room,  uint32_t  input_duration_secs, bool broadcast = false);

参数：account为账户名或账户id, room为房间id, input_duration_secs为停止参与预测以后预言机和创建者输入结果的时限

作用：停止参与预测

示例： room_stop_participate abc 1.15.3 86400 true

返回信息示例：
```json

```
#### 18. room_input
signed_transaction `room_input`(string account, seer_room_id_type room, vector<uint8_t>	 input,  bool broadcast);

参数：account为账户名或账户id, room为房间id, input为结果

作用：创建者输入预测结果

示例： 

单选：room_ input  abc 1.15.3  [3]  true
多选：room_ input  abc 1.15.3  [1,5,3]  true

返回信息示例：
```json

```
#### 19. room_final

signed_transaction `room_final`(string account, seer_room_id_type room, bool broadcast);

参数：account为账户名或账户id, room为房间id

作用：创建者统计预测结果,以及room_type3时计算预测正确的参与者详情)

示例：room_final abc 1.15.3 true

返回信息示例：
```json

```
#### 20. room_settle
signed_transaction `room_settle`(string account, seer_room_id_type room, bool broadcast = false);

参数：account为账户名或账户id, room为房间id

作用：创建者派发奖励

示例：room_ settle  abc 1.15.3 true

返回信息示例：
```json

```
#### 21. room_participate
signed_transaction  `room_participate`(string account, seer_room_id_type room, uint8_t  type, vector<uint8_t> input, vector<set<uint8_t>>    input1,  vector<vector<uint8_t>> input2,  int64_t amount,  bool broadcast = false);

参数：account为账户名或账户id, room为房间id,type为输入类型,type为0时为单选input必须有值, type为1时为多选input1必须有值, type为2时为复选input2必须有值, amount为参与数量

作用：普通用户参与预测

示例：room_participate  abc 1.15.3  0  [1]  []  []  1000 true

#### 22. room_close
signed_transaction `room_close`(string account,  seer_room_id_type  room,  bool  remove,  bool broadcast );

参数：account为账户名或账户id, room为房间id, remove为是否从平台删除该房间

作用：创建者关闭房间

示例：room_close abc 1.15.3  false true

返回信息示例：
```json

```
#### 23. room_claim
signed_transaction `room_claim`(string  account,  seer_room_id_type room, int64_t  amount, bool broadcast);

参数：account为账户名或账户id, room为房间id, amount为金额

作用：创建者从房间奖金池领取金额 

示例：room_claim abc 1.15.3  1000 true

<p class="tip">
  注意：该指令只对room_type2和room_type3有效，而且amount是包括资产精度的，比如`room_claim` 1 SEER时amount值为100000。
</p>
  
返回信息示例：
```json

```

