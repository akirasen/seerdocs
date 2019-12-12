---
nav: zh-Hans
search: 
  - zh-Hans
  - zh-Hant
---

# 赛亚Dapp开发者需要了解的一些知识

SEER区块链为开发者提供了高效、低门槛、低手续费的底层基础设施，并集成了下一代现实预测市场、多宿主预言机框架、自定义资产发行流转平台和赛事众筹（开发中）等文体行业常用的功能模块。

基于这些底层基础设施和功能，开发者可以大开脑洞，发挥自己的创意，来设计自己的去中心化应用。例如，您可以做一个预测主题的社交媒体，用户可以对从天气到明星八卦来发起预测，您发行的SEER自定义资产是贯穿整个产品线的区块链积分；您也可以做一个预言机服务应用，让SEER的预言机们及时了解到全网的预言机需求，并为用户提供提醒服务，让预言机用户不错过任何一个撸SEER的机会，也为SEER生态提供最准确高效的现实世界数据支撑；当然，您也可以做SEER最擅长的体育行业应用，让用户邀请朋友一起对正在火热进行的赛事结果进行预测，在比赛中如证券一样的对预测选项进行买涨买跌，既新奇又刺激。

当然，需要提醒开发者们的是：SEER的愿景，是用市场机制让用户表达对未来事件的判断，并集众人的智慧与看法对未来事件进行有效的预测，对现实预测这个社会学命题提供学术支持。任何基于SEER的开发和使用，都应该遵守所在国法律，避免用户非理性参与为其造成财产损失。

SEER基于石墨烯区块链技术开发，如果您使用过Bitshares、EOS、YOYOW等石墨烯系项目，会比较容易理解SEER的底层设计。

那么，我们来了解一下SEER为我们提供的各种功能吧。（友情提示：此文档由SEER社区开发者提供，对SEER和石墨烯区块链技术的理解可能有所偏差，若发现理解有误的地方，请到github为笔者指正。）

## SEER测试网络

最快速了解SEER功能的方法，还是在测试网络的开发者网页钱包上多折腾，自己体验。

测试网络地址：http://123.206.78.97

测试网络账号：okok 
私钥：5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ 
内有上千万测试币，欢迎体验。

通过 <a router-link="./cli">`命令行钱包`</a> 操作，并观察区块链的返回信息。更能够理解区块链底层的功能。

## SEER的账户体系

详细版的账户说明在<a router-link="./?id=seer的账户体系">`seer的账户体系`</a> ，这里我们简单介绍。
  
### SEER的钱包和账号管理

#### 账户名和私钥

不同于以太坊网络中的一长串公钥形式的地址，石墨烯系项目中用户可以根据TITAN机制（Transfer Invisibly To Any Name 基于名称的隐匿交易）自行设定一个由英文字母和数字构成的`账户名`，在区块链上是唯一的，更加方便记忆。同时，每个账户在区块链上还有数字ID相对应。

因为账号在SEER全网都具有唯一性，并且注册纯英文的账号需要支付更高的手续费。为了方便普通用户理解，有DAPP开发者想到了在用户通过该DAPP注册id时，在用户名前默认加上“xxx_”的前缀，这也是一个降低门槛的好办法。

每个SEER账户对应有账户秘钥、权限秘钥、备注秘钥，公钥公开，注册账户时，只需要在区块链上记录用户的账户名和公钥信息，用户在和区块链交互时需要提供公钥对应的私钥来验证身份。

账户的私钥加密存放在用户本地设备上，可以通过导出bin文件、脑钱包（助记词）、私钥等方式进行备份，助记词作用基本等同于用户私钥，方便抄写备份，是最适合移动设备DAPP使用的备份方式。

#### 钱包

存放在用户设备上的私钥需要进行二次加密，用户需要在注册账号时设置一个本地解锁密码，此密码用touch/face-ID等解锁方式代替体验更佳，目的是保证用户私钥在本地的安全。

在用户本地设备存储私钥，并用本地密码二次加密的概念便是`钱包`的概念。在目前的开发者网页钱包可以看到，以钱包模式使用时，钱包和私钥可以是一对多的关系，即用户可以在钱包中导入，存放任意数量的私钥，以通过切换账号获得这些私钥对应账号在区块链上的操作权限。

DAPP在设计时，可以做成单账户模式，也可以做成多账户模式。

### 水龙头

在SEER区块链上，任何操作都需要向网络支付少量手续费，创建账户也不例外。任何`终身会员账户`都能注册新用户，DAPP和主网钱包可以为用户提供免费的`水龙头`注册服务，水龙头代用户支付小额的账户注册费用，但能让自己成为被注册账号的`注册人`，以获得用户在区块链上进行任何操作的手续费分成。

## SEER的自定义资产发行流转体系

详细版的自定义资产说明在<a router-link="./?id=用户发行资产">`用户发行资产`</a> ，这里我们仅简单介绍。

SEER允许用户创建各种自定义资产(UIA)。自定义资产的应用场景数不胜数。比如，自定义资产可被用来代替简单的活动门票，存入合格用户的手机钱包中，在进入活动现场时进行实时验证。同样，自定义资产可被用来进行众筹、所有权追踪，甚至是代表公司的股权。利用SEER的命令行钱包，您可以用半去中心化的脚本方式实现如区块链积分空投、用户消费等网关化功能。

自定义资产发行者可以为该资产设立手续费池和汇率，在手续费池中注入SEER主资产，以方便用户使用该自定义资产支付区块链上的各种手续费。用户进行操作时，手续费池将发行者设定按汇率自动扣除相应数额的SEER主资产。

在SEER区块链上集成了沿用自石墨烯底层的去中心化资产流转市场，用户可以自行生成基于SEER发行的自定义资产和SEER主资产之间的交易对，这个功能可以让用户将DAPP发行的资产兑换为SEER，以用于预言机手续费、保证金、终身会员手续费等必须使用SEER主资产的链上场景。

## Issue a UIA based on SEER WebWallet

此教程将指导用户基于SEER网页钱包发行自定义资产。SEER支持的资产代码最少为三位，例如ABC。创建资产的费用目前为三位资产代码 350,000 SEER，四位资产代码150,000 SEER，更长的资产代码15,000 SEER，此数据有可能变更，请以https://wallet.seerchain.org/explorer/fees 显示的费率为准。

### STEP 1 准备工作和前提条件

在进行之后的步骤前，请确认您已经拥有一个SEER主网账户，如果有，并且已充值足够的创建资产手续费费用，则可以跳过STEP 1。

#### PART 1 创建SEER账户

1. 进入SEER网页钱包：https://wallet.seerchain.org/ 点击右上角`创建账户`按钮。根据提示输入要使用的账户名和本地钱包解锁密码，进行账户创建。

2. 根据页面提示备份助记词和bin文件，完成注册。备份十分重要，如果遗失或泄露助记词和bin，将会造成无可挽回的损失。

3. 点击顶部`账户管理`按钮-`账户管理`页面左侧`网关`按钮，在`网关`页面选择`转入SEER（ERC20）`，然后点击`生成地址`，SEER网关会生成一个和您的SEER账号绑定的ETH地址，此地址可用于将其它ETH钱包或交易所的SEER TOKEN转入主网。

4. 如果您只想使用免费创建的这一个账户，请跳过此步骤。如果您是要进行例如充提等业务，则需要创建不同的账户，分别负责资产发行和充提业务等。创建多个账户需要`终身会员`权限，申请终身会员权限需要10,000 SEER手续费，当第一个账户SEER余额大于10,100SEER时，点击顶部`账户管理`按钮-`账户管理`页面左侧`会员`按钮，在`会员`页面点击`购买终身会员`。根据提示完成此操作后，点击顶部`账户管理`按钮-`账户管理`页面左侧`我的账户`按钮，在`我的账户`-`账户`页面点击`创建账户`，其余操作和首次创建账户一致。

#### PART 2 向SEER账户转入SEER作为创建资产的手续费

STEP 1.PART 1.3 中已经介绍了如何获得一个和SEER账户绑定的ETH地址。您可以在交易所账户中提币，或是从其它ETH钱包中转账SEER到此地址，ETH交易确认后，网关会扣除少量手续费后自动转账相应金额的SEER TOKEN到您的SEER账户。SEER到账时间从几分钟到几个小时不等，这和交易所或您的钱包为此次操作支付的GAS费用以及ETH区块链拥堵情况有关。

### STEP 2 资产发行

当您完成STEP 1中的准备工作后，可以点击顶部`账户管理`按钮-`账户管理`页面左侧`资产管理`按钮，在`资产管理`页面点击`创建资产`按钮，进入资产参数设置页面。

#### PART 1 主要设定（必要设置）

1. 资产代码，您资产的唯一标识代码，例如`ABC`、`BTC`，被您使用后不可更改，其他人也无法再使用相同的代码。不同位数的资产创建费用不一样，费率参考https://wallet.seerchain.org/explorer/fees

2. 最大资产总量，这是在区块浏览器中显示的最大发行量数据，后期可以通过`更新资产`来变更。

