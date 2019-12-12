# 基于SEER-UI搭建一个自己的网页钱包DAPP

## I 前言

此指南将引导开发者基于SEER-UI 2.0搭建一个自己的网页钱包DAPP，包含服务器部署、环境搭建、代码修改（替换DAPP名字、LOGO等）、API节点部署等，对于专注于某一领域的DAPP，可以选择性禁用钱包中的某些功能，以提高页面资源的载入效率。
本教程将搭建一个基于SEER测试网络的网页钱包，开发者可以自行部署基于主网或其他石墨烯区块链的版本。
请遵守所在地法律法规，切勿将SEER-UI代码及区块链用于非法用途，否则一切后果自行承担。

## II 服务器部署和开发环境工具安装

### part 1 安装本地开发工具

1. 下载安装 VSC(visualstudio Code)：https://code.visualstudio.com 这是微软开发的一个编写Web和云应用的PC端源代码编辑器。
2. 下载安装nodejs：https://nodejs.org/download/release/v6.17.1/ 选择适合自己操作系统的node版本，windows下载`node-v6.17.1-x64.msi`即可，nodejs用于在本地将修改好代码的钱包源码build为页面资源，页面资源才是要部署到服务器的东西。
3. 下载安装git：https://git-scm.com/ 此工具用于从github拉取源代码。
4. 下载electerm：https://github.com/electerm/electerm/releases 这是一个开源免费的SSH连接服务器工具，用于EC2服务器管理，配置节点API。

### part 2 注册亚马逊云，并进行域名验证和EC2部署

您可以使用 `亚马逊云AWS` https://aws.amazon.com 或其它提供商提供的云计算服务和对象存储系统，这里我们使用AWS的`Amazon EC2`、`S3`和`CloudFront`为例。
**进阶了解**：`EC2`即Elastic Compute Cloud，弹性计算云，用于运行区块链数据节点提供API服务，`S3`即Simple Storage Service，是亚马逊云的简单存储服务，用来在AWS的全球存储区域网络存放钱包页面资源，`CloudFront`是亚马逊云的内容发布服务，即把页面资源部署到亚马逊云提供的存储服务后，当用户使用CloudFront URL来请求静态内容时，该服务就会根据发出请求的IP以及缓存这一内容的数据中心的位置来找到距离这个IP最近的边缘加速节点数据中心，这样所有来自于相同位置的请求就会减少延迟时间。全球任何一个地方的用户拉取您的DAPP页面资源速度更快，体验较好。

1. 注册AWS账户：https://portal.aws.amazon.com/billing/signup 在`付款信息`一页需要填入真实的信用卡信息，用于账户验证，此后的支持计划选免费的即可，AWS许多资源都是免费的，超量使用了资源才会收取费用，例如此指南中示例的1核1G ubuntu 18.04 EC2和5G以内S3、CloudFront存储都是免费用12个月。

完成以后可以登录控制台：https://console.aws.amazon.com/ 在控制台右上角显示的默认区域是`俄亥俄`，点击以切换为`新加坡`等其他想要的区域。

2. 因为您可能需要为EC2、S3绑定自己的域名，所以建议先进行耗时较长的域名验证以方便之后的步骤流畅部署。为此域名申请证书：https://cconsole.aws.amazon.com/acm 

    a. 首先点击右上角区域，切换为`弗吉尼亚北部`。只有此区域申请的证书可以与稍后的`CloudFront`联合使用。
    
    b. 点击`请求证书`- `请求公有证书`,点击`请求证书`,`添加域名`中输入您的域名，这里可以点击添加，为证书指定多个可能要用的域名，`下一步`，`DNS 验证`，`下一步`，`审核`，`确认并请求`。
    c. 点击`验证`-`域`下方的`▶`，展开ACM验证内容，将 CNAME 记录添加到域的 DNS 配置中（DNS配置方式见part3）。例如显示的`_30a086xxxxxxxx3c4448f11ad7.wallet.example.org.`中，仅需要将前面的`_30a086xxxxxxxx3c4448f11ad7.wallet`填入域名DNS的`子域名`中，`记录类型`选择`CNAME`，`IP地址/目标主机`填写ACM验证内容中的值，例如`_b985b312234xxxxxxxf20dfdb.mzlfeqexyx.acm-validations.aws`保存cname后需要等待一段时间，生效以后ACM才能自动进行验证。
    d. 验证完成以后，状态会变更为`已颁发`，证书就可以使用了。现在，您可以将区域切换为您想用的其他区域。

    **进阶了解**：wallet.example.org、www.example.org为子域名，example.org为根域名。若您的钱包直接使用根域名：example.org的形式，则以上步骤中仅需要在子域名中填写`_30a086xxxxxxxx3c4448f11ad7`用于验证，这样ACM访问`_30a086xxxxxxxx3c4448f11ad7.example.org`只要能获取到`_b985b312234xxxxxxxf20dfdb.mzlfeqexyx.acm-validations.aws`值就能证明您拥有此域名。

