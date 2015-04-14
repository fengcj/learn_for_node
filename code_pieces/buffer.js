// Buffer is a global construct function provided by Node
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(bin[0]);

var str = bin.toString("utf-8");
console.log(str);

// One important different between String and Buffer is: Buffer is mutable,while String is imutalbe. Buffer is more like a string array in C.
bin[0] = 0x48;

// Copy a Buffer
var dup = new Buffer(bin.length);
bin.copy(dup);
dup[0] = 0x68;

console.log(bin);
console.log(dup);