# Ace
## _Web3 file transfer application powered by iExec_ 

Ace is the very first web3 file transfer application that is built with the [iExec](https://iex.ec) protocol.  
The choice of the iExec stack was a no-brainer given that it covers the key requirements for the implementation a trustworthy web3 file transfer application.  
Moreover, the iExec protocols has a built-in data monetization capability that we are leveraging in this project.

## Contents
- [What are we fixing?](#what-are-we-fixing)
- [Features](#features)
- [Core principles](#principles)  
[Modelization](#modelization)  
[File Transfer process](#file-transfer-process)  
- [Notification system](#notification-system)
- [Transfer fees](#transfer-fees)
- [Use cases](#use-cases)
- [Future considerations](#future-considerations)
- [Licence](#licence)  

---

## What are we fixing?
We believe that Web 2 is broken and it’s time for a new paradigm shift that can restore our right to privacy and security. 
Up until the emergence of Web3 we were forced to endure untrustworthy corporations selling our data to other corporations or even governments and centralized databases containing our personal details being hacked on a regular basis.  
  
Ace is an illustration that there is a better way to do business when it comes to file transfer, one which doesn’t call for sacrificing our security nor our need for great level of service and user experience. There is no need longer a man in the middle when I am sending personal holiday pics to my family :-)


## Features

- "WeTransfer-like" experience,  simply drag and drop files you want to share
- Set the beneficiary in the form of 0x address or use a ENS
- Cryptographic accès control to the file being transfered
- Beneficiary email notification for new shared content/file available 
- No time limit for file download, other service require the recipient to download the file within x days
- Built-in monetization! You can sell your added value content and get paid in [$RLC](https://coinmarketcap.com/currencies/rlc/)
- Cool visual backgrounds randomly sourced from [unsplash](https://unsplash.com) API.  


## Core principles  
Ace's system design is making use of all three types of computing assets that are part of the iExec marketplace model: application, processing power (CPU) and dataset. The section below explains how Ace is mapped against iExec core concepts. 

### Modelization

**_Datasets_**  
Files that are being transferred are represented as iExec encrypted datasets

**_Application_**  
Our application is trivial as it consists of simply downloading the transferred file. In fact, the iExec protocol is taking care the authorization by ensuring that only the selected requester can trigger the download application for the given dataset (i.e transferred files)

**_Processing power (CPU)_**  
The processing capacity required to execute the application is provided by workers in the iExec network. The execution relies on Intel SGX compatible workers only.

**_Users roles_**  
- Provider: This is **the sender**/the content creator who want to send its assets to someone (the beneficiary) with or without monetization.
- Beneficiary: This is **the recipient** of the files
- Requester: This is the person who is authorized to run the application (download) with the dataset as an input. **In our case, the beneficiary of a file transfer and the requester are just the same user**.  
 
### File Transfer process

**Step 1 - Preparation** 
The preparation stage consists in encrypting the File, uploading to ipfs and deploying the dataset (registration on the iExec marketplace)  
![IMAGE_DESCRIPTION](https://bafybeigb3aodzwkqsf3kdffjodbluzxpvvpe5ixzz542jcec4swzl3wbqi.ipfs.infura-ipfs.io)
 

The encryption and deployment steps are handled with the [iExec SDK](https://github.com/iExecBlockchainComputing/iexec-sdk) whilst the IPFS upload is a pretty straight forward process when using a library like [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client).
You can refer to [This section of the iExec documentation](https://docs.iex.ec/for-developers/confidential-computing/sgx-encrypted-dataset) to get a more detailed explaination on how to use confidential assets with iExec.

**Step 2 - Set governance rules**   
The second step of the process is for the sender/content creator to set the authorization for the recipient (beneficiary/requester) together with an optional monetization parameter (i.e. how much RLC will the requester need to pay in order to run the download app with my dataset).  
  
**From an iExec prospective this step is just a dataset order being placed on the marketplace by the provider (sender/content creator).** The following arguments of the dataset order method will be used to defined the governance rules:

| Argument | Description |
| ------ | ------ |
| dataset 0x | 0x Address of the dataset representing the file being shared |  
| datasetprice | Set to a non-0 value when monetizing | 
| apprestrict | 0x address of our download app | 
| requesterrestrict | 0x address or ENS of the recipient |
| tag | set to 'TEE' to ensure that that only the beneficiary will be able to decrypt the dowloaded file by using his private key |

A detailed description of datasets orders can be found [in this section of the documentation](https://docs.iex.ec/for-developers/advanced/manage-your-datasetorders#publish-a-custom-datasetorder)


**Step 3 -  Beneficiary notification (non-iExec service)**   
User (recipients) can register their email addresses to get notified whenever a transfer is initiated with their 0x address as the beneficiary (i.e in iExec terms : when an order has been placed for the download app for that user as the beneficiary).  
Such mechanism is a must-have given it is not conceivable to check Ace's every minture to check if someone sent something to me. 

**Step 4 - (optional) payment and file download**   
Triggering the download application is handled with iExec SDK and protocol, including making the "payment" when monetization has been set as a governance condition.  
**From an iExec prospective this step is just an computation order being placed on the marketplace by the requester (recipient).** The following arguments of the "buy computation" order method will be used to defined the governance rules:  

| Argument | Description |  
| ------ | ------ |  
| dataset 0x | 0x Address of the dataset representing the file to download |  
| beneficiary <address>  | Same as the request address in our case |  
| tag | set to 'TEE' to ensure that that only the beneficiary will be able to decrypt the dowloaded file by using his private key |
| encrypt-result | encrypt the result archive with the beneficiary public key |  
| category <id> | id of the task category, defaulted to `1 – S` for the time being |  


**Step 5 - Provider notification (non-iExec service)**  
Senders (providers) can optionaly register their email addresses to get notified whenever the benefeciary downloaded the file (i.e in iExec terms : when the task execution completed)

## Notification system

**Recipient notification**  
The notification system is simple application that can is decentralised given that it will monitor "incoming" files (i.e. iExec marketplace orders) for the requester's 0x address. 

**Sender nnotification that the file was downloaded**  
For "downloaed complete" notification, the system will check the tasks status od the dataset order that was placed by the provider (sender/content creator).

**Decentralization of the notification service**  
Users have to choice to either use the instance of the notification service that will be deployed as part of this project or run their own instance should they need the highest level of confidentiality of their email addresses



## Transfer fees
In order to understand the cost structure, it is very important to first understand how iExec marketplace order system works. 
iExec marketplace allows anyone to monetize the usage of its application, CPU and dataset. In fact, each provider indicates his conditions through orders.  

- Application providers set the price to charge the requester for each execution of the app (in RLC)
[Check out this section of the SDK documentation for more details](https://github.com/iExecBlockchainComputing/iexec-sdk/blob/master/CLI.md#sell-your-app-on-the-marketplace) 
- Dataset providers (i.e. the sender / content creator in our case) set the price to charge the requester for each use of the dataset (in RLC)
[Check out this section of the SDK documentation for more details](https://github.com/iExecBlockchainComputing/iexec-sdk/blob/master/CLI.md#sell-your-computing-power-at-limit-price-on-the-marketplace) 
- The Workerpool managers set the computing power price 
[Check out this section of the SDK documentation for more details](https://github.com/iExecBlockchainComputing/iexec-sdk/blob/master/CLI.md#sell-your-computing-power-at-limit-price-on-the-marketplace) 

Luckily enough there are no blockchain Tx fees on iExec's sidechain (Bellecour) and it makes the pricing equation as simple as:  

```sh
Total transfer fees = app usage fee + worker usage fee + dataset usage fee
```

This equation can be further simplified as we will be deploying the application and setting usage fee at 0RLC.  

```sh
Total transfer fees = worker usage fee + content creation monetization fee
```

When the sender/content creator does not charge for the content the equation becomes :
```sh
Total transfer fees = worker usage fee
```

Hey, doesn't that look great? At last with Ace we can benefit from a trustworthy, privacy-preserving decentralised file transfer application whose revenue model is not correlated to the monetization of my personal and private data! 

## Use cases
- Content monetization
- Any use case that services like WeTransfer can handle 

## Future considerations
Here are some features that could be implemented after v0. 
### Copyright protection and licensing  
Making the application more intelligent with the integration of a library for creating invisible watermark over images, videos and PDFs.  
### KYC  
Add the ability for the content provider to get proofs about the beneficiary's identity. For example a creator of adult materials will be able to check that the beneficiary is over 18.  
### Subscriptions  
The version 1 works on the basis that the content creator manages the list of beneficiaries on a seperate system. The subscription model will allow people to register their interest and join a "fan" club. Content providers will be able to chose their subscription list rather than selecting beneficiaries one by one.
### Task category management
The goal here will be to dynamically determine the iExec task category depending on the transfered file size. For this v0, this value has been defaulted to `1 – S` (20 min task execution). Check out [this section](https://docs.iex.ec/key-concepts/pay-per-task-model) of the documentation to learn more about [iExec's pay per task model](https://docs.iex.ec/key-concepts/pay-per-task-model) 
### Full privacy on the notification system




## License

MIT

**Free Software, Hell Yeah!**