3. 然后我们部署一个EC2，用于之后的数据节点API部署，点击左上角`服务`-`计算`-`EC2`，打开`EC2控制台`，根据你在右上角选择的区域，可以在该区域部署`Amazon EC2 `服务器资源。如果您在亚太地区，可以选择`新加坡`。

    a. 点击`启动实例`，服务器将被部署到您右上角指定区域的数据中心，`步骤 1 选择AMI`-`快速启动`中选择`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type`，`步骤 2 选择一个实例类型`中，根据您的需求选择实例类型，若选择带有`符合条件的免费套餐`的`t2.micro`类型，则可以享受一年的免费使用。
    **进阶配置**：用于SEER API的节点服务器，无需太高的vCPU配置，最低1核即可，内存配置根据节点要启用的插件（例如txid记录、交易历史记录等数据规模）目前需要1-4GiB不等的内存配置，而网络性能则根据预计的并发链接数量来选择，若此服务器要提供支持较多人同时并发连接的API服务，则需要选择`网络性能`为中等、高甚至更高配置的实例类型，例如您的API预计为高并发，建议使用2核4G，网络效率为`高达5G`的`t3a.medium`服务器。

    b. `步骤3 配置实例`目前按默认即可，`步骤4 添加存储`中可以将大小改为30GiB都是免费的，目前够用，也可以根据后期需求增加，其它设置默认，`步骤 5 添加标签`可以为这个EC2指定标签，方便你后面知道它的用途，`步骤 6 配置安全组`比较重要，如果仅用于测试，则添加一个`类型`为`所有流量`,`来源`为`所有位置`的规则，这样外部访问服务器就不会受限。
    **进阶配置**：安全组是指定服务器可以被外部访问的端口，默认只有一个`22`入站规则，这是用于SSH终端连接服务器的，供http/https访问的话需要添加规则然后选择对应的规则，服务器才能绑定域名，如果仅是测试则添加所有流量所有位置的规则即可，出于安全考虑，在有安全考虑的生产环境中可以仅开放22、80和443端口，其他请求以反向代理的形式分发。

    c. 以上设置完成以后，点击右下角`审核和启动`，在`步骤 7 核查实例启动`页面点击右下角`启动`，在`选择现有密钥对或创建新密钥对`弹窗中，下拉选择`创建新密钥对`，设置`密钥对名称`例如`test`，然后点击`下载密钥对`，将`test.pem`下载到本地，此后您远程登陆此EC2需要此密钥文件。完成后点击`启动实例`，启动好以后，您可以点击`查看实例`跳转到实例列表页面。

    d. 此时您还可能需要修改此实例的安全组，在实例列表页面选中实例后，下面描述窗口中分别查看`入站规则`和`出站规则`，是否分别都有端口为`全部`、目标为`0.0.0.0/0`的规则，若缺少，则在EC2控制台左边菜单-`网络与安全`-`安全组`中勾选`launch-wizard-1`，然后点击`操作`-`编辑入站/出站规则`，添加`类型`为`所有流量`,`来源`为`所有位置`的规则。

    e. 实例列表页面中，`IPv4公有IP`是您在SSH远程连接服务器核解析域名时需要的此服务器IP，您可以用windows自带的记事本工具打开此前下载的`test.pem`文件，里面的内容即您的服务器登陆私钥。AWS EC2默认的用户名登陆名是ubuntu。有了IP、用户名、私钥，我们就可以用electerm远程登陆服务器了。

    f. 打开`本章part 1`中下载安装的`electerm`，点击左边菜单列表中的`齿轮图标（设置）`-`书签`-`新建书签`，`主机地址`填入您的AWS EC2的IP，`用户名`填入ubuntu，点击`私匙`，粘贴`test.pem`文件中的内容。点击最下方的保存并连接即可连接到此EC2服务器。

    服务器连接成功后，会显示如下页面：

    ```
    Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-1051-aws x86_64)
    * Documentation:  https://help.ubuntu.com
    * Management:     https://landscape.canonical.com
    * Support:        https://ubuntu.com/advantage
    System information as of Tue Dec  3 17:07:08 UTC 2019
    System load:  0.29              Processes:           105
    Usage of /:   3.6% of 29.02GB   Users logged in:     0
    Memory usage: 16%               IP address for ens5: 172.31.37.161
    Swap usage:   0%
    0 packages can be updated.
    0 updates are security updates.

    The programs included with the Ubuntu system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.
    Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
    applicable law.
    To run a command as administrator (user "root"), use "sudo <command>".
    See "man sudo_root" for details.

    ubuntu@ip-172-31-37-11:~$
    ```

