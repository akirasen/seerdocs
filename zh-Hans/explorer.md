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

`160d9a381a21`为缩写，实际的交易ID是`160d9a381a2152d55719b0e7e4aea4aaecce06e3`，链接格式为：https://seerscan.com/tx/160d9a381a2152d55719b0e7e4aea4aaecce06e3 。之所以建议使用交易ID而不使用区块高度，是因为最新区块的信息不同于不可逆块，理论上来说在区块浏览器显示的操作信息所属区块可能在入块后会改变。而交易id是通过本地算法求得的，具有唯一性，更适合作为即时出现的链接地址。

`滚动区域`需显示的最新操作信息，可以首先通过`info`获得当前块高，再通过`get_block`获得当前块信息，若当前块包含交易信息，则将交易内的最新操作按一定格式显示。每3秒以后，可以用在块号上+1的方法再`get_block`获取下一个块的信息。

若要显示历史交易信息，则需要不断存储最新块内的信息，并保存全部或一定时间范围内的非空块信息。

2、显示`区块链状态`：包括`最新块生产时间`、`当前块高`、`链号``出块时间间隔`、`下次数据维护时间`、`区块生产参与度`，这些信息都可以通过`info`和`get_global_properties`获得；

例如：

| 网络状态 |  |
| - | - |
| 最新块生产时间 | 0秒前 |
| 当前块高 | 42421333 |
| 链号 | cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91 |
| 出块时间间隔 | 3秒 |
| 下次数据维护时间 | 8小时后 |
| 区块生产参与度 | 100% |

3、提供`搜索`功能：可以输入`区块号`、`帐号`、`交易id`、`资产名`、`预测市场id`等信息搜索相应的信息，进入相应的页面；

先检测填入的数据类型，若为纯数字，则检测相应的区块和房间是否存在，若存在则下拉提示[预测市场]321416和[区块]321416（只提示存在的）；

分别通过`get_block`、`list_accounts`、`list_assets`、`get_seer_room`，以及查询本地存储交易信息中交易id获得。

若输入的是字符串，则检测相应的帐号、交易id、资产名是否存在，若存在则下拉提示[帐号]opc、[帐号]opc002和[资产]opc，或[交易id]160d9a381a2152d55719b0e7e4aea4aaecce06e3（只提示存在的）。

| his |  |
| - | - |
| HIS（UIA） | 1.3.1 |
| IOU.HIS（UIA） | 1.3.21 |
| hiseer（账号员） | 1.2.59 |
| hise01(账号) | 1.2.8872 |
| hello-his(账号) | 1.2.10231 |
| shis1(账号) | 1.2.56782 |
| 160d9a381a2152d55719b0e7e4aea4aaecce06e3(交易) | 856782块高 |

用户点击后跳转到相应的页面。

4、`链接`到其他页面；

5、显示本轮`活跃见证人`：列表可以通过`info`获得，列表中的用户名（链接）点击跳转到账户相关页面；

6、显示本轮`活跃理事会`：列表可以通过`info`获得，列表中的用户名（链接）点击跳转到账户相关页面；

#### 区块信息页面

1、显示该区块块号，时间，出块见证人。

2、该区块所包含的`所有操作信息`列表：包括`类型` `发起ID（链接）` `内容` `被操作ID（链接，如果有并便于排版）` `时间` `交易ID（链接）`；

3、格式化后的该区块json信息。

通过`get_block`获得相应信息。

链接格式为：https://seerscan.com/block/723091

#### 账户相关页面

1、和该用户相关的操作列表（最近100个），可以通过`get_relative_account_history`获得：包括`类型` `发起ID（链接）` `内容` `被操作ID（链接，如果有并便于排版）` `时间` `交易ID（链接）`；

| 类型 | 说明 | 时间 | 交易链接 | 
| - | - | - | - |
| [派发奖励] | shehuilongge2018 对 预测市场446 “刘强东在明尼苏达所涉...”派奖，else 获得10000SEER | 10天前 | 160d9a381a21 |
| [转账] | okok 转账 1000SEER 给 else | 11天前 | 70dd572e03f7 |
| [参与预测] | else 参与 预测市场446 “刘强东在明尼苏达所涉...”，预测选项“不起诉”，支出1000SEER | 15天前 | 19b0e7e4aea4 |