3. 小数位数，这是资产的小数精度选项，一般建议设为5，一旦设置不可更改。根据资产的相对价值，可以设置更多的小数位数。例如`ABC`的价值较高，1`ABC` = 1000000`CDE`，如果小数位数过低，比如`2位`，则`ABC`的最小份额金额为`0.01`，因此必须要金额大于10000`CDE`才能和`ABC`进行兑换，否则就会报错，造成很大不便。

4. 手续费汇率是指您为用户代付网络手续费时所采用的您的资产和SEER之间的比例，这需要您评估自己资产和SEER之间进行兑换的相对价值，例如`1 SEER兑换500 ABC`。这是SEER方便普通用户的一个功能，由资产创建人代付区块链上操作所需要的交易手续费。因为区块链上任何操作都需要向网络支付SEER作为网络手续费，此功能允许用户在不持有SEER的情况下，支付您发行的资产作为手续费，然后由您代其向区块链支付手续费。在您支付创建资产手续费时，其中的一部分将被作为代付手续费资金池用于此功能，当资金池不足时，您需要手动补充。

#### PART 2 其他设定：

1. `描述`-`描述`是在区块浏览器中显示的您对资产用途等信息的一个详细介绍，建议使用英文编写，`描述`中的其他选项不用修改。

2. `权限`中的设置建议全部使用默认的启用，除非您理解他的意义，否则不要更改。

3. `活动标记`-`收取交易手续费`后的启用按钮可以点击激活，这样在用户使用您的资产进行交易时，您可以按照`交易手续费率 (%)`中设定的手续费比例来收取手续费，同时建议设定一个合理的`最大交易手续费`作为上限。`活动标记`中的其他选项不用修改。

完成以上设定后，可以点击右上角`创建资产`按钮，根据提示完成资产创建。

### 资产更新和销毁

1. 当您完成STEP 2中的资产创建工作后，点击顶部`账户管理`按钮-`账户管理`页面左侧`资产管理`按钮，在`资产管理`页面点击列表中您资产后方的`更新资产`按钮，进入资产参数更新设置页面。

2. 在`更新资产`页面您可以更新除`小数位数`和`资产代码`外的几乎所有资产设置信息。`更新资产`页面拥有两个重要的功能：`更新发行人`和`手续费资金池`。

3. `手续费资金池`：如STEP 2.PART 1.4 中的描述，`可用余额`显示的是该资产当前剩余的资金池余额，如果您用于为普通用户代付SEER手续费的资金不足，则需要在`手续费资金池`填入`出资账户`（存在于此钱包）、`数量`，来向手续费资金池注入更多资金。此页面还有`领取资产手续费`功能，`发行人未申领收入`显示的是您通过在STEP 2.PART 2.3 中设置的交易手续费率获得的普通用户交易手续费，例如交易手续费率为1%，则用户每交易10000ABC，您可以获得100ABC，`可用余额`中显示的是您当前可以提取的手续费金额，输入`数量`，点击`领取手续费`，按提示完成操作，即可将手续费领取到您的余额。

4. `更新发行人`中，可以在`新发行人`中填入您的其它SEER账号，以将此资产转移给您的其他账户。

5. 点击顶部`账户管理`按钮-`账户管理`页面左侧`资产管理`按钮，在`资产管理`页面点击列表中您资产后方的`销毁资产`按钮，在弹出页面中填入您要销毁的资产数量，再点击`销毁`按钮，可以完成销毁操作。此操作用于将您通过收取普通用户交易手续费等形式获得的资产进行销毁，以减少本资产的当前供应量。当前供应量的减少情况可以在区块浏览器中查看。

### 资产详情查看

用户可以使用任何具备SEER区块链浏览器的SEER DAPP或钱包查看资产详情，例如主网网页钱包可以点击顶部`区块浏览器`按钮-`区块浏览器`页面点击顶部`资产`按钮，在列表中找到或搜索到您创建的资产，查看总量、供应量、手续费率、资金池等数据。显示页面如：https://wallet.seerchain.org/explorer/asset/SCP

### 创建自定义交易对

SEER链上默认只能使用自定义资产和SEER主资产之间的交易对，若要创建其他交易对，需要资产发行人账号在命令行钱包中使用`asset_create_market`操作才能让新的交易对可用。

#### PART 1 配置命令行钱包

以下教程以Windows版本为例：

1. 请下载最新版的钱包文件：https://github.com/seer-project/seer-core-package/releases 选择页面最新版本Assets中包含`seer-win`、`.zip`的版本下载并解压缩。

2. 在解压出的cli_wallet.exe所在目录创建记事本文件，内容填写：`cli_wallet.exe -s ws://sg1.seerchain.org`，并将此文件另存为`点此启动.cmd`。

3. 点击`点此启动.cmd`即可运行，命令行钱包启动后显示内容如下：

```
D:\SEER>cli_wallet -s ws://sg1.seerchain.org
Logging RPC to file: logs\rpc\rpc.log
3209149ms th_a       main.cpp:131                  main                 ] key_to_wif( committee_private_key ): 5KCBDTcyDqzsqehcb52tW5nU6pXife6V2rX9Yf7c3saYSzbDZ5W
3209150ms th_a       main.cpp:135                  main                 ] nathan_pub_key: SEER6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
3209150ms th_a       main.cpp:136                  main                 ] key_to_wif( nathan_private_key ): 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
Starting a new wallet with chain ID cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91 (from egenesis)
3209157ms th_a       main.cpp:183                  main                 ] wdata.ws_server: ws://sg1.seerchain.org
3209198ms th_a       main.cpp:188                  main                 ] wdata.ws_user:  wdata.ws_password:
Please use the set_password method to initialize a new wallet before continuing
new >>>
```
4. 在命令行窗口`new >>>`之后输入`set_password 123`，`Enter`，创建命令行钱包密码，`123`可以替换为您能记得的其他的密码，成功后显示内容如下：
```
new >>> set_password 123
set_password 123
null
locked >>>
```
5. 在命令行窗口`locked >>>`之后输入`unlock 123`，`Enter`，解锁命令行钱包，`123`替换为您的密码，成功后显示内容如下：
```
locked >>> unlock 123
unlock 123
null
unlocked >>>
```
6. 在命令行窗口`unlocked >>>`之后输入`import_key abc 5kxxxxxxx..w2s4x`，`Enter`，导入资产创建账户资金权限私钥，`abc`替换为您的SEER资产发行人账户名，`5kxxxxxxx..w2s4x`替换为您的资金权限私钥，私钥可以在网页钱包点击顶部`账户管理`按钮-`账户管理`页面左侧`权限管理`按钮，在`权限管理`-`资金权限`页面点击`账户名/公钥`列表中的`SEER2r312.....3y9xVuFk2`格式公钥，在弹出的`私钥查看器`中点击显示并输入密码即可显示您的私钥。成功后显示内容如下：
```
unlocked >>> import_key abc 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY
import_key abc 5JLE3j2Mn815kunzbT4ffeKsZwMhHdwDJUAyjm2KRis3qcATPUY
1983068ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
1983069ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-4b839f25.wallet
true
```

以上，命令行钱包配置完成。

#### PART 2 创建自定义交易对

前提条件：1. 命令行钱包已解锁(显示：`unlocked >>> `)，2. 已导入资产发行人私钥。

在命令行窗口`unlocked >>>`之后输入`asset_create_market abc ABC 1 CDE true`，`Enter`，创建ABC/CDE交易对。`abc`替换为您的SEER资产发行人账户名，`ABC`替换为您发行资产的代码，`CDE`替换为要创建交易对的目标资产（非SEER，因为SEER交易对是默认就有的），`1`为交易对的序号，表明这是您为此资产创建的第几个交易对，需要大于等于1。成功后显示内容如下：