4. 进入您的域名DNS管理面板，在域名DNS的`子域名记录`中填入您的子域名，例如`api`，`记录类型`选择`A`，`IP地址/目标主机`填写`第II章part2-2`部署上一步中生成的，也是远程连接服务器时使用的服务器IP地址。保存设置，等待DNS生效。域名DNS设置方法请参考本章part3-2中的方法。

5. 部署S3、CloudFront的步骤将在第V章中介绍。

### part3 域名注册和域名解析（DNS设置）

在此，我们以dynadot.com 为例介绍如何设置域名DNS，以解析域名到云服务。

进入https://www.dynadot.com `登陆`或`注册`。

1. 如果已有域名跳过此步骤，如果需要注册新域名，点击右上角`域名`-`搜索`，输入您要用的域名搜索，如果可用，`加购物车`，点击右上角`购物车图标`-`view cart`，在购物车页面选择注册时限，最好时间长一点并且设置闹钟，万一忘了续费域名是会被删除的。设好以后点击`check out`。`Payment Method`可以选择paypal之类的付款方式，如果将右上角计费方式选为CNY，还可以使用支付宝和微信付款，点击`submit order`，会生成付款链接，点击弹出二维码，扫描付款即可。

2. 如果已有域名，在https://www.dynadot.com/zh/account/ 页点击`我的域名`-`管理域名`，点击`DNS设置`下方的链接（可能显示`域名停靠`或`Dynadot DNS:XXX`），进入DNS设置页，新域名默认会显示`域名停靠`，点击下拉菜单，选择`自定义DNS`。

    a. `域名记录（必填）`中，是example.com的记录，最常用的是`A`记录类型，将记录类型选为`A`，`IP地址/目标主机`填写您的服务器IP即可将example.com指向您的服务器，再在服务器进行nginx或apache配置等即可实现网站访问；
    b. 如果要将根域名指向AWS CloudFront等，则在 `域名记录（必填）`中，将记录类型选为`CNAME`，`IP地址/目标主机`填写AWS分配的域名，即可实现自定义域名；
    c. 在这里还可以填入MX进行邮箱配置，TXT进行域名验证等操作；
    d. `子域名记录（可选）`中是填入您要用的子域名，例如www.example.com，wallet.example.com便是子域名，将`www`或`wallet`填入`子域名`一栏，将记录类型选为`A`，`IP地址/目标主机`填写您的服务器IP即可将*.example.com指向您的服务器；
    e. 在申请证书之类的域名验证场景中，可以根据是否有子域名来决定填写什么样的信息到`子域名`一栏；
    f. 子域名指向AWS CloudFront等服务也是使用`CNAME`记录，操作方式和根域名一致，只是前面加了子域名而已。
    g. 配置完成后点击`保存DNS`，等待生效即可，生效时间需要几分钟到几十分钟不等。