例如该账号参与过的房间房主派奖时，除显示房主派奖外，还应该显示该帐号余额的变动情况。通过`op.result.deltas`获取；

例如该账号参与预测时，除显示参与预测，该帐号余额的变动情况
(通过`op.result.deltas`获取)、输入结果(通过`op.op.inputN`获取),同时显示房间号(通过`op.op.room` 获取，链接)

交易id通过`get_block` `op.block_num` 获取该转账操作所在块的信息，再通过`op.trx_in_block`的数值来获取到块信息中`transaction_ids`数组里该转账操作对应的txid，同一个txid可能对应多个操作。

2、该账户属性：包含`资产余额`、`Object_ID`、`帐户名`、`推荐人`、`注册人`、`是否终身会员`，`权限`中显示该用户的`资金`、`账户`、`MEMO`公钥，若此用户具有`预测市场设立者`、`预言机`、`见证人`、`理事会`等角色，或是投票给某个理事会成员/设置了投票代理，也将其属性值列出。以侧边栏的形式出现
例如：

| 资产余额 |  |
| - | - |
| SEER | 1000000 |
| OPC | 120000 |
| PFC | 8700 |

通过`list_account_balances`获取

| 账户属性 |  |
| - | - |
| 帐户名 | okok |
| Object_ID | 1.2.30 |
| 是否终身会员 | 是 |
| 推荐人 | seer |
| 注册人 | seer |

| 权限|  |
| - | - |
| OwnerKey | SEER7SQVh85z8N38jvcmYTtE7JifoRsGH5DEea6HixVdxVHTezDfHv |
| ActiveKey | SEER7WyPH3aCQkGfWZkQnXuYPQNZ4ppC2n3tfA87hpAVtoqzXFh5gx |
| MemoKey | SEER7WyPH3aCQkGfWZkQnXuYPQNZ4ppC2n3tfA87hpAVtoqzXFh5gx |

通过`get_account`获取

3、`预测市场设立者`属性包括：Object_ID、描述、脚本、保证金、信誉度、参与量，以及当前正在进行的房间和历史房间前N位（信息格式见预测市场列表）；
例如：

| 预测市场设立者信息 |  |
| - | - |
| Object_ID | 1.14.6 |
| 描述 | 请叫我社会哥 |
| 脚本 | - |
| 保证金 | 300000 |
| 信誉度 | 2 |
| 参与量 | 2 |

通过`get_house_by_account`获取以上信息，同时可以用`rooms`、`finished_rooms`作为`get_seer_room`的参数获得以下数据：

正在进行的房间

| 类型 | 设立者 | 市场编号 | 描述 | 总参与量 | 开启时间 | 结束时间 | 创建者权重 | 标签 |
| - | - | - | - | - | - | - | - | - |
| [PVP] | okok | 446 | “BTC 2018年10月21日...” | 367万 SEER | 5天前 | 5分钟后 | 70% | 币比 币圈 经济 BTC |
| [高级] | okok | 486 | “曼城 VS 恒大 胜负” | 188万 OPC | 3天前 | 3小时后 | 80% | 章鱼宝 体育 赛事 足球 欧亚杯 2018 |

已结束的房间

| 类型 | 设立者 | 市场编号 | 描述 | 总参与量 | 开启时间 | 结束时间 | 创建者权重 | 标签 |
| [PVD] | okok | 526 | “刘强东在明尼苏达所涉...” | 42万 ABC | 13天前 | 2天前 | 30% | 热门 社会 大佬 |

4、`预言机`属性包括：Object_ID、描述、脚本、保证金、信誉度、参与量。
例如：

| 预言机信息 |  |
| - | - |
| Object_ID | 1.13.1 |
| 描述 | 最帅预言机 |
| 脚本 | - |
| 保证金 | 16000 |
| 信誉度 | 3 |
| 参与量 | 3 |

通过`get_oracle_by_account`获取

5、`见证人`属性包括：Object_ID、抵押数、待领取抵押收益、抵押清单（抵押ID+数额）、待领取出块收益、最近出块号、链接、丢块数、见证人签名公钥。

