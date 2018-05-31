pragma solidity ^0.4.22; 

contract Certificates { 
    mapping (uint => certContents[]) private userCertList; //staff id
    mapping (string => bool) private verifyCertificates; //based on IPFS generated hash
    
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
	
	
	function addCertificate(uint staffId, string certHolder, string courseAttended, string dateAttended, string duration, string issuer, string issueDate) public onlyOwner { 
        certContents memory tmp;
        
        tmp.staffId = staffId;
        tmp.certHolder = certHolder;
        tmp.courseAttended = courseAttended;
        tmp.dateAttended = dateAttended;
        tmp.duration = duration;
        tmp.issuer = issuer;
        tmp.issueDate = issueDate;
        tmp.image = "";
        
		certs.push(tmp); 
		userCertList[staffId].push(tmp);
	} 
	
	function countCertificates() view public returns (uint256) { 
		return certs.length; 
	} 
	
	function getCertificate(uint index) view public returns ( string certHolder, string courseAttended, string dateAttended, string duration, string issuer, string issueDate, string image) {
	    return (

	        certs[index].certHolder, 
	        certs[index].courseAttended,
	        certs[index].dateAttended,
            certs[index].duration,
            certs[index].issuer,
            certs[index].issueDate,
            certs[index].image
	        );
	} 
	
	function certHolderToIndex(uint Id, uint index) view public returns (string courseAttended) {
	    return userCertList[Id][index].courseAttended;
	}
	
	function verifyCertificate(string hash) view public returns (bool valid) {
	    return verifyCertificates[hash];
	}
}															