以上，服务器部署准备工作完成。

## III 部署一个区块链全节点并设置为API节点

搭建一个公共SEER API节点，你需要一台linux服务器、设置一个指向该服务器的域名或二级域名、架设见证人全节点、配置nginx等。

### part1 架设见证人全节点

由于在第II章part2-3中已经完成服务器部署，并了解了electerm链接服务器的方法，现在我们直接进入服务器，进行区块链全节点部署。

1. 连接服务器，在`ubuntu@ip-172-31-37-11:~$`后输入：`sudo -i`，按`Enter`键，切换为`root`用户；

2. 在`root@ip-172-31-37-11:~$`后输入如下代码：

```
mkdir seer
curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.08/seer-ubuntu.0.0.8.tar.gz
cd seer
tar xzvf seer.tar.gz
```

按`Enter`键，在root目录下新建一个名叫seer的目录，复制v0.0.8版本的程序包到此目录，并更名、解压；

3. 在`root@ip-172-31-37-11:~/seer# `后输入`screen -S seer`，按`Enter`键，新建一个名叫seer的窗口并进入；

4. 在`root@ip-172-31-37-11:~/seer# `后输入如下代码：

```
./witness_node  --data-dir ./data --p2p-endpoint=0.0.0.0:1888 --rpc-endpoint=0.0.0.0:9090 --bucket-size=[300,900,1800,3600,14400,86400] --history-per-size=10000 --replay-blockchain
```

按`Enter`键，在窗口seer下启动节点，其中127.0.0.1:9090是设置是节点对外的Websocket RPC服务地址和端口。

5. 区块同步大约需要1小时到数小时不等的时间，我们现在可以按`ctrl`+`A`+`D`键隐藏窗口，之后要再打开运行有节点的Sreeen，则使用 `screen -r seer`，隐藏窗口的方法同上。之后当观察节点运行正常，显示3秒一个出块后，则表示节点启动成功。现在我们可以继续part2等其他步骤。

6. 当节点启动成功后，我们可以在服务器上使用以下代码安装wscat测试API是否正常：

```
apt update
apt install -y node-ws

```

按`Enter`键，安装wscat后，输入：`wscat -c ws://127.0.0.1:9090`进入wscat，然后输入请求：`{"jsonrpc": "2.0", "method": "get_chain_id", "params": [], "id": 1}`，按`Enter`键，成功的返回信息如下：

```
wscat -c ws://127.0.0.1:9090
connected (press CTRL+C to quit)
> {"jsonrpc": "2.0", "method": "get_chain_id", "params": [], "id": 1}
< {"id":1,"jsonrpc":"2.0","result":"cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"}
> 
```

使用`ctrl+C`退出wscat。

### part2 配置服务器nginx

前提是您已经在`第II章part2-4`部署EC2中完成了绑定域名。
nginx在服务器上负责反向代理、SSL等服务，如果要配置多节点负载均衡也是对nginx进行配置。

**安装nginx：**

```
apt update
apt install -y nginx
```

按`Enter`键确认。

**配置nginx：**

1. 在/etc/nginx/sites-available/目录新建一个名为apifile的nginx配置文件:

```
nano /etc/nginx/sites-available/apifile
```
按`Enter`键确认。

2. 用nano打开文件后，以下面内容为例，写入配置文件：

