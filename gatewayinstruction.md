# Guide to add SEER gateway access for exchanges and third-party platforms

The main purpose of this guide is to help exchanges and other third-party platforms (including but not limited to non-SEER DAPPs applications, centralized applications, etc.) to build a gateway to the SEER main network, list SEER main asset and tokens based on the SEER blockchain, such as PFC, OPC, etc.
Using SEER main network for charging and other operations, and the handling fee is far lower than SEER's ERC-20token and BTS asset, not affected by events such as Ethereum congestion.

## Fundamental

Gateway (deposits and withdrawals) used by most exchanges and third-party platforms is a centralized application service.
Taking the exchange as an example, the exchange provides a platform id for each user. Any user transfers money to the SEER main network account of the exchange and fills in the id in MEMO. When the SEER main network account of the exchange receives a transfer, the user can be credited according to the information filled in the MEMO, so that the user can be credited in the exchange platform.

## Ready to work

### Operating environment

The recommended server configuration is: 2vCPUs 4G memory 20G or more hard disk, Ubuntu 16.04.4 x64 system.

### Get account and private key

#### Register an account

Register the account through the SEER web wallet https://wallet.seer.best, where the account with the bar or number in the account is a common account name, which can be registered directly for free, such as `seer-exchange` or `seerdex01` and composed of pure English letters. The account name is the advanced user name, such as seerdex, needing to register through a lifetime membership account to pay the registration fee.

#### Get the private key

In the function of gateway, we need at least two pairs of keys of the account, namely the current active key and the current memo key. The active key allows you to transfer funds and other on-chain operation rights, and the memo key allows you to generate and read MEMO information associated with the account. <a href="https://docs.seerchain.org/#/zh-Hans/?id=%E6%9F%A5%E7%9C%8B%E6%82%A8%E7%9A%84%E7%A7%81%E9%92%A5">Click here to find out how to get the private key. </a> 。

## Configure a SEER full node

1、Create a new window called seer on the server；

```linux
screen -S seer
```

