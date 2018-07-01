pragma solidity ^0.4.22; 

contract Certificates { 
    mapping (uint => certContents[]) private userCertList; //by staff id - all courses attended
    mapping (string => bool) private verifyCertificates; //based on IPFS generated hash - true or false
    mapping (string => uint) private indexCertificates; //IPFS hash to array index in certs
    
	struct certContents {
	    uint staffId; //unique identifier
		string certHolder;
    	string courseAttended;
	    string dateAttended;
	    string duration;
	    string issuer;
	    string issueDate;
	    string image; //store in IPFS, by hash (string)
	}
	
	certContents[]  certs; 
	address private contractOwner;
	
	constructor() public { 
		contractOwner = msg.sender; 
	} 
	
	modifier onlyOwner() { 
		require(msg.sender == contractOwner); 
		_;
	}
	
	//add a new certificate to the contract
	function addCertificate(uint staffId, string certHolder, string courseAttended, string dateAttended, string duration, string issuer, string issueDate, string image) public onlyOwner { 
        certContents memory tmp;
        
        tmp.staffId = staffId;
        tmp.certHolder = certHolder;
        tmp.courseAttended = courseAttended;
        tmp.dateAttended = dateAttended;
        tmp.duration = duration;
        tmp.issuer = issuer;
        tmp.issueDate = issueDate;
        tmp.image = image;
        
		certs.push(tmp); 
		
		userCertList[staffId].push(tmp); //staff id to certificate
		indexCertificates[tmp.image] = certs.length - 1; //image hash to certs array index
		verifyCertificates[tmp.image] = true; //image hash to true 
	} 
	
	function getCertificate(string hash) view public returns (uint staffId, string certHolder, string courseAttended, string dateAttended, string duration, string issuer, string issueDate) {
        uint index = indexCertificates[hash];
	    return (
	        certs[index].staffId,
	        certs[index].certHolder, 
	        certs[index].courseAttended,
	        certs[index].dateAttended,
            certs[index].duration,
            certs[index].issuer,
            certs[index].issueDate
	        );
	} 
	
	function countCertificates() view public returns (uint256) { 
		return certs.length; 
	} 
	
	function certHolderToIndex(uint Id, uint index) view public returns (string certHolder, string courseAttended, string dateAttended, string duration, string issueDate, string image) {
	    return (
	        userCertList[Id][index].certHolder, 
	        userCertList[Id][index].courseAttended,
	        userCertList[Id][index].dateAttended,
            userCertList[Id][index].duration,
            userCertList[Id][index].issueDate,
			userCertList[Id][index].image
	        );
	}
	
	function countHolderCertificates(uint Id) view public returns (uint256) {
	    return userCertList[Id].length;
	}

	function verifyCertificate(string hash) view public returns (bool valid) {
	    return verifyCertificates[hash];
	}
}															