```
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
# api.example.org 修改为你的域名
        server_name api.example.org ;

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

修改完成后，使用`ctrl`+`O`-`ENTER`写入，`ctrl`+`X`退出nano。

3. 将apifile软链接到配置目录：

```
ln -s /etc/nginx/sites-available/apifile /etc/nginx/sites-enabled/
```

按`Enter`键确认。

4. 测试nginx配置是否有错：

```
nginx -t
```

按`Enter`键确认，如果有错根据提示修改。

5. 重新载入nginx：

```
systemctl reload nginx
```

此时，若配置正确，你可以使用wscat -c ws://api.example.org在任意联网设备测试成功。同时，ws://api.example.org已经可用于桌面版钱包、任何未使用HTTPS的网页钱包以及命令行钱包连接区块链网络。（api.example.org改为您的域名）

6. 若要在SEER主网网页钱包或任何采用了HTTPS协议的应用中使用此API，需要申请SSL证书，并对nginx进行更多配置。

### part3 申请并配置SSL证书和自动续期

SSL证书有很多种类，收费的和免费的都有，AWS也提供免费的ACM证书，这里推荐最简单的certbot一键注册免费证书并自动续期的服务。

1. 首先，添加certbot存储库：

```
add-apt-repository ppa:certbot/certbot
```

按`Enter`-`Enter`键确认。

2. 安装Certbot的Nginx软件包：

```
apt update
apt install -y python-certbot-nginx
```

按`Enter`键确认。

3. 使用Certbot自动完成SSL证书申请和配置，Certbot会自动修改你的nginx配置文件，替换api.example.org为你的API二级域名。

```
certbot --nginx -d api.example.org
```

按照英文的提示配置吧，有几个地方要填和选择，比如第一步输入邮箱等，其它有(A)gree的选择输入A，有(Y)es的选择输入Y即可，需要注意的是：

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

在这一步时，您可能会需要选择1，如果选择2的话，Certbot会自动修改你的nginx配置文件，所有的非SSL请求都会被自动转发到SSL，如果您希望同一个域名既能用于WS，例如命令行钱包，也能用于HTTPS的网页钱包等，则选1，否则选择2。

成功的话，会在最后看到如下提示：

```
Congratulations! You have successfully enabled https://api.example.org
```

4. 完成后，打开您之前创建的nginx配置文件:

```
nano /etc/nginx/sites-available/apifile
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

        server_name api.example.org;

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
    ssl_certificate /etc/letsencrypt/live/api.example.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.example.org/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

```

5. 设置certbot自动续约

```
certbot renew --dry-run
```

这一步是因为证书使用周期有限，需要设置certbot自动续约证书。

成功的话，会在最后看到如下提示：

```
Congratulations, all renewals succeeded. The following certs have been renewed:
```

至此，一个独立API节点就配置完成了。在https://wallet.seer.best/settings/access：设置-接入点页面点击添加 API 服务器节点，在ADDRESS一栏填入您的API地址并确认，即可在网页钱包中使用您的API来访问区块链网络。

您可以在SEER-UI源码`app/api/apiConfig.js`（见第IV章part2-2中介绍）中加入此API地址供用户使用。

## IV SEER-UI源码修改

请确认您已经安装了`II part1 `中提到的VSCode、git和nodejs，此处以windows为例，Mac和Linux下大同小异，在接下来的步骤中我们需要前述开发工具。

### part1 拉取SEER-UI源代码并部署依赖

1. 现在，打开VSCode。点击软件界面上方菜单中的`Terminal`-`New Terminal`，新建一个软件内置终端窗口，现在可以看到软件下方弹出了一个终端窗口，显示如下：

```
Windows PowerShell
版权所有 (C) Microsoft Corporation。保留所有权利。

尝试新的跨平台 PowerShell https://aka.ms/pscore6

