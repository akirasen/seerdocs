---
nav: zh-Hans
search: zh-Hans
---

# 赛亚开发工具使用指南

通过此文档，介绍基于SEER进行开发所需要的一些周边工具、插件的使用方式。

使用此教程的用户，我们默认您已经了解基本的SEER节点和命令行钱包使用方式。如果不了解，<a router-link="/cli">`请点击这里`</a> 。

## 不依赖远程API启动命令行钱包和网页钱包的方法

在SEER的见证人操作等需要使用命令行钱包的操作中，我们介绍了通过钱包连接远程API来和区块链交互的方法。类似这样：

```cmd
cli_wallet.exe -s ws://123.207.146.191:9999
```
其中`” ws://123.207.146.191:9999”`为API链接

### 轻钱包和重钱包

这是一种比较方便的钱包使用方式，即开即用，钱包本身并不会在本地存储和自己无关的区块链数据，因此被称为**轻钱包**。

通俗易懂的说，轻钱包的原理是有第三方运行了一个全节点，通过一定的配置后向社区提供公网IP和RPC端口，普通用户通过连接到这个第三方的节点，来和区块链交互。

轻钱包的方式是最常用的钱包使用方式，但也可能出现因为API节点服务不可用，导致用户连不上钱包的情况。这种情况下，您可以在本地运行一个全节点，然后钱包连接自己运行的全节点即可和区块链交互。

在最早的比特币网络中，比特币钱包使用前需要先同步全部区块链网络的数据，将所有区块链数据下载到本地，因此被称为重钱包或全节点钱包。这就是一种不依赖远程API启动钱包的形式，是区块链去中心化的特性表现。

### 在本地运行一个SEER全节点

在SEER网络中，每个见证人节点都是一个全节点。我们可以先在本地运行一个SEER见证人节点，开启RPC端口，节点运行正常后，使用命令行钱包连接本地节点的RPC端口。

以windows为例，下载最新版的节点和钱包：https://github.com/seer-project/seer-core-package/releases 并解压缩。

1、 在`witness_node.exe`所在目录创建文件`”node.cmd”`；

2、 用记事本打开`node.cmd`，输入以下内容后保存退出:
```cmd
witness_node.exe --data-dir ./data  --p2p-endpoint=0.0.0.0:1888 --rpc-endpoint=0.0.0.0:9090
```
`1888`为和其他节点连接的p2p监听端口，`9090`为rpc监听端口，用于钱包连接。运行过见证人节点的用户可能发现了，此处并没有添加见证人参数。当然，若本地已有见证人节点，也不需要再运行此节点，直接用钱包连接见证人节点即可。

3、 每次点击`node.cmd`即可运行。

节点和区块链网络数据同步需要一段时间，同步完成后，会显示像下面一样的3秒一个的见证人出块。

![节点正常启动的状态](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/640.gif)

### 使用钱包连接此节点

#### 使用命令行钱包连接此节点

和原有命令行钱包启动方式一样，但参数需要修改：

```cmd
cli_wallet.exe -s ws://localhost:9090
```

`9090`为您在节点参数中设置的rpc监听端口。

#### 使用命令行钱包连接此节点

因为主网网页钱包是https连接，你无法引用本地的ws连接，所以除非你找到一个http的SEER网页钱包（例如爱好者自己建立的钱包或你自己搭建一个开发环境），否则只能下载SEER的桌面钱包，来连接本地节点。

在这里下载：https://github.com/seer-project/seer-UI-package/releases

下载后，在`设置`-`接入点`-`添加 API 服务器节点`中，添加`ws://localhost:9090`。然后在`接入点`页面点击你添加节点后的`使用`即可启用本地节点。

## SEER公共API服务器配置指南

在 `不依赖远程API启动命令行钱包和网页钱包的方法` 中，我们介绍了让普通个人用户摆脱对远程API的依赖，自建全节点和区块链交互的方法。而在实际运营中，大部分用户还是使用DAPP或社区提供的API来对区块链进行操作，此教程就旨在帮助开发者搭建一个独立的公共API服务器，从而避免因高并发或单点API服务不可用的情况下影响DAPP和轻钱包用户的区块链使用体验。

### 准备

1、 为了访问安全，SEER网页钱包和大部分服务都采取了HTTPS协议，因此也要求API使用WSS协议，同时WSS不支持IP访问，所以需要开发者提供域名，并申请SSL证书；

2、 此教程演示的是建立一个单点的SEER API节点，对于DAPP级API设立者来说，需要考虑DAPP的阶段并发用户数，提供更高带宽和设备条件，并配置多节点负载均衡，同时进行防火墙等安全配置；

3、 搭建一个公共SEER API节点，你需要租用一台linux服务器、设置一个指向该服务器的域名或二级域名、架设见证人全节点、配置nginx、申请SSL证书等几个必要步骤；

4、 当理事会通过一次见证人节点版本更新的提案后，API全节点也应该进行同步更新。

### 架设见证人全节点

租用服务器和域名解析的步骤在这里就省略了，和其它网站的配置是一样的。本例中，笔者使用api.seerchain.org二级域名指向Ubuntu 18.04 x64的测试服务器。

登陆服务器后，分别输入以下指令：

1、 新建一个名叫seer的窗口；

```linux
screen -S seer
```

2、 在root目录下新建一个名叫seer的目录，复制`v0.0.5版本`的程序包到此目录，并更名为`seer.tar.gz`。（此处注意，若有了更新的程序包版本，则到SEER软件发布页https://github.com/seer-project/seer-core-package/releases 复制最新的ubuntu版本程序包链接替换掉此下载链接。）

```linux
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.05/witness_node-ubuntu-0.0.5.tar.gz 
```

3、 切换到seer目录，解压此软件包。

```linux
cd seer
tar xzvf seer.tar.gz
```

4、 带参数启动witness_node，其中`./data`是指定区块链数据的存放目录，`127.0.0.1:9090`是设置是节点对外的Websocket RPC服务地址和端口。

```linux
./witness_node  --data-dir ./data --rpc-endpoint=127.0.0.1:9090
```

5、 观察节点运行正常，显示3秒一个出块后，ctrl+A d隐藏screen，之后要再打开运行有节点的Sreeen，则使用 `screen -R` ，或 `screen -r seer`。 

6、 在服务器上安装使用wscat测试ws。

安装：
```linux
 apt install node-ws
```
测试：
```linux
wscat -c ws://127.0.0.1:9090
> {"jsonrpc": "2.0", "method": "get_block", "params": [1], "id": 1}
< {"id":1,"jsonrpc":"2.0","result":{"previous":"0000000000000000000000000000000000000000","timestamp":"2018-05-18T12:00:03","witness":"1.5.2","transaction_merkle_root":"5fbe404a5640f6f070884d7a7e480ce2ae686f3d","extensions":[],"witness_signature":"1f722606de6dc7fcdd258744e9f2c42983fdbbfecabe8e597fb9c90b6e2298e51a79f19b3fef34a9706b2fe186f6a5174c081538d750b92ae9842c89ea75079ec7","transactions":[{"ref_block_num":0,"ref_block_prefix":0,"expiration":"2018-05-18T12:00:30","operations":[[33,{"fee":{"amount":0,"asset_id":"1.3.0"},"deposit_to_account":"1.2.13","balance_to_claim":"1.12.1","balance_owner_key":"SEER71d7yHA7KgW8qkHYv4hX2WT4X1FariKbjWCqAfegjGr8B2LowE","total_claimed":{"amount":"100000000000","asset_id":"1.3.0"}}]],"extensions":[],"signatures":["2034bffb272ed20e482cb647685ae30f1a4b8b5cf6814495f3bc730aba83af7f771a72ae1e129f8e92419c0028177d837503226c67b35a3d818a7aabbfa9b19965","204a2219d727e097b1159e9d85db13d6dcfc98d9d9741866b2b4f4b3da28382245036282dd7fc504e50a4872aef215d7009cd6a190739d61545eee0b67bf00120d"],"operation_results":[[0,{}]]},{"ref_block_num":0,"ref_block_prefix":0,"expiration":"2018-05-18T12:00:30","operations":[[4,{"fee":{"amount":514453,"asset_id":"1.3.0"},"registrar":"1.2.13","referrer":"1.2.13","referrer_percent":0,"name":"test001","owner":{"weight_threshold":1,"account_auths":[],"key_auths":[["SEER5YaXn6iaZ14RuzmGQkbVQwU6VS4A9wWzA5P4JpkhiYdNah3KnF",1]],"address_auths":[]},"active":{"weight_threshold":1,"account_auths":[],"key_auths":[["SEER7pGpLgPDAKtvEPx9gTnNcFvKaWyKWSHCiysn2fyryCtVaRBBTJ",1]],"address_auths":[]},"options":{"memo_key":"SEER7pGpLgPDAKtvEPx9gTnNcFvKaWyKWSHCiysn2fyryCtVaRBBTJ","voting_account":"1.2.5","num_committee":0,"num_authenticator":0,"num_supervisor":0,"votes":[],"extensions":[]},"extensions":{}}]],"extensions":[],"signatures":["1f7be5f6dc2c6fffab9841491a3fe729293d7f8d57fb7c0e62a368a88977ad3f35384498b846eb1c0215a76608760f54e496aada7673e1b6f2969985987c722bf5"],"operation_results":[[1,"1.2.14"]]}]}}                                             
```
正常的话，会返回SEER的区块#1的信息，现在和此节点同一台设备上的命令行钱包和轻钱包都能用`ws://127.0.0.1:9090`这个API和区块链交互了，下面我们将配置nginx，让此API能通过公网访问。