2、 Create a new directory named seer in the root directory, download the `v0.0.5 version` of the package to this directory, and rename it to `seer.tar.gz`. (Please go to the SEER Software Release page at https://github.com/seer-project/seer-core-package/releases and copy the latest ubuntu version package link to replace this download link.) 


```linux
 mkdir seer 
 curl -Lo seer/seer.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.05/witness_node-ubuntu-0.0.5.tar.gz
```

3、 Enter the seer directory and extract the package.

```linux
 cd seer tar xzvf seer.tar.gz 
```
 
4、 Start `the witness_node` with the websocket parameter:

```linux
 witness_node --rpc-endpoint=127.0.0.1:9090 partial-operations=true --track-account="\"seerdex-withdraw\"" --track-account="\"seerdex-deposit\"" max-ops-per-account=1000 
```

The` --rpc-endpoint` parameter is the websocket RPC IP address and port number of node monitor. You need to replace it. Here, `127.0.0.1` is the local machine, and `9090` is the WS port specified for the node.

For the node handling the deposit service, we do not need to save all the data, only need to save the account data related to the exchange account to save memory expenses, so we need to set the partial-operations parameter and the` --track-account `parameter, here Partial-operations=true means that only part of the data is needed. `"\"seerdex-withdraw\"" `and `"\"seerdex-deposit\""` indicate one or more account ids to be tracked, which you need to replace.

The` --max-ops-per-account `parameter sets the number of operation records for the reserved account in memory. Here, 1000 indicates that 1000 operation records of the tracking account are retained, and you need to fill in as required.

5、 After the observation node runs normally, ctrl+A d hides the screen and disconnects the server. After opening Sreeen with nodes, use screen -R or screen -r seer. 

After the node starts normally,it will display a blockout message of 3 seconds as shown below. 

![Node normal startup state](https://github.com/akirasen/seerdocs/raw/master/zh-Hans/img/640.gif)

If you want to close the node, use control + C.
 

## Configure a SEER command line wallet

0、Reminder: Usually, there are two files `witness_node` and `cli_wallet` in the latest release package downloaded when you deploying the full node, so this step can be ignored, but it is possible to upgrade `witness_node` only when updating, so there may be no `cli wallet` in the latest release package (for example, `v0.0.5` named `witness_node-ubuntu-0.0.5.tar.gz`, in the package only `witness_node`, it is necessary to obtain `cli_wallet` in the last complete package for the next steps.)

The function of the following command is to create a temporary directory named `temp`, download the latest release package with `cli_wallet`, decompress it, and then copy `cli_wallet` to the SEER directory. (Download link replaced with https://github.com/seer-project/seer-core-package/releases latest package with `cli_wallet`)

```linux
cd~
mkdir temp
curl -Lo temp/temp.tar.gz https://github.com/seer-project/seer-core-package/releases/download/v0.04/seer-ubuntu-0.0.4.tar.gz 
cd temp
tar xzvf temp.tar.gz
cp cli_wallet ../seer/cli_wallet
```

1、 Create a new window named cli on the server and run the command line wallet program in the seer directory.

```linux
 screen -S cli cd~ seer/cli_wallet -s ws://127.0.0.1:9090 -r 127.0.0.1:9191 -H 127.0.0.1:9192 
```

The` -s parameter` can set the node api address and port to be connected. Here` ws://127.0.0.1:9090` is the websocket RPC address and port of the local node running in the previous step. You can also use LAN or other public api addresses in the network, but there is a risk that the command line wallet will exit abnormally due to the inability of the external api to provide services;

The -r parameter can be used to set the websocket RPC address and port to be monitored by the command line wallet. Here, it is set to` 127.0.0.1:9191`. The program responsible for deposit service can use this port to invoke the command line wallet to operate.

The -H parameter can be used to set the Http-RPC address and port to be monitored by the command line wallet. Here, it is set to` 127.0.0.1:9192`. The program responsible for deposit service can also use this port to invoke the command line wallet.

2、 After the wallet is successfully launched, it will display:
First set the wallet unlock password, 123 to replace the password you want to set

```linux
 set_password 123 
```
 
Unlock the wallet

```linux
 unlock 123 
```
 
Import account capital private key and note private key

```linux
 import_key seerdex-withdraw 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ 
import_key seerdex-withdraw 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd 
```

The display is as follows:

```linux
 new >>> set_password 123 
set_password 123 
null 
locked >>> unlock 123 
unlock 123 
null 
unlocked >>> import_key seerdex-withdraw  5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ import_key seerdex-withdraw 5JkbV8aTaYRVaarTUJQ9Y56cr4QajxNFfCoQj6Q9JFL8XvUZ5CQ
3572083ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json 3572084ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1cd0784e.wallet
true
unlocked >>> import_key seerdex-withdraw  5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd import_key seerdex-withdraw 5KiSC6rRAEkTj72fg3G3zF8RHmCEgZw7aSXBjKqDfvY2XN1qvyd 3572941ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to before-import-key-1bece5d8.wallet 3573189ms th_a       wallet.cpp:793                save_wallet_file     ] saving wallet to file wallet.json 3573191ms th_a       wallet.cpp:467                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-1bece5d8.wallet 
true 
unlocked >>> 
```

## Access the command line wallet
The command line wallet can be accessed using Http-RPC or websocket RPC. Using the JSON-RPC remote call protocol to pass the appropriate instructions, and the command line wallet can be implemented relevant operation or return the required information.
The format is as follows (no actual line breaks without comment):

```linux
{ 
     "Jsonrpc"  :  Two , / / definition JSON-RPC version "Method"  :  "Get_block" , / / name of the method, such as transfer, list the account balance list_account_balances, where get_block is to return block information of instruction block number "Params"  :  [ 1 ], / / parameter from the method, if no parameter is Null Here, 1 means block number "Id"  :  1 / / call identifier }
```

### Http-RPC access example
You can use the curl command to test the Http-RPC connection command line wallet to get the balance of each asset in the specified account:

```linux
  curl http://127.0.0.1:9192 -d '{"jsonrpc": "2.0", "method": "list_account_balances", "params": ["seerdex-withdraw"], "id": 1}' {"id":1,"result":[{"amount":"7861151753754","asset_id":"1.3.0"},{"amount":97099800,"asset_id":"1.3.8"}]} 
```

### Websocket RPC access example
First install wscat on the server to test ws:

```linux
apt install node-ws
```
 
The test implements a transfer via the websocket RPC connection command line wallet

```linux
   wscat -c ws : // 127.0 . 0.1 : 9191 > { "jsonrpc" : "2.0" , "method" : "transfer" , "params" : [ "seerdex-withdraw" , "ffffff" , "500000" , "SEER" , "Welcome to SEERTALK. https://forum.seerchain.org" , true ], "id" : 1 } < { "id" : 1 , "jsonrpc" : "2.0" , "result" : { "ref_block_num" : 64292 , "ref_block_prefix" : 1517346144 , "expiration" : "2018-10-12T07:33:12" , "operations" : [[ 0 ,{ "fee" : { "amount" : 2136718 , "asset_id" : "1.3.0" }, "from" : "1.2.105" , "to" : "1.2.138" , "amount" : { "amount" : "50000000000" , "asset_id" : "1.3.0" }, "memo" : { "from" : "SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDANxsGNxH" , "to" : "SEER6QbqUZF6xzjdceVoLHS7K1KwvLyszVTZS8bbsQQQXcAm8L3aZp" , "nonce" : "4469110159915322318" , "message" : "482a7d070d298fe2a79d5f528f55778c62584d242274a7d697dae1ec63d7038b5a0b80dc9ba524e3f5f528bc717c60a635f89ff8af1cccbd1b4189f8ddc92e39" }, "extensions" : []}]], "extensions" : [], "signatures" : [ "204e8746aac14a05fb3c66ac653429dead34bddac58911c53346feb365f0c7b5767ea870c1e5da6a104d8364e42f504fc1bdcfc442652f5c2e9bb9b26a858b0ccd" ]}}
```

 
Switch back to the window where the command line wallet is located, and you can see the following information in the wallet:

```linux
   2230368ms th_a       websocket_api.cpp:109         on_message           ] API call execution time limit exceeded. method: transfer params: ["seerdex-withdraw","ffffff","500000","SEER","Welcome to SEERTALK. https://forum.seerchain.org",true] time: 2310335 
```

A wallet transfer was implemented.

## Common instructions
### get_dynamic_global_properties
Role: List the current global dynamic parameters of the chain
Example`: {"jsonrpc": "2.0", "method": "get_dynamic_global_properties", "params": [], "id": 1}`
Return information example:

```linux
  {
             "id" :  1 ,
             "result" :  {
                 "id" :  "2.1.0" ,
                 "head_block_number" :  3678309 , //the current block height "head_block_id" :  "00382065d1057b13415518f913ce26e46fe45cac" , / / the current block No. "time" :  "2018-10-12T16:37:30" , //Chain time (Greenwich time) "current_witness" :  "1.5.4" , //the witness of current block "next_maintenance_time" :  "2018-10-13T00:00:00" , // next update time "last_budget_time" :  "2018-10-12T00:00:00" , / / last maintenance time "witness_budget" : 3398400000 , / / the total budget this period witness "accounts_registered_this_interval" :  1 , / / account registration interval "recently_missed_count" :  0 , //number of most recent missing blocks "current_aslot" :  4762199 , //the total block (missing blocks and actual blocks) "recent_slots_filled" :  "340240787892099949526793007880921399231" , //for calculating the parameters of the degree of witness "dynamic_flags" :  0,
                 "last_irreversible_block_num" :  3678305 / / the most recent irreversible block number }}
```

The deposit service needs to pay attention to the current block height of `head_block_number`, and the last irreversible block number of `last_irreversible_block_num`, used to determine whether it is a trusted deposit operation and whether the withdrawal has been processed.

### info
Role: Display the status of the current Seer blockchain
Example:` {"jsonrpc": "2.0", "method": "info", "params": [], "id": 1}`
Return information example:

```linux
   { "Id" : 1,
          "Result" :
          {
              "head_block_num" : 3678258 , // the current block high "head_block_id" : "00382032d0bfee243b0c5f6b37e3fd6f29682e6e" , //the current block no. "head_block_age" : "0 second old" , / /the block generation time "next_maintenance_time" : "7 hours in the future" , //maintain update time "chain_id" : "da68a9c5f2fd9ed48e626ea301db1c77505523884ba0dd409e779246c6ea26cf" , //chain no. "participation" : "88.28125000000000000" , //block production participation rate "active_witnesses" : //active witness id [ "1.5.1" , "1.5.2" , "1.5.3" , "1.5.4" , "1.5.5" , "1.5.6" , "1.5.7" , "1.5.8" ],
              "active_committee_members" : //active members of the council id [ "1.4.0" , "1.4.1" , "1.4.2" , "1.4.3" , "1.4.4" , "1.4.5" , "1.4.6" , "1.4.7" ]
          }
      }
```

The deposit service needs to pay attention to `head_block_age -` last block generation time, and participation - block production participation rate. Determine whether the blockchain is running normally before the cash withdrawal operation.

### list_account_balances

Format: list_account_balances name
Parameters: name can be the account name, or the id of the account
Role: List each balance of account with id
Example:` {"jsonrpc": "2.0", "method": "list_account_balances", "params": ["abc"], "id": 1}`
Return information example:

```linux
  {
             "id" :  1 ,
             "result" :  [{
                 "amount" :  "7861177753754" , //balance, precision 5 , amount has no decimal point, its value is multiplied by the 10000 here is 78611777.53754
                 "asset_id" :  "1.3.0" //here the type of asset is SEER },  {
                 "amount" :  97099800 , //balance, precision 5 , amount has no decimal point, its value is multiplied by the 10000 
                 "asset_id" :  "1.3.8" //here the type of asset is ABC assets on test chain }]}
```

The deposit service needs to pay attention to whether the balance amount of `asset_id of 1.3.0` (ie SEER) is enough and paid for the network fee. If it involves the deposit service of other assets in the SEER chain, it is also necessary to pay attention to whether the balance of the corresponding assets is enough.

### transfer2
Format: transfer2 from to amount `asset_symbol` memo broadcast(true/false)
Parameters: from is the outgoing account, to is the receiving account, amount is the transfer amount, `asset_symbol` is the asset name, and memo is the remark. From/to can be a username or id, and the broadcast setting is broadcast.

Role: transfer
Example:` {"jsonrpc": "2.0", "method": "transfer2", "params": ["seerdex-withdraw","ffffff","500000","SEER","WelcometoSEERTALK.https://forum .seer cha in.org",true], "id": 1}`

Return information example:

```linux
 {
         "id" :  1 ,
         "jsonrpc" :  "2.0" ,
         "result" : [
             "7ab0e58b6391a770cb62f432e0f2aef93de4d18e" , //transaction id {
             "ref_block_num" : 64292 , //the referenced block number "ref_block_prefix" :  1517346144 , //the referenced block head "expiration" :  "2018-10-12t07:33:12" , // transaction expiration time "operations" :  [
                 [ 0 ,  { / / 0 means transaction "fee" :  { //handling fee "amount" :  2136718 , //amount , amount has no decimal point, its value is multiplied by the 10000 
                         "asset_id" :  "1.3.0" //here the asset means SEER },
                     "from" :  "1.2.105" , //out account id "to" :  "1.2.138" , //into account id "amount" :  {
                         "amount" :  "50000000000" , //the amount has no decimal point, its value is multiplied by the 10000 
                         "asset_id" :  "1.3.0" //here the asset means SEER },
                     "memo" :  { //memo related authority  "from" :  "SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDANxsGNxH" ,
                         "to" :  "SEER6QbqUZF6xzjdceVoLHS7K1KwvLyszVTZS8bbsQQQXcAm8L3aZp" ,
                         "nonce" :  "446911015991532231" ,
                         "message" :  "482a7d070d298fe2a79d5f528f55778c62584d242274a7d697dae1ec63d7038b5a0b80dc9ba524e3f5f528bc717c60a635f89ff8af1cccbd1b4189f8ddc92e39"
                     },
                     "extensions" :  []
                 }]
             ],
             "extensions" :  [],
             "signatures" :  [ "204e8746aac14a05fb3c66ac653429dead34bddac58911c53346feb365f0c7b5767ea870c1e5da6a104d8364e42f504fc1bdcfc442652f5c2e9bb9b26a858b0ccd" ]
             }
         ]}
```

The deposit business needs to pay attention to the first string of the returned information, that is, the transaction id, and the expiration is transaction expiration time.

### get_account_id
Format:` get_account_id name`
Parameter: name is the account name
Role: list the account id of the account name
Example:` {"jsonrpc": "2.0", "method": "get_account_id", "params": ["seerdex-withdraw"], "id": 1}`
Return information example:

```linux
   { "id" : 1 , "result" : "1.2.105" } 
```
 
### get_relative_account_history
Format:` get_relative_account_history name start limit end`
Parameters: name can be the account name or id, start is the minimum number of results returned, limit is the maximum number of results returned, and end is the maximum number of results returned;

The return data is sorted in chronological order, the newer the more forward;

The number starts from 1, and if end = 0, it returns the latest limit bar operation information;

If end - start > limit, the latest limit bar operation information that satisfies the condition is returned.

Role: List the operation history of the account name

> Please avoid returning more than 100 data at a time to avoid an error
> in the node or wallet. At the same time, when you use this command in
> the command line wallet, only the data in "description" will be
> returned, and the RPC caller can return the complete data.

Example:` {"jsonrpc": "2.0", "method": "get_relative_account_history", "params": ["seerdex-withdraw",15,1,30], "id": 1}`
Return information example:

```linux
 {
             "id" :  1 ,
             "result" :  [
                 {
                 "memo" :  "give you 980 SEER" , //only unlocking and having a wallet with a corresponding private key can display MEMO "description" :  "Transfer 980 SEER from alice to okok -- Memo: give you 980 SEER   (Fee: 21.05468 SEER)" , //generally wallet only display this content "op" :  {
                     "id" :  "1.9.703568" , // id of the operation object, through get_object 1.9 . 703568 to view this operation "op" :  [
                         0 , //the type of operation, 0 means transaction {
                         "fee" :  { //handling fee "amount" : 2105468 , //amount "asset_id" :  "1.3.0" // the type of asset },
                         "from" :  "1.2.109" , //out id "to" :  "1.2.105" , //into id "amount" :  {
                             "amount" :  ninety-eight million , //transfer amount "asset_id" :  "1.3.0" //the type of asset },
                         "memo" :  { //related MEMO authority "from" :  "SEER6sJwPuSSayEzHXLbVgw9HJsDnGBk5Dup5bq3ns1YziZEDMKMgU" ,
                             "to" :  "SEER8UAbnsAnXY1qr3CD6uzKaRuewsyPF9ynYJJGrdvSfDANxsGNxH" ,
                             "nonce" :  "394073041834538" ,
                             "message" :  "485e630438b9a38c94c12afd9b15007845484d7f0c8c2c29c135f4f9a155a1ee"
                         },
                         "extensions" :  []
                     }],
                     "result" :  [ //operation return results 0 , 
                         {
    
                         }
                     ],
                     "block_num" :  3674099 , // into the block height "trx_in_block" :  0 , //the location where operation in the block trading "op_in_trx" :  0 , //the location where operation in the transaction "virtual_op" : 52924 //virtual operation number }
             }]}
```

`Get_relative_account_history `will list all operations related to this account, such as transferring money to others (including withdrawals), transferring money to others (including deposit), account registration, participation forecasting, etc.

The deposit service only needs to pay attention to the op.op.N (operation type) is 0, that is, the operation of transferring money;

Of course, the most important are memo (transfer MEMO) and op.op.amount.amount (transfer amount) and `op.op.amount.asset_id` (asset type);

And` op.op.from` (out of id), if the same account is responsible for deposit and cashing, then determine whether op.op.from is the same as the current account obtained by` get_account_id` to distinguish whether the operation is the withdrawal initiated by the account operating;

`op.id` is the object id of the operation, and is also the unique id of the transfer operation;

In addition, you need to pay attention to` op.block_num`, which is the block height of the operation, `op.trx_in_block` - the location of the transaction in which the operation belongs, `op.op_in_trx` - the location of the operation within the transaction, and `op.virtual_op` - the virtual operation number.

The above four data can be combined with other instructions to obtain the txid to which the operation belongs and to determine the uniqueness of the operation.

### get_block
Format: `get_block num`

Parameter: block number

Role: Display the overview of the num block

Example: `get_block 2090482`
Return information example:

```linux
 get_block 2090482  {
       "previous" :  "001fe5f1e1dd8d195af805484ee8038a09866b76" , //the previous block number "timestamp" :  "2018-07-30T07:31:54" , //time stamp "witness" :  "1.5.22" , //the witness "transaction_merkle_root" :  "72756b0f1f1711622c8030eae65e6db055200320" ,
       "extensions" :  [],
       "witness_signature" :  "200d202d735de10f4f8213d71a8f946a2cc49bc02e930f682bea74321819b4bc7c4d436e366f1cad962f214eeaa42b5030fd716f692077f135b3cf33c688f68f1f" , //signature of witness "transactions" :  [{
           "ref_block_num" :  58864 , //the referenced block number "ref_block_prefix" :  2207768636 , //the referenced block head "expiration" :  "2018-07-30T07:33:51" , //transaction expiration time "operations" :  "
               Zero {.
                 "fee" :  {
                   "amount" :  200000 , // handling fee "asset_id" :  "1.3.0" //the type of asset 1.3 . 0 refers to SEER },
                 "from" :  "1.2.1250" , //initiate user ID / / "to" :  "1.2.1292" , //receive user ID "amount" :  {
                   "amount" :  2000000000 , / / amount 20000
                   "asset_id" :  "1.3.0" / / the type of asset 1.3 . 0 refers to SEER },
                 "extensions" :  []
               }
             ]
           ],
           "extensions" :  [],
           "signatures" :  [
             "205c1f92cd9eebba507094c0fe4a05be47d301b6b2e989f4f0fdcfc8acef69ceec5356faf1667b5576629bfbc29ee5a257dbfac935c5a8fef588e32d7a7902c2b3" //transaction signature collection ],
           "operation_results" :  "
               0 {}.
             ]
           ]
         }
       ],
       "block_id" :  "001fe5f26d0f3ee5b1569a1618fe903e4dc5aef0" , //block number "signing_key" :  "SEER5oyAoCzw5GRD9unKK6vsLXkPVx1aKU7i3hX19E8BRU5u3FoAoA" , //signature public key of witness "transaction_ids" :  [
         "30e73f68d163398005557a21c58bd751db22eb53" //transaction id set ]}
```

For deposit service, you need to pay attention to the `transaction_ids data `obtained by `get_block` in conjunction with the `op.block_num` obtained in `get_relative_account_history`. If there are multiple transactions in the same block, there will be multiple `transaction_id`, which need to be matched with the `op.trx_in_block` obtained in `get_relative_account_history` to get the txid corresponding to this operation.

## handling deposit
1、 Query the account related history by `get_relative_account_history`.

The serial number of each record is not directly displayed in the returned result, and needs to be obtained and recorded by itself.

Recommendation: Send the request at a certain interval from start = 1, limit = 1, end = 2. Each time start and end are +1 each, and the limit is always equal to 1. If the returned information is not empty, the information will be numbered and storage. If the return message is empty: `{"id":1,"jsonrpc":"2.0","result":[]}`, it means there is no new operation, and the record storage is continued while waiting for new operation information.

2、 Determine whether it is a deposit business.

`Get_relative_account_history` will list all operations related to this account, such as you transferring money to others (including cash withdrawals), others transferring money to you (including deposit), account registration, participation forecasting, etc. Deposit service only needs op.op.N (operation type) is 0 (transfer) of operational data;

If the same account is responsible for deposit and withdrawing, it is necessary to distinguish whether op.op.from is the same as the current account id. If the same, it is the withdrawal operation initiated by this account, which needs to be excluded;

All that remains is the deposit operation to be processed.

3、 Obtain relevant deposit data.
When the command line wallet connected through Http-RPC or websocket-RPC is in the unlocked state, the memo content can be viewed in the information returned by `get_relative_account_history`, and the account information such as the exchange account ID filled in by the user is obtained from here;

The amount of deposit is `op.op.amount.amount` (the amount of the transfer) plus the decimal point;

Use `op.op.amount.asset_id` (asset type) to determine if it is the correct asset type supported by the platform.

4、 Determine if it is a trusted operation.

Unlike bitcoin and Ethereum using the number of confirmations to probabilistically reduce the possibility that the transaction is returned, the graphene project like SEER has the concept of irreversible block. The irreversible block and the transaction in the earlier block can guarantee no fallback will occur.

`Get_relative_account_history` will return the op.block_num to which the operation belongs, but even if the transaction is not in the block, it may still appear in the account history, so it needs to be compared with `last_irreversible_block_num` (the most recent irreversible block number) obtained by `get_dynamic_global_properties`. `op.block_num` must be less than or equal to last_irreversible_block_num in order to be considered a trusted operation.

5、 Record information about the operation.

The` op.block_num+op.trx_in_block` + `op.op_i n_trx + op.virtual_op` obtained in `get_relative_account_history` are combined to identify the uniqueness of the operation and can be identified to avoid repeated operations;

The op.id obtained in `get_relative_account_history` is also the unique id of the transfer operation;

The information of the block in which the transfer operation is located can be obtained by using `get_object op.block_num` to get. The txid corresponding to the transfer operation in the transaction_ids in the block information can be obtained by the value of `op.trx_in_block`, and the same txid may correspond to multiple operations.

6、 If there is a deposited MEMO or the asset type is incorrect, it is recommended not to return directly, but wait for the user to contact the confirmation return path, because the user may deposit through exchanges or third-party platforms. Directly return but without the MEMO may cause difficulties in processing or even loss of assets. 

## handling withdrawal
1、 Check whether the blockchain net is running normally before the operation.

The withdrawal service needs to pay attention to whether the blockchain network is in normal operation state and only process cash withdrawal when the network is normal.

The`head_block_age` (previous block generation time) obtained by the info command must be within 1 minute, and the participation (block production participation rate) must be above 80, indicating that 80% of the block producers are working normally.

At the same time, the `head_block_number` (current block height) and `last_irreversible_block_num` (the most recent irreversible block) obtained by the `get_dynamic_global_properties` instruction are not too different, generally within 30.

2、 Check the withdrawal account balance

List the balance of each asset in the account by list_account_balances, and check whether the amount of the `asset_id is 1.3.0` (i.e. SEER) is enough to pay the network fee. If it involves the deposit service of other assets on the SEER chain, you need to pay attention to whether the balance of corresponding assets is enough. 

3、 Transfer and track whether the operation was successful

Transfer the corresponding amount of the specified asset to the user via transfer2.

Pay attention to the transaction id in the return message. Providing this information to the user, which allows the user query the status and information of his cash withdrawal operation on the blockchain in the block browser, and determine whether the operation has been posted when the transfer target is not received;

Pay attention to the expiration (transaction expiration time) in the return information of transfer2. After the transfer operation is issued, the information of the transfer operation can be obtained quickly from `get_relative_account_history`, and the block is confirmed by comparison of `op.block_num` and `last_irreversible_block_num`;

(1) If the block is confirmed, the transaction id in the return message should already exist in the `transaction_ids` array of `get_object op.block_num` to get the block information of the transfer operation.

(2) If the transfer operation issued exceeds the expiration and the block has not been confirmed, the transaction may not be packaged by the blockchain and has been discarded due to various reasons such as too many broadcasts at the same time. At this point, it is safe to re-initiate transaction. 

**For more technical content, please visit the SEER documentation site: https://docs.seerchain.org/#/zh-Hans/gatewayinstruction
This article is provided by seer enthusiasts, may be misunderstood. Welcome to visit github and point out: https://github.com/akirasen/seerdocs/tree/master/zh-Hans
——— END ———**