PS C:\Users\name>
```

2. 选择您要存放代码的盘符和目录，例如要在`D盘`下新建一个`code`目录，并将代码放在里面，则输入:

```
D:
mkdir code
cd code
```

3. 使用git拉取项目源码，在终端中输入：

```
git clone https://github.com/seer-developer-community/Seer-UI-2.0.git
```

此步骤所需的时间取决于您的网速，大约需要几分钟到十几分钟不等，成功的返回信息如下：

```
PS D:\code> git clone https://github.com/seer-developer-community/Seer-UI-2.0.git
Cloning into 'Seer-UI-2.0'...
remote: Enumerating objects: 2239, done.
remote: Counting objects: 100% (2239/2239), done.
remote: Compressing objects: 100% (1170/1170), done.
remote: Total 2239 (delta 1087), reused 2192 (delta 1043), pack-reused 0
Receiving objects: 100% (2239/2239), 3.88 MiB | 42.00 KiB/s, done.
Resolving deltas: 100% (1087/1087), done.
```

4. 安装环境依赖：

```
cd Seer-UI-2.0
npm install
```

安装速度取决于您的所在地和国际网速，如果网络不好下载安装过程有可能持续几个小时，安装成功后会在最后一行看到类似这样的提示：

```
√ All packages installed (1411 packages installed from npm registry, 8 packages installed from git, used 4m(network 3m), speed 390.27kB/s, json 1208(3.32MB), tarball 75.51MB)
```

5. SEER-UI一直基于`nodejs v6.17.1`本地环境迭代开发，如果node版本过高可能引起报错，如果在此环节出现报错，请降低node版本再试。启动开发环境：

```
npm start
```

成功的话，会在开头和末尾看到如下提示：

```
Listening at http://localhost:/9080
......
webpack: Compiled successfully.
```

现在在浏览器中输入 http://localhost:/9080 即可看到运行在您本地的开发模式网页钱包，在此模式中，您对源代码的任何修改都将刷新开发服务端，在本地网页钱包中立即呈现效果，以方便您进行代码调试。

### part2 修改网页钱包代码

1. 在VScode中打开项目文件：点击VScode顶部菜单中的`File`-`Open Folder`，选中您本地的`Seer-UI-2.0`目录，即可在VScode左边列表中看到本项目的目录列表。

2. 修改`app/api/apiConfig.js`，可以修改默认API节点和节点列表。

    第64行：DEFAULT_WS_NODE:参数为默认节点；下方的url:和location:分别为API节点地址和前端显示的节点地区。您需要将默认节点替换为之后部署API节点步骤中您自己部署的API节点。
    
    第74行DEFAULT_FAUCET:中的地址为水龙头地址，可以获得注册用户的网络手续费奖励，您可以参考这篇文档配置一个水龙头，然后将此链接替换为自己的：https://docs.seerchain.org/#/zh-Hans/tools?id=配置SEER水龙头服务 

3. 修改`app/lib/chain/chainIds.js`，可以设置钱包连接的是主网还是测试网络。

    MAIN_NET参数为"cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"时，钱包为主网，参数为"3e9a3a68b9924f02d4bc60ede22375e926489429a1fbe7630a24d7f62c8bb13d"时，钱包为测试网络。

4. 修改替换`app/assets/`下的以下文件，可以实现修改logo、网页显示名称、浏览器图标等。

    a. 修改替换`logo-full.png`可以更换钱包图标，图片格式应为透明png，1045*390px;
    b. 修改替换`logo-ico-blue.png`可以更换仅单独出现的logo图标，图片格式应为透明png，50*66px；
    c. 修改替换`favicon.ico`可以更换浏览器书签等处出现的小型logo，使用ICO制作工具载入`logo-ico-blue.png`制作，例如：http://www.bitbug.net/ 。
    d. 修改`index.html`第9行<title>标签内的文字（当前为SEER）可以修改钱包显示在网页中的名称。

5. 修改`app/components/Layout`下的以下文件，可以设置交易中心默认交易对、修改各导航栏上的按钮等。

    a. 修改`Header.jsx`第344行，`/market/SEER_USDT`为当前默认交易对，您可以自行修改，新用户初次进入交易中心时会默认进入此交易对，比如修改为`/market/SCP_SEER`则默认进入`SCP_SEER`交易对；
    b. 修改`HeaderNav.jsx`第347行，`/market/SEER_USDT`为当前默认交易对，您可以自行修改，新用户初次点击交易中心时会默认进入此交易对，比如修改为`/market/SCP_SEER`则默认进入`SCP_SEER`交易对；
    
    第470-494行，每个`<li></li>`标签对里面对应的是首页顶部的导航按钮，prediction：预测市场、exchange：交易中心、explorer：区块浏览器、wallet_manage：钱包管理、account_manage：账户管理，如果不想显示某个按钮，直接用`{/*  */}`注释标签包裹住对应的`<li></li>`标签对即可。
    示例，不显示预测市场按钮：

    ```
    {/*<li>
        <a style={{flexFlow: "row"}} className={cnames((active === "/" || active.indexOf("prediction") !== -1) ? null : "column-hide-xs", {active: (active.indexOf("prediction") !== -1 || active === "/")})} onClick={this._onNavigate.bind(this, "/prediction")}>
        <Translate className="column-hide-small" component="span" content="header.prediction" />
        </a>
    </li>*/}
    ```

    第506-512行为`创建房间`按钮，不需要的话参考上面的方法用`{/*  */}`注释标签包裹住这几行即可。

6. 修改`app/stores/SettingsStore.js`，可以修改交易中心右侧市场名和交易对资产列表。

    修改173行中的参数，可以在顶部`SEER`、`USDT`一栏中添加新的交易市场（主资产），例如在`"USDT"`后面添加`,"SCP"`，即可建立`SCP`的主市场。
    修改164行中的参数，可以在币种列表中添加新的资产，例如在`"SEER"`后面添加`,"RMB"`，即可将`RMB`加入市场列表中。

    需要提醒的是，SEER链上默认只能使用自定义资产和SEER主资产之间的交易对，若要创建其他交易对，需要资产创建者账号在命令行钱包中使用`asset_create_market`操作才能让新的交易对可用。参考这篇文档：https://docs.seerchain.org/#/zh-Hans/cli?id=_9-asset_create_market
    

7. 修改`app/components/Account/AccountDashboard.jsx`，可以修改`账户管理`-`账户总览`中的概况内容。

    注释掉第608-639行，不再显示`抵押和保证金`表格；用`{/*  */}`注释掉第641-646行，不再显示`委单`表格。

8. 修改`app/components/Account/Account.jsx`，可以修改`账户管理`左边列表按钮。

    第55-140行，成对`{}`中的为菜单按钮和显示规则，不需要的可以用`/* */`注释掉。

9. 修改`app/Routes.jsx`，可以修改默认首页显示内容，现在的首页默认显示`预测市场`，您可以改为`流量众筹`或`交易中心`。

    第40行，`components/Explorer/HousesIndex`、44行`components/Dashboard/DashboardContainer`都表示`预测市场`的页面路由，例如若要改成`交易中心`则替换为`components/Explorer/MarketsContainer`，即和下方代码中`markets`的路由一致。

    您可以通过以上设置来决定您的钱包要提供的主要功能，例如：禁用掉`预测市场`、`流量众筹`，`创建房间`，以及`账户管理`中的`待解冻余额`、`资产管理`、`我的预测`、`我的保证金`、`我的预言机`、`我的见证人`、`投票`、`消息签名`、`黑白名单`按钮以及`账户管理`-`账户总览`中的`抵押和保证金`，可以让钱包成为主要提供链上资产兑换的平台，方便用户将获得的UIA兑换为SEER来作为交易手续费。又例如：禁用掉`交易中心`以及`账户管理`-`账户总览`中的`委单`，以适应法律禁止数字资产交易的地区用户合规使用。

修改完成后，可以在本地钱包中查看钱包效果。若没有问题，可以进入编译环节，将钱包编译为页面资源文件，然后部署到S3。如果您要搭建自己的API节点，可以在API搭建完成后修改`apiConfig.js`以后再编译部署。

### part3 编译钱包文件

在terminal终端的seer-ui-2.0目录下使用以下指令，进行钱包编译：

```
c:
cd code/seer-ui-2.0
npm run build
```

编译完成后，可以在`seer-ui-2.0/build/dist`目录下看到编译完成的钱包网页资源。现在我们可以将此目录下所有文件上传到S3。

## V 部署钱包页面资源到S3，启用CloudFront

1. 首先，我们部署一个S3，用于之后的存储部署好的钱包页面资源，点击左上角`服务`-`存储`-`S3`，打开`S3存储桶`，点击`创建存储桶`。

    a. 在`名称和区域`页，`存储桶名称`中输入您要建立的钱包域名或二级域名，`区域`选择您想存放此资源的数据中心位置，`下一步`，配置选项默认即可，也可以根据需求修改，在`设置权限`中，取消勾选`阻止全部公共访问权限`，这样页面资源才能被公网用户访问，`下一步`，点击`创建存储桶`。
    b. 完成后，在`S3存储桶`首页列表中，可以看到您创建的存储桶，点击进入，点击`属性`-`静态网站托管`-`使用此存储桶托管网站`，`索引文档`、`错误文档`全部填入`index.html`,`保存`。

    c. 点击`权限`-`存储桶策略`，在编辑器中填入：
    
    ```
    { "Version": "2012-10-17", "Statement": [ { "Sid": "PublicReadForGetBucketObjects", "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::you-bucket-name/*" } ] }
    ```
    
    将上面的`aws:s3:::wallet.exemple.com`修改为此页面中显示的您的存储桶名。`保存`。
    
    d. 点击`权限`-`CORS配置`，在编辑器中填入：

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
    </CORSRule>
    </CORSConfiguration>
    ```
    
    `保存`。

    e. 此时已可以上传静态页面资源，点击此存储桶`概述`中的`上传`，全选页面资源根目录`seer-ui-2.0/build/dist`下所有文件进入`上传`页，然后点击`下一步`，在`设置权限`-`管理公共权限`中选择`为此对象授予公共读取访问权限`，`下一步`，`存储类别`选择`标准`即可，`下一步`，`上传`。
   
    d. 此时，您上传的页面已经可以通过外部访问，`属性`-`静态网站托管`，`终端节点`中显示的链接即页面资源通过外部访问的链接。但S3中的资源现在还只能用AWS提供的域名访问，如果要用您自己的域名来访问，需要对域名DNS设置CNAME解析到`使用此存储桶托管网站`中，而且根据您选择的数据中心区域和访问者所在地网络政策，此链接也可能在部分地区无法访问或访问速度较慢，所以我们还需要为此存储桶启用CloudFront进行全球内容发布服务。