分别通过`get_witness`和`get_vesting_balances`获取，其中`get_vesting_balances`返回信息中，object_id为`1.11.90`的即出块收益。

例如：

| 见证人信息 |  |
| - | - |
| Object_ID | 1.5.11 |
| 抵押数 | 14000000 |
| 待领取抵押收益 | 187865 |
| 待领取出块收益 | 318642 |
| 最近出块号 | 3216572 |
| 链接 | https://baidu.com |
| 丢块数 | 23 |
| 见证人签名 | SEER7QatX8TjD44ZHayfqBFYENUQQtvRU9b8ykgCBxBdaFRzqagKxc |
| 抵押清单 | 2.16.0、2.16.1、2.16.3 |

6、`理事会信息`属性包括：Object_ID、总得票数、链接。
例如：

| 理事会信息 |  |
| - | - |
| Object_ID | 1.4.7 |
| 总得票数 | 189765425 |
| 链接 | https://baidu.com |

通过`get_committee_member`获取

链接格式为：https://seerscan.com/account/okok

#### 热门预测市场列表页面

1、列出当前活跃的预测市场（房间）列表：[市场类型（PVD/高级/PVP）] 创建者 房间号（Object_ID，链接） 描述（链接） 总参与量 开启时间 结束时间 创建者权重 标签（链接），默认按参与量排序，用户可按一定方式排序（排序方式包括总参与量、结束时间、创建者权重）；

例如：

| 类型 | 设立者 | 市场编号 | 描述 | 总参与量 | 开启时间 | 结束时间 | 创建者权重 | 标签 |
| - | - | - | - | - | - | - | - | - |
| [PVP] | shehuige18 | 446 | “BTC 2018年10月21日...” | 367万 SEER | 5天前 | 5分钟后 | 70% | 币比 币圈 经济 BTC |
| [高级] | octopaul | 486 | “曼城 VS 恒大 胜负” | 188万 OPC | 3天前 | 3小时后 | 80% | 章鱼宝 体育 赛事 足球 欧亚杯 2018 |
| [PVD] | akira | 526 | “刘强东在明尼苏达所涉...” | 42万 ABC | 13天前 | 20天后 | 30% | 热门 社会 大佬 |

标签一栏中，根据页面显示区域显示1个至全部个数标签。

2、根据用户标签历史纪录在侧边栏生成标签云，每个标签链接到相应的预测市场标签列表页面。

3、列出活跃的预测市场设立者（按参与量排名列出前N位）。

可通过`lookup_house_accounts`获得房主列表，再通过`get_houses`获得所有活跃房间和历史房间，再通过`get_seer_room`获得房间详细信息。

标签云通过本地存储数据中的标签，列出使用次数最多的标签。

| 排名 | 设立者 | 描述 | 保证金 | 信誉度 | 参与量 |
| - | - | - | - | - | - | 
| 1 | okok | 请叫我社会哥 | 300000 | 3 | 3 | 
| 2 | else | 输钱福利社，输了又来的就是我。 | 500000 | 15 | 15 | 

链接格式为：https://seerscan.com/hotmarkets

#### 预测市场标签列表页面

1、列出当前活跃的预测市场（房间）列表：[市场类型（PVD/高级/PVP）] 创建者 房间号（Object_ID，链接） 描述（链接） 总参与量 开启时间 结束时间 创建者权重 标签（链接），默认按参与量排序，用户可按一定方式排序（排序方式包括总参与量、结束时间、创建者权重）；

2、显示已结束/输入中预测市场列表，格式同上。

3、显示标签云。

通过`get_rooms_by_label`获取相应标签的房间id，再通过`get_seer_room`获取这些房间的详细信息。

标签云通过本地存储数据中的标签，列出使用次数最多的标签。

链接格式为：https://seerscan.com/label/社会

#### 预测市场详情页面

1、显示房间属性：

通过`get_seer_room`获得房间详细信息，属性包括：市场Object_ID、设立者ID（链接）、标签（链接）、描述、市场类型（PVD/高级/PVP）、市场状态（进行中/未开始/已结束/结果输入）。

