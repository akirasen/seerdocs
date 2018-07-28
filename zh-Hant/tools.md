---
nav: zh-Hant
search: zh-Hant
---

#賽亞開發工具使用指南

通過此檔案，介紹基於SEER進行開發所需要的一些周邊工具、挿件的使用管道。

使用此教程的用戶，我們默認您已經瞭解基本的SEER節點和命令列錢包使用管道。如果不瞭解，<a router-link=“/cli”>`請點擊這裡`</a>。

## SEER公鏈餘額快照功能和批量轉帳功能使用指南

請下載最新版的節點和錢包：https://github.com/seer-project/seer-core-package/releases

餘額快照和批量轉帳功能結合在一起，就是Dapp會用到的空投功能了。在SEER區塊鏈系統中，這兩大功能分別集成在節點軟件和命令列錢包中，使用參數等形式調用。

###餘額快照

餘額快照的調用管道是在啟動節點時加入以下參數：

```cmd
witness_node --plugins=“snapshot”--snapshot-at-time=“2018-07-24T04:00:00”--snapshot-to=“d:/0724.csv”--snapshot-asset=“SEER”--snapshot-balance-limit=1
```

####參數解釋

`--plugins=“snapshot”`中`“snapshot”`告訴節點你要使用的功能為快照，注意不要漏了t和“之間的空格；

`--snapshot-at-time=“2018-07-24T04:00:00”`中`“2018-07-24T04:00:00”`替換為你要進行快照的時間，為格林尼治標準時間，比新加坡時間晚8個小時；

`--snapshot-to=“d:/0724.csv”`中`“d:/0724.csv”`為快照出的表單檔案要存放的目錄和檔名；

`--snapshot-asset=“SEER”`中`“SEER”`為你要快照的資產類型，可以是基於SEER發行的任何資產，例如OPC、PFC等；

`--snapshot-balance-limit=1`中的參數`1`為快照餘額下限，1為不等於0。因為SEER最多支持小數點後5比特，所以例如如果你想只快照餘額大於10000的帳戶應該寫成--snapshot-balance-limit=`1000000000`。

在快照前節點需要和區塊鏈正常同步，如果同一臺設備上已經運行了`seednode`、`apinode`、`witness node`等節點，為避免埠衝突，需要修改埠號為未佔用的埠。

####完整參數

```cmd

witness_node --data-dir ./data --p2p-endpoint=0.0.0.0:1899 --rpc-endpoint=0.0.0.0:9192 --replay-blockchain --plugins=“snapshot”--snapshot-at-time=“2018-07-24T04:00:00”--snapshot-to=“d:/0724.csv”--snapshot-asset=“SEER”--snapshot-balance-limit=1

```

可以看到節點在指定時間對主網進行了餘額快照，在指定目錄可以找到快照表單檔案。

快照檔案中的餘額欄位自動包含了SEER等資產類型，用excel的替換功能替換删除掉即可。

當然，這個錶裡面得到的是某種資產的餘額快照，如果要按一定的比例空投，只需對數據進行再加工即可。

###批量轉帳（空投）

批量轉帳功能已經集成在命令列錢包中，使用`“batch_transfer”`命令調用，調用的檔案是一個和cli_wallet同目錄的txt檔案。

####使用管道

1、在命令列錢包（cli_wallet）同目錄下新建一個txt檔案，本例中我們命名為“transfer.txt”；

2、編輯此檔案，每個轉帳為一行，格式為：from to amount asset，使用空格隔開。

例如：

```txt
alice bob 100 SEER
alice charlie 100 SEER
alice dove 100 SEER
alice eva 100 SEER
```

提醒：同一個txt內轉帳數不要太多，一般不超過`2000個`，以避免單個區塊過大，廣播出問題。

3、在解鎖的命令列中運行：

```cmd
batch_transfer transfer.txt
```

執行後，所有的轉帳會同時被廣播。本例中`bob、charlie、dove、eva`將每人收到100 SEER的空投，當然，此命令列錢包需要導入`alice`的活躍許可權私密金鑰。