```
unlocked >>> asset_create_market abc ABC 1 CDE true
{
  "ref_block_num": 50800,
  "ref_block_prefix": 3786166302,
  "expiration": "2019-09-26T12:42:24",
  "operations": [[
      62,{
        "fee": {
          "amount": 30000000000,
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

以上，自定义交易对创建完成。

### 在网页钱包或DAPP前端列出资产

您自行创建的交易对需要联系相关网页钱包或DAPP的运营方，由开发者在前端进行配置后才能列出，供用户使用。

## SEER的预测市场体系

### 预言机

智能合约将人与人之间达成的共识翻译为代码，可以在满足一定条件时自动执行。但智能合约无法感知现实世界的数据，例如用户提前竞猜选定一场比赛的赛果，便是使用智能合约，而现实世界中的真实结果，则需要从外部输入，以提供智能合约自动执行的条件。这个结果的输入者，便是预言机（Oracle）。

预言机是现实世界与SEER区块链平台之间的数据流通桥梁，可靠的预言机机制是确保区块链平台能获得正确的来自现实世界的数据以用来作为判断与执行智能合约的依据。预言机能否提供正确的现实世界结果数据对往后的奖励分配等会有很大的影响。因此，提供一个可靠，可信赖且中立的预言机是SEER的核心功能之一。

SEER采用了多宿主预言机框架，用户可以向区块链支付一定的注册手续费，并锁定一定的保证金即可成为预言机。

#### 多宿主预言机功能

为了进一步确保输入的数据真实可靠，SEER 引入了基于多重宿主（Multiple Hosts）模型的去中心化预言机功能，在此功能中，房间设立者需要将房主输入权重设为低于一定数值（例如30%），这样预言机输入结果在系统最终采纳的结果中占比就将达到70%，房主可以为预言机设立门槛和预言机奖励，例如保证金数量、参与过的结果输入次数等，符合要求的预言机都可以参与结果输入，流程完毕后，参与到预言机可以得到奖励。

多宿主预言机功能可以更大程度确保结果可信性并且可以提高整体系统的鲁棒性，避免因系统故障等问题导致的因单点服务不可用时无法提供结果的问题。

#### 单宿主预言机功能

对于参与人数不多或者时效性要求更高的预测市场房间，为求更快得出结果，预测市场设立者也可以将房主输入结果的权重设得较高，例如90%，以采用普通的单宿主模型。

房间的结果输入方式，DAPP设计时可以重点展示，并提供相应的查询分类检索方式和提示，以引导用户参与更可信的房间。

### 平台和房间

在SEER的预测市场设计中，一般情况下，用户需要首先创建平台，先获得房主资格，才能创建房间。用户为平台所交纳的保证金，以及该用户作为平台发起房间的次数等信息，都是对应到该平台的数据资料中。注册成为平台后，用户可以创建各种类型的预测房间。

因为创建平台需要用户自行设定保证金数额，并且创建平台手续费率相对较高，所以为了让更多普通用户可以体验创建房间功能并和朋友一起娱乐，目前SEER区块链也提供了不创建平台直接开设PVP房间的人人房主模式房间。这些无平台用户创建的房间同一归类到公共平台目录下。

#### 房间的标签

房主可以为自己创建的房间设立标签，例如足球、世界杯、八卦等，在列出房间列表时可以用get_rooms_by_label接口查询相应标签的房间。当然，如果DAPP开发者如果希望在前端显示的都是通过此DAPP创建的房间，则可以在用户创建房间时默认加入一个和DAPP相关的标签，在查询房间列表时仅列出带有此标签的房间。

### 预测房间类型

#### LMSR（PVD）模式

PVD模式采用LMSR（Logarithmic Market Scoring Rule，对数市场评价法则）算法规则进行市场预测。不同于传统市场调查、网上投票等“买定离手”式一次性预测，LMSR是一种动态的、自动化的预测机制，某个事件发生的几率越来越高，预测该方向的参与者也会越多，市场共识会推动该预测方向的实时参与价格变高，用户以当前价格进行该方向的预测，在预测最终结束前都可以实时进行动态交易。

LMSR类型的预测，用户的参与量可以是负数，`负数即卖出`。

LMSR参与量的单位为“份”，价格是需要根据份数即时计算的，比如卖出1份价格为1，但卖出2份价格未必是2，前端可对相应数量的买卖价格做初步计算。

LMSR玩法的优势：参与预测的过程可以伴随自由的买卖，用户可以在预测结果出来之前卖出获利或者止损。预测的参与量的买卖可以使预测倾向流动加快，即更快的向概率最大的选项倾斜。

房主在开设LMSR类型房间时，需要设定一个L值，L表示房主设定的亏损界值，房主提供的准备金F = L * ln（N），N为结果数量。总参与量表示当前的总资金池，包括房主提供的准备金和参与者注入的资金，在选项中将显示每个选项的实时参与人数和份数。

LMSR机制需要房主在创建房间时通过设定亏损界值来提供一笔准备金（根据房间接受的资产可能是SEER、PFC等资产），根据房主设定的亏损界值，准备金将自动注入资金池，房主设定的亏损界值越大，需要提供的准备金越多，亏损界值较大的情况下，也只有更多的用户参与时才能让实时参与成本产生较大波动。如果预测错误的用户多于预测正确的用户，房主将会盈利，而如果预测正确的用户大于预测错误的用户，房主将会亏损，在所有用户的预测方向全对且参与者足够多的极端情况下，房主将损失掉所有的准备金。

##### 预测市场理论

预测市场的理论基础是有效资本市场假设（Efficient Capital Markets Hypothesis，ECMH）和海耶克假设（Hayek Hypothesis）。这些假设解释了通过信息的收集整合，市场价格精确地反映未来结果的发生概率。根据 ECMH，资本市场是最能有效地、实时地反映单个股票和整个股票市场信息的机制。海耶克假设认为，市场价格是收集离散信息的有效手段。即使人们对自己的环境和交易对方的知识是有限，市场依然是有效的。

本质上，预测市场是基于市场原则来收集整合交易各方对同一事件的信心和判断，从而产生对事件的未来结果的预测。如果说，股票市场是在为股票未来的预期收益定价一样，预测市场就是在为未来事件的预期结果进行定价。具体而言，预测市场通常以提问的方式来预测未来某个事件的发生结果，每种结果都有自己发生的概率，所有的结果的概率总和等于 100%。一种结果的概率就代表该结果在市场中的交易价格。交易者可以根据自己对某种结果的信心和判断来购买该结果的股份。比如股份设定为1 SGD的价格，现在发生结果的概率为60%，它的价格为0.6新加坡元。若此结果最终发生，购买该结果的股份的交易者就是赢家，获得的利润每股（1 - 0.6）新元的收益，而其他的人不会获得任何收益。

##### 可能需要的功能

不同于PVP和高级房间，PVD房间的份数可以随时卖出，因此，可能需要显示当前用户持有各个选项份数的情况。

#### PVP模式

用户自由参与预测，该预测类型房主不承担猜对结果人多的亏损风险，也不会因为猜错的人多盈利，预测参与资金全部分给预测正确者。

根据房主的时间设定，PVP也可以设置为在预测最终结束前都可以实时进行动态交易的模式，但与PVD有所不同的是，PVP参与成本直接以SEER主资产或是房主设定或DAPP允许的某种自定义资产支付，并不是像PVD一样按份数实时计算参与价格，房主不需设准备金。某一方向预测的资金数量增长，会让赔率实时产生变化，房间关闭后，预测正确的一方按赔率获得代币奖励。

自2018年8月15日SEER主网更新自v0.0.4版本后，SEER允许用户不创建平台，直接创建房间，相关说明请参考： <a router-link="./tools?id=seer区块链“人人房主”模式功能介绍">`“人人房主”模式功能介绍`</a> 。

#### Advanced高级模式

Advanced也是按直接以房主确定的资产支付，赔率为房主设定，房主可以在未结束前手动动态调节，参与者以当时房主设定的赔率参与预测，如果预测正确是以参加时的赔率获得奖励。

Advanced模式的赔率不会像PVP模式一样根据参与情况变化，同时房主需要提供一个资金池，如果预测正确的用户多于预测错误的用户，房主将开始损失资金池里的资金。

如果出现所有用户都预测正确，并且资金 * 赔率达到资金池金额的极端情况，房主将损失掉资金池里的所有资金，如果某选项按当前赔率已经不够资金池派奖的话，该选项将不能再购买。为了避免这样的情况，Advanced模式房间允许房主在预测进行中为房间增加资金池。

例如：某选项赔率房主设为1：10，资金池为1000万，如果下注该选项的资金达到100万且没有人选择其它选项，并且最终该选项获胜，则房主会失去资金池所有资金。

Advanced模式的特点有：

1. 房主可设置各个选项的赔率

2. 房主可随时修改赔率

3. 用户预测以参与时间点的赔率计算中奖回报

4. 房间有预设资金池的概念

5. 在预测进程过程中，房主可往资金池添加资金，不可提取资金

6. 预测未开启时，房主可添加或提取资金池资金

7. 用户参与时，若当前总资金（含资金池和用户参与资金）可能不够派奖，则参与失败


## SEER APIS

此处列出SEER节点的全部API接口的参数、作用及部分SEER常用接口的示例。

在示例中，我们主要以WS-RPC为例。

参考：<a href="http://docs.bitshares.org/api/database.html"> **石墨烯区块链技术文档** </a>

### get_objects

格式：get_objects(object_id_type ids) 

参数： ids，即要检索对象的ID

作用： 获取与提供的ID对应的对象。（此处的ID可以是账户ID（1.2.X）、见证人ID（1.5.X）、房间ID（1.15.X）等），如果指定的ID未找到相关对象，则返回null。

示例： `{"jsonrpc": "2.0", "method": "get_objects", "params": [["1.15.1160"]], "id": 1}`

返回信息示例：

省略，参考get_seer_room、get_asset等

### set_subscribe_callback

格式：set_subscribe_callback( int identifier, bool clear_filter ):

参数： identifier，即标识符

作用： 订阅全局回调。

订阅通知相关请参考：<a href="http://docs.bitshares.org/api/websocket.html?highlight=set_subscribe_callback"> **石墨烯区块链技术文档WEBSOCKET数据库通知相关介绍** </a>

### set_pending_transaction_callback

格式：set_pending_transaction_callback(int identifier)

参数： identifier，即标识符

作用： 订阅未确认交易的通知。

### set_block_applied_callback

格式：set_block_applied_callback(blockid)

参数： blockid

作用： 当块blockid应用于区块链时发出通知。

### cancel_all_subscriptions

作用： 停止接收任何通知。

### get_block_header

格式：get_block_header(uint32_t block_num) 

参数： block_num：要返回其区块头的块高

作用： 返回指定区块的区块头，如果未找到匹配块，则返回null

示例： `{"jsonrpc": "2.0", "method": "get_block_header", "params": [8722946], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"previous": "00851a01374611e976dad94781ebbc49d8aa4e16",//上一个块的块号
		"timestamp": "2019-03-19T02:18:00",//时间戳
		"witness": "1.5.78",//见证人id
		"transaction_merkle_root": "6c586010ed4b90b425529a302146739d4cb74bb5",
		"extensions": []
	}
}
```
### get_block_header_batch

格式：get_block_header_batch(uint32_t block_nums)

参数： block_num：要返回其区块头的块高

作用： 按块高查询多个块头。

### get_block

格式： `get_block` num

参数： 块号

作用： 显示第num个块的概况

示例： `{"jsonrpc": "2.0", "method": "get_block", "params": [8722946], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"previous": "00851a01374611e976dad94781ebbc49d8aa4e16",//上一个块的块号
		"timestamp": "2019-03-19T02:18:00",//时间戳
		"witness": "1.5.78",//见证人ID
		"transaction_merkle_root": "6c586010ed4b90b425529a302146739d4cb74bb5",
		"extensions": [],
		"witness_signature": "1f5eb922...befcd1",//见证人签名
		"transactions": [{//交易列表
			"ref_block_num": 6656,//引用的区块号
			"ref_block_prefix": 1321242125,//引用的区块头
			"expiration": "2019-03-19T02:19:54",//交易过期时间
			"operations": [//操作列表
				[46, {//46操作类型表示开启房间
					"fee": {//手续费
						"amount": 10000000,//手续费金额，带100000精度，此处表示100.00000
						"asset_id": "1.3.0"//手续费资产类型。此处表示SEER
					},
					"issuer": "1.2.14054",//发起人
					"room": "1.15.1160",//房间号
					"start": "2019-03-19T02:17:16",//开始时间
					"stop": "2019-03-25T07:00:00",//结束时间
					"input_duration_secs": 9600//开奖时间
				}]
			],
			"extensions": [],
			"signatures": ["1f1eb22a...24f2dd3418a8"],//交易签名集合
			"operation_results": [
				[0, {}]//操作返回信息
			]
		}]
	}
}
```

### get_transaction

格式：get_transaction(uint32_t block_num, uint32_t trx_in_block) 

参数： block_num, 块高；trx_in_block，交易在指定块中的位置。

作用： 交易在指定块中的位置和制定块的块高返回指定的交易信息。

示例： `{"jsonrpc": "2.0", "method": "get_transaction", "params": [8722946,0], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"ref_block_num": 6656,//引用的区块号
		"ref_block_prefix": 1321242125,//引用的区块头
		"expiration": "2019-03-19T02:19:54",//交易过期时间
		"operations": [//操作列表
			[46, {//46操作类型表示开启房间
				"fee": {//手续费
					"amount": 10000000,//手续费金额
					"asset_id": "1.3.0"//手续费资产类型
				},
				"issuer": "1.2.14054",//发起人
				"room": "1.15.1160",//房间号
				"start": "2019-03-19T02:17:16",//开始时间
				"stop": "2019-03-25T07:00:00",//结束时间
				"input_duration_secs": 9600//开奖时间
			}]
		],
		"extensions": [],
		"signatures": ["1f1eb22...f2dd3418a8"],//交易签名集合
		"operation_results": [//操作返回信息
			[0, {}]
		]
	}
}
```
### get_recent_transaction_by_id

格式：get_recent_transaction_by_id(const transaction_id_type id) 

作用： 如果交易未超时，则返回指定ID的交易，否则将因未知而返回NULL。而未知并不意味着它没有包含在区块链中。

### get_chain_properties

作用： 返回区块链参数对象

示例： `{"jsonrpc": "2.0", "method": "get_chain_properties", "params": [], "id": 1}`

### get_global_properties

作用：列出链的当前全局参数

示例：`{"jsonrpc": "2.0", "method": "get_global_properties", "params": [], "id": 1}`

返回信息示例：

```json
{
	"id": 1,
	"result": {
		"id": "2.0.0",
		"parameters": {
			"current_fees": {
				"parameters": [
					/*...费率表介绍可以在命令行指南中查看...*/]
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
			"maximum_authenticator_count": 101,//最多认证者的数量
			"maximum_committee_count": 1001,//参与理事会最大人数
			"maximum_authority_membership": 10,//权限(多签)可以设置的最大数量的密钥/帐户
			"network_percent_of_fee": 6000,//支付给网络的手续费比例 此处为60%
			"lifetime_referrer_percent_of_fee": 0,//终身会员推荐人手续费分成比例
			"cashback_vesting_period_seconds": 31536000,//待解冻余额解冻周期，31536000秒，一年
			"cashback_vesting_threshold": 10000000,//待解冻余额领取门槛，100SEER
			"count_non_member_votes": true,//非会员账户是否投票
			"allow_non_member_whitelists": false,//非会员帐户能否设置白名单和黑名单
			"witness_pay_per_block": 300000,//主力见证人出块的每个块奖励，3 SEER
			"max_predicate_opcode": 1,
			"fee_liquidation_threshold": 10000000,
			"accounts_per_fee_scale": 1000,
			"account_fee_scale_bitshifts": 4,
			"max_authority_depth": 2,//权限(多签)可以设置的最大深度（级别）
			"min_guaranty_per_room": "10000000000",//每个房间最少抵押金：10万SEER
			"max_oracle_reward": 100000000,//每个预言机最高奖励：1000SEER
			"fixed_witness_count": 21,//主力见证人数量
			"maximum_profit_witness_count": 101,//获息见证人总数
			"maximun_seer_settles_per_block": 1000,
			"supported_authenticate_types": 7,
			"extensions": []
		},
		"next_available_vote_id": 9,
		"active_committee_members": ["1.4.0", "1.4.1", "1.4.2", "1.4.3", "1.4.4", "1.4.5", "1.4.6", "1.4.7", "1.4.8"],//活跃理事会成员
		"active_witnesses": ["1.5.1", "1.5.2", "1.5.3", "1.5.4", "1.5.5", "1.5.6", "1.5.7", "1.5.8", "1.5.9"],//活跃（主力）见证人
		"active_collateral_witnesses": ["1.5.1", "1.5.2", "1.5.3", "1.5.4", "1.5.5", "1.5.6", "1.5.7", "1.5.8", "1.5.9"],//活跃获息见证人（主力+候选）
		"active_supervisors": [],
		"active_authenticators": [],
		"seer_exploded": false
	}
}
```

### get_config

作用： 返回区块链底层常量配置

示例： `{"jsonrpc": "2.0", "method": "get_config", "params": [], "id": 1}`

### get_chain_id

作用： 返回区块链id

示例： `{"jsonrpc": "2.0", "method": "get_chain_id", "params": [], "id": 1}`

### get_dynamic_global_properties

作用： 返回区块链动态全局参数

示例： `{"jsonrpc": "2.0", "method": "get_dynamic_global_properties", "params": [], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"id": "2.1.0",
		"head_block_number": 8796555,//最新块高
		"head_block_id": "0086398bf1668565a4b79bc3c52980176882a1a0",//最新块id
		"time": "2019-03-21T15:39:12",//最新时间戳
		"current_witness": "1.5.83",//当前块见证人
		"next_maintenance_time": "2019-03-22T00:00:00",//下一维护时间
		"last_budget_time": "2019-03-21T00:00:00",//上一期预算周期
		"witness_budget": 3007800000,//本期见证人预算
		"accounts_registered_this_interval": 2,//本期新注册账号数量
		"recently_missed_count": 0,//最近丢块数
		"current_aslot": 8845060,
		"recent_slots_filled": "340282366920938463463374607431768211455",
		"dynamic_flags": 0,
		"last_irreversible_block_num": 8796545//最近不可逆块高
	}
}
```
### get_key_references

格式：get_key_references(public_key_type key) 

参数： key，公钥

作用： 返回此公钥所有有owner或active权限的帐户id。

示例： `{"jsonrpc": "2.0", "method": "get_key_references", "params": [["SEER6cTUFs1ptsYG9AF3ccudirnJ1Fo3dLdVSni9qyPGnn45KzS9mU"]], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["1.2.16642","1.2.16642"]]}
```
### is_public_key_registered

格式：bool is_public_key_registered(string public_key)

参数： public_key，公钥

作用： 确定公钥当前是否与区块链上的任何已注册帐户相关联，返回true即表示有。

示例： `{"jsonrpc": "2.0", "method": "is_public_key_registered", "params": ["SEER6cTUFs1ptsYG9AF3ccudirnJ1Fo3dLdVSni9qyPGnn45KzS9mU"], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":true}
```
### get_accounts

格式：get_accounts(account_id_type account_ids)

参数： account_ids：要获取的帐户的ID

作用： 按ID获取帐户列表。此函数的作用与get_objects相同

示例： `{"jsonrpc": "2.0", "method": "get_accounts", "params": [["1.2.9981"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.2.9981",//账户id
		"membership_expiration_date": "1969-12-31T23:59:59",//此帐户的会员资格到期的时间
		"registrar": "1.2.9981",//注册人
		"referrer": "1.2.9981",//推荐人
		"lifetime_referrer": "1.2.9981",//终身会员推荐人
		"network_fee_percentage": 6000,//手续费分配给网络的百分比
		"lifetime_referrer_fee_percentage": 4000,//手续费分配给终身会员推荐人的百分比
		"referrer_rewards_percentage": 0,//推荐人获得的比例
		"name": "gateway",//名称
		"owner": {//账户权限 多签管理
			"weight_threshold": 50,//阈值
			"account_auths": [
				["1.2.9987", //控制人id
					25],//权重
				["1.2.9990", 25],
				["1.2.10041", 25]
			],
			"key_auths": [
				["SEER4uy8k3qrVJVJG5a1Nif9fTi4FDVUnWgmqYoNapdxBagMsT3vRh", 1]//账户权限公钥
			],
			"address_auths": []
		},
		"active": {//资金权限
			"weight_threshold": 1,//阈值
			"account_auths": [
				["1.2.9990",//控制人id
				 1]//权重
			],
			"key_auths": [
				["SEER646RGdL4gncz7y834wfGfcHECnKdbdVWd6gh9aEYdn3HWyhBjB", 1]//资金权限公钥
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
		"owner_special_authority": [0, {}],
		"active_special_authority": [0, {}],
		"top_n_control_flags": 0,
		"country": 0,
		"status": 0,
		"authentications": []
	}]
}
```
### get_full_accounts

格式：get_full_accounts(string names_or_ids, bool subscribe)

参数： names_or_ids，账号名或id；订阅标示符

作用： 订阅并返回此帐号所有相关的信息

示例： `{"jsonrpc": "2.0", "method": "get_full_accounts", "params": [["1.2.9981"],2], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		["1.2.9981", {
			"account": {
				"id": "1.2.9981",
				"membership_expiration_date": "1969-12-31T23:59:59",
				"registrar": "1.2.9981",
				"referrer": "1.2.9981",
				"lifetime_referrer": "1.2.9981",
				"network_fee_percentage": 6000,
				"lifetime_referrer_fee_percentage": 4000,
				"referrer_rewards_percentage": 0,
				"name": "gateway",
				"owner": {
					"weight_threshold": 50,
					"account_auths": [
						["1.2.9987", 25],
						["1.2.9990", 25],
						["1.2.10041", 25]
					],
					"key_auths": [
						["SEER4uy8k3qrVJVJG5a1Nif9fTi4FDVUnWgmqYoNapdxBagMsT3vRh", 1]
					],
					"address_auths": []
				},
				"active": {
					"weight_threshold": 1,
					"account_auths": [
						["1.2.9990", 1]
					],
					"key_auths": [
						["SEER646RGdL4gncz7y834wfGfcHECnKdbdVWd6gh9aEYdn3HWyhBjB", 1]
					],
					"address_auths": []
				},
				"options": {
					"memo_key": "SEER646RGdL4gncz7y834wfGfcHECnKdbdVWd6gh9aEYdn3HWyhBjB",
					"voting_account": "1.2.5",
					"num_committee": 0,
					"num_authenticator": 0,
					"num_supervisor": 0,
					"votes": [],
					"extensions": []
				},//以上请参考get_accounts
				"statistics": "2.5.9981",
				"whitelisting_accounts": [],
				"blacklisting_accounts": [],
				"whitelisted_accounts": [],
				"blacklisted_accounts": [],
				"cashback_vb": "1.11.11",
				"owner_special_authority": [0, {}],
				"active_special_authority": [0, {}],
				"top_n_control_flags": 0,
				"country": 0,
				"status": 0,
				"authentications": []
			},
			"statistics": {
				"id": "2.5.9981",
				"owner": "1.2.9981",
				"most_recent_op": "2.8.158115",
				"total_ops": 3917,
				"removed_ops": 2917,
				"total_core_in_orders": 0,
				"lifetime_fees_paid": 1588851249,
				"pending_fees": 0,
				"pending_vested_fees": 0
			},
			"registrar_name": "gateway",
			"referrer_name": "gateway",
			"lifetime_referrer_name": "gateway",
			"votes": [],
			"cashback_balance": {
				"id": "1.11.11",
				"owner": "1.2.9981",
				"balance": {
					"amount": 235540529,
					"asset_id": "1.3.0"
				},
				"policy": [1, {
					"vesting_seconds": 31536000,
					"start_claim": "1970-01-01T00:00:00",
					"coin_seconds_earned": "7428006122544000",
					"coin_seconds_earned_last_update": "2019-03-18T00:00:00"
				}]
			},
			"balances": [{//余额
				"id": "2.4.6",
				"owner": "1.2.9981",
				"asset_type": "1.3.0",//资产类型
				"balance": "22971074757961"//数额
			}],
			"vesting_balances": [{//待解冻余额
				"id": "1.11.11",//待解冻余额编号
				"owner": "1.2.9981",
				"balance": {
					"amount": 235540529,//待解冻余额金额
					"asset_id": "1.3.0"//待解冻余额资产id
				},
				"policy": [1, {
					"vesting_seconds": 31536000,
					"start_claim": "1970-01-01T00:00:00",
					"coin_seconds_earned": "7428006122544000",
					"coin_seconds_earned_last_update": "2019-03-18T00:00:00"
				}]
			}],
			"limit_orders": [],
			"proposals": [],
			"assets": [],
			"withdraws": []
		}]
	]
}
```
### get_account_by_name

格式：get_account_by_name(string name)

参数： name，要获取账户信息的账号名

作用： 根据账号名返回帐号信息，此函数的返回内容与get_objects及get_accounts相同。

示例： `{"jsonrpc": "2.0", "method": "get_account_by_name", "params": ["xiaowanzi"], "id": 1}`

### get_account_references

格式：get_account_references(account_id_type account_id) 

参数： account_id，账号id

作用： 返回此账号id拥有avtive或owner权限的账号列表

示例：  `{"jsonrpc": "2.0", "method": "get_account_references", "params": ["1.2.16642"], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":["1.2.13634","1.2.13647","1.2.14054"]}
```
### lookup_account_names

格式：lookup_account_names(string account_names) 

参数： account_names：要检索的帐户名称

作用： 根据账号名返回帐号信息，此函数的作用与get_objects相同。

示例： `{"jsonrpc": "2.0", "method": "lookup_account_names", "params": [["xiaowanzi"]], "id": 1}`

### lookup_accounts

格式：lookup_accounts(string lower_bound_name, uint32_t limit) 

参数： lower_bound_name：要返回的名字下限;limit：要返回的最大结果（不得超过1000）

作用： 获取已注册帐户的名称和ID。

示例： `{"jsonrpc": "2.0", "method": "lookup_accounts", "params": ["seer",10], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		["seer", "1.2.16"],
		["seer-001", "1.2.373"],
		["seer-009", "1.2.10927"],
		["seer-01", "1.2.376"],
		["seer-1", "1.2.477"],
		["seer-100", "1.2.7346"],
		["seer-10010", "1.2.9187"],
		["seer-10014", "1.2.9191"],
		["seer-10016", "1.2.9188"],
		["seer-10017", "1.2.9189"]
	]
}
```
### get_account_count

作用： 获取区块链注册的帐户总数。

示例： `{"jsonrpc": "2.0", "method": "get_account_count", "params": [], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":18844}
```
### get_account_ids

格式：get_account_ids(string account_names) 

参数：  account_names：要检索的帐户名称

作用： 根据账号名返回账号id

示例： `{"jsonrpc": "2.0", "method": "get_account_ids", "params": [["bibi","wanzi"]], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["bibi","1.2.14054"],["wanzi","1.2.16640"]]}
```
### get_account_balances

格式：get_account_balances(account_id_type id, asset_id_type assets) 

参数： id：要获得余额的帐户的ID；assets：要获得余额的资产的ID，如果为空，则获取所有资产帐户中的余额

作用： 获取指定账户id各种资产的帐户余额。

示例： `{"jsonrpc": "2.0", "method": "get_account_balances", "params": [1.2.16640,"1.3.0"], "id": 1}`

### get_named_account_balances

格式：get_named_account_balances(string name, asset_id_type assets)

参数： name，账号名；assets：要获得余额的资产的ID，如果为空，则获取所有资产帐户中的余额

作用： 和get_account_balances一样，只是参数由账户id变为账号名

示例： `{"jsonrpc": "2.0", "method": "get_account_balances", "params": ["wanzi","1.3.0"], "id": 1}`

### get_balance_objects

格式：get_balance_objects(address addrs) 

参数： addrs，地址公钥

作用： 获取未认领余额的数额

示例： `{"jsonrpc": "2.0", "method": "get_balance_objects", "params": ["SEER71d7yHA7KgW8qkHYv4hX2WT4X1FariKbjWCqAfegjGr8B2LowE"], "id": 1}`

### get_vested_balances

格式：get_vested_balances(balance_id_type objs)

参数： objs：已领取余额的object ID

作用： 查询已领取余额的数额

### get_vesting_balances

格式：get_vesting_balances(account_id_type account_id)

参数： account_id,账户id

作用： 查询指定账户id待领取余额的数额

示例： `{"jsonrpc": "2.0", "method": "get_vesting_balances", "params": ["1.2.9981"], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.11.11",
		"owner": "1.2.9981",
		"balance": {
			"amount": 235540529,
			"asset_id": "1.3.0"
		},
		"policy": [1, {
			"vesting_seconds": 31536000,
			"start_claim": "1970-01-01T00:00:00",
			"coin_seconds_earned": "7428006122544000",
			"coin_seconds_earned_last_update": "2019-03-18T00:00:00"
		}]
	}]
}
```
### get_assets

格式：get_assets(asset_id_type asset_ids) 

参数： asset_ids：要检索的资产的ID，此函数的作用与get_objects相同。

作用： 按ID获取资产列表。

示例： `{"jsonrpc": "2.0", "method": "get_assets", "params": [["1.3.0"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.3.0",//资产ID
		"symbol": "SEER",//资产标识符
		"precision": 5,//精度
		"issuer": "1.2.3",//发行人
		"options": {
			"max_supply": "1000000000000000",//总供给
			"market_fee_percent": 0,
			"max_market_fee": "1000000000000000",//最大市场手续费
			"issuer_permissions": 0,
			"flags": 0,
			"core_exchange_rate": {//交易手续费
				"base": {
					"amount": 1,
					"asset_id": "1.3.0"
				},
				"quote": {
					"amount": 1,
					"asset_id": "1.3.0"
				}
			},
			"whitelist_authorities": [],
			"blacklist_authorities": [],
			"whitelist_markets": [],
			"blacklist_markets": [],
			"description": "",
			"extensions": []
		},
		"dynamic_asset_data_id": "2.3.0"
	}]
}