| 描述 | 新加坡时间2019年1月2日0时整，比特币价格高于7000美元吗？以coinmarketcap.com显示价格为准。 |
| - | - |
| 类型 | PVD（LMSR） |
| Object_ID | 1.15.1236 |
| 设立者 | okok |
| 标签 | 币比 币圈 经济 BTC 币价 USD 美元 牛市 |

2、显示房间设置：接受资产、单次最小参与数额、单次最大参与数额；

| 接受资产 | SEER |
| - | - |
| 单次最小参与数额 | 100 |
| 单次最大参与数额 | 10000 |

3、显示市场状态：开始时间、结束时间、结果输入时限、资金池（仅高级模式和PVD模式显示，PVD模式的资金池通过房主设定的L值和选项数，根据公式资金池F = L x ln（选项数量）计算出）、总参与量；

| 市场状态 | 进行中 |
| - | - |
| 开始时间 | 2018-12-22T02:36:29 |
| 结束时间 | 2019-01-01T16:00:00 |
| 结果输入时限 | 12小时 |
| 资金池 | 12412984 SEER |
| 总参与量 | 98372123 SEER |

4、显示预言机设置和门槛：市场设立者权重、预言机奖励、条件达到此门槛的预言机才能参与结果输入：（名誉、保证金、参与量）

| 市场设立者权重 | 30% |
| - | - |
| 每个预言机奖励 | 100 SEER |
| - | - |
| 条件达到此门槛的预言机才能参与结果输入 |  |
| 名誉 | 3 |
| 保证金 | 10000 SEER |
| 参与量 | 3 |

5、房间选项：包括选项描述、参与人数和参与数量（资产或份数），非LMSR显示奖金倍数。

| 选项 | 内容 | 参数人数 | 参数量 | 该选项发生概率 |
| - | - | - | - | - |
| 0 | 归零 | 0次 | 0份 | 0% |
| 1 | 小于7000美元 | 8723次 | 1234140份 | 28.21% |
| 2 | 等于7000美元 | 1次 | 100000份 | 0.1% |
| 3 | 大于7000美元 | 7131次 | 3453253份 | 71.78% |

6、最新参与滚动信息：

| 类型 | 说明 | 时间 | 交易链接 | 
| - | - | - | - |
| [派发奖励] | okok 对 预测市场1236 派奖 | 2天前 | ZHayfqBF8QtvR |
| [输入结果] | okok 对 预测市场1236 输入结果：选项1“小于7000美元” | 2天前 | fqBFYENUx9a3 |
| [输入结果] | else 对 预测市场1236 输入结果：选项1“小于7000美元” | 2天前 | d55719b0e7e4 |
| [市场结算] | okok 对 预测市场1236 结算 | 3天前 | d9a381a2152d |
| [停止参与] | okok 停止 预测市场1236 | 3天前 | 4aecceds06e3 |
| [参与预测] | shehuilongge2018 参与 预测市场1236 ，预测选项1“小于7000美元” | 4天前 | a381a021520d |
| [参与预测] | else 参与 预测市场1236 ，预测选项1“小于7000美元” | 5天前 | 160d9a381a21 |

滚动信息包含房间参与数据，`get_seer_room`的参数包括`房间object_id`、`参与记录的开始索引start`、`参与记录返回的最大数量limit`。例如`get_seer_room 1.15.236 0 100`即表示返回236房间的前100个参与记录。若要显示更多记录，需要修改start，在当前start的基础上增加limit，例如若一个房间共200条记录，要全部显示需要`get_seer_room 1.15.236 0 100`，再`get_seer_room 1.15.236 100 100`。

7、参与预测图表：参数包括时间、参与人次、参与数额、预测选项、选项赔率（PVD为单份成本）；

链接格式为：https://seerscan.com/pm/3427 （PM = prediction market）

#### 交易详细信息页面

1、显示该交易时间、所属区块。

2、显示该交易id下所有操作列表；

| 类型 | 说明 | 
| - | - |
| [转账] | okok 转账 1000ABC 给 else |
| [转账] | okok 转账 1000ABC 给 alice | 
| [转账] | okok 转账 1000ABC 给 bob | 

3、显示格式化后的该交易json信息。

通过交易id和本地存储数据中的交易id匹配，显示该交易id对应的交易信息。

交易id有多重获取方式：

