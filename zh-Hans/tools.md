---
nav: zh-Hans
search: zh-Hans
---

# 赛亚开发工具使用指南

通过此文档，介绍SEER

使用此教程的用户，我们默认您已经了解基本的SEER节点和命令行钱包使用方式。如果不了解，<a router-link="/cli">`请点击这里`</a> 。

## SEER公链余额快照功能和批量转账功能使用指南

请下载最新版的节点和钱包：https://github.com/seer-project/seer-core-package/releases

余额快照和批量转账功能结合在一起，就是Dapp会用到的空投功能了。在SEER区块链系统中，这两大功能分别集成在节点软件和命令行钱包中，使用参数等形式调用。

### 余额快照

余额快照的调用方式是在启动节点时加入以下参数：

```cmd
witness_node --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```
#### 参数解释

--plugins="snapshot " 中 "snapshot " 告诉节点你要使用的功能为快照，注意不要漏了t 和 "之间的空格；

--snapshot-at-time="2018-07-24T04:00:00" 中 "2018-07-24T04:00:00" 替换为你要进行快照的时间，为格林尼治标准时间，比新加坡时间晚8个小时；

--snapshot-to="d:/0724.csv"  中 "d:/0724.csv"为快照出的表单文件要存放的目录和文件名；

 --snapshot-asset="SEER" 中 "SEER" 为你要快照的资产类型，可以是基于SEER发行的任何资产，例如OPC、PFC等；

--snapshot-balance-limit=1 中的参数1为快照余额下限，1为不等于0。因为SEER最多支持小数点后5位，所以例如如果你想只快照余额大于10000的账户应该写成--snapshot-balance-limit=1000000000。

在快照前节点需要和区块链正常同步，如果同一台设备上已经运行了seednode、api node、witness node等节点，为避免端口冲突，需要修改端口号为未占用的端口。

#### 完整参数

```cmd
witness_node --data-dir ./data  --p2p-endpoint=0.0.0.0:1899 --rpc-endpoint=0.0.0.0:9192 --replay-blockchain --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```

可以看到节点在指定时间对主网进行了余额快照，在指定目录可以找到快照表单文件。

快照文件中的余额字段自动包含了SEER等资产类型，用excel的替换功能替换删除掉即可。

当然，这个表里面得到的是某种资产的余额快照，如果要按一定的比例空投，只需对数据进行再加工即可。

### 批量转账（空投）

批量转账功能已经集成在命令行钱包中，使用“batch_transfer”命令调用，调用的文件是一个和cli_wallet同目录的txt文件。

#### 使用方式

1、在命令行钱包（cli_wallet）同目录下新建一个txt文件，本例中我们命名为“transfer.txt”；

2、编辑此文件，每个转账为一行，格式为：from to amount asset，使用空格隔开。

例如：

```txt
alice bob 100 SEER
alice charlie 100 SEER
alice dove 100 SEER
alice eva 100 SEER
```
提醒：同一个txt内转账数不要太多，一般不超过2000个，以避免单个区块过大，广播出问题。

3、在解锁的命令行中运行：

```cmd
batch_transfer transfer.txt 
```
执行后，所有的转账会同时被广播。本例中bob、charlie、 dove 、eva将每人收到100 SEER的空投，当然，此命令行钱包需要导入alice的活跃权限私钥。