```
### list_assets

格式：list_assets(string lower_bound_symbol, uint32_t limit)

参数：lower_bound_symbol：要检索的符号名称的下限；limit：要获取的最大资产数（不得超过100）

作用：列出资产名大于lower_bound_symbol的资产

示例：`{"jsonrpc": "2.0", "method": "list_assets", "params": ["SEE",2], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"result": [{
		"id": "1.3.11",//SEER的资产ID
		"symbol": "SEED",//SEER的资产ID
		"precision": 5,//小数点后精度
		"issuer": "1.2.151",//创建者
		"options": {
			"max_supply": "10000000000",//最大供给量
			"market_fee_percent": 0,//交易手续费收取比例
			"max_market_fee": 0,//最大市场手续费
			"issuer_permissions": 31,
			"flags": 0,
			"core_exchange_rate": {//发生手续费会按以下比例 从费用池自动将此资产换为核心资产（SEER）用于支付费用
				"base": {
					"amount": 100000,//对标市场基准资产的比例
					"asset_id": "1.3.0"
				},
				"quote": {
					"amount": 100000,
					"asset_id": "1.3.11"
				}
			},
			"whitelist_authorities": [],//一组帐户，此资产的白名单。如果白名单非空，则只允许白名单中的帐户保留、使用或转移资产。
			"blacklist_authorities": [],//一组帐户，此资产的黑名单。如果设置了白名单，则只有这些帐户能进行此资产的发送、接收、交易等，但如果该帐户被列入黑名单，即使该帐户也列入白名单，它也不能操作此资产。
			"whitelist_markets": ["1.3.0"],//定义此资产可在市场上组成交易对的资产
			"blacklist_markets": [],//定义此资产在市场上不可进行交易的资产，不得与白名单重叠
			"description": "{\"main\":\"\",\"market\":\"\"}",//资产描述
			"extensions": []
		},
		"dynamic_asset_data_id": "2.3.11"
	}, {
		"id": "1.3.0",
		"symbol": "SEER",
		"precision": 5,
		"issuer": "1.2.3",
		"options": {
			"max_supply": "1000000000000000",
			"market_fee_percent": 0,
			"max_market_fee": "1000000000000000",
			"issuer_permissions": 0,
			"flags": 0,
			"core_exchange_rate": {
				"base": {
					"amount": 1,
					"asset_id": "1.3.0"
				},
				"quote": {
					"amount": 1,
					"asset_id": "1.3.0"
				}
			},
			"whitelist_authorities": [],
			"blacklist_authorities": [],
			"whitelist_markets": [],
			"blacklist_markets": [],
			"description": "",
			"extensions": []
		},
		"dynamic_asset_data_id": "2.3.0"
	}]
}
```

### lookup_asset_symbols

格式：lookup_asset_symbols(string symbols_or_ids)

参数： symbols_or_ids

作用： 按资产名称或id获取资产列表，此函数的作用与get_objects相同。

示例： `{"jsonrpc": "2.0", "method": "lookup_asset_symbols", "params": [["SEER"]], "id": 1}`

### get_order_book

格式：get_order_book(string base, string quote, unsigned limit = 50)

参数： base：第一个资产的名称;quote：第二个资产的名称;depth：订单。每个要求和出价的深度，最高限额为50，优先返回最低的订单。

作用： 返回内置交易所的交易对订单

示例： `{"jsonrpc": "2.0", "method": "get_order_book", "params": ["SEER","OPC",2], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"base": "SEER",
		"quote": "OPC",
		"bids": [{
			"price": "0.05012000000000000",
			"quote": "2008000.00000000000000000",
			"base": "100640.96000000000640284"
		}, {
			"price": "0.05010020000045181",
			"quote": "788397.40639000001829118",
			"base": "39498.86774000000150409"
		}],
		"asks": [{
			"price": "0.26600000000000001",
			"quote": "1326.20000000000004547",
			"base": "352.76920000000001210"
		}, {
			"price": "0.26800000000000002",
			"quote": "46562.59999999999854481",
			"base": "12478.77679999999963911"
		}]
	}
}
```
### get_limit_orders

格式：get_limit_orders(asset_id_type a, asset_id_type b, uint32_t limit) 

参数： a：正在出售的资产ID；b：正在购买的资产ID；limit：要检索的最大订单数

作用： 获取指定交易对的限价单。

示例： `{"jsonrpc": "2.0", "method": "get_limit_orders", "params": ["1.3.0","1.3.1",1], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.6.2048",
		"expiration": "2024-03-18T03:40:29",
		"seller": "1.2.10229",
		"for_sale": "10064096000",
		"sell_price": {
			"base": {
				"amount": "10064096000",
				"asset_id": "1.3.0"
			},
			"quote": {
				"amount": "200800000000",
				"asset_id": "1.3.1"
			}
		},
		"deferred_fee": 500000
	}, {
		"id": "1.6.2049",
		"expiration": "2024-03-20T06:21:39",
		"seller": "1.2.10723",
		"for_sale": 132620000,
		"sell_price": {
			"base": {
				"amount": 132620000,
				"asset_id": "1.3.1"
			},
			"quote": {
				"amount": 35276920,
				"asset_id": "1.3.0"
			}
		},
		"deferred_fee": 500000
	}]
}
```
### subscribe_to_market

格式：subscribe_to_market(variant callback, asset_id_type a, asset_id_type b)

参数： callback：市场变化时调用的回调方法；a：第一个资产ID；b：第二个资产ID

作用： 订阅指定交易对的限价单等信息。当两个资产之间的市场中的活动订单发生变化时请求通知。

示例： `{"jsonrpc": "2.0", "method": "subscribe_to_market", "params": [2,"1.3.0","1.3.1"], "id": 1}`

### unsubscribe_from_market

格式：unsubscribe_from_market（ asset_id_type a，asset_id_type b ）

参数： a：第一个资产ID；b：第二个资产ID

作用： 取消订阅特定市场的更新。

示例： `{"jsonrpc": "2.0", "method": "unsubscribe_from_market", "params": ["1.3.0","1.3.1"], "id": 1}`

### get_ticker

格式：get_ticker(string base, string quote) 

参数： base：第一个资产的字符串名称或资产ID；quote：第二个资产的字符串名称或资产ID

作用： 返回过去24小时指定交易对的行情信息。

示例： `{"jsonrpc": "2.0", "method": "get_ticker", "params": ["SEER","OPC"], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"time": "2019-03-21T18:05:04",
		"base": "1.3.0",
		"quote": "1.3.1",
		"latest": "0.05010020000045181",
		"lowest_ask": "0.26600000000000001",
		"highest_bid": "0.05012000000000000",
		"percent_change": "0.00000000000000000",
		"base_volume": "0.00000000000000000",
		"quote_volume": "0.00000000000000000"
	}
}
```
### get_24_volume

格式：get_24_volume(string base, string quote) 

参数： base：第一个资产名称；quote：第二个资产名称

作用： 返回指定交易对24小时交易量。

示例： `{"jsonrpc": "2.0", "method": "get_24_volume", "params": ["SEER","OPC"], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": {
		"time": "2019-03-21T18:07:41",
		"base": "SEER",
		"quote": "OPC",
		"base_volume": "0.00000000000000000",
		"quote_volume": "0.00000000000000000"
	}
}
```
### get_trade_history

格式：get_trade_history(string base, string quote, time_point_sec start, time_point_sec stop, unsigned limit = 100)

参数： base：第一个资产的字符串名称;quote：第二个资产的字符串名称;start：UNIX时间戳的开始时间;stop：停止时间的UNIX时间戳；
limit：要检索的trasactions数量，上限为100

作用： 返回指定交易对指定时间区间的历史交易记录。

示例： `{"jsonrpc": "2.0", "method": "get_trade_history", "params": ["SEER","OPC","1553274061","1551978061","2"], "id": 1}`

### get_trade_history_by_sequence

作用： 按顺序返回指定交易对指定时间区间的历史交易记录。

### get_witnesses

格式：get_witnesses(witness_id_type witness_ids) 

参数： witness_ids：要检索的见证人的ID

作用： 按ID获取见证人列表。此函数的语义与get_objects相同。

示例： `{"jsonrpc": "2.0", "method": "get_witnesses", "params": [["1.5.22"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.5.22",//见证人id
		"witness_account": "1.2.10429",//所属账号id
		"last_aslot": 6637717,//最近可见
		"signing_key": "SEER5oyAoCzw5GRD9unKK6vsLXkPVx1aKU7i3hX19E8BRU5u3FoAoA",//见证人签名
		"pay_vb": "1.11.52",
		"collaterals": ["2.16.169", "2.16.205", "2.16.222", "2.16.225", "2.16.227", "2.16.232", "2.16.238", "2.16.247", "2.16.253", "2.16.338", "2.16.369"],//抵押清单
		"collateral_profit": "23353010098",//抵押利息
		"total_collateral": "1017942300000",//总抵押金额
		"cancelling_collateral": 0,//取消中的抵押
		"url": "",
		"total_missed": 0,//丢块数
		"last_confirmed_block_num": 6606635,//最后生成块
		"recent_maintenance_missed_blocks": [0, 0]//最近维护周期丢块数
	}]
}
```
### get_witness_by_account

格式：get_witness_by_account(account_id_type account) 

参数： account：应检索其见证人的帐户ID

作用： 获取指定帐户对应的见证人信息。如果指定帐户没有见证人，则为null

示例： `{"jsonrpc": "2.0", "method": "get_witness_by_account", "params": ["1.2.17311"], "id": 1}`


### lookup_witness_accounts

格式：lookup_witness_accounts(string lower_bound_name, uint32_t limit) 

参数： lower_bound_name：要返回的用户名的下限,limit：要返回的最大结果数，不得超过1000

作用： 返回指定账户已登记的见证人信息。

示例： `{"jsonrpc": "2.0", "method": "lookup_witness_accounts", "params": ["win",10], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["win","1.5.78"],["win666","1.5.71"],["witness-seer","1.5.45"],["witness-yao","1.5.56"],["wxfkuq-seer","1.5.64"],["xianzhixianjue","1.5.41"],["xingyun52","1.5.54"],["xqy1","1.5.38"],["ygl78963","1.5.31"],["yow11234","1.5.17"]]}
```
### get_witness_count

作用：获取在区块链中注册的见证人总数。 

示例： `{"jsonrpc": "2.0", "method": "get_witness_count", "params": [], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":83}
```
### get_committee_members

格式：get_committee_members(committee_member_id_type committee_member_ids) 

参数： committee_member_ids：要检索的理事会成员ID

作用： 按ID获取理事会成员列表。此函数的语义与get_objects相同。

示例： `{"jsonrpc": "2.0", "method": "get_committee_members", "params": [["1.4.1","1.4.2"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.4.1",//理事会ID
		"committee_member_account": "1.2.7",//账户id
		"vote_id": "0:1",//投票id
		"total_votes": "279989972183009",//得票
		"url": ""
	}, {
		"id": "1.4.2",
		"committee_member_account": "1.2.8",
		"vote_id": "0:2",
		"total_votes": "279989972183009",
		"url": ""
	}]
}
```
### get_committee_member_by_account

格式：get_committee_member_by_account(account_id_type account) 

参数： account：应检索其理事会成员的帐户ID

作用： 获取由给定帐户拥有的理事会成员账号信息。

示例： `{"jsonrpc": "2.0", "method": "get_committee_member_by_account", "params": ["1.2.7"], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":{"id":"1.4.1","committee_member_account":"1.2.7","vote_id":"0:1","total_votes":"279989972183009","url":""}}
```
### lookup_committee_member_accounts

格式：lookup_committee_member_accounts(string lower_bound_name, uint32_t limit)

参数： lower_bound_name：要返回的账号名下限;limit：要返回的最大结果数不得超过1000

作用： 根据账户名返回符合条件的理事会成员id和用户名。

示例： `{"jsonrpc": "2.0", "method": "lookup_committee_member_accounts", "params": ["init",5], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["init0","1.4.0"],["init1","1.4.1"],["init2","1.4.2"],["init3","1.4.3"],["init4","1.4.4"]]}
```
### get_committee_count

作用： 获取在区块链中注册的理事会成员总数。

示例： `{"jsonrpc": "2.0", "method": "get_committee_count", "params": [], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":8}
```
### lookup_vote_ids

格式：lookup_vote_ids(vote_id_type votes) 

参数： votes：投票id集

作用： 指定一组投票，返回他们投票的对象。投票id即理事会成员投票id，返回结果与投票id的顺序相同。如果未找到任何投票ID，将返回Null。

示例： `{"jsonrpc": "2.0", "method": "lookup_vote_ids", "params": [["0:1","0:2"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.4.1",
		"committee_member_account": "1.2.7",
		"vote_id": "0:1",
		"total_votes": "279989972183009",
		"url": ""
	}, {
		"id": "1.4.2",
		"committee_member_account": "1.2.8",
		"vote_id": "0:2",
		"total_votes": "279989972183009",
		"url": ""
	}]
}
```

### get_transaction_hex

格式：get_transaction_hex(signed_transaction trx) 

参数： trx：已签名交易的二进制编码

作用： 查看二进制编码格式交易的十六进制形式

### get_required_signatures

格式：get_required_signatures(signed_transaction trx, public_key_type available_keys) 

参数： trx：已签名交易

作用： 此API将采用部分签名的事务和一组公共密钥，所有者可以签名并返回将签名添加到交易的最小公钥子集。

### get_potential_signatures

格式：get_potential_signatures(signed_transaction trx) 

参数： trx：已签名交易

作用： 此方法将返回可能为指定交易签名的所有公钥的集合。在调用get_required_signatures以获得最小子集前，钱包可以使用此调用将其公钥集合过滤到相关子集。

### get_potential_address_signatures

格式：get_potential_address_signatures(signed_transaction trx) 

参数： trx：已签名交易

作用： 返回可能为指定交易签名的所有地址的集合

### verify_authority

格式：verify_authority(signed_transaction trx)

参数： trx：已签名交易

作用： 如果trx具有所有必需的签名，则返回true，否则抛出异常

### verify_account_authority

格式：verify_account_authority(string name_or_id, public_key_type signers) 

参数： name_or_id：账户名或账户id；signers：签名公钥

作用： 验证账户权限，如果签名者有足够的权限授权帐户，则返回true

### validate_transaction

格式：validate_transaction(signed_transaction trx)

参数： trx：已签名交易

作用： 验证交易是否合法,是否可以成功执行。成功：返回已经处理的交易（含处理结果）;失败：抛出执行中的异常错误。

### get_required_fees

格式：get_required_fees(operation ops, asset_id_type id)

参数： ops：操作；id：资产id

作用： 如果指定资产类型没有有效的core_exchange_rate（资产设定的针对核心资产SEER的汇率）的话，对于指定操作，计算指定资产类型的所需费用。

### get_proposed_transactions

格式：get_proposed_transactions(account_id_type id)

参数： id：账户id

作用： 返回与指定帐户ID相关的提议交易集。

示例： `{"jsonrpc": "2.0", "method": "get_proposed_transactions", "params": ["1.2.18098"], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.8.52",
		"expiration_time": "2019-03-24T16:42:20",//过期时间
		"proposed_transaction": {
			"ref_block_num": 0,
			"ref_block_prefix": 0,
			"expiration": "2019-03-24T16:42:20",
			"operations": [//操作内容
				[5, {//修改权限/更行账户
					"fee": {//手续费
						"amount": 2000000,
						"asset_id": "1.3.0"
					},
					"account": "1.2.18098",//发起id
					"active": {
						"weight_threshold": 1,
						"account_auths": [
							["1.2.16640", 1]//授权账户及权重
						],
						"key_auths": [
							["SEER5gmQdasu32KHsu5MCbGVsZ6xnL8m8LSxDEfeuDx88jkuzXE4qc", 1]
						],
						"address_auths": []
					},
					"extensions": {}
				}]
			],
			"extensions": []
		},
		"required_active_approvals": ["1.2.18098"],
		"available_active_approvals": [],
		"required_owner_approvals": [],
		"available_owner_approvals": [],
		"available_key_approvals": []
	}]
}
```
### get_blinded_balances

格式：get_blinded_balances(commitment_type commitments) 

参数： commitments：承诺id

作用： 通过承诺id设置一个盲余额对象

### lookup_oracle_accounts

格式：lookup_oracle_accounts(string lower_bound_name, uint32_t limit)

参数： lower_bound_name：要返回的账号名下限;limit：要返回的最大结果数不得超过1000

作用： 根据账户名返回符合条件的预言机id和用户名。

示例： `{"jsonrpc": "2.0", "method": "lookup_oracle_accounts", "params": ["in",5], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["in-future","1.13.0"]]}
```
### get_oracles

格式：get_oracles (oracle_id_type id）

参数：id为预言机id

作用：根据预言机id查询预言机信息，此函数的语义与get_objects相同。

示例：`{"jsonrpc": "2.0", "method": "get_oracles", "params": [["1.13.0"]], "id": 1}` 

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.13.0",//预言机id
		"owner": "1.2.13648",//账户id
		"guaranty": 0,//保证金金额
		"locked_guaranty": 0,//锁定保证金金额
		"reputation": 1,//名誉值
		"volume": 1,//参与量
		"description": "在未来",//描述
		"script": ""
	}]
}
```
### get_oracle_by_account