A 通过`get_block`获取区块信息中该交易所在`transactions`中的顺序位置，对应该区块信息中"transaction_ids"字符串中该交易对应的`transaction_id`；

B 用户在转账操作时可以用`transfer2`替代`transfer`，这样在交易广播后，会在返回信息中直接给出该交易对应的`transaction_id`；

C 用户可以使用`get_transaction_id`在参数中传入该交易的json格式内容，即可生成对应的`transaction_id`；

D 用户在使用RPC方式调用`get_relative_account_history`时，返回信息中`op.block_num`即该操作的入块高度，`op.trx_in_block` 该操作所属交易的`transaction_id`在该区块`transaction_ids`字符串中的位置。

链接格式为：https://seerscan.com/tx/160d9a381a2152d55719b0e7e4aea4aaecce06e3 

#### 资产介绍页面

1、该资产持有人列表（链接），持有占比；
2、持有分布统计饼图；
3、该资产的属性：资产代号、资产类型（CORE/UIA）、当前供应量、发行人（链接）、Object_ID、小数位数、最大供应量等（侧边栏）。
4、SEER的资产介绍页面可以作为SEER持仓分布页面在首页提供链接；

| 排名 | 账户 | 数额 |
| - | - | - |
| 1 | init0 | 8000000000.00000 |
| 2 | okok | 100000000.00000 |
| 3 | else | 300000.00000 |
| 4 | alice | 5400000.00000 |

属性：

| 资产代号 | ABC |
| - | - |
| Object_ID | 1.3.10 |
| 资产类型 | UIA |
| 当前供应量 | 8046234175 |
| 最大供应量 | 10000000000 |
| 发行人 | okok |
| 小数位数 | 5 |

| 手续费汇率 | 0.56 SEER/ABC |
| 资金池余额 | 88838 |
| 发行人未申领收入 | 171419 |

`该资产持有人列表`可使用`余额快照功能`，每隔一段时间对指定资产的所有用户持仓进行快照，获取持有人列表数据。
资产属性可通过`get_asset`获得。

链接格式为：https://seerscan.com/assets/SEER 

#### 见证人信息页面

1、显示本轮活跃见证人列表：包括排名、账户名、上一个区块、上次生成块、缺失块数、抵押金、利息收入；

| 排名 | 账户名 | 上一个区块 | 上次生成块 | 缺失块数 | 抵押金 | 利息收入 |
| - | - | - | - | - | - | - |
| 1 | okok | 1分钟前 | 456123 | 2 | 1205616145 | 1353345 |
| 2 | else | 1分钟前 | 456121 | 1 | 21456283 | 64562 |
| 3 | alice | 20秒前 | 456126 | 1 | 5981236 | 345343 |
| 4 | bob | 现在 | 456129 | 0 | 8123012 | 4081236 |

通过`list_witnesses`获得所有见证人id，`get_witness`可获得每个见证人的详细信息。按抵押金额排名前101位的为获息见证人，通过`info`获得本轮出块的21为活跃见证人和参与率等信息，每块奖励通过`get_global_properties`获得，本期剩余见证人奖励通过`get_dynamic_global_properties`中的`witness_budget`本期见证人预算总额 - 本期已出块数 * 每块奖励得出。

2、区块生产状态：包括当前见证人、活跃见证人、参与率、每块奖励、剩余预算、计票更新时间（侧边栏显示）；

| 当前见证人 | bob |
| - | - |
| 活跃见证人 | 21 |
| 参与率 | 100% |
| 每块奖励 | 3SEER |
| 本期剩余预算 | 23127SEER |
| 计票更新时间 | 8小时后 |

3、可切换主力见证人、主力及候选见证人（获息见证人）、所有见证人（所有注册见证人资格的用户，包括未入选获息见证人的用户）。

#### 理事会信息页面

显示排名、账户名、得票数、竞选网页。

| 排名 | 账户名 | 得票数 | 竞选网页 |
| - | - | - | - |
| 1 | okok | 65115531 | http://baidu.com |
| 2 | else | 54234798 | http://baidu.com |
| 3 | alice | 68633872 | http://baidu.com |

通过`list_committee_members`和`get_committee_member`获得。


## 调用区块链上的信息

