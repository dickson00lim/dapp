const Certificates = artifacts.require("Certificates");


contract("Certificates", function (accounts) {
    //add a new certificate - get the details of the newly added certificate based on image hash
    //details of certicate should be the same
    it("add new certificate", async function () {
        let cert = await Certificates.deployed();

        await cert.addCertificate(123, "John", "Blockchain", "7 May 2018", "30 days", "CET", "1 June 2018", "QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2");

        let testCert = await cert.getCertificate("QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2");

        assert.equal(testCert.toString(), "123,John,Blockchain,7 May 2018,30 days,CET,1 June 2018", "did not add cert correctly");
    });

    //count the number of certificates - count should be 1
    it("count certificate", async function () {
        let cert = await Certificates.deployed();

        let num = await cert.countCertificates();

        assert.equal(num.toString(), "1", "did not count cert correctly");
    });

    //verify the certificate based on existing image hash - result should be true
    it("verify existing certificate", async function () {
        let cert = await Certificates.deployed();

        let verify = await cert.verifyCertificate("QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2");

        assert.equal(verify.toString(), "true", "did not verify cert correctly");
    });

    //verify the certificate based on non-existing image hash - result should be true
    it("verify non existing certificate", async function () {
        let cert = await Certificates.deployed();

        let verify = await cert.verifyCertificate("nnSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2");

        assert.equal(verify.toString(), "false", "did not verify cert correctly");
    });

    //add the second certificate - of another staff ID
    //details of certicate should be the same
    it("add second certificate", async function () {
        let cert = await Certificates.deployed();

        await cert.addCertificate(789, "Lily", "Blockchain", "7 May 2018", "30 days", "CET", "1 June 2018", "QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj4");

        let testCert = await cert.getCertificate("QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj4");

        assert.equal(testCert.toString(), "789,Lily,Blockchain,7 May 2018,30 days,CET,1 June 2018", "did not add second cert correctly");
    });

    //count the number of certificates - count should be 2
    it("count second certificate", async function () {
        let cert = await Certificates.deployed();

        let num = await cert.countCertificates();

        assert.equal(num.toString(), "2", "did not count cert correctly");
    });

    //count the number of certificates based on staff ID 123 - count should be 1
    it("count certificate for staff ID 123", async function () {
        let cert = await Certificates.deployed();

        let holderCount = await cert.countHolderCertificates(123);

        assert.equal(holderCount.toString(), "1", "did not count holder cert correctly");
    });

    //get the details of certificates based on staff ID 123
    it("get certificate for staff ID 123", async function () {
        let cert = await Certificates.deployed();

        let holderCert = await cert.certHolderToIndex(123, 0); //index 0 - first cert

        assert.equal(holderCert.toString(), "John,Blockchain,7 May 2018,30 days,1 June 2018,QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2", "did not get holder cert correctly");
    });

    //add the third certificate - for the first staff ID 123
    //details of certicate should be the same
    it("add third certificate", async function () {
        let cert = await Certificates.deployed();

        await cert.addCertificate(123, "John", "Java", "7 Sep 2018", "3 days", "CET", "1 Oct 2018", "QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj6");

        let testCert = await cert.getCertificate("QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj6");

        assert.equal(testCert.toString(), "123,John,Java,7 Sep 2018,3 days,CET,1 Oct 2018", "did not add second cert correctly");
    });

    //count the number of certificates - count should be 3
    it("count third certificate", async function () {
        let cert = await Certificates.deployed();

        let num = await cert.countCertificates();

        assert.equal(num.toString(), "3", "did not count cert correctly");
    });

    //count the number of certificates based on staff ID 123 - count should be 2
    it("count certificate for staff ID 123", async function () {
        let cert = await Certificates.deployed();

        let holderCount = await cert.countHolderCertificates(123);

        assert.equal(holderCount.toString(), "2", "did not count holder cert correctly");
    });

    //get the details of all certificates based on staff ID 123 - should have 2 certificates
    it("get all certificates for staff ID 123", async function () {
        let cert = await Certificates.deployed();

        let holderCount = await cert.countHolderCertificates(123);
        let i = 0;
        let holderCert = "";
        for (i = 0; i < holderCount; i++)  {
            holderCert += await cert.certHolderToIndex(123, i); //index i
            holderCert += "-";
        }

        assert.equal(holderCert.toString(), "John,Blockchain,7 May 2018,30 days,1 June 2018,QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj2-John,Java,7 Sep 2018,3 days,1 Oct 2018,QmSCfVVZ8TCrWKoW5od9nhRC7DceGNM5THWUK6mmnWijj6-", "did not get holder cert correctly");
    });
});