### 配置服务器nginx

nginx在服务器上负责反向代理、SSL等服务，如果要配置多节点负载均衡也是对nginx进行配置。

#### 安装nginx

```linux
sudo apt update
sudo apt install nginx
```
出现`Do you want to continue? [Y/n] `的时候Y就可以了。

#### 配置nginx

1、 在`/etc/nginx/sites-available/`目录新建一个名为`apifile`的nginx配置文件

```linux
 sudo nano /etc/nginx/sites-available/apifile
```
2、 打开文件后，以下面内容为例，写入配置文件：

```linux

# WebSocket 配置
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    
upstream nodeapi {
# 127.0.0.1:9090 是节点启动时配置的rpc服务地址和端口，修改为你的
    server 127.0.0.1:9090 fail_timeout=0;
}

server {
# 监听80端口
        listen 80;
        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;
# api.seerchain.org 修改为你的域名
        server_name api.seerchain.org;

        location / {
                proxy_set_header Host $http_host;
                proxy_redirect off;
                proxy_http_version 1.1;
                proxy_pass http://nodeapi;
 # WebSocket 配置
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
}

```
3、 修改完成后，使用nano的写入和退出快捷键，即`control`+`O`-`ENTER`，`control`+`X`。

4、 将`apifile`软链接到配置目录

```linux
sudo ln -s /etc/nginx/sites-available/apifile /etc/nginx/sites-enabled/
```
5、 测试nginx配置是否有错，如果有错根据提示修改

```linux
sudo nginx -t
```
6、 重新载入nginx

```linux
sudo systemctl reload nginx
```

7、 此时，若配置正确，你可以使用`wscat -c ws://api.seerchain.org`在任意联网设备测试成功。同时，`ws://api.seerchain.org`已经可用于桌面版钱包、任何未使用HTTPS的网页钱包和DAPP以及命令行钱包连接区块链网络。（api.seerchain.org改为您的域名）

8、 若要在SEER主网网页钱包或任何采用了HTTPS协议的应用中使用此API，需要申请SSL证书，并对nginx进行更多配置。

### 申请SSL证书

SSL证书网上有很多，收费的和免费的都有，这里笔者推荐最简单的`certbot`一键注册免费证书并自动续期的服务。

#### 安装certbot并申请ssl证书

1、 首先，添加存储库：

```linux
sudo add-apt-repository ppa:certbot/certbot
```
2、 安装Certbot的Nginx软件包：
```linux
sudo apt install python-certbot-nginx
```
3、 使用Certbot自动完成SSL证书申请和配置，Certbot会自动修改你的nginx配置文件，替换seerchain.org和api.seerchain.org为你的域名和二级域名。

```linux
sudo certbot --nginx -d seerchain.org -d api.seerchain.org
```
按照英文的提示配置吧，有几个地方要填和选择，比如邮箱等，其它有(A)gree的选择输入A，有(Y)es的选择输入Y即可，需要注意的是：
```
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 
```
在这一步时，您可能会需要选择`1`，如果选择`2`的话，Certbot会自动修改你的nginx配置文件，所有的非SSL请求都会被自动转发到SSL，如果您希望同一个域名既能用于WS，例如命令行钱包，也能用于HTTPS的网页钱包等，则选`1`，否则选择`2`。

4、 完成后，打开您之前创建的nginx配置文件:

```linux
sudo nano /etc/nginx/sites-available/apifile
```
可以查看到certbot对配置文件的修改，最终配置好的文件如下：
```
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
upstream nodeapi {
    server 127.0.0.1:9090 fail_timeout=0;
}

server {
        listen 80;
        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name api.seerchain.org;

        location / {
                proxy_set_header Host $http_host;
                proxy_redirect off;
                proxy_http_version 1.1;
                proxy_pass http://nodeapi;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
# 以下为certbot添加内容，当然，相应目录存放了您的证书文件
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api.seerchain.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.seerchain.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

```

#### 设置certbot自动续约

证书使用周期有限，需要设置certbot自动续约证书：

```linux
sudo certbot renew --dry-run

```
### 结语

至此，一个独立API节点就配置完成了。在`https://wallet.seer.best/settings/access`：`设置`-`接入点`页面点击`添加 API 服务器节点`，在`ADDRESS`一栏填入您的API地址并确认，即可在网页钱包中使用您的API来访问区块链网络。这里因为是做测试，并且笔者和测试服务器所在地不在同一个国家的原因，所以延迟较高。在实际使用中，开发者需要根据用户分布，就近设置高效率的API节点，以提高用户体验。

![添加API](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/WX20180920-154950%402x.png)


## 配置SEER水龙头服务

### 前言

区块链上的一切操作都需要支付手续费，注册账户也不例外。首先要解释一个大多数人都可能存在的误区，认为为什么比特币以太坊的账户注册不需要手续费，SEER这样的石墨烯系项目非要手续费？这是因为石墨烯系项目采用TITAN账号名机制，账号名即用户地址，而比特币以太坊是直接用密码学地址，比特币以太坊地址相当于石墨烯项目的公私钥对，而石墨烯的公私钥对要在区块链网络上注册成为账号名的权限证明秘钥，因此注册这一步是要手续费的。

每个石墨烯项目都有不同的注册机制，例如EOS采用让朋友代注册的模式，而STEEM目前采用较复杂的申请注册机制，而BTS则是由各个去中心化交易所各自提供水龙头服务。SEER目前由核心开发者提供了水龙头服务，但水龙头代付了小额的注册手续费，又可以获得自己所注册账户在链上任何操作的手续费分成，对于DAPP来说，推广了DAPP，让更多的用户使用DAPP，也因此为SEER区块链带来了更多的使用者，所以DAPP可以架设自己的水龙头服务，来获得推广收益。

### 环境

此水龙头代码在石墨烯水龙头源码（https://github.com/cryptonomex/faucet ）上修改，指南示例在DigitalOcean 的 ubuntu 16.04 服务器上测试正常。ubuntu 18.04、更高版本ruby，甚至相同配置下的vultr服务器均有各种报错，欢迎填坑。
此使用SEER测试网络，若有需要，请更换为主网。

### 在服务器运行一个SEER命令行钱包

