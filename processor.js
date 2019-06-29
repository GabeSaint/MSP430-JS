var zflg;
var cflg;
var nflag;
var lineValue = 0;

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  value: "",
  indentUnit: 0,
  lineSeparator: null


});

                                                        //var for what line we read

var registers = new Int16Array(16);                                                                     // register variables
var mregisters = new Int16Array(16);                                       // memory register variables


function clear(){                                                               //clears all registers and resets linecounter
lineValue = 0;                                                            //var for what line we read

registers = new Int16Array(16);                                                                     // register variables
mregisters = new Int16Array(16);

}

function stepForward(){

var program = editor.doc.getLine(lineValue)
var split_code = program.split(" ",5);
var first = split_code[0];
first = first.toUpperCase();
var second = parseInt(split_code[1]);
var third = parseInt(split_code[2]);
var fourth = parseInt(split_code[3]);
var fifth = parseInt(split_code[4]);
processor(first, second, third, fourth, fifth, lineValue);
alert(first);
document.getElementById("topLevel").innerHTML = "register 0 is " + registers[0]

lineValue++;

}

function showInfo(){
var line_count= editor.doc.lineCount();

for (var i = 0; i <line_count; i++) {
    var program = editor.doc.getLine(i);
    var split_code = program.split(" ",5);
    var first = split_code[0];
    first = first.toUpperCase();
    var second = parseInt(split_code[1]);
    var third = parseInt(split_code[2]);
    var fourth = parseInt(split_code[3]);
    var fifth = parseInt(split_code[4]);

    processor(first, second, third, fourth, fifth, i);
    document.getElementById("topLevel").innerHTML = "register 0 is " + registers[0];

    // create new function to show bit string

    document.getElementById("register0res").innerHTML = registers[0];
    document.getElementById("register1res").innerHTML = registers[1];
    document.getElementById("register2res").innerHTML = registers[2];
    document.getElementById("register3res").innerHTML = registers[3];

  }


}

function processor(first, second, third, fourth, fifth, lineValue){
if(first == "MOV"){
  mov(second, third, fourth, fifth);
  alert("move has been selected")
}
else if(first == "CMP"){
  cmp(second, third, fourth, fifth);
}
else if(first == "ADD"){
  add(second, third, fourth, fifth);
}
else if(first == "ADDC"){
  addc(second, third, fourth, fifth);
}
else if(first == "INV"){
  inv(second, third, fourth, fifth);
}
else if(first == "OR"){
  or(second, third, fourth, fifth);
}
else if(first == "XOR"){
  xor(second, third, fourth, fifth);
}
else if(first == "AND"){
  and(second, third, fourth, fifth);
}
else if(first == "RRC"){
  rrc(second, third);
}
else if(first == "RRA"){
  rra(second, third);
}
else if(first == "CALL"){
  call(second, third);
}
else if(first == "RET"){
  ret(lineValue);

}
else if(first == "JMZ"){
  jmz();
}
else if(first == "JMC"){
  jmc();
}
else if(first == "JMN"){
  jmn();
}
else if(first == "JMU"){
  jmu();
}
else{
  lineAlert = lineValue + 1;
  var text = "Unknown operation detected at "+ lineAlert;
  alert(text);
}
}

function mov(second, third, fourth, fifth){

var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;
var sourceValue;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= sourceValue;
}
else if(ad == 1){
  mregisters[dest]= sourceValue;
}
}
function cmp(second, third, fourth, fifth){

var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;
var sourceValue;
var compareValue;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  compareValue = registers[dest]-sourceValue;
}
else if(ad == 1){
  compareValue = mregisters[dest]-sourceValue;
}
if(compareValue = 0){
  zflg = 1;
}
else if(compareValue != 0){
  zflg = 0;
}
if(compareValue < 0){
  nflg = 1;
}
else if(compareValue >= 0){
  nflg = 0;
}


}
function add(second, third, fourth, fifth){

var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;
var sourceValue;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= registers[dest]+sourceValue;

  if(registers[dest] > 32767){
    cflg = 1;
  }
  else if(registers[dest] < 32767){
    cflg = 0;
}
}
else if(ad == 1){
  mregisters[dest]= mregisters[dest]+sourceValue;
  if(mregisters[dest] > 32767){
    cflg = 1;
  }
  else if(mregisters[dest] < 32767){
    cflg = 0;
  }
}


}
function addc(second, third, fourth, fifth){

var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= registers[dest]+sourceValue+cflg;
  if(registers[dest] > 32767){
    cflg = 1;
  }
  else if(registers[dest] < 32767){
    cflg = 0;
  }
}
else if(ad == 1){
  mregisters[dest]= mregisters[dest]+sourceValue+cflg;
  if(mregisters[dest] > 32767){
    cflg = 1;
  }
  else if(mregisters[dest] < 32767){
    cflg = 0;
  }
}
}
function inv(second, third, fourth, fifth){
var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= ~sourceValue;
}
else if(ad == 1){
  mregisters[dest]= ~sourceValue;
}
}
function or(second, third, fourth, fifth){
var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= registers[dest]|sourceValue;
}
else if(ad == 1){
  mregisters[dest]= mregisters[dest]|sourceValue;
}
}
function xor(second, third, fourth, fifth){
var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= registers[dest]^sourceValue;
}
else if(ad == 1){
  mregisters[dest]= mregisters[dest]^sourceValue;
}
}
function and(second, third, fourth, fifth){
var dest = second % 16;
var source = third % 16;
var ad = fourth % 2;
var as = fifth % 4;

if(as == 0){
    sourceValue = registers[source];
}
else if(as == 1){
    sourceValue = mregisters[source];
}
else if(as == 2){
    sourceValue = source;
}
else if(as == 3){
    sourceValue = source*17;
}
if(ad == 0){
  registers[dest]= registers[dest]&sourceValue;
}
else if(ad == 1){
  mregisters[dest]= mregisters[dest]&sourceValue;
}
}
function rrc(second, third){
var dest = second % 16;
var ad = third % 2;
}
function rra(second, third, fourth, fifth){
var dest = second % 16;
var ad = third % 2;
}
function call(second, third, fourth, fifth){
var dest = second % 16;
var ad = third % 2;

if(ad == 0){
  lineValue= registers[dest] + 1;
}
else if(ad == 0){
  lineValue = mregisters[dest] + 1;
}
}

function ret(lineValue){

}
function jmz(second, third, fourth, fifth){

}
function jmc(second, third, fourth, fifth){

}
function jmn(second, third, fourth, fifth){

}
function jmu(second, third, fourth, fifth){

}

function checkValues(dest,source,ad,as){

}