格式：get_oracle_by_account (account_id_type id）

参数： id为账户id

作用： 通过账户id查询预言机信息

示例： `{"jsonrpc": "2.0", "method": "get_oracle_by_account", "params": [["1.2.13648"]], "id": 1}`

### lookup_house_accounts

格式：lookup_house_accounts(string lower_bound_name, uint32_t limit)

参数： lower_bound_name：要返回的账号名下限;limit：要返回的最大结果数不得超过1000

作用： 根据账户名返回符合条件的平台id和用户名。

示例： `{"jsonrpc": "2.0", "method": "lookup_house_accounts", "params": ["in",5], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":[["in-future","1.14.8"],["null-account","1.14.4294967295"],["octopaul","1.14.1"],["powerfans-community","1.14.6"],["shehuilongge2018","1.14.3"]]}
```
### get_houses

格式：get_houses(house_id_type id）

参数： id为平台id

作用： 根据平台id查询相应平台信息，此函数的语义与get_objects相同。

示例： `{"jsonrpc": "2.0", "method": "get_houses", "params": [["1.14.4","1.14.5"]], "id": 1}`

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.14.4",//平台id
		"owner": "1.2.13647",//所有者账号id
		"description": "社会事件预测平台。",//描述
		"script": "",
		"reputation": 121,//名誉值
		"guaranty": "90100000000",//保证金
		"volume": 121,//参与量
		"collected_fees": 254750000,//手续费分成
		"rooms": ["1.15.1144", "1.15.1145", "1.15.1152", "1.15.1153", "1.15.1165", "1.15.1168"],//开放中的房间
		"finished_rooms": ["1.15.447", "1.15.535"/*...*/ "1.15.1147"]//已结束的房间
	}, {
		"id": "1.14.5",
		"owner": "1.2.14054",
		"description": "币比",
		"script": "",
		"reputation": 178,
		"guaranty": "80100000000",
		"volume": 178,
		"collected_fees": 351500000,
		"rooms": ["1.15.1154", "1.15.1155", "1.15.1159", "1.15.1160"],
		"finished_rooms": ["1.15.559", "1.15.560"/*...*/"1.15.1132"]
	}]
}
```
### get_house_by_account

格式：get_house_by_account(account_id_type id）

参数： id为账户id

作用： 通过账户id查询平台信息

示例： `{"jsonrpc": "2.0", "method": "get_house_by_account", "params": ["1.2.13648"], "id": 1}`

### get_seer_room

格式：get_seer_room （room_id start limit）

参数：room_id为房间id，start 为投注记录的开始索引,limit为返回结果中投注记录的最大数量

作用：根据房间id查询房间详情（不是完整的房间,因投注太多的情况下房间空间会非常大）

示例：`{"jsonrpc": "2.0", "method": "get_seer_room", "params": ["1.15.21",0,2], "id": 1}`

返回信息示例：

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [{
		"id": "1.15.1160",//预测市场房间id
		"house_id": "1.14.5",//创建者身份（平台）id
		"owner": "1.2.14054",//创建者账号id
		"label": ["BTC", "美元"],//标签
		"description": "预测一下2019年3月25日 下周一BTC价格能突破4100美元吗？以2019/3/25（UTC+8）17：30的coinmarketcap.com显示价格为准，2019/3/25 15:00（UTC+8）前可以参与预测",//描述
		"script": "",//网址等
		"room_type": 1,//房间类型 0为PVP
		"status": "opening",//状态
		"option": {
			"result_owner_percent": 9000,//创建者输入权重
			"reward_per_oracle": 0,//每个预言机奖励
			"accept_asset": "1.3.0",//接受资产类型
			"minimum": 500000,//最小参与数量
			"maximum": "200000000000",//最大参与数量
			"start": "2019-03-19T02:17:16",//开始时间
			"stop": "2019-03-25T07:00:00",//结束时间
			"input_duration_secs": 9600,//结果输入时间（秒）
			"filter": {//预言机门槛
				"reputation": 0,//声誉
				"guaranty": 0,//保证金
				"volume": 0//参与量
			},
			"allowed_oracles": [],
			"allowed_countries": [],
			"allowed_authentications": []
		},
		"owner_pay_fee_percent": 0,//房主代付手续费比例
		"running_option": {
			"room_type": 1,//房间类型
			"selection_description": [
			"能",//选项0描述
			"不能"],//选项1描述
			"range": 2,//选项数量
			"participators": [//参与记录
				[{
					"player": "1.2.14229",//参与者id
					"block_num": 8727575,//参与时的前一个块高
					"when": "2019-03-19T06:09:27",//参与时间
					"amount": 10000000,//参与份数
					"paid": 10000000,//参与金额
					"sequence": 0,//顺序
					"reward": 0//获得奖励
				},
				/*...*/{
					"player": "1.2.14227",
					"block_num": 8727629,
					"when": "2019-03-19T06:12:09",
					"amount": 10000000,
					"paid": 10000000,
					"sequence": 5,
					"reward": 0
				}]
			],
			"total_shares": 60000000,//总参与量
			"settled_balance": 0,
			"settled_row": -1,
			"settled_column": -1,
			"player_count": [4, 2],//各选项参与人数
			"total_player_count": 6,//总参与人数
			"pvp_running": {
				"total_participate": [40000000, 20000000]//各选项参与量
			},
			"guaranty_alone": 0,
			"pvp_owner_percent": 0,//PVP创建者分成比例
			"pvp_owner_shares": 0//PVP创建者获得量
		},
		"owner_result": [],//创建者输入的结果
		"final_result": [],//最终结果
		"committee_result": [],//理事会介入输入的结果
		"oracle_sets": [],
		"final_finished": false,
		"settle_finished": false,
		"last_deal_time": "1970-01-01T00:00:00"
	}]
}
```
### get_rooms_by_label

格式：get_rooms_by_label(string label, uint32_t limit)

参数： label为需要查找的标签, limit为返回结果的最大数量

作用： 返回标签为label的房间id

示例： `{"jsonrpc": "2.0", "method": "get_rooms_by_label", "params": ["BTC",5], "id": 1}`

返回信息示例：
```json
{"id":1,"jsonrpc":"2.0","result":["1.15.524","1.15.559","1.15.560","1.15.581","1.15.583"]}
```
### get_rooms_by_account

格式：get_rooms_by_account(account_id_type id)

参数： id为账户id

作用： 通过账户id查询该账户创建的房间列表

示例： `{"jsonrpc": "2.0", "method": "get_rooms_by_account", "params": ["1.2.14054"], "id": 1}`

返回信息示例：

返回信息示例：
```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		["actives", ["1.15.1154", "1.15.1155", "1.15.1159", "1.15.1160"]],//进行中的房间
		["histories", ["1.15.559", "1.15.560", /*...*/, "1.15.1132"]]//已结束的历史房间
	]
}
```