新建一个screen，命名为seer。
```linux
screen -S seer
```
新建一个目录，命名为seer。
```linux
mkdir seer
```
下载最新版本SEER命令行钱包到seer目录，并重命名为seer.tar.gz，示例中的版本是0.0.4，请替换为最新版。
```linux
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz
```
进入seer目录
```linux
cd seer
```
解压缩seer.tar.gz
```linux
tar xzvf seer.tar.gz
```
启动命令行钱包，此例中的chain-id为测试网络，通过任意命令行钱包输入info指令获取，默认为主网chain-id，-s参数为钱包连接的节点api，此处为测试网络公告api节点，-r参数为钱包暴露的websocket RPC端口，水龙头程序即是通过此端口控制命令行钱包进行操作， -H为钱包暴露的HTTP RPC端口，所有端口都可以自行修改。
```linux
./cli_wallet --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" -s ws://123.206.78.97:8002 -r 127.0.0.1:9991 -H 127.0.0.1:9992
```
以上指令可以复制以下命令粘贴至终端，一次性执行：

```linux
screen -S seer
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz
cd seer
tar xzvf seer.tar.gz
./cli_wallet --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" -s ws://123.206.78.97:8002 -r 127.0.0.1:9991 -H 127.0.0.1:9992
```
钱包启动后，先设置钱包解锁密码，123替换为你想设置的密码
```cmd
set_password 123
```
解锁钱包
```cmd
unlock 123
```
导入账号资金私钥
```cmd
import_key okok 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
import_key else 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
```
以上指令可以复制以下命令粘贴至终端，一次性执行：
```cmd
set_password 123
unlock 123
import_key okok 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
import_key else 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
```
钱包需要在unlocked状态，才能被水龙头调用。

钱包连接正常的显示：
```linux
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz
cd seer
tar xzvf seer.tar.gz
./cli_wallet --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" -s ws://123.206.78.97:8002 -r 127.0.0.1:9991 -H 127.0.0.1:9992
root@ubuntu-s-1vcpu-1gb-sfo2-01:~# mkdir seer
root@ubuntu-s-1vcpu-1gb-sfo2-01:~# curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   615    0   615    0     0   1044      0 --:--:-- --:--:-- --:--:--  1045
100 13.7M  100 13.7M    0     0   904k      0  0:00:15  0:00:15 --:--:-- 2220k
root@ubuntu-s-1vcpu-1gb-sfo2-01:~# cd seer
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seer# tar xzvf seer.tar.gz
cli_wallet
witness_node
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seer# ./cli_wallet --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" -s ws://123.206.78.97:8002 -r 127.0.0.1:9991 -H 127.0.0.1:9992
Logging RPC to file: logs/rpc/rpc.log
3562294ms th_a       main.cpp:131                  main                 ] key_to_wif( committee_private_key ): 5KCBDTcyDqzsqehcb52tW5nU6pXife6V2rX9Yf7c3saYSzbDZ5W
3562295ms th_a       main.cpp:135                  main                 ] nathan_pub_key: SEER6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
3562295ms th_a       main.cpp:136                  main                 ] key_to_wif( nathan_private_key ): 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
Starting a new wallet with chain ID da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf (from CLI)
3562296ms th_a       main.cpp:183                  main                 ] wdata.ws_server: ws://123.206.78.97:8002
3562921ms th_a       main.cpp:188                  main                 ] wdata.ws_user:  wdata.ws_password:  
Please use the set_password method to initialize a new wallet before continuing
3564395ms th_a       main.cpp:227                  main                 ] Listening for incoming RPC requests on 127.0.0.1:9991
3564396ms th_a       main.cpp:252                  main                 ] Listening for incoming HTTP RPC requests on 127.0.0.1:9992
new >>> set_password 123
set_password 123
null
locked >>> unlock 123
unlock 123
null
unlocked >>> import_key okok 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
import_key okok 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
3572083ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
3572084ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1cd0784e.wallet
true
unlocked >>> import_key else 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
import_key else 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd
3572941ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to before-import-key-1bece5d8.wallet
3573189ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json
3573191ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1bece5d8.wallet
true
unlocked >>> 
```

完成后隐藏此screen:

`Control` + `a` `d`

### 安装mysql和依赖环境
```linux
apt update
apt-get install -y mysql-server libmysqlclient-dev  libreadline-dev build-essential nodejs ruby-railties libssl-dev
```
在安装过程中会提示设置mysql的密码。

### 安装ruby环境
```linux
cd ~
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash


rbenv install 2.2.3
rbenv global 2.2.3
gem install bundler
```
### 下载水龙头代码

```linux
git clone https://github.com/akirasen/seerfaucet
cd seerfaucet
bundle
```
### 配置水龙头文件

#### 水龙头访问配置faucet.yml

我们建议使用 nano 是因为它是一个经典的图形文本编辑器，只使用了方向键。

```linux
nano config/faucet.yml
```
配置文件介绍如下：
```nano
cli_wallet_connection: ws://127.0.0.1:9991   //钱包开放的websocketurl，cli_wallet-H参数对应  ./cli_wallet --chain-id="da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" -s ws://123.206.78.97:8002 -r 127.0.0.1:9991 -H 127.0.0.1:9992  
registrar_account: okok                    //提供注册的推荐人用户名，本例子为在SEER测试网络已创建且升级为会员的用户名okok
referrer_percent: 50       // 推荐人分成百分比                     
refcode_prefix: F01                                
                                                   
default_url: 127.0.0.1                       //水龙头对外访问的IP      
default_port: 3000                           //水龙头对外访问的端口
                                                   
exception_notification:                            //以下设置可以不用设置，应该是发送和接受注册及异常信息的邮件配置
  sender_address: faucet@example.com               
  exception_recipients: admin@example.com          
                                                   
smtp:                                              
  address: address                                 
  user_name: user                                  
  password: password 
```
修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

#### 数据库配置database.yml

```linux
nano config/database.yml
```

```nano
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root           #数据库登录用户名                   
  password:                #数据库登录密码，根据安装mysql时的填写，千万注意:和密码之间应有空格，否则之后创建数据库时会报错
  host: localhost          #数据库url          
                                     
development:
  <<: *default
  database: seer_faucet_dev

test:
  <<: *default
  database: seer_faucet_test

production:
  <<: *default
  database: seer_faucet

```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

