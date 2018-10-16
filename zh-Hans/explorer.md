# SEER区块浏览器开发指南

## 区块浏览器基本功能

区块链浏览器是浏览区块链信息的主要窗口，每一个区块所记载的内容都可以从区块链浏览器上进行查阅。用户可以使用区块链浏览器查询记录在区块中的交易信息，包括转账、预测、账户管理和社区治理操作等。

SEER基于石墨烯底层开发，区块链上记录的最小信息是`操作（operations）`。每个`区块(blocks)`里可能有多个`交易(transactions)`，每个`交易`里可能包含多个`操作`。

### 区块浏览器的页面

#### 首页

1、`滚动区域`显示最新区块链上的操作信息：包括`类型` `发起ID` `内容` `被操作ID（如果有）` `时间` `交易ID`；
例如：
```
[派发奖励] shehuilongge2018 对 预测市场446 “刘强东在明尼苏达所涉...” 派奖 10天前 160d9a381a21
```
`160d9a381a21`为缩写，实际的交易ID是`160d9a381a2152d55719b0e7e4aea4aaecce06e3`。之所以建议使用交易ID而不使用区块高度，是因为为了即时性，我们往往最新取的是最新区块的信息，而不是最近不可逆块的信息，因此理论上来说，会显示进区块浏览器的操作信息所属区块可能在入块后会改变。而交易id是可以通过算法求得的，具有唯一性，更适合作为即时出现的链接地址。

2、显示`区块链状态`；

3、提供`搜索`功能；

4、`链接`到其他页面。

#### 区块信息页面

1、该区块所包含的`所有操作信息`列表：包括`类型` `发起ID` `内容` `被操作ID（如果有）` `时间` `交易ID`；

2、

#### 账户相关页面

#### 预测市场列表页面

#### 交易详细信息页面

## 调用区块链上的信息

### 调用方式

### 常用指令

#### get_block

#### get_relative_account_history

## 操作信息翻译

### SEER链上的操作类型

通过RPC调用返回的数据，在`get_relative_account_history`的`op.op.N`和`get_block`的`transactions.operations.N`定义了该操作的类型。

以下是SEER常见的操作类型：

| N | operations | 类型 |  
| - | - | - |
| 0 | Transfer | 转账 |
| 1 | limit_order_create_operation | 创建委单 |
| 2 | limit_order_cancel_operation | 取消委单 |
| 3 | fill_order_operation | 订单撮合 |
| 4 | Create Account | 注册账户 |
| 5 | Update Account | 更新账户 |
| 7 | account_upgrade_operation | 升级账户 |
| 9 | Create User-Issue Asset | 创建资产 | 
| 10 | asset_update_operation | 更新资产 |  
| 11 | asset_issue_operation | 发行资产 |
| 12 | asset_reserve_operation | 销毁资产 |   
| 13 | asset_fund_fee_pool_operation | 为资产手续费池注入资金 |
| 14 | witness_create_operation | 创建见证人 |
| 15 | witness_update_operation | 更新见证人 |
| 16 | witness_create_collateral_operation | 见证人创建抵押项 |
| 17 | witness_cancel_collateral_operation | 见证人取消抵押项 |
| 18 | witness_claim_collateral_operation | 见证人领取抵押项余额/抵押收益 |
| 19 | proposal_create_operation | 创建交易提议 |
| 20 | proposal_update_operation | 更新交易提议 |
| 26 | committee_member_create_operation | 创建理事会成员 |
| 30 | vesting_balance_withdraw_operation | 提取解冻金额/出块收益 | 
| 40 | seer_oracle_create_operation | 创建预言机 |
| 41 | seer_oracle_update_operation | 更新预言机 |
| 42 | seer_oracle_input_operation | 预言机输入结果 |
| 43 | seer_room_create_operation | 创建房间 |
| 44 | seer_room_update_operation | 更新房间 |
| 45 | seer_room_input_operation | 创建者输入结果 |
| 46 | seer_room_open_operation | 开启房间 |
| 47 | seer_room_stop_participating_operation | 停止房间 |
| 48 | seer_room_final_operation | 预测结算 |
| 49 | seer_room_settle_operation | 派发奖励 | 
| 50 | seer_room_participate_operation | 参与预测 |
| 53 | seer_house_create_operation | 创建平台 |
| 54 | seer_house_update_operation | 更新平台 |



