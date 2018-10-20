# SEER区块浏览器开发指南

## 区块浏览器基本功能

区块链浏览器是浏览区块链信息的主要窗口，每一个区块所记载的内容都可以从区块链浏览器上进行查阅。用户可以使用区块链浏览器查询记录在区块中的交易信息，包括转账、预测、账户管理和社区治理操作等。

SEER基于石墨烯底层开发，区块链上记录的最小信息是`操作（operations）`。每个`区块(block)`里可能有多个`交易(transactions)`，每个`交易`里可能包含多个`操作`。

区块浏览器需要预先考虑到多语言版本的需求。

### 区块浏览器的页面

#### 首页

1、`滚动区域`显示最新区块链上的操作信息：包括`类型` `发起ID（链接）` `内容` `被操作ID（链接，如果有并便于排版）` `时间` `交易ID（链接）`；
例如：

| 类型 | 说明 | 时间 | 交易链接 | 
| - | - | - | - |
| [派发奖励] | shehuilongge2018 对 预测市场446 “刘强东在明尼苏达所涉...”派奖 | 10天前 | 160d9a381a21 |
| [转账] | okok 转账 1000SEER 给 else | 11天前 | 70dd572e03f7 |

`160d9a381a21`为缩写，实际的交易ID是`160d9a381a2152d55719b0e7e4aea4aaecce06e3`，链接格式为：https://seerscan.com/tx/160d9a381a2152d55719b0e7e4aea4aaecce06e3 。之所以建议使用交易ID而不使用区块高度，是因为为了即时性，我们往往最新取的是最新区块的信息，而不是最近不可逆块的信息，因此理论上来说，在区块浏览器显示的操作信息所属区块可能在入块后会改变。而交易id是可以通过算法求得的，具有唯一性，更适合作为即时出现的链接地址。

`滚动区域`需显示的最新操作信息，可以首先通过`info`获得当前块高，再通过`get_block`获得当前块信息，若当前块包含交易信息，则将交易内的最新操作按一定格式显示。每3秒以后，可以用在块号上+1的方法再`get_block`获取下一个块的信息。

若要显示历史交易信息，则需要不断存储最新块内的信息，并保存全部或一定时间范围内的非空块信息。

2、显示`区块链状态`：包括`最新块生产时间`、`当前块高`、`链号``出块时间间隔`、`下次数据维护时间`、`区块生产参与度`，这些信息都可以通过`info`获得；

例如：
| 网络状态 |   |
| - | - |
| 最新块生产时间 | 0秒前 |
| 当前块高 | 42421333 |
| 链号 | cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91 |
| 出块时间间隔 | 3秒 |
| 下次数据维护时间 | 8小时后 |
| 区块生产参与度 | 100% |

3、提供`搜索`功能：可以输入`区块号`、`帐号`、`交易id`、`资产名`、`房号`等信息搜索相应的信息，进入相应的页面；

先检测填入的数据类型，若为纯数字，则检测相应的区块和房间是否存在，若存在则下拉提示[预测市场]321416和[区块]321416（只提示存在的）；

若输入的是字符串，则检测相应的帐号、交易id、资产名是否存在，若存在则下拉提示[帐号]opc和[资产]opc，或[交易id]160d9a381a2152d55719b0e7e4aea4aaecce06e3（只提示存在的）。

用户点击后跳转到相应的页面。

4、`链接`到其他页面；

5、显示本轮`活跃见证人`：列表可以通过`info`获得，列表中的用户名（链接）点击跳转到账户相关页面；

6、显示本轮`活跃理事会`：列表可以通过`info`获得，列表中的用户名（链接）点击跳转到账户相关页面；

#### 区块信息页面

1、该区块所包含的`所有操作信息`列表：包括`类型` `发起ID（链接）` `内容` `被操作ID（链接，如果有并便于排版）` `时间` `交易ID（链接）`；

2、格式化后的该区块json信息。

链接格式为：https://seerscan.com/block/723091

#### 账户相关页面

1、和该用户相关的操作列表（最近100个），可以通过`get_relative_account_history`获得：包括`类型` `发起ID（链接）` `内容` `被操作ID（链接，如果有并便于排版）` `时间` `交易ID（链接）`；

例如该账号参与过的房间房主派奖时，除显示房主派奖外，还应该显示该帐号余额的变动情况。通过`op.result.deltas`获取；

例如该账号参与预测时，除显示参与预测，该帐号余额的变动情况
(通过`op.result.deltas`获取)、输入结果(通过`op.op.inputN`获取),同时显示房间号(通过`op.op.room` 获取，链接)

2、该账户属性：包含`资产余额`、`Object_ID`、`用户名`、`推荐人`、`注册人`、`是否终身会员`，`权限`中显示该用户的`资金`、`账户`、`MEMO`公钥，若此用户具有`预测市场设立者`、`预言机`、`见证人`、`理事会`等角色，也将其属性值列出。