#### 配置密码种子文件secrets.yml
(ruby on rails用到的密码种子配置文件)
生成三段随机密码种子
```linux
rake secret
```
例如：
```linux
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seerfaucet# rake secret
7e39b462ad366a4bb3560281541274d04846dc0ec62c76ead47a66911e3e30015c8969ddade0d923720b5a593683ff96f9ada58f3f9c5c7cdc6a9fe85d846664
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seerfaucet# rake secret
e3812e46b183a2d04e2a29e30faea5ea33114cbf18128ae5dd4c5a6828d27d9d366bad658e987cbff5faed2ec0e3a6a4a1ed0c2d2910b00f1a7461663eb4e7fc
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seerfaucet# rake secret
89fdf6eb4c5a13abfde3ee1b6503d61e5e8e8b2ee3745dc125620a1f1e8b384ee9fb6f0957cb419621742807ca5a11185e63467f58cca23dd5da9f83af0317d5
```
然后将密码种子填入secrets.yml中，替换掉`abcdefg123456 `
```linux
nano config/secrets.yml
```
```nano
development:                                          
  secret_key_base: abcdefg123456                      
                                                      
test:                                                 
  secret_key_base: abcdefg123456                      
                                                      
# Do not keep production secrets in the repository,   
# instead read values from the environment.           
production:                                           
  secret_key_base: 89fdf6eb4c5a13abfde3ee1b6503d61e5e8e8b2ee3745dc125620a1f1e8b384ee9fb6f0957cb419621742807ca5a11185e63467f58cca23dd5da9f83af0317d5//示例  
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

### 创建并初始化数据库

```linux
rake db:create; rake db:migrate; rake db:seed
RAILS_ENV=production bundle exec rake db:create db:schema:load
```
### 运行水龙头服务
新建一个screen，命名为faucet

```linux
screen -S faucet
```
启动水龙头服务

```linux
rails s -b 0.0.0.0
```

`-b`，bind之意。是让本机以外的主机，能够访问水龙头服务。

水龙头连接钱包正常的显示：
```
root@ubuntu-s-1vcpu-1gb-sfo2-01:~/seerfaucet# rails s -b 0.0.0.0
=> Booting WEBrick
=> Rails 4.2.4 application starting in development on http://0.0.0.0:3000
=> Run `rails server -h` for more startup options
=> Ctrl-C to shutdown server
Starting graphene websocket communication event-loop 'ws://127.0.0.1:9991'
Established connection to 'ws://127.0.0.1:9991'
[2018-10-04 09:29:00] INFO  WEBrick 1.3.1
[2018-10-04 09:29:00] INFO  ruby 2.2.3 (2015-08-18) [x86_64-linux]
[2018-10-04 09:29:00] INFO  WEBrick::HTTPServer#start: pid=21639 port=3000
```

完成后隐藏此screen:

`Control` + `a` `d`

### 使用钱包连接此水龙头

之后在ubuntu或mac上运行一个SEER-UI dev环境，将此水龙头设为默认水龙头。

详细操作步骤参考：https://github.com/seer-project/Seer-UI

#### 简明SEER-UI部署流程

将以下命令复制到终端中执行即可安装 NVM。
```linux
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
nvm install v6
nvm use v6
```
Node 安装完成后，获取项目的源代码：
```linux
screen -S Seer-ui
git clone https://github.com/seer-project/Seer-ui.git
cd Seer-ui
```
修改钱包的默认水龙头：
```linux
nano app/api/apiConfig.js
```
修改apiConfig.js第49行的代码：
```js
DEFAULT_FAUCET: "https://www.seerapi.com",
```
修改为你的水龙头ip和端口，例如：
```js
DEFAULT_FAUCET: "http://206.189.169.23:3000",
```
在启动之前，需要先安装 npm 软件包：
```linux
npm install
```
所有软件包安装好后，可以使用以下命令启动开发服务器：
```linux
npm start
```
编译完成后，即可通过浏览器访问 localhost:9080 或 127.0.0.1:9080 打开钱包。

### 了解注册流程

以上步骤中作为测试，仅修改了水龙头地址，默认SEER-UI依然使用SEER主网网络，若要将SEER-UI改为测试网络，还需要修改接入点和chain-id，此处不深入介绍。

#### 查看水龙头

在使用了此水龙头的SEER-UI注册新账号`"fffff"`成功后，可以在测试网络区块浏览器 http://123.206.78.97/explorer/blocks 观察到如下信息：

```
okok 注册了账户 fffff
```
使用
```linux
screen -r faucet
```
恢复screen faucet，在screen faucet可以观察到如下信息：
```linux
Started OPTIONS "/api/v1/accounts" for 142.93.42.172 at 2018-10-04 09:34:36 +0000
Cannot render console from 142.93.42.172! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
  ActiveRecord::SchemaMigration Load (0.4ms)  SELECT `schema_migrations`.* FROM `schema_migrations`
Processing by Api::BaseController#option as */*
  Parameters: {"path"=>"v1/accounts"}
  Rendered text template (0.0ms)
Completed 200 OK in 16ms (Views: 6.0ms | ActiveRecord: 0.0ms)


Started POST "/api/v1/accounts" for 142.93.42.172 at 2018-10-04 09:34:37 +0000
Cannot render console from 142.93.42.172! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
Processing by Api::V1::AccountsController#create as JSON
  Parameters: {"account"=>{"name"=>"fffff", "owner_key"=>"SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms", "active_key"=>"SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8", "memo_key"=>"SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8", "refcode"=>nil, "referrer"=>nil}}
   (0.2ms)  BEGIN
  SeerAccount Exists (1.3ms)  SELECT  1 AS one FROM `seer_accounts` WHERE `seer_accounts`.`remote_ip` = BINARY '142.93.42.172' AND (created_at > '2018-10-04 09:29:37') LIMIT 1
---- Registering account: 'fffff' SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8/SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms referrer: 
call: [0, "get_account", ["fffff"]]
call: [0, "get_account", ["fffff"]]
Websocket RPC Error: {"code"=>1, "message"=>"Assert Exception: rec && rec->name == account_name_or_id: ", "data"=>{"code"=>10, "name"=>"assert_exception", "message"=>"Assert Exception", "stack"=>[{"context"=>{"level"=>"error", "file"=>"wallet.cpp", "line"=>601, "method"=>"get_account", "hostname"=>"", "thread_name"=>"th_a", "timestamp"=>"2018-10-04T09:34:37"}, "format"=>"rec && rec->name == account_name_or_id: ", "data"=>{}}, {"context"=>{"level"=>"warn", "file"=>"websocket_api.cpp", "line"=>122, "method"=>"on_message", "hostname"=>"", "thread_name"=>"th_a", "timestamp"=>"2018-10-04T09:34:37"}, "format"=>"", "data"=>{"call.method"=>"call", "call.params"=>[0, "get_account", ["fffff"]]}}]}}
Websocket RPC Error: {"code"=>1, "message"=>"Assert Exception: rec && rec->name == account_name_or_id: ", "data"=>{"code"=>10, "name"=>"assert_exception", "message"=>"Assert Exception", "stack"=>[{"context"=>{"level"=>"error", "file"=>"wallet.cpp", "line"=>601, "method"=>"get_account", "hostname"=>"", "thread_name"=>"th_a", "timestamp"=>"2018-10-04T09:34:37"}, "format"=>"rec && rec->name == account_name_or_id: ", "data"=>{}}, {"context"=>{"level"=>"warn", "file"=>"websocket_api.cpp", "line"=>122, "method"=>"on_message", "hostname"=>"", "thread_name"=>"th_a", "timestamp"=>"2018-10-04T09:34:37"}, "format"=>"", "data"=>{"call.method"=>"call", "call.params"=>[0, "get_account", ["fffff"]]}}]}}
call: [0, "register_account", ["fffff", "SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8", "SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms", "okok", "okok", 0, true]]
call: [0, "register_account", ["fffff", "SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8", "SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms", "okok", "okok", 0, true]]
{"ref_block_num"=>61162, "ref_block_prefix"=>2022767456, "expiration"=>"2018-10-04T09:35:06", "operations"=>[[4, {"fee"=>{"amount"=>514257, "asset_id"=>"1.3.0"}, "registrar"=>"1.2.105", "referrer"=>"1.2.105", "referrer_percent"=>0, "name"=>"fffff", "owner"=>{"weight_threshold"=>1, "account_auths"=>[], "key_auths"=>[["SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8", 1]], "address_auths"=>[]}, "active"=>{"weight_threshold"=>1, "account_auths"=>[], "key_auths"=>[["SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms", 1]], "address_auths"=>[]}, "options"=>{"memo_key"=>"SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms", "voting_account"=>"1.2.5", "num_committee"=>0, "num_authenticator"=>0, "num_supervisor"=>0, "votes"=>[], "extensions"=>[]}, "extensions"=>{}}]], "extensions"=>[], "signatures"=>["1f19bf7e127acb07d8b56e183ba4839d53be35bb7aae233e407db6cc373bbc8f5c6e54fcf4b6252abe7a5a3be3a4b5724b3e4a32ae2595e5b9f22a7190453aac05"]}
  SQL (0.5ms)  INSERT INTO `seer_accounts` (`name`, `owner_key`, `active_key`, `memo_key`, `remote_ip`, `created_at`, `updated_at`) VALUES ('fffff', 'SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms', 'SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8', 'SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8', '142.93.42.172', '2018-10-04 09:34:37', '2018-10-04 09:34:37')
   (1.4ms)  COMMIT
  Rendered api/v1/accounts/show.json.jbuilder (2.7ms)
