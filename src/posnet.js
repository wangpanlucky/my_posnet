/**
 * Created by lucky on 16-7-28.
 */


//条形码->邮编
/*global module*/
/**
 * @return {boolean}
 */
function IsLegal(barCodes) {
    let result = Array.from(barCodes).filter(function (code) {
        return code === ' ' || code === '|' || code === ':';
    });
    return result.length === barCodes.length;
}

function isHaveBarFrame(barCodes) {
    let m = barCodes.length;
    let firstFrame = barCodes.slice(0, 2);
    let endFrame = barCodes.slice(m - 2, m);
    return !!(firstFrame[0] === '|' && firstFrame[1] === ' ' && endFrame[0] === ' ' && endFrame[1] === '|');
}

function getCodeList() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

function deleteFrame(barCodes) {
    return barCodes.substr(2, barCodes.length - 4);
}

function formatBarCodes(barcodes) {
    return barcodes.split(' ');
}

function filterSpace(barCodes) {
    return barCodes.filter(function (codes) {
        return codes.length === 5;
    });
}

function matchZipCodes(codeList, formatCodes) {
    let allCodes = formatCodes.map(function (code) {
        return codeList.indexOf(code);
    });
    return allCodes.reduce(function (pre, cur) {
        return pre.toString().concat(cur.toString());
    });
}

function checkCd(allCodes) {
    let array = allCodes.split('');
    let result = array.reduce(function (pre, cur) {
        return parseInt(pre) + parseInt(cur);
    });
    return result % 10 === 0;
}

function deleteCheckDigit(allCodes) {
    return allCodes.substr(0, allCodes.length - 1);
}

function finalFormat(zipCodes) {
    if (zipCodes.length == 9) {
        return zipCodes.substr(0, zipCodes.length - 4).concat('-').concat(zipCodes.substr(5, zipCodes.length - 5));
    }
    else
        return zipCodes;
}

function covertToZipCodes(barCodes) {
    if (!IsLegal(barCodes) && !isHaveBarFrame(barCodes)) {
        return "Please check your  barCodes,your input wrong!!!!!";
    }
    let codeList = getCodeList();
    let modifiedBarCodes = deleteFrame(barCodes);
    let formatCodes= formatBarCodes(modifiedBarCodes);
    let noSpaceCodes=filterSpace(formatCodes);
    let allCodes = matchZipCodes(codeList, noSpaceCodes);
    let zipCodes;
    if (!checkCd(allCodes)) {
        return undefined;
    } else {
        zipCodes = deleteCheckDigit(allCodes);
        return finalFormat(zipCodes);
    }
}

//邮编->条形码
function checkBit(zipCodes) {
    return zipCodes.length === 5 || zipCodes.length === 9 || zipCodes.length === 10;
}

function isInvalidZipCodes(zipCodes) {
    let result=zipCodes.split('');
    return result.every(function (element) {
        return !(isNaN(element)&&element!=='-');
    });
}

function getCodeLists() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

function formatCodes(zipCodes) {
    let modifiedCodes = zipCodes.split('-');
    return modifiedCodes.reduce(function (pre, cur) {
        return pre.toString().concat(cur.toString());
    })
}

function calculateCd(modifiedCodes) {
    let array = modifiedCodes.split('');
    let result = array.reduce(function (pre, cur) {
        return parseInt(pre) + parseInt(cur);
    });
    return result % 10 === 0 ? (result % 10).toString() : (10 - result % 10).toString();
}

function connectCodes(modifiedCodes, cd) {
    return modifiedCodes.concat(cd);
}

function matchBarCodes(newZipCodes, codeList) {
    let codes = newZipCodes.split('');
    let newZipCode = codes.map(function (code) {
        let code1 = parseInt(code);
        return codeList.find(function (code, index) {
            if (code1 === index) {
                return code;
            }
        })
    });
    return newZipCode.reduce(function (pre, cur) {
        return pre.concat(cur);
    });
}

function addBarFrame(newBarCodes) {
    return '| '.concat(newBarCodes).concat(' |');
}

function covertToBarcode(zipCodes) {
    if (!(checkBit(zipCodes)&&isInvalidZipCodes(zipCodes))) {
        return "please check your zipCodes,the input wrong!!!!!";
    }
    let codeList = getCodeLists();
    let modifiedCodes = formatCodes(zipCodes);
    let cd = calculateCd(modifiedCodes);
    let newZipCodes = connectCodes(modifiedCodes, cd);
    let newBarCodes = matchBarCodes(newZipCodes, codeList);
    return addBarFrame(newBarCodes);

}



module.exports = {IsLegal: IsLegal,
    isHaveBarFrame: isHaveBarFrame,
    getCodeList: getCodeList,
    deleteFrame: deleteFrame,
    formatBarCodes: formatBarCodes,
    filterSpace:filterSpace,
    matchZipCodes: matchZipCodes,
    checkCd: checkCd,
    deleteCheckDigit: deleteCheckDigit,
    finalFormat: finalFormat,
    covertToZipCodes: covertToZipCodes,
    checkBit: checkBit,
    isInvalidZipCodes:isInvalidZipCodes,
    getCodeLists: getCodeLists,
    formatCodes: formatCodes,
    calculateCd: calculateCd,
    connectCodes: connectCodes,
    matchBarCodes:matchBarCodes,
    addBarFrame: addBarFrame,
    covertToBarcode:covertToBarcode
};