5. 为此S3存储桶启用CloudFront，点击左上角`服务`-`联网和内容分发存储`-`CloudFront`，打开`CloudFront 分配`，点击`创建分配`。

    a. `选择内容分发方式`中选择 `web - 入门`，`创建分配`中，`源域名`下拉菜单中选择您的S3存储桶名称，`默认根对象`中填入`index.html`，`备用域名(CNAMEs)`中填入您的域名（前提是已预先在第`第II章 part2-2`中成功申请证书），`SSL 证书`选择`自定义 SSL 证书 (example.com)`，并在下方输入框中下拉菜单选择`第II章 part2-2`中申请的证书。其它默认即可，点击`创建分配`。此时，`CloudFront 分配`页面已经出现您设置的新分配，并且分配了一个`*.cloudfront.net`的域名，使用此域名在浏览器打开，AWS会自动根据请求的来源来选择最近的数据中心。
    b. 现在我们绑定域名，进入您的域名DNS管理面板，在域名DNS的`子域名记录`中填入您的子域名，`记录类型`选择`CNAME`，`IP地址/目标主机`填写上一步中生成的`*.cloudfront.net`域名。如果您使用根域名，则仅需要在`域名记录`中`记录类型`选择`CNAME`，`IP地址/目标主机`填写上一步中生成的`*.cloudfront.net`即可。（DNS配置方式见第II章 part3），设置完成后，会需要等待DNS生效，生效后，访问您的域名，便不再提示`无法访问此网站`,而是进入了和`*.cloudfront.net`相同的页面，配置成功。
    c. 此时在`CloudFront 分配`列表中已经可以看到您新创建的分配，点击其ID进入，然后点击`错误页`-`创建自定义错误响应`，`HTTP 错误代码`选择`403 禁止`, `错误缓存最小 TTL`设为0，`自定义错误响应`选择是，然后在`响应页面路径`中填入`/index.html`，`HTTP 响应代码`选择`200 确定`。然后点击`创建`，完成配置。
    d. 需要提醒的是CloudFront的每次修改都会需要同步到全球所有数据中心，所以需要一定的时间，修改以后没有立即生效不要急，等几分钟就好了。


生效后，您可以使用您的域名在浏览器中打开，至此，一个配置好全球内容分发的网页钱包已经配置完成。若有疑问请在SEER开发者社区寻求技术支持：https://forum.seerchain.org/t/topic/663