Completed 201 Created in 1364ms (Views: 6.6ms | ActiveRecord: 4.6ms)
```
完成后隐藏此screen:

`Control` + `a` `d`

而使用
```linux
screen -r seer
```
恢复screen seer，在screen seer可以观察到如下信息：

```cmd
2078541ms th_a       websocket_api.cpp:109         on_message           ] API call execution time limit exceeded. method: call params: [0,"register_account",["fffff","SEER7Ha3fpfBqt6zW1SsMjUHjguoGMPSDs3HS6KQWGWUX4agSFDkU8","SEER6f7kZTPvA7g2aRZaFbBjDbNYLy3XT4m71VPdRMnGeZKczpFMms","okok","okok",0,true]] time: 1046857
```
完成后隐藏此screen:

`Control` + `a` `d`

所以水龙头的作用是把SEER-UI或其它前端发起的包含用户名、公钥的注册请求，判断是否符合规则，然后将信息存入本地数据库后，调用命令行钱包来注册账号。

### 水龙头的更多功能

#### 注册后自动向用户转账或发行资产

您可以修改水龙头注册文件，让水龙头注册新用户后，自动向该账户转入一定数额的token，让用户体验DAPP功能。

编辑注册文件：

```linux
nano seerfaucet/app/services/account_registrator.rb
```
第60-61行使用ruby的`#`注释掉的两行代码，分别是向新注册用户账户转入50万SEER测试币和新发行1000万BTC测试币给该用户。
```ruby
GrapheneCli.instance.exec('issue_asset', [account_name, '10000000', 'BTC', 'Welcome to SEER. https://Seer.best', true])
GrapheneCli.instance.exec('transfer', [registrar_account, account_name, '500000', 'SEER', 'Welcome to SEERTALK. https://forum.seerchain.org', true])

```
去掉`#`，并改为您要使用的资产类型即可，若要使用资产发行功能，命令行钱包内需要有资产发行人的active key。

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

使用`screen -r faucet`切换到screen faucet，`Control` + `c`关闭水龙头，然后`rails s -b 0.0.0.0`重启。

完成后隐藏此screen: `Control` + `a` `d`

注册新账号`dddddd`成功后，测试网络区块浏览器观察效果如下：

```
okok 将 500,000 SEER 转账给 dddddd
else 将 10,000,000.0000 BTC 发行给 dddddd
okok 注册了账户 dddddd
```

#### 导出注册用户列表

每次注册新用户，水龙头程序都会在mysql数据库中自动记录下注册用户的信息，笔者暂时没有测试出通过邮件接收注册信息的方法，但可以从数据库中直接将注册信息导出为根目录下的excel表格。方法如下：

```linux
mysql -p seer_faucet_dev -u root -e "select * from seer_accounts" > ~/seer.xls
```
`ls`就会发现根目录下多了一个`seer.xls`文件，在本地电脑的终端里输入：

```
scp root@服务器ip:seer.xls ~/seer.xls
```
即可将此文件下载到本地。


## SEER公链余额快照功能和批量转账功能使用指南

请下载最新版的节点和钱包：https://github.com/seer-project/seer-core-package/releases

余额快照和批量转账功能结合在一起，就是Dapp会用到的空投功能了。在SEER区块链系统中，这两大功能分别集成在节点软件和命令行钱包中，使用参数等形式调用。

### 余额快照

余额快照的调用方式是在启动节点时加入以下参数：

```cmd
witness_node --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```
#### 参数解释

`--plugins="snapshot "` 中 `"snapshot "` 告诉节点你要使用的功能为快照，注意不要漏了t 和 "之间的空格；

`--snapshot-at-time="2018-07-24T04:00:00"` 中 `"2018-07-24T04:00:00"` 替换为你要进行快照的时间，为格林尼治标准时间，比新加坡时间晚8个小时；

`--snapshot-to="d:/0724.csv"`  中 `"d:/0724.csv"`为快照出的表单文件要存放的目录和文件名；

`--snapshot-asset="SEER"` 中 `"SEER"` 为你要快照的资产类型，可以是基于SEER发行的任何资产，例如OPC、PFC等；

`--snapshot-balance-limit=1` 中的参数`1`为快照余额下限，1为不等于0。因为SEER最多支持小数点后5位，所以例如如果你想只快照余额大于10000的账户应该写成--snapshot-balance-limit=`1000000000`。

在快照前节点需要和区块链正常同步，如果同一台设备上已经运行了`seednode`、`apinode`、`witness node`等节点，为避免端口冲突，需要修改端口号为未占用的端口。

#### 完整参数

```cmd
witness_node --data-dir ./data  --p2p-endpoint=0.0.0.0:1899 --rpc-endpoint=0.0.0.0:9192 --replay-blockchain --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```

可以看到节点在指定时间对主网进行了余额快照，在指定目录可以找到快照表单文件。

快照文件中的余额字段自动包含了SEER等资产类型，用excel的替换功能替换删除掉即可。

当然，这个表里面得到的是某种资产的余额快照，如果要按一定的比例空投，只需对数据进行再加工即可。

### 批量转账（空投）

批量转账功能已经集成在命令行钱包中，使用`“batch_transfer”`命令调用，调用的文件是一个和cli_wallet同目录的txt文件。

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
提醒：同一个txt内转账数不要太多，一般不超过`2000个`，以避免单个区块过大，广播出问题。

3、在解锁的命令行中运行：

```cmd
batch_transfer transfer.txt 
```
执行后，所有的转账会同时被广播。本例中`bob、charlie、 dove 、eva`将每人收到100 SEER的空投，当然，此命令行钱包需要导入alice的活跃权限私钥。

## SEER区块链网页钱包开设预测房间和参与预测

您可以在测试网络上体验创建房间流程，也可以在SEER主网上创建平台和房间。

可能您会觉得这教程冗长，希望有简略一点的教程版本，但在开设房间中，有很多充满逻辑的内容，此教程将尽量详细的帮助读者理解底层设计、平台和房间参数设置背后的意义。（友情提示：此文档由SEER社区开发者提供，对SEER和石墨烯区块链技术的理解可能有所偏差，若发现理解有误的地方，请到github为笔者指正。）

### 注册成为平台

点击`“菜单”`-`“平台”`，可以看到页面上有两个选项：`“创建平台”`和`“创建房间”`。点击`“创建房间”`，即可在不创建平台的情况下直接创建PVP房间，详情请了解`“人人房主”`模式。

目前SEER主网上创建平台的费率为`30000SEER`（终身会员为`18000SEER`）。

`“创建平台”`以后，您可以创建PVD(LMSR)、PVP、Advanced三种所有类型的预测房间。

在`“创建平台”`时，您需要填入`“描述”`、`“保证金”`和`“脚本”`。

**“描述”**

可以是对该平台的介绍，尽量简洁。具体填的是什么还是看DAPP的需要，如何引导用户。

**“保证金”**

每10万SEER的保证金可以开设一个房间。例如：若需要同时开设两个房间，需要平台保证金 ≥ 20万 SEER。而如果一个房间结束后再开设另一个房间，则仅需要10万SEER保证金。

**“脚本”**

可以不填，具体填的是什么还是看DAPP的需要，如何引导用户。一般来说，可以引导用户填上头像图片链接，DAPP也可以提供图床功能，上传后自动填充。

#### 平台信誉系统

包括`“保证金”`在内，加上根据平台创建房间次数和违规次数组成的`“信誉度“`和`“参与量“`，构成了SEER平台的信誉系统。每次建立房间，平台的参与量都会增加，若无违规行为，则`“信誉度“`和`“参与量“`是一致的。

参与者可以尽量选择`“信誉度“`高，且`“信誉度“`等于`“参与量“`的平台。

#### 更新平台

平台可以通过`“更新平台“`功能，修改自己的`“描述”`、`“脚本”`，或增加及减少`“保证金”`，页面上会显示当前保证金数量，修改`“保证金”`时，负数表提现，正数表增加。例如，当前有30万保证金，在`“更新平台“`页面，保证金一栏，填入`“-100000“`并提交，若当前已开设的房间数小于3个，保证金将减少为20万SEER。

### 开设房间

创建平台后，点击`“菜单”`-`“平台”`，可以看到页面上出现了`“创建房间”`选项，点击即可开始创建房间。

每个房间的开设手续费为`200 SEER`（终身会员为`120 SEER`）。

#### 房间的通用参数设置

##### 标签

可以留空，房主也可以点击`“添加标签”`，为自己创建的房间设立标签，例如足球、世界杯、八卦等，DAPP在列出房间列表时可以只列出相应标签的房间。如果DAPP开发者如果希望在前端显示的都是通过此DAPP创建的房间，则可以在用户创建房间时默认加入一个和DAPP相关的标签，在查询房间列表时仅列出带有此标签的房间。

