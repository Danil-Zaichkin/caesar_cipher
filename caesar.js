let arg = process.argv;
let mode = arg[2];
let fs = require('fs');

let alph = new Array(26);
for (let i = 0; i < alph.length; i++) {
    alph[i] = String.fromCharCode(97+i);
}

if (mode === 'mode1') {
    let key = parseInt(arg[3]);
    let data = fs.readFileSync('inputN.txt').toString()

    function encrypt(data, key) {
        let out = '';
        for (let i = 0; i < data.length; i++) {
            out += alph[(data.charCodeAt(i)-97+key)%alph.length]
        }
        return out
    }

    function decryptWithKey(data, key) {
        let out = '';
        for (let i = 0; i < data.length; i++) {
            out += alph[(alph.length+data.charCodeAt(i)-97-key)%alph.length]
        }
        return out
    }

    fs.writeFileSync('encrypt.txt', encrypt(data, key))
    fs.writeFileSync('decrypt.txt', decryptWithKey(encrypt(data, key), key))
} else if (mode === 'mode2') {
    let data = fs.readFileSync('encrypt.txt').toString()



    let cf = [8.17, 1.49, 2.78, 4.25, 12.7, 2.23, 2.02, 6.09,
        6.97, 0.15, 0.77, 4.03, 2.41, 6.75, 7.51, 1.93, 0.1,
        5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.05
    ];

    function decryptedWithCF(encryptedData, cf) {
        let ff = new Array(26);
        for (let i = 0; i < ff.length; i++) {
            ff[i] = 0;
        }
        for (let i = 0; i < encryptedData.length; i++) {
            ff[encryptedData.charCodeAt(i)-97]++
        }
        for (let i =0; i < ff.length; i++) {
            ff[i] = ff[i] / encryptedData.length * 100
        }
        let argMin = 0;
        let minSum = Number.MAX_VALUE;
        for (let k = 0; k < alph.length; k++) {
            let sum = 0;

            for (let i = 0; i < alph.length; i++) {
                sum += (cf[i] - ff[(i+k)%alph.length])*(cf[i] - ff[(i+k)%alph.length])
            }
            if (sum < minSum) {
                minSum = sum;
                argMin = k;
            }
        }
        return argMin
    }
    console.log(decryptedWithCF(data, cf))
}










