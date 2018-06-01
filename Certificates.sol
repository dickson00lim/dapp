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
		
		userCertList[staffId].push(tmp);
		indexCertificates[tmp.image] = certs.length - 1;
		verifyCertificates[tmp.image] = true;
	} 
	
	function countCertificates() view public returns (uint256) { 
		return certs.length; 
	} 
	
	function countHolderCertificates(uint Id) view public returns (uint256) {
	    return userCertList[Id].length;
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
	
	function certHolderToIndex(uint Id, uint index) view public returns (string courseAttended) {
	    return userCertList[Id][index].courseAttended;
	}
	
	function verifyCertificate(string hash) view public returns (bool valid) {
	    return verifyCertificates[hash];
	}
}															