##### 描述

十分重要，房主在创建房间时与参与者约定预测的内容，主要元素便是`“描述”`和`“选项”`。

在多宿主预言机模式的房间中，预言机是通过描述来确定自己要输入的结果选项。

描述的编写，必须准确描述预测的事件内容和结果内容。

**例如：**

“世界杯冠军是哪支队？”便是一个不准确的描述，“世界杯”有歧义，哪一年？什么运动的世界杯？正确的描述应该是“2022年世界杯足球赛的冠军是哪支队？”

“明天BTC能超过7000美元吗？”也是一个不准确的描述，是预测哪个交易所的BTC价格，明天是指哪个时区的具体什么时间点？正确的描述应该是“新加坡时间2018年9月2日0时整，比特币价格高于7000美元吗？以coinmarketcap.com显示价格为准。”

“英超 托特纳姆热刺 VS 利物浦 胜负”，若是单宿主预言机模式，并有DAPP约定俗成的指向是没问题的，但若是多宿主预言机模式，可能让预言机们对结果有歧义。试想若是淘汰赛模式，90分钟内和全场比赛的结果不一致时，老玩家和DAPP方可能知道淘汰赛阶段都是以90分钟以内的赛果为准，但小白就可能不懂了，认为应该以全场比赛为准，用户可以解释，预言机是去中心化的，可解释不了。所以正确的描述应该是“2018年英超 托特纳姆热刺 VS 利物浦 胜负（托特纳姆热刺为主场），以90分钟以内的赛果为准。”

如果是不能确定事件发生时间的事件，允许房主设置一个较长的结束时间，同时在描述中约定房间的停止时间，例如：

“反击杀人的bob，法律责任会怎么样？（若起诉以一审结果为准，不含缓刑，一审结束时停止本房间）”此房间的房主已经尽力描述准确了，但“一审结束时”仍有一些歧义，虽然大多数人都能理解他想表达的是一审结果出来的时间，但最准确的描述应该是“一审宣判当日新加坡时间0点停止本房间”。

若选项之间可能有歧义，也是在描述中声明，消除歧义。

例如，在上面的这个例子中，房主声明了“不含缓刑”，这是为什么呢？因为选项中，有“无罪释放或不起诉”和“被判3年及以下”，在现实中，可能的刑罚会有“有期徒刑2年缓期2年执行”的情况，即不收监进行社区矫正，经考验可能不会收监执行刑期。为消除这种歧义，所以房主声明了“不含缓刑”，即“有期徒刑2年缓期2年执行”也算“被判3年及以下”。

##### 选项

设置选项的原则是无歧义，并且选项之间互相排斥，不可包含，并且不可出现选项以外的结果。比如前例中出现了“无罪释放或不起诉”，一般就不能再出现“无罪释放并获2000美金奖励”这样的选项，而且既然是预测刑期，如果选项只有“无罪”、“3年以下”、“3年以上10年以下”3个选项的话，若出现“3年”和“10年及以上”刑期的话，则会出现没有选项可选的情况，以此类推。

##### 创建者权重

`创建者权重(%)`是指房主在预测结束输入结果阶段所输入的结果，在系统最终采纳的结果中所占的比重，若`创建者权重(%)`大于`50`，则该房间为单宿主语言机模式，在此模式中，预测结束房主可以立即输入结果，进入结算流程，适用于参与人数不多或者时效性要求更高的预测市场房间，可以更快得出结果。

而如果房主设置`创建者权重(%)`小于`50`，则为多宿主预言机模式，在结果输入阶段，预言机为该房间输入的结果将占有（100 - 创建者权重）%的权重比重，每个房间最多支持50个预言机输入结果，即，如果创建者权重设为50%，同时共有50个预言机参与，那每个预言机的权重为1%，这种情况下，只要有一个预言机的输入结果和房主输入结果一致，那该结果就会被采纳。

所以即使采用多宿主预言机模式，也需要创建者权重低于一定的数值，例如`30%以下`，预言机们的输入结果才会产生价值，房间更不易出现作恶的情况。

但启用多宿主预言机的前提，是全网注册的预言机数量充足，并且活跃，否则房间还是会因为参与预言机数量少而出现结果作恶风险，例如如果创建者权重设为`30%`，房主输入正确结果，结果只有`1个`预言机参与，并输入错误结果，是否系统最终会因为预言机权重占比70%而采用错误结果呢？

解决此问题的方法是核心开发者或Dapp开发者打造一款专门的预言机服务Dapp或在某个Dapp内集成一个强大的Dapp服务功能，让注册了Dapp资格的用户能及时收到有房间需要结果输入的提醒、甚至让用户选择自己只为奖励多少以上的房间输入结果，通过这样的方式预言机活跃起来。

##### 预言机奖励和门槛

`“名誉”`、`“保证金”`、`“参与量”`均为可以参与的预言机的门槛，若房主设定了门槛，则只有高于房主所设定条件的预言机才能参与该房间的输入。

`“参与量”`指该预言机参与了多少次房间输入，每次参与结果输入，该预言机的参与量都会增加，若无违规行为，则`“名誉“`和`“参与量“`是一致的。`“保证金”`是指该预言机为自己设置冻结的保证金金额，若恶意输入错误结果，将从该金额中扣除罚金。保证金越高，预言机作恶的风险更低。

`“每个预言机奖励”`指参与了该房间输入的预言机能得到多少SEER的奖励，奖励越高，预言机参与结果输入的积极性越强，房主在预言机上的支出也更多，例如若`“每个预言机奖励”`设为100SEER，则在最多50个预言机参与的情况下，房主需要支出5000SEER。如果有Dapp提供了预言机提醒服务的情况下，奖励较少的房间将可能吸引不到预言机积极参与。

##### 接受资产

在主网钱包开设房间时，可以设置`接受资产`，选择大家是用SEER主资产还是用其它自定义资产参与预测，在Dapp上，可能没有这个功能，要求用户都使用Dapp发行的自定义资产参与预测。

##### 单次最大（最小）参与量

对于`PVD（LMSR）类型房间`，单位是`份`，而对于`PVP`和`Advanced`类型房间，单位则是`SEER主资产或其它自定义资产`，通过设置单次最大最小的参与量，避免用户误操作或非理性参与。

#### 开设LMSR类型房间

用户可以在`“房间类型”`设置中选择`PVD`，即可开设LMSR类型房间，LMSR类型房间需要设置特别参数 `L` 的数值。

PVD模式采用LMSR（Logarithmic Market Scoring Rule，对数市场评价法则）算法规则进行市场预测。不同于传统市场调查、网上投票等“买定离手”式一次性预测，LMSR是一种动态的、自动化的预测机制，某个事件发生的几率越来越高，预测该方向的参与者也会越多，市场共识会推动该预测方向的实时参与价格变高，用户以当前价格进行该方向的预测，在预测最终结束前都可以实时进行动态交易。

LMSR机制需要房主在创建房间时通过设定亏损界值来提供一笔准备金（根据房间接受的资产可能是SEER、PFC等资产），根据房主设定的亏损界值，准备金将自动注入资金池，房主设定的亏损界值越大，需要提供的准备金越多，亏损界值较大的情况下，也只有更多的用户参与时才能让实时参与成本产生较大波动。如果预测错误的用户多于预测正确的用户，房主将会盈利，而如果预测正确的用户大于预测错误的用户，房主将会亏损，在所有用户的预测方向全对且参与者足够多的极端情况下，房主将损失掉所有的准备金。

LMSR玩法的优势：参与预测的过程可以伴随自由的买卖，用户可以在预测结果出来之前卖出获利或者止损。预测的参与量的买卖可以使预测倾向流动加快，即更快的向概率最大的选项倾斜。

##### 特别参数介绍 - L值

