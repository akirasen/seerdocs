---
search: english
---

# Guide for the SEER development tools

<p class="warning">
  Document translation is still in progress. Please use  <a router-link="/zh-Hans">Chinese documents</a> as criteria.
</p>

Through this document, we introduce some peripheral tools and plug-ins that need to be developed based on SEER.

Users who use this tutorial, by default, you know the basic SEER node and command line wallet usage. If you do not understand, <a router-link= "/cli" >, please click here `</a>.

## Guide for SEER balance snapshot and Batch_transfer function

Please download the latest version of the witness_node and wallet: https://github.com/seer-project/seer-core-package/releases

The balance snapshot and Batch_transfer function are combined, which is the airdrop that Dapp will use. In the SEER block chain system, these two functions are integrated in the witness-node software and the command-line wallet.

### Snapshot of the balance

The method of invoking the balance snapshot is to add the following parameters when starting the node:

```cmd
witness_node --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```

#### Parameter interpretation

`--plugins="snapshot "`  `"snapshot "` tell the node that you want to use the function as a snapshot, and be careful not to miss the space between T and "

`--snapshot-at-time="2018-07-24T04:00:00"` ,"2018-07-24T04:00:00" replace for you to take a snapshot time, for the standard time in Greenwich, Singapore time 8 hours later than the time;

`--snapshot-to="d:/0724.csv"`, `"d:/0724.csv"`, the directory and filename to be stored in the form file for snapshot.

`--snapshot-asset="SEER"` ,`"SEER"`, the asset type that you want snapshot, can be any assets issued by SEER, such as OPC, PFC, etc.

The parameter `1` in `--snapshot-balance-limit=1` is the lower limit of snapshot balance, and 1 is not equal to 0. Because SEER supports a maximum of 5 decimal places, for example, for example, the account that you want to have a snapshot more than 10000 should be written as --snapshot-balance-limit=`1000000000`.

The node needs to synchronize with the block chain before the snapshot. If the `seednode`, `apinode`, `witness node` and other nodes have been run on the same device, the port number is required to be modified to avoid port conflicts.

#### complete parameter

```cmd
witness_node --data-dir ./data  --p2p-endpoint=0.0.0.0:1899 --rpc-endpoint=0.0.0.0:9192 --replay-blockchain --plugins="snapshot " --snapshot-at-time="2018-07-24T04:00:00" --snapshot-to="d:/0724.csv" --snapshot-asset="SEER" --snapshot-balance-limit=1
```

You can see that the node has a balance snapshot of the main network at the specified time, and snapshot form files can be found in the specified directory.

The balance field in the snapshot file automatically contains SEER and other asset types. It can be replaced by the replacement function of Excel.

Of course, this table gets a snapshot of the balance of some asset. If we want to drop it in a certain proportion, we need to reprocess the data.

### Batch_transfer (airdrop)

The batch transfer function has been integrated into the command line purse, using the `"batch_transfer"` command call, and the invoked file is a TXT file with the same directory as cli_wallet.

#### The way of use

1. in the command line wallet (cli_wallet) and directory to create a new TXT file, in this case we named `"transfer.txt"`;

2. edit this document, each transfer is a row, in the form of from to amount asset, separated by spaces.

For example:

```txt
alice bob 100 SEER
alice charlie 100 SEER
alice dove 100 SEER
alice eva 100 SEER
```

Reminder: the same TXT transfer account is not too many, generally not more than `2000`, in order to avoid a single block too large, broadcast problems.

3. Run in the unlocked command line:

```cmd
batch_transfer transfer.txt 
```

After the execution, all the transfers are broadcast at the same time. In this case, `Bob, Charlie, dove and eva `will receive 100 SEER of airdrops per person. Of course, the command-line wallet needs to import the active-privkey of Alice.

