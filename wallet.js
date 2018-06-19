$(document).ready(function () {
    const IPFS = window.IpfsApi('localhost', '5001');
    const Buffer = IPFS.Buffer;

    const derivationPath = "m/44'/60'/0'/0/";
    const provider = ethers.providers.getDefaultProvider('ropsten');
    const Contract = ethers.Contract;
    const contractAddress = "0x420dec5eac3095580581ff56c4b299994480ee17";
    const contractOwnerAddress = "0x8804FFe582C362c4c331492db19fBf5b6659c583";
    const contractABI =
        [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "staffId",
                        "type": "uint256"
                    },
                    {
                        "name": "certHolder",
                        "type": "string"
                    },
                    {
                        "name": "courseAttended",
                        "type": "string"
                    },
                    {
                        "name": "dateAttended",
                        "type": "string"
                    },
                    {
                        "name": "duration",
                        "type": "string"
                    },
                    {
                        "name": "issuer",
                        "type": "string"
                    },
                    {
                        "name": "issueDate",
                        "type": "string"
                    },
                    {
                        "name": "image",
                        "type": "string"
                    }
                ],
                "name": "addCertificate",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "Id",
                        "type": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "certHolderToIndex",
                "outputs": [
                    {
                        "name": "courseAttended",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "countCertificates",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "Id",
                        "type": "uint256"
                    }
                ],
                "name": "countHolderCertificates",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "hash",
                        "type": "string"
                    }
                ],
                "name": "getCertificate",
                "outputs": [
                    {
                        "name": "staffId",
                        "type": "uint256"
                    },
                    {
                        "name": "certHolder",
                        "type": "string"
                    },
                    {
                        "name": "courseAttended",
                        "type": "string"
                    },
                    {
                        "name": "dateAttended",
                        "type": "string"
                    },
                    {
                        "name": "duration",
                        "type": "string"
                    },
                    {
                        "name": "issuer",
                        "type": "string"
                    },
                    {
                        "name": "issueDate",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "hash",
                        "type": "string"
                    }
                ],
                "name": "verifyCertificate",
                "outputs": [
                    {
                        "name": "valid",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    var ipfsHash;

    let wallets = {};

    showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkCreateNewWallet').click(function () {
        $('#passwordCreateWallet').val('');
        $('#textareaCreateWalletResult').val('');
        showView("viewCreateNewWallet");
    });

    $('#linkImportWalletFromMnemonic').click(function () {
        $('#textareaOpenWallet').val('');
        $('#passwordOpenWallet').val('');
        $('#textareaOpenWalletResult').val('');
        $('#textareaOpenWallet').val('toddler online monitor oblige solid enrich cycle animal mad prevent hockey motor');
        showView("viewOpenWalletFromMnemonic");
    });

    $('#linkImportWalletFromFile').click(function () {
        $('#walletForUpload').val('');
        $('#passwordUploadWallet').val('');
        showView("viewOpenWalletFromFile");
    });

    $('#linkShowMnemonic').click(function () {
        $('#passwordShowMnemonic').val('');
        showView("viewShowMnemonic");
    });

    $('#linkShowAddressesAndBalances').click(function () {
        $('#passwordShowAddresses').val('');
        $('#divAddressesAndBalances').empty();
        showView("viewShowAddressesAndBalances");
    });

    $('#linkSendTransaction').click(function () {
        $('#divSignAndSendTransaction').hide();

        $('#passwordSendTransaction').val('');
        $('#transferValue').val('');
        $('#senderAddress').empty();

        $('#textareaSignedTransaction').val('');
        $('#textareaSendTransactionResult').val('');

        showView("viewSendTransaction");
    });

    //---
    $('#linkReadContract').click(function () {
        $('#divReadContract').hide();
        $('#passwordReadContract').val('');
        $('#imageHash').val('');
        $('#textareaCertificateHolder').val('');

        showView("viewReadContract");
    });

    $('#linkCreateNewCertificate').click(function () {
        $('#divCreateCert').hide();
        $('#divPrivateKeyCreateCert').show();
        $('#privateKeyCreateCert').val('');

        showView("viewAddNewCert");
    });

    $('#linkReadHolderContract').click(function () {
        $('#divReadContractById').hide();
        $('#passwordReadContractById').val('');

        showView("viewReadHolderContract");
    });
    //---


    $('#buttonGenerateNewWallet').click(generateNewWallet);
    $('#buttonOpenExistingWallet').click(openWalletFromMnemonic);
    $('#buttonUploadWallet').click(openWalletFromFile);
    $('#buttonShowMnemonic').click(showMnemonic);
    $('#buttonShowAddresses').click(showAddressesAndBalances);
    $('#buttonSendAddresses').click(unlockWalletAndDeriveAddresses);
    $('#buttonSignTransaction').click(signTransaction);
    $('#buttonSendSignedTransaction').click(sendSignedTransaction);
    $('#linkDelete').click(deleteWallet);

    $('#buttonUnlockReadContract').click(readFromContract);
    $('#buttonGetCertificateHolder').click(getCertificateHolder);

    $('#buttonCreateCertLogIn').click(createCertLogIn);
    $('#buttonCreateCert').click(createNewCert);

    $('#buttonUnlockReadContractById').click(readFromContractById);
    $('#buttonGetCertificateById').click(getCertificateById);

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if (localStorage.JSON) {
            $('#linkCreateNewWallet').hide();
            $('#linkImportWalletFromMnemonic').hide();
            $('#linkImportWalletFromFile').hide();

            $('#linkShowMnemonic').show();
            $('#linkShowAddressesAndBalances').show();
            $('#linkSendTransaction').show();
            $('#linkDelete').show();
            $('#linkReadContract').show();
        }
        else {
            $('#linkShowMnemonic').hide();
            $('#linkShowAddressesAndBalances').hide();
            $('#linkSendTransaction').hide();
            $('#linkDelete').hide();
            $('#linkReadContract').hide();

            $('#linkCreateNewWallet').show();
            $('#linkImportWalletFromMnemonic').show();
            $('#linkImportWalletFromFile').show();
        }
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        })
    }

    function showError(errorMsg) {
        $('#errorBox>p').html('Error: ' + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        })
    }

    function showLoadingProgress(percent) {
        $('#loadingBox').html("Loading... " + parseInt(percent * 100) + "% complete");
        $('#loadingBox').show();
        $('#loadingBox>header').click(function () {
            $('#errorBox').hide();
        })
    }

    function hideLoadingBar() {
        $('#loadingBox').hide();
    }

    function showLoggedInButtons() {
        $('#linkCreateNewWallet').hide();
        $('#linkImportWalletFromMnemonic').hide();
        $('#linkImportWalletFromFile').hide();

        $('#linkShowMnemonic').show();
        $('#linkShowAddressesAndBalances').show();
        $('#linkSendTransaction').show();
        $('#linkDelete').show();
        $('#linkReadContract').show();
    }

    //decryptWallet method which takes a json and a password, and returns a wallet
    function decryptWallet(json, password) {
        return ethers.Wallet.fromEncryptedWallet(json, password, showLoadingProgress);
    }

    function encryptAndSaveJSON(wallet, password) {
        return wallet.encrypt(password, {}, showLoadingProgress)
            .then(json => {
                localStorage['JSON'] = json;
                showLoggedInButtons();
            })
            .catch(showError)
            .finally(hideLoadingBar);
    }

    //method bound behind the [Generate Now] button is generateNewWallet
    function generateNewWallet() {
        let password = $('#passwordCreateWallet').val();
        let wallet = ethers.Wallet.createRandom();

        encryptAndSaveJSON(wallet, password)
            .then(() => {
                showInfo("please save your mnemonic: " + wallet.mnemonic);
                $('#textareaCreateWalletResult').val(localStorage.JSON);
            });
    }

    function openWalletFromMnemonic() {
        let mnemonic = $('#testareaOpenWallet').val();
        if (!ethers.HDNode.isValidMnemonic(mnemonic))
            return showError('Invalid mnemonic');

        let password = $('#passwordOpenWallet').val();
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);

        encryptAndSaveJSON(wallet, password)
            .then(() => {
                showInfo("wallet successfully loaded");
                $('#textareaOpenWalletResult').val(localStorage.JSON);
            });
    }

    //Use FileReader to read the file as text. Onload, take the result – the json and decrypt it using the provided password. 
    function openWalletFromFile() {
        if ($('#walletForUpload')[0].files.length == 0) {
            return showError("Please select a file to upload");
        }
        let password = $('#passwordUploadWallet').val();

        let fileReader = new FileReader();
        fileReader.onload = function () {
            let json = fileReader.result;

            decryptWallet(json, password)
                .then(wallet => {
                    if (!wallet.mnemonic)
                        return showError("invalid JSON file");

                    localStorage['JSON'] = json;
                    showInfo("wallet successfully loaded");
                    showLoggedInButtons();
                })
                .catch(showError)
                .finally(hideLoadingBar);
        };
        fileReader.readAsText($('#walletForUpload')[0].files[0]);
    }

    function showMnemonic() {
        let password = $('#passwordShowMnemonic').val();
        let json = localStorage.JSON;

        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Your mnemonic is: " + wallet.mnemonic);
            })
            .catch(showError)
            .finally(hideLoadingBar);
    }

    function showAddressesAndBalances() {
        let password = $('#passwordShowAddresses').val();
        let json = localStorage.JSON;
        decryptWallet(json, password)
            .then(renderAddressesAndBalances)
            .catch(error => {
                $('#divAddressesAndBalances').empty();
                showError(error);
            })
            .finally(hideLoadingBar);


        function renderAddressesAndBalances(wallet) {
            $('#divAddressesAndBalances').empty();

            let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);

            for (let i = 0; i < 5; i++) {
                let div = $('<div id="qrcode">');
                let wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + i).privateKey, provider);

                wallet.getBalance()
                    .then((balance) => {
                        div.qrcode(wallet.address);
                        div.append($(`<p>${wallet.address}: ${ethers.utils.formatEther(balance)} ETH</p>`));
                        $('#divAddressesAndBalances').append(div);
                    })
                    .catch(showError)
            }
        }
    }

    function unlockWalletAndDeriveAddresses() {
        let password = $('#passwordShowMnemonic').val();
        let json = localStorage.JSON;

        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Wallet successfully unlocked");
                renderAddresses(wallet);
                $('#divSignAndSendTransaction').show();
            })
            .catch(showError)
            .finally(() => {
                $('#passwordSendTransaction').val('');
                hideLoadingBar();
            });

        function renderAddresses(wallet) {
            $('#senderAddress').empty();

            let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);
            for (let i = 0; i < 5; i++) {
                let wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + i).privateKey, provider);
                let address = wallet.address;

                wallets[address] = wallet;
                let option = $(`<option id=${wallet.address}>`).text(address);
                $('#senderAddress').append(option);
            }
        }
    }

    function signTransaction() {
        let senderAddress = $('#senderAddress option:selected').attr('id');
        let wallet = wallets[senderAddress];
        if (!wallet)
            return showError("invalid address");

        let recipient = $('#recipientAddress').val();
        if (!recipient)
            return showError("invalid recipient");

        let value = $('#transferValue').val();
        if (!value)
            return showError("invalid value");

        wallet.getTransactionCount()
            .then(signTransaction)
            .catch(showError);

        function signTransaction(nonce) {
            let transaction = {
                nonce,
                gasLimit: 21000,
                gasPrice: ethers.utils.bigNumberify("20000000000"),
                to: recipient,
                value: ethers.utils.parseEther(value.toString()),
                data: "0x",
                chainId: provider.chainId
            };
            let signedTransaction = wallet.sign(transaction);
            $('#textareaSignedTransaction').val(signedTransaction);
        }
    }

    function sendSignedTransaction() {
        let signedTransaction = $('#textareaSignedTransaction').val();
        provider.sendTransaction(signedTransaction)
            .then(hash => {
                showInfo("transaction hash: " + hash);
                let etherscanUrl = 'https://ropsten.etherscan.io/tx/' + hash;
                $('#textareaSendTransactionResult').val(etherscanUrl);
            })
            .catch(showError);
    }

    //Method deleteWallet clears the local storage and shows the Home view.
    function deleteWallet() {
        localStorage.clear();
        showView('viewHome');
    }

    //-------------------------------------------------------------------------------
    //Method that reads from a contract
    //Verify the password - if correct - then shows the division that will show the certificate details
    function readFromContract() {
        let password = $('#passwordReadContract').val();
        let json = localStorage.JSON;
        
        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Wallet successfully unlocked");
                //renderAddresses(wallet);
                $('#divReadContract').show();
                $('#divPasswordReadContract').hide();
            })
            .catch(showError)
            .finally(() => {
                $('#passwordReadContract').val('');
                hideLoadingBar();
            });
    }//---end readFromContract

    //show the details of the certificate after verifying password
    function getCertificateHolder() {
        let hash = $('#imageHash').val();

        //make a promise to wait for the chain to retrieve the results
        //because transaction needs time to mine
        contract.getCertificate(hash)
            .then((certHolder) => {

                let url = "https://ipfs.io/ipfs/" + hash;

                $('#textareaCertificateHolder').val(certHolder);
                $("#imageCertificate").attr("src", url);
  
            })
            .catch((err) => {
                console.log(err);
            });
    }//end getCertificateHolder


    //Method that reads from a contract by staff ID
    //Verify the password - if correct - then shows the division that will show the certificate details for that staff ID
    function readFromContractById() {
        let password = $('#passwordReadContractById').val();
        let json = localStorage.JSON;

        decryptWallet(json, password)
            .then(wallet => {
                showInfo("Wallet successfully unlocked");
                //renderAddresses(wallet);
                $('#divReadContractById').show();
                $('#divPasswordReadContractById').hide();
            })
            .catch(showError)
            .finally(() => {
                $('#passwordReadContractById').val('');
                hideLoadingBar();
            });
    }//---end readFromContractByID

    //show the details of the certificate after verifying password
    function getCertificateById() {
        let staffId = $('#staffId').val();

        //make a promise to wait for the chain to retrieve the results
        //because transaction needs time to mine
        contract.countHolderCertificates(staffId)
            .then((numCert) => {
                let i = 0;
                if (numCert > 0) {
                    for (i = 0; i < numCert; i++) {
                        contract.certHolderToIndex(staffId, i)
                            .then((cert) => {
                                $('#textareaCertificateHolder').val(cert);
                                let url = "https://ipfs.io/ipfs/" + cert.image;
                                $("#imageCertificate").attr("src", url);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }
                else {
                    showInfo("This staff ID does not have any certificate");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }//end getCertificateHolderByID


    //verify password - before showing division to create a new certificate
    function createCertLogIn() {
        let password = $('#passwordCreateCert').val();

        decryptWallet(localStorage.JSON, password)
            .then((wallet) => {
                showInfo("wallet successfully loaded");

                //check that the wallet address is authorised to create a new contract
                if (wallet.address == contractOwnerAddress) {
                    showInfo("successfully logged in");
                    $('#divCreateCert').show();
                    $('#divPrivateKeyCreateCert').hide();
                }
                else {
                    showInfo("you are not the administrator");
                }
            });
    }//end createCertLogIn


    //when user clicks on the Submit button - to upload the certificate image to IPFS
    $('#documentUploadButton').click(function () {
        if ($('#documentForUpload')[0].files.length === 0) {
            return showError("please select a file to upload");
        }
        let fileReader = new window.FileReader();

        fileReader.onload = function () {
            let fileBuffer = Buffer.from(fileReader.result);

            IPFS.files.add(fileBuffer, (err, result) => {
                if (err)
                    return showError(err);
                if (result) {
                    //save the hash into a global variable
                     ipfsHash = result[0].hash;
                    $('#textareaCertificateImageHash').val(ipfsHash);
                }
            })
        };
        fileReader.readAsArrayBuffer($('#documentForUpload')[0].files[0]);
    })

    //to prompt for the details - and then create the new certificate using the contract method - "addCertificate"
    //function addCertificate(uint staffId, string certHolder, string courseAttended, string dateAttended, string duration, string issuer, string issueDate, string image)
    function createNewCert() {
        let password = $('#passwordCreateCertDetails').val();
    
        decryptWallet(localStorage.JSON, password)
            .then((wallet) => {
                wallet.provider = ethers.providers.getDefaultProvider('ropsten');

                //create a new instance of contract - because need signer info from wallet - 
                //if not - will get error message - signer is NULL
                let contractCreate = new Contract(contractAddress, contractABI, wallet);
                showInfo("wallet successfully loaded");

                //--get other details for the new certificate
                let name = $('#nameCreateCert').val();

                contractCreate.addCertificate(123, name, "Blockchain", "7 May 2018", "30 days", "CET", "1 June 2018", ipfsHash)
                    .then(txHash => {
                        console.log(txHash)
                    });
            });
    }//end createNewCert


});