房主在开设LMSR类型房间时，需要设定一个L值，L表示房主设定的亏损界值，房主提供的准备金F = L x ln（N），N为结果数量。例如，一个有4个选项的LMSR房间，L设为100000，则房主需要投入的准备金F为 100000 x ln(4)，调出手机或电脑的科学计算器，ln(4)约等于1.386，此数字乘以10万即房主要投入的准备金F，约为13.86万。再例如，一个有24个选项的LMSR房间，L 设为10万，则ln(24) x 100000 ，则房主要投入的准备金F约为 31.74万。（ln表示对数计算）

#### 参与LMSR类型房间

总参与量表示当前的总资金池，包括房主提供的准备金和参与者注入的资金，在选项中将显示每个选项的实时参与人数和份数。

LMSR类型的预测，用户的参与量可以是负数，`负数即卖出`。LMSR参与量的单位为“份”，价格是需要根据份数即时计算的，比如卖出1份价格为1，但卖出2份价格未必是2，前端只是进行了初步计算，给出了一个对相应数量的买卖价格预估。

在LMSR类型的房间内，最终结果的每份收益均为1，例如1 SEER，初始每个选项的每份参与成本均为 1 SEER * 1 / N ，N 为结果个数。例如，在有5个结果的LMSR房间内，每个选项的初始成本为0.2 SEER，这也代表，一开始每个选项的发生概率都为20%，在有2个结果的房间内，每个选项的初始成本为0.5 SEER，这也代表，一开始每个选项的发生概率都为50%。随着每个选项参与份数的变化，代表了人们对选项发生可能的看法，发生概率即选项的购买成本将会增高。

当一个选项的当前购买成本高于用户购买时的成本时，用户可以选择卖出自己持有的该选项份数获利，也可以因为非常确信该选项就是最终结果而持有到结算，赚取更多收益。例如，一个4个结果的房间，选项1初始成本为0.25，当时你以0.26的价格购买了10000份，付出2600SEER。后来购买选项1的人越来越多，购买成本涨到了0.52，你可以选择在此时卖出你持有的10000份选项1，获得5200SEER，其中有2600SEER的利润。

当然你也可以继续持有这10000份选项1，若最终结果为选项1，你将获得10000SEER，利润7400SEER，若最终结果不为选项1，你将血本无归。

当然，若事件发展方向逆转，你也可以在选项1的价格从0.52跌破0.26前卖出持有的份数止损。这种时候就是比谁手快啦。

#### 开设PVP类型房间

用户可以在`“房间类型”`设置中选择`PVP`，即可开设PVP类型房间，PVP类型房间没有需要设置的特别参数。是一种相对来说最简单的房间模式，适合朋友之间娱乐。

用户自由参与预测，该预测类型房主不承担猜对结果人多的亏损风险，也不会因为猜错的人多盈利，预测参与资金全部分给预测正确者。

根据房主的时间设定，PVP也可以设置为在预测最终结束前都可以实时进行动态交易的模式，但与PVD有所不同的是，PVP参与成本直接以SEER主资产或是房主设定或DAPP允许的某种自定义资产支付，并不是像PVD一样按份数实时计算参与价格，房主不需设准备金或资金池。

自2018年8月15日SEER主网更新自v0.0.4版本后，SEER允许用户不创建平台，直接创建房间，相关说明请参考： <a router-link="./tools?id=seer区块链“人人房主”模式功能介绍">`“人人房主”模式功能介绍`</a> 。

#### 参与PVP类型房间

用户自由参与预测，某一方向预测的资金数量增长，会让奖金倍数实时产生变化，房间关闭后，预测正确的一方按奖金倍数获得奖励。例如：若选项1的参与金额是选项2参与金额的10倍，则选项1获胜后后奖金倍数是选项2的 1/10 。

#### 开设Advanced高级房间

用户可以在`“房间类型”`设置中选择`Advanced`，即可开设Advanced高级房间，Advanced高级房间需要设置特别参数 `资金池` 的数值，并手动设置和修改每个选项的 `奖金倍数`。

Advanced也是按直接以房主确定的资产支付，Advanced模式的奖金倍数不会像PVP模式一样根据参与情况变化，同时房主需要提供一个资金池，以承担猜对的用户多于猜错的用户时的亏损。

##### 特别参数介绍 - 资金池

房主在开设房间时需要设定一个资金池金额，如果预测正确的用户多于预测错误的用户，房主将开始损失资金池里的资金。如果出现所有用户都预测正确，并且资金 * 奖金倍数达到资金池金额的极端情况，房主将损失掉资金池里的所有资金，如果某选项按当前奖金倍数已经不够资金池派奖的话，该选项将不能再购买。

为了避免这样的情况，Advanced模式房间允许房主在预测进行中为房间增加资金池。

例如：某选项奖金倍数房主设为10，资金池为1000万，如果参与该选项的资金达到100万且没有人选择其它选项，并且最终该选项获胜，则房主会失去资金池所有资金。

##### 特别参数介绍 - 奖金倍数

不同于PVP房间奖金倍数自动生成，高级房间的奖金倍数为房主手动设定，房主可以在房间未结束前手动动态调节，参与者以当时房主设定的奖金倍数参与预测，如果预测的选项正确是以该次参加时的奖金倍数获得奖励。

#### 参与Advanced高级房间

用户根据奖金倍数的回报率及对结果方向的主观判断决定自己的参与选项和参与量，房间关闭后，按每笔预测正确参与时的奖金倍数获得奖励。非正确的参与不会得到任何收益。例如，单次购买奖金倍数为`2`的`选项1`10000SEER ，当房主调整`选项1`奖金倍数为`3`时再购买10000 SEER，最终结果若结果**不**为`选项1`，您的参与不会有任何收益，若最终结果若结果为`选项1`，则您的收益为 3 * 10000 + 2 * 10000 = 50000 其中 20000 为您的成本。

### 开启房间和时间设置

点击`“菜单”`-`“平台”`，可以看到页面上的房间后方有`“开启”`和`“更新房间”`选项，点击`“开启”`即可开启房间，点击`“更新房间”`可以修改房间信息，若房间已开启，则不能再对房间信息进行修改。

点击`“开启”`后需要设置`开始`和`结束`时间，以及`开奖时长`。

#### 开始和结束时间

即房间的自动`开始`和`结束`时间，当到达开始事件时，该房间可以进行参与，当到达结束时间时，房间将自动停止参加，并进入开奖（结果输入）环节。

#### 提前停止房间

点击`“菜单”`-`“平台”`，可以看到页面上已开启的房间后方有`“停止参加”`选项，点击后即可提前停止预测，使用户无法再参与预测，此时可重新设置`“开奖时长”`。

在预测房间进行中，若出现`“描述”`中声明的事件或其它导致预测房间无法进行的事件，房主可以提前`停止房间`并进入开奖（结果输入）环节。

例如，在前面举过的例子中，“反击杀人的bob，法律责任会怎么样？（若起诉以一审结果为准，不含缓刑，一审结束时停止本房间）”，这里房主无法提前预知事件的发生时间，于是描述了2个导致房间提前停止的事件：1、若起诉则是一审结果出现时；2、不起诉结果出现时。最终出现的结果是`不起诉`，于是房间提前停止。

#### 开奖时长

即房间停止参与后，供房主和预言机输入的时间，以分钟计算，在此时间结束前，任何人都不得将房间进入结算流程。此时间结束后，任何人都可以点击`“结算”`按钮使房间进入之后的结算和派奖流程。此时间结束后，但无人点击按钮让房间进入结算流程时，房主和预言机仍可以输入结果。

## SEER区块链“人人房主”模式功能介绍

### 摘要

SEER区块链已于新加坡时间2018年8月15日更新至`V0.0.4版本`，此更新后，主网已具备`“人人房主”`功能，支持普通用户不创建平台，单独创建PVP房间，并围绕此功能添加了一些必要查询接口供DAPP调用。

此文档将以SEER测试网络的开发者网页钱包（以下简称测试网络）为例，介绍此功能的使用方式。

### 先决条件

测试网络地址：http://123.206.78.97

测试网络账号：okok 
私钥：5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ 
内有上千万测试币，欢迎体验。

在<a href="http://123.206.78.97/settings/wallet"> **测试网络本地钱包页** </a>，点击`“新建钱包”`，设置密码，创建一个空钱包；