3、`预测市场设立者`属性包括：Object_ID、描述、脚本、保证金、信誉度、参与量，以及当前正在进行的房间和历史房间前N位（信息格式见预测市场列表）；

4、`预言机`属性包括：Object_ID、描述、脚本、保证金、信誉度、参与量。

5、`见证人`属性包括：Object_ID、抵押数、待领取抵押收益、抵押清单（抵押ID+数额）、待领取出块收益、最近出块号、链接、丢块数、见证人签名公钥。

分别通过`get_witness`和`get_vesting_balances`获取，其中`get_vesting_balances`返回信息中，object_id为`1.11.90`的即出块收益。

链接格式为：https://seerscan.com/account/okok

6、`理事/候选理事`属性包括：Object_ID、总得票数、链接。

#### 热门预测市场列表页面

1、列出当前活跃的预测市场（房间）列表：[市场类型（PVD/高级/PVP）] 创建者 房间号（Object_ID，链接） 描述（链接） 总参与量 开启时间 结束时间 创建者权重 标签（链接），默认按参与量排序，用户可按一定方式排序（排序方式包括总参与量、结束时间、创建者权重）；

例如：

| 类型 | 设立者 | 市场编号 | 描述 | 总参与量 | 开启时间 | 结束时间 | 创建者权重 | 标签 |
| - | - | - | - | - | - | - | - | - |
| [PVP] | shehuige18 | 446 | “BTC 2018年10月21日...” | 367万 SEER | 5天前 | 5分钟后 | 70% | 币比 币圈 经济 BTC |
| [高级] | octopaul | 486 | “曼城 VS 恒大 胜负” | 188万 OPC | 3天前 | 3小时后 | 80% | 章鱼宝 体育 赛事 足球 欧亚杯 2018 |
| [PVD] | akira | 526 | “刘强东在明尼苏达所涉...” | 42万 ABC | 13天前 | 20天后 | 30% | 热门 社会 大佬 |

标签一栏中，根据页面显示区域显示1个至全部个数标签。

2、根据用户标签历史纪录生成标签云，每个标签链接到相应的预测市场标签列表页面。

3、列出活跃的预测市场设立者（按参与量排名列出前N位）。

可通过`lookup_house_accounts`获得房主列表，再通过`get_houses`获得所有活跃房间和历史房间，再通过`get_seer_room`获得房间详细信息。

链接格式为：https://seerscan.com/hotmarkets

#### 预测市场标签列表页面

1、列出当前活跃的预测市场（房间）列表：[市场类型（PVD/高级/PVP）] 创建者 房间号（Object_ID，链接） 描述（链接） 总参与量 开启时间 结束时间 创建者权重 标签（链接），默认按参与量排序，用户可按一定方式排序（排序方式包括总参与量、结束时间、创建者权重）；

2、显示已结束/输入中预测市场列表，格式同上。

3、显示标签云。

链接格式为：https://seerscan.com/label/社会

#### 预测市场详情页面

1、显示房间属性：

通过`get_seer_room`获得房间详细信息，属性包括：市场Object_ID、设立者ID、标签、描述、市场类型（PVD/高级/PVP）、市场状态（进行中/未开始/已结束/结果输入）。

2、显示房间设置：接受资产、单次最小参与数额、单次最大参与数额；

3、显示房间状态：开始时间、结束时间、结果输入时限、资金池（仅高级模式和PVD模式显示，PVD模式的资金池通过房主设定的L值和选项数，根据公式资金池F = L x ln（选项数量）计算出）、总参与量；

4、显示预言机设置和门槛：市场设立者权重、预言机奖励、条件达到此门槛的预言机才能参与结果输入：（名誉、保证金、参与量）

5、房间选项：包括选项描述、参与人数和参与数量（资产或份数）

6、最新参与滚动信息：

7、参与预测图表：参数包括时间、参与人次、参与数额、预测选项、选项赔率（PVD为单份成本）；


链接格式为：https://seerscan.com/pm/3427 （PM = prediction market）

#### 交易详细信息页面

链接格式为：https://seerscan.com/tx/160d9a381a2152d55719b0e7e4aea4aaecce06e3 

#### 资产介绍页面

1、该资产持有人列表（链接），持有占比；
2、持有分布统计图表；
3、该资产的属性：资产代号、资产类型（CORE/UIA）、当前供应量、发行人（链接）、Object_ID、资产精度、最大供应量等。
4、SEER的资产介绍页面可以作为SEER持仓分布页面在首页提供链接；

链接格式为：https://seerscan.com/assets/SEER 

#### 见证人信息页面



#### 理事会信息页面

## 调用区块链上的信息

### 自建一个SEER全节点

### WS-RPC方式同步区块链数据



### 常用指令

#### get_block

#### get_relative_account_history

#### get_transaction_id

#### 

## 操作信息翻译

操作信息翻译是指将区块链数据中的各种代码、Object_ID、数据转化为普通用户易读的格式，方便用户一目了然的查看区块链信息。

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