以下指南以Ubuntu 16.04.4 x64 系统为例。

### 配置一个SEER全节点

1、在服务器新建一个名叫seer的窗口；

```linux
screen -S seer
```

2、在root目录下新建一个名叫seer的目录，下载`v0.0.5版本`的程序包到此目录，并更名为`seer.tar.gz`。（请到SEER软件发布页https://github.com/seer-project/seer-core-package/releases 复制最新的ubuntu版本程序包链接替换掉此下载链接。）

```linux
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.05/seer-ubuntu-0.0.5.tar.gz 
```

3、进入seer目录，解压此软件包。

```linux
cd seer
tar xzvf seer.tar.gz
```

4、带websocket参数启动witness_node：

```linux
witness_node --rpc-endpoint=127.0.0.1:9090 max-ops-per-account=1000 
```
其中的`--rpc-endpoint`参数为节点监听的websocket RPC IP地址和端口号，需要您替换，此处`127.0.0.1`为本机，`9090`是为节点指定的WS端口。

`--max-ops-per-account`参数设定内存中保留账户的多少条操作记录，此处`1000`表示保留追踪账户的`1000`条操作记录，需要您按需求填写。

5、观察节点运行正常后，ctrl+A d隐藏screen，断开服务器。之后要再打开运行有节点的Sreeen，则使用 `screen -R` ，或 `screen -r seer`。 

节点正常启动后，会显示像下面一样的3秒一个的出块信息。

![节点正常启动的状态](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/640.gif)

如果要关闭节点，则使用`control` + `C` 。

### 配置一个SEER命令行钱包

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
### 接入命令行钱包

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

#### Http-RPC接入示例

可以使用curl命令来测试Http-RPC连接命令行钱包实现获取指定账户的各资产余额:

```linux
 curl http://127.0.0.1:9192 -d '{"jsonrpc": "2.0", "method": "list_account_balances", "params": ["seerdex-withdraw"], "id": 1}'

 {"id":1,"result":[{"amount":"7861151753754","asset_id":"1.3.0"},{"amount":97099800,"asset_id":"1.3.8"}]}
```

#### websocket RPC接入示例

首先在服务器上安装使用wscat测试ws：
```linux
 apt install node-ws
```
测试通过websocket RPC连接命令行钱包实现获取指定账户的各资产余额:
```json
wscat -c ws://127.0.0.1:9191
> {"jsonrpc": "2.0", "method": "list_account_balances", "params": ["seerdex-withdraw"], "id": 1}
< {"id":1,"result":[{"amount":"7861151753754","asset_id":"1.3.0"},{"amount":97099800,"asset_id":"1.3.8"}]}                                      
```

### 常用指令

按上一部分的首次出现顺序排列：

#### get_block

#### info

#### get_global_properties

#### list_accounts

#### list_assets

#### get_seer_room

#### get_relative_account_history

#### list_account_balances

#### get_account

#### get_house_by_account

#### get_oracle_by_account

#### get_witness

#### get_vesting_balances

#### get_committee_member

#### lookup_house_accounts

#### get_houses

#### get_rooms_by_label

#### get_transaction_id

#### transfer2

#### get_asset

#### list_witnesses

#### get_global_properties

#### get_dynamic_global_properties

#### list_committee_members

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

#### 转账操作

操作信息：

```json
0,{
	"fee": 
	{
	  "amount": 200000,//手续费 2
	  "asset_id": "1.3.0"//手续费类型 1.3.0指SEER
	},
	"from": "1.2.1250",//发起用户ID
	"to": "1.2.1292",//接收用户ID
	"amount":
	 {
	  "amount": 1000000000,//金额10000
	  "asset_id": "1.3.1"//金额类型 1.3.1即OPC
	},
	"extensions": []
}
```
显示效果：

```
| 类型 | 说明 | 
| - | - |
| [转账] | okok 转账 10000ABC 给 else |
```
取数据格式：
get_account[get_block N.result.transactions.operations.from].result.name 转账 get_block N.result.transactions.operations.amount.amount/100000 get_asset[get_block N.result.transactions.operations.amount.asset_id].result.symbol 给 get_account[get_block N.result.transactions.operations.to].result.name

#### 创建委单