在<a href="http://123.206.78.97/settings/restore"> **测试网络恢复/导入页** </a> `“从钱包备份文件恢复或者导入私钥”`下拉菜单中选择`“导入私钥”`，在输入框中粘贴测试帐号okok的私钥，导入帐号。

在<a href="http://123.206.78.97/create-account/wallet"> **测试网络创建账户页** </a>填写新账号名，并选择使用okok作为注册费支付账户，创建一个新账号。

点击右上角账号名，选择okok账号，切换回okok，随后点击`“转账”`按钮，向您刚刚创建成功的新账号转账14万seer测试币。

随后可以开始体验`“人人房主”`模式。

### 创建房间

在V0.0.3及更早期的版本，用户要创建竞猜房间，需要首先交纳手续费成为平台，过程较为复杂，成本也较高，门槛较高。此时因为您新创建的账号是一个非平台、非终身会员账户，所以在早期版本是没有创建房间资格的。

但现在，您就可以体验直接创建房间了。

点击`“菜单”`-`“平台”`，可以看到页面上有两个选项：`“创建平台”`和`“创建房间”`。

![创建房间](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/20180820001456.jpg)

我们点击`“创建房间”`。

在创建页面填入`“描述”`、`“创建者权重(%)”`、`“单次最小参与量”`、`“单次最大参与量”`、并点击`“添加选项按钮”`填写竞猜选项等。填写完毕后点击页面上的`“创建房间”`按钮。（创建者权重超过一定比例，例如90%，即为单宿主模式，以房主输入结果为准，预言机输入并没有效果）

可以看到此账户余额减少了`约13万seer`测试币。这是因为系统要求平台每创建一个房间需要有至少`10万SEER`的保证金，这是为了房主作恶——开设房主输入结果权重较大的房间并恶意输入结果。而对于无平台的房间则要求提供此数额`120%`的保证金，从余额中直接扣除。因此这里暂时冻结了`12万SEER`（系统算法为：get_global_properties.parameters.min_guaranty_per_room* 6/5）此保证金在房间派奖后会立刻取消冻结，在余额中显示。

另外，测试网络创建房间的手续费为10000测试币（主网目前为200 SEER，此费用可由理事会动态调节），所以总共扣除了`约13万seer`测试币。

### 开启房间

在<a href="http://123.206.78.97/houses/1.14.4294967295"> **测试网络null-account公共平台** </a>内可以查看到所有用户创建的房间，其中您创建的房间不同于其它房间，会有“开启”、“更新房间”的选项，和其他房间不同。

![开启房间](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/20180820001531.png)

点击开启，设置`起止时间`和`“开奖时长”`（结束时间到以后，预言机在多少分钟内可以输入结果），即可开启房间。

其它操作和平台下开设房间一致。当房间完成竞猜，并派奖以后，可以看到作为保证金临时冻结的12万SEER测试币已在余额中显示。

测试网络和主网功能同步。

DAPP开发者可以依据开发者钱包的示例将`“人人房主”`功能整合进自己的应用中。

现在就开启您的探索之旅吧。

## 用提议方式修改资金权限

<p class="warning">
  涉及权限相关，请谨慎操作，以免永久失去账号控制权。）
</p>

### 背景介绍

SEER的账户权限体系由 `资金权限active key`、`账户权限 owner key`、`备注密钥`组成。其中 `资金权限`、`账户权限`包含阈值和授权列表中的各自权重。权限可授权给公钥或账号。 要进行相关操作，需要拥有相应的私钥，并且授权的权重达到阈值。

SEER钱包模式中。一般情况下会同时有active key和owner key，链上的任何操作必须具有active key，而修改权限则需要owner key。

有时，用户为了账号安全，会将active key和owner key分别保存，同时也可能对active key进行修改等操作。

总之，有各种各样的可能性导致粗心的用户遗失了active key，但还保留了owner key。

区块链上的任何操作都需要支付手续费，修改权限也不利例外。

在通常情况下，修改权限操作的手续费由active key权限通过本帐户支付，但在active key缺失的情况下，由于不能支付修改权限手续费，导致无法重设active key。

这时候，我们可以通过`提议`的方式修改active key。

### 准备材料

1、SEER网页钱包；

2、SEER命令行钱包；

3、active key遗失账号（被修改账号）的owner public key；

4、active key遗失账号的owner private key；

5、资金充足的另一账号（手续费支付账号）的active private key。

### 操作步骤

本例中，我们将让被修改账号的active key和owner key一致，以恢复active权限。

#### 在网页钱包的操作

1、在SEER网页钱包`菜单`-`设置`-`恢复/导入`页面的下拉菜单中选择`导入私钥`，分别导入被修改账号的owner private key和手续费支付账号的active private key；

2、被修改账号`菜单`-`权限`-`资金权限`页面，在`输入账户名/公钥以及权重`中填入被修改账号的owner public key，`权重`填`1`（等于阈值），然后点击`添加`；

3、点击右上角`保存修改`；

4、在`请确认交易`页面，点击右下角`提议`，随后提交页面会出现一行新的`发起账户`，在列表中选择你的手续费支付账号，然后点击`提议`，`确认`；

5、在`账户总览`-`提案`页面，可以看到刚刚发起的提案编号，例如`1.8.xx`，需要记下此提案编号，下面的操作需要在命令行钱包操作。

#### 在命令行钱包的操作

1、解锁后，在命令行钱包中使用`import_key`分别导入被修改账号的owner private key和手续费支付账号的active private key；

2、使用`approve_proposal`命令通过此提议：

```cmd
approve_proposal fee_paying_account "proposal_id" {"active_approvals_to_add":[],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":["OWNER PUBLIC KEY"],"key_approvals_to_remove":[]} true
```
例如：(else是手续费支付账号)
```json
unlocked >>>  approve_proposal else "1.8.7"  {"active_approvals_to_add":[],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":["SEER5vhLky3Yg7YLAnvrFa2twftUCxZ8zz8PHtyCVTKSWw4JzAM7DY"],"key_approvals_to_remove":[]}  true
 approve_proposal else "1.8.7"  {"active_approvals_to_add":[],"active_approvals_to_remove":[],"owner_approvals_to_add":[],"owner_approvals_to_remove":[],"key_approvals_to_add":["SEER5vhLky3Yg7YLAnvrFa2twftUCxZ8zz8PHtyCVTKSWw4JzAM7DY"],"key_approvals_to_remove":[]}  true
{
  "ref_block_num": 63863,
  "ref_block_prefix": 1776902125,
  "expiration": "2018-10-25T06:46:33",
  "operations": [[
      20,{
        "fee": {
          "amount": 2000000,
          "asset_id": "1.3.0"
        },
        "fee_paying_account": "1.2.106",
        "proposal": "1.8.7",
        "active_approvals_to_add": [],
        "active_approvals_to_remove": [],
        "owner_approvals_to_add": [],
        "owner_approvals_to_remove": [],
        "key_approvals_to_add": [
          "SEER5vhLky3Yg7YLAnvrFa2twftUCxZ8zz8PHtyCVTKSWw4JzAM7DY"
        ],
        "key_approvals_to_remove": [],
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "204dfe3c8aa4ca73110d62403a576afc6d68ecf0f055b7e8b8991b887cc6c566c179f43ef566750cd3d237a99fa95d4a540ec32093ff4a46da7842fb1ff3c25f67",
    "2071ecf4f68338e96f9c00b6c713dc356191612ce5b88dd6a89945895222962d8541683d6f9845ad52efa93261d2266eab15a4ebfa6bfd470ac2a50d725d284a24"
  ]
}
```

修改完成，显示如下：

| 账户名/公钥 | 权重 | 操作 |
| - | - | - |
| *SEER5vhLky3Yg7YLAnvrFa2twftUCxZ8zz8PHtyCVTKSWw4JzAM7DY* | 1 |  移除 |
| SEER7koTVbyMKNyXuBSSeNSNVTiv1bn55D9dRsSiBe3yJqNJx2avxh | 1 | 移除 |