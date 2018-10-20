## Seer-ui主网改测试网络操作指南

https://github.com/seer-project/Seer-UI 提供了一个自己搭建SEERUI的指南，用户可以自己在MAC或LINUX环境下搭建网页钱包开发环境，或编译网页和桌面钱包。

按照该教程搭建的钱包为SEER主网钱包，采用了SEER主网链号和主网API、以及主网注册水龙头。若开发者需要搭建一个测试网络钱包，需要对前述几个参数进行修改。

`主网链号（chain-id）`："cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"；

`主网API`："wss://www.seertalk.org","wss://www.seerapi.org"；

`主网水龙头（faucet）`："https://www.seerapi.com"；

`测试网链号（chain-id）`："da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf"；

`测试网API`： "ws://192.144.171.138:8002"；

`社区提供的测试网水龙头（faucet）`："http://faucet.seerchain.org"。(配置SEER水龙头服务:https://github.com/akirasen/seerdocs/blob/master/zh-Hans/tools.md#%E9%85%8D%E7%BD%AEseer%E6%B0%B4%E9%BE%99%E5%A4%B4%E6%9C%8D%E5%8A%A1)

需要修改的文件包括：`Seer-ui/app/api/apiConfig.js`、`Seer-ui/app/lib/chain/chainIds.js`;

若您已经布置过主网的开发环境，还需要修改以下两个文件：`Seer-ui/node_modules/seerjs-ws/es/src/ChainConfig.js`、`Seer-ui/node_modules/seerjs-ws/lib/src/ChainConfig.js`。

### 简明SEER-UI全新部署流程示例

详细操作步骤参考：https://github.com/seer-project/Seer-UI

1、将以下命令复制到终端中执行即可安装 NVM。
```linux
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
nvm install v6
nvm use v6
```
2、Node 安装完成后，获取项目的源代码：
```linux
screen -S Seer-ui
git clone https://github.com/seer-project/Seer-ui.git
cd Seer-ui
```
3、修改接入配置文件：
```linux
nano app/api/apiConfig.js
```
第44-51行：
```jsx
    DEFAULT_WS_NODE: "wss://www.seertalk.org",
    WS_NODE_LIST: [
        {url: "wss://www.seertalk.org", location: {translate: "settings.api_closest"}},
        {url: "wss://www.seerapi.org", location: "China"}
    ],
    DEFAULT_FAUCET: "https://www.seerapi.com",
    TESTNET_FAUCET: "http://106.14.75.91"
};
```
改为：
```jsx
    DEFAULT_WS_NODE: "ws://192.144.171.138:8002",
    WS_NODE_LIST: [
        {url: "ws://192.144.171.138:8002", location: {translate: "settings.api_closest"}},
        {url: "ws://192.144.171.138:8002", location: "China"}
    ],
    DEFAULT_FAUCET: "http://faucet.seerchain.org",
    TESTNET_FAUCET: "http://faucet.seerchain.org"
};
```
修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

4、修改链号：
```linux
nano app/lib/chain/chainIds.js
```
```jsx
export default {
    //MAIN_NET: "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8",
    MAIN_NET: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91",//main net
   // MAIN_NET: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf",//test net
    TEST_NET: "3e9a3a68b9924f02d4bc60ede22375e926489429a1fbe7630a24d7f62c8bb13d"
    //TEST_NET: "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
};
```
改为：
```jsx
export default {
    //MAIN_NET: "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8",
    //MAIN_NET: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91",//main net
    MAIN_NET: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf",//test net
    TEST_NET: "3e9a3a68b9924f02d4bc60ede22375e926489429a1fbe7630a24d7f62c8bb13d"
    //TEST_NET: "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
};
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

5、在启动之前，需要先安装 npm 软件包：
```linux
npm install
```

6、所有软件包安装好后，可以使用以下命令启动开发服务器：
```linux
npm start
```

7、编译完成后，即可通过浏览器访问 localhost:9080 或 127.0.0.1:9080 打开钱包。


### 非全新安装部署流程

若您曾经在此设备上部署过`主网SEER-UI`，则需要修改以下`4个`文件：

1、首先进入`Seer-ui`目录：

```linux
cd Seer-ui
```

2、修改链号：

```linux
nano app/lib/chain/chainIds.js
```
```jsx
export default {
    //MAIN_NET: "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8",
    MAIN_NET: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91",//main net
   // MAIN_NET: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf",//test net
    TEST_NET: "3e9a3a68b9924f02d4bc60ede22375e926489429a1fbe7630a24d7f62c8bb13d"
    //TEST_NET: "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
};
```
改为：
```jsx
export default {
    //MAIN_NET: "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8",
    //MAIN_NET: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91",//main net
    MAIN_NET: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf",//test net
    TEST_NET: "3e9a3a68b9924f02d4bc60ede22375e926489429a1fbe7630a24d7f62c8bb13d"
    //TEST_NET: "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"
};
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

```linux
nano node_modules/seerjs-ws/es/src/ChainConfig.js
```
第13-19行：
```jsx
networks: {
    SEER: {
        core_asset: "SEER",
        address_prefix: "SEER",
        chain_id: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"
    }
},
```
改为：
```jsx
 networks: {
     SEER: {
         core_asset: "SEER",
         address_prefix: "SEER",
        // chain_id: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"
         chain_id: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf"
     }
 },
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

```linux
nano node_modules/seerjs-ws/lib/src/ChainConfig.js
```
第13-19行：
```jsx
networks: {
    SEER: {
        core_asset: "SEER",
        address_prefix: "SEER",
        chain_id: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"
    }
},
```
改为：
```jsx
 networks: {
     SEER: {
         core_asset: "SEER",
         address_prefix: "SEER",
        // chain_id: "cea4fdf4f5c2278f139b22e782b308928f04008b0fc2c79970a58974a2a28f91"
         chain_id: "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf"
     }
 },
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

```linux
nano app/api/apiConfig.js
```
3、修改接入配置文件：

第44-51行：
```jsx
    DEFAULT_WS_NODE: "wss://www.seertalk.org",
    WS_NODE_LIST: [
        {url: "wss://www.seertalk.org", location: {translate: "settings.api_closest"}},
        {url: "wss://www.seerapi.org", location: "China"}
    ],
    DEFAULT_FAUCET: "https://www.seerapi.com",
    TESTNET_FAUCET: "http://106.14.75.91"
};
```
改为：
```jsx
    DEFAULT_WS_NODE: "ws://192.144.171.138:8002",
    WS_NODE_LIST: [
        {url: "ws://192.144.171.138:8002", location: {translate: "settings.api_closest"}},
        {url: "ws://192.144.171.138:8002", location: "China"}
    ],
    DEFAULT_FAUCET: "http://faucet.seerchain.org",
    TESTNET_FAUCET: "http://faucet.seerchain.org"
};
```

修改完成后使用`Control` + `o` `enter`保存修改，`Control` + `x`退出。

4、此时开发模式的钱包会自动刷新，您需要`shift`+`F5`或`shift`+`control`+`R`刷新钱包页面，或清空缓存重新打开。若还是不行，请重新全新安装钱包。
