/**
 * Created by lucky on 16-7-28.
 */
/*global require*/
const obj = require("../../src/posnet.js");

//条形码->邮编
describe("IsLegal", function () {
    it("judge the barCodes is legal", function () {
        let barCodes = "| :|::|:|:|:||:::: |";
        let result = obj.IsLegal(barCodes);
        expect(result).toEqual(true);
    });
});


describe ("isHaveBarFrame",function () {
  it("is have bar frame",function () {
    let barCodes="| :|::|:|:|:||:::: |";
    let result=obj.isHaveBarFrame(barCodes);
    expect(result).toEqual(true);
  });
});

describe("IsLegal", function () {
    it("judge the barCodes is legal", function () {
        let barCodes = "|:|::|:|:|:||:*:::|";
        let result = obj.IsLegal(barCodes);
        expect(result).toEqual(false);
    });
});

describe("getCodeList", function () {
    it("get number's barcode", function () {
        let expected = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        expect(obj.getCodeList()).toEqual(expected);
    });
});

describe("deleteFrame", function () {
    it("delete bar frame ", function () {
        let barCodes = "| ::|:| ::||: |";
        let expected = "::|:| ::||:";
        let result = obj.deleteFrame(barCodes);
        expect(result).toEqual(expected);
    });
});

describe("formatBarCodes", function () {
    it("split with ' '", function () {
        let barCodes = "::|:| ::||:";
        let expected = ["::|:|", "::||:"];
        let result = obj.formatBarCodes(barCodes);
        expect(result).toEqual(expected);
    });
});

describe("filterSpace", function () {
    it("split with ' '", function () {
        let barCodes = ["::|:|"," ","::||:"];
        let expected = ["::|:|","::||:"];
        let result;
        result = obj.filterSpace(barCodes);
        expect(result).toEqual(expected);
    });
});

describe("matchZipCodes", function () {
    it("match with codeList", function () {
        let codeList = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        let forMateCodes = ['::|:|', '::||:', ':|::|', ':|:|:', ':||::'];
        let expected = '23456';
        let result = obj.matchZipCodes(codeList, forMateCodes);
        expect(result).toEqual(expected);
    });
});

describe("checkCd", function () {
    it("check digit", function () {
        let codes = '23456';
        let result = obj.checkCd(codes);
        expect(result).toEqual(true);
    });
});

describe("deleteCheckDigit", function () {
    it("get zipPost ", function () {
        let allCodes = '23456';
        let expected = '2345';
        let result = obj.deleteCheckDigit(allCodes);
        expect(result).toEqual(expected);
    });
});

describe("finalFormat",function () {
    it("finally format",function () {
        let zipCodes="123456789";
        let expected="12345-6789";
        let result=obj.finalFormat(zipCodes);
        expect(result).toEqual(expected);
    });
});

describe("covertToZipCodes", function () {
    it("get final zipCodes", function () {
        let barCodes = "| ::|:|  ::||:  :|::|  :|:|:   :||:: |";
        let zipCodes = '2345';
        let result = obj.covertToZipCodes(barCodes);
        expect(result).toEqual(zipCodes);
    });
    it("should return undefined if barcode is invalid", function () {
        let barCodes = "| ::|:| ::||: :|::| :|:|: :||::invalid char |";
        let result = obj.covertToZipCodes(barCodes);
        expect(result).toBeUndefined();
    });
});

//邮编->条形码
describe("checkBit", function () {
    it("check bit", function () {
        let zipCodes = '23456';
        let result = obj.checkBit(zipCodes);
        expect(result).toEqual(true);
    });
});

describe("isInvalidZipCodes",function () {
    it("judge the zipCode ",function () {
        let zipCodes='45678-9032';
        let result=obj.isInvalidZipCodes(zipCodes);
        expect(result).toEqual(true);
    });
});

describe("getCodeLists", function () {
    it("get number's barcode", function () {
        let expected = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        expect(obj.getCodeLists()).toEqual(expected);
    });
});

describe("formatCodes", function () {
    it("get number", function () {
        let zipCodes = '2345-6';
        let expected = '23456';
        let result = obj.formatCodes(zipCodes);
        expect(result).toEqual(expected);
    });
});

describe("calculateCd", function () {
    it("get checkDigit", function () {
        let modifiedCodes = '23456';
        let expected = '0';
        let result = obj.calculateCd(modifiedCodes);
        expect(result).toEqual(expected);
    });
});


describe("connectCodes", function () {
    it("connect codes and cd", function () {
        let modifiedCodes = '23456';
        let cd = '0';
        let expected = '234560';
        let result = obj.connectCodes(modifiedCodes, cd);
        expect(result).toEqual(expected);
    });
});


describe("matchBarCodes", function () {
    it("match zipCodes with code list", function () {
        let codeList = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        let newZipCodes = '234560';
        let expected = "::|:|::||::|::|:|:|::||::||:::";
        let result = obj.matchBarCodes(newZipCodes, codeList);
        expect(result).toEqual(expected);
    });
});

describe("addBarFrame", function () {
    it("add bar frame", function () {
        let newBarCodes = "::|:|::||::|::|:|:|::||::||:::";
        let expected = "|::|:|::||::|::|:|:|::||::||:::|";
        let result = obj.addBarFrame(newBarCodes);
        expect(result).toEqual(expected);
    });
});

describe("covertToBarcode", function () {
    it("get final zipCodes", function () {
        let zipCodes = '23456';
        let barCodes = "| ::|:|::||::|::|:|:|::||::||::: |";
        let result = obj.covertToBarcode(zipCodes);
        expect(result).toEqual(barCodes);
    });
    it("should return undefined if zipCode's bit is wrong", function () {
        let zipCodes = "23";
        let result = obj.covertToBarcode(zipCodes);
        expect(result).toBeUndefined();
    });
});
