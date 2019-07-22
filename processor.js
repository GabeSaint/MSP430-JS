var zflg;
var cflg;
var nflag;
var lineValue = 0;

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  indentUnit: 0,
  lineSeparator: null,
  firstLineNumber: 0


});

                                                        //var for what line we read

var registers = new Int16Array(16);                                                                     // register variables
var mregisters = new Int16Array(256);
var stack = [0, 0 ,0 ,0, 0 ,0];
var stackPointer = -1;                                                          // memory register variables

//Fill registers with random numbers
for(var i = 0; i < 16; i++){
//Get random number between 0 and 3
var randomNeg = Math.floor((Math.random()*3)+1);
registers[i] = Math.floor((Math.random()*32767)+1) * Math.pow(-1,randomNeg);
}
for(var i = 0; i < 256; i++){
//Get random number between 0 and 3
var randomNeg = Math.floor((Math.random()*3)+1)
mregisters[i] = Math.floor((Math.random()*32767)+1) * Math.pow(-1,randomNeg);
}
showRegisters();

function clearRegisters(){                                                               //clears all registers and resets linecounter                                                      //var for what line we read
for(var i = 0; i < 16; i++){
  registers[i] = 0
}
for(var i = 0; i < 16; i++){
  mregisters[i] = 0
}
stack.splice(0,4);
stackPointer = -1;
showRegisters();
}

function stepForward(){

var program = editor.doc.getLine(lineValue);

if(/\S/.test(program)){
  var split_code = program.split(" ",5);
  var first = split_code[0];
  first = first.toUpperCase();
  var second = parseInt(split_code[1]);
  var third = parseInt(split_code[2]);
  var fourth = parseInt(split_code[3]);
  var fifth = parseInt(split_code[4]);
  lineValue = processor(first, second, third, fourth, fifth, lineValue);
  document.getElementById("topLevel").innerHTML = "register 0 is " + registers[0]
  lineValue++;
}
else {
  lineValue++;
}
showRegisters();
}

function submit(){
$("#machineDisplay").html(""); // Clear Contents
var line_count= editor.doc.lineCount();

for (var i = 0; i <line_count; i++) {
    var program = editor.doc.getLine(i);
    if(/\S/.test(program)){
      var split_code = program.split(" ",6);
      var first = split_code[0];

      first = first.toUpperCase();
      var second = parseInt(split_code[1]);
      var third = parseInt(split_code[2]);
      var fourth = parseInt(split_code[3]);
      var fifth = parseInt(split_code[4]);
      i = processor(first, second, third, fourth, fifth, i);
      machineCoder(first, second, third, fourth, fifth);
    }
    else{

    }

}
showRegisters();
}


function showRegisters(){

    // Show Decimal Value

  document.getElementById("register0res").innerHTML = registers[0];
  document.getElementById("register1res").innerHTML = registers[1];
  document.getElementById("register2res").innerHTML = registers[2];
  document.getElementById("register3res").innerHTML = registers[3];
  document.getElementById("register4res").innerHTML = registers[4];
  document.getElementById("register5res").innerHTML = registers[5];
  document.getElementById("register6res").innerHTML = registers[6];
  document.getElementById("register7res").innerHTML = registers[7];
  document.getElementById("register8res").innerHTML = registers[8];
  document.getElementById("register9res").innerHTML = registers[9];
  document.getElementById("register10res").innerHTML = registers[10];
  document.getElementById("register11res").innerHTML = registers[11];
  document.getElementById("register12res").innerHTML = registers[12];
  document.getElementById("register13res").innerHTML = registers[13];
  document.getElementById("register14res").innerHTML = registers[14];
  document.getElementById("register15res").innerHTML = registers[15];

  // Show Bit Value

  document.getElementById("register0bits").innerHTML = getStringBits(registers[0]);
  document.getElementById("register1bits").innerHTML = getStringBits(registers[1]);
  document.getElementById("register2bits").innerHTML = getStringBits(registers[2])
  document.getElementById("register3bits").innerHTML = getStringBits(registers[3]);
  document.getElementById("register4bits").innerHTML = getStringBits(registers[4]);
  document.getElementById("register5bits").innerHTML = getStringBits(registers[5]);
  document.getElementById("register6bits").innerHTML = getStringBits(registers[6]);
  document.getElementById("register7bits").innerHTML = getStringBits(registers[7]);
  document.getElementById("register8bits").innerHTML = getStringBits(registers[8]);
  document.getElementById("register9bits").innerHTML = getStringBits(registers[9]);
  document.getElementById("register10bits").innerHTML = getStringBits(registers[10]);
  document.getElementById("register11bits").innerHTML = getStringBits(registers[11]);
  document.getElementById("register12bits").innerHTML = getStringBits(registers[12]);
  document.getElementById("register13bits").innerHTML = getStringBits(registers[13]);
  document.getElementById("register14bits").innerHTML = getStringBits(registers[14]);
  document.getElementById("register15bits").innerHTML = getStringBits(registers[15]);

// Show Decimal Value - for memory
/*
  document.getElementById("mregister0res").innerHTML = mregisters[0];
  document.getElementById("mregister1res").innerHTML = mregisters[1];
  document.getElementById("mregister2res").innerHTML = mregisters[2];
  document.getElementById("mregister3res").innerHTML = mregisters[3];
  document.getElementById("mregister4res").innerHTML = mregisters[4];
  document.getElementById("mregister5res").innerHTML = mregisters[5];
  document.getElementById("mregister6res").innerHTML = mregisters[6];
  document.getElementById("mregister7res").innerHTML = mregisters[7];
  document.getElementById("mregister8res").innerHTML = mregisters[8];
  document.getElementById("mregister9res").innerHTML = mregisters[9];
  document.getElementById("mregister10res").innerHTML = mregisters[10];
  document.getElementById("mregister11res").innerHTML = mregisters[11];
  document.getElementById("mregister12res").innerHTML = mregisters[12];
  document.getElementById("mregister13res").innerHTML = mregisters[13];
  document.getElementById("mregister14res").innerHTML = mregisters[14];
  document.getElementById("mregister15res").innerHTML = mregisters[15];

  // Show Bit Value - for memory

  document.getElementById("mregister0bits").innerHTML = getStringBits(mregisters[0]);
  document.getElementById("mregister1bits").innerHTML = getStringBits(mregisters[1]);
  document.getElementById("mregister2bits").innerHTML = mregisters[2].toString(2);
  document.getElementById("mregister3bits").innerHTML = mregisters[3].toString(2);
  document.getElementById("mregister4bits").innerHTML = mregisters[4].toString(2);
  document.getElementById("mregister5bits").innerHTML = mregisters[5].toString(2);
  document.getElementById("mregister6bits").innerHTML = mregisters[6].toString(2);
  document.getElementById("mregister7bits").innerHTML = mregisters[7].toString(2);
  document.getElementById("mregister8bits").innerHTML = mregisters[8].toString(2);
  document.getElementById("mregister9bits").innerHTML = mregisters[9].toString(2);
  document.getElementById("mregister10bits").innerHTML = mregisters[10].toString(2);
  document.getElementById("mregister11bits").innerHTML = mregisters[11].toString(2);
  document.getElementById("mregister12bits").innerHTML = mregisters[12].toString(2);
  document.getElementById("mregister13bits").innerHTML = mregisters[13].toString(2);
  document.getElementById("mregister14bits").innerHTML = mregisters[14].toString(2);
  document.getElementById("mregister15bits").innerHTML = mregisters[15].toString(2);
*/
// Stack Output

  document.getElementById("stackbits0").innerHTML = stack[3];
  document.getElementById("stackbits1").innerHTML = stack[2];
  document.getElementById("stackbits2").innerHTML = stack[1];
  document.getElementById("stackbits3").innerHTML = stack[0];
}

function getStringBits(regValue){
var regBit;
if(regValue < 0){
  regBit = (regValue>>>0).toString(2);
  regBit = regBit.slice(17,32);
  regBit = "1"+regBit;
}
else{
   regBit = regValue.toString(2);
   while(regBit.length < 16){
     regBit = "0" + regBit;
   }
}
return regBit;
}




function processor(first, second, third, fourth, fifth, lineValue){
var lineValue = lineValue;
if(first == "MOV"){
  mov(second, third, fourth, fifth);
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
  lineValue = call(second, third)-1;
}
else if(first == "RET"){
  lineValue = ret(lineValue)-1;

}
else if(first == "JMZ"){
  lineValue = jmz(second, lineValue)-1;
}
else if(first == "JMC"){
  lineValue = jmc(second, lineValue)-1;
}
else if(first == "JMN"){
  lineValue = jmn(second, lineValue)-1;
}
else if(first == "JMU"){
  lineValue = jmu(second, lineValue)-1;
}
else if(first == "ALERT"){
  second = second.toString();
  alert(second);
}
else{
  var text = "Unknown operation detected at "+ lineValue;
  alert(text);
}
return lineValue;
}

function mov(second, third, fourth, fifth){

var dest = Math.abs(second % 16);
var source = Math.abs(third % 16);
var ad = Math.abs(fourth % 2);
var as = Math.abs(fifth % 4);
var sourceValue;
cflg = 0;


if(as == 0){
    sourceValue = registers[source];
    //check if the value is zero for the z flag
    if(sourceValue == 0){
      zflg = 1;
    }
    else {
      zflg = 0;
    }
    if(sourceValue < 0){
      nflg = 1;
    }
    else{
      nflg = 0;
    }
}
else if(as == 1){
    var mregsource = regster[source] % 255;
    sourceValue = mregisters[mregsource];
    //check if the value is zero for the z flag
    if(sourceValue == 0){
      zflg = 1;
    }
    else {
      zflg = 0;
    }
    if(sourceValue < 0){
      nflg = 1;
    }
    else{
      nflg = 0;
    }
}
else if(as == 2){
    sourceValue = source;
    nflg = 0;
    //check if the value is zero for the z flag
    if(sourceValue == 0){
      zflg = 1;
    }
    else {
      zflg = 0;
    }
}
else if(as == 3){
    sourceValue = source*17;
    nflg = 0;
    //check if the value is zero for the z flag
    if(sourceValue == 0){
      zflg = 1;
    }
    else {
      zflg = 0;
    }
}
if(ad == 0){
  registers[dest]= sourceValue;
}
else if(ad == 1){
  var mregdest = register[dest] % 255
  mregisters[mregdest]= sourceValue;
}
}
function cmp(second, third, fourth, fifth){

  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
  var sourceValue;
  var compareValue;
  var compareCarryCheck;

  if(as == 0){
      sourceValue = registers[source];
  }
  else if(as == 1){
      var mregsource = register[source] % 255;
      sourceValue = mregisters[mregsource];
  }
  else if(as == 2){
      sourceValue = source;
  }
  else if(as == 3){
      sourceValue = source*17;
  }
  if(ad == 0){
    compareValue = registers[dest]-sourceValue;
    compareCarryCheck = registers[dest]+65536-sourceValue;

  }
  else if(ad == 1){
    var mregdest = register[dest] % 255
    compareValue = mregisters[mregdest]-sourceValue;
    compareCarryCheck = mregisters[mregdest] + 65536 - sourceValue;
  }
  //check if value is zero or negative
  if(compareValue == 0){
    zflg = 1;
  }
  else {
    zflg = 0;
  }
  if(compareValue < 0){
    nflg = 1;
  }
  else {
    nflg = 0;
  }
  if(compareCarryCheck > 65535){
    cflg = 1;
  }
  else{
    cflg = 0;
  }
  }
function add(second, third, fourth, fifth){

  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
  var sourceValue;
  var addCheck;

  if(as == 0){
      sourceValue = registers[source];
  }
  else if(as == 1){
      var mregsource = registers[source];
      sourceValue = mregisters[mregsource];
  }
  else if(as == 2){
      sourceValue = source;
  }
  else if(as == 3){
      sourceValue = source*17;
  }
  if(ad == 0){
    addCheck = registers[dest]+sourceValue;
    registers[dest]= registers[dest]+sourceValue;
  }
  else if(ad == 1){
    var mregdest = registers[dest];
    addCheck = mregisters[mregdest]+sourceValue;
    mregisters[mregdest]= mregisters[mregdest]+sourceValue;
  }
  //check for the value of flags
  if(addCheck == 0){
    zflg = 1;
  }
  else {
    zflg = 0;
  }
  if(addCheck > 32767 || addCheck < -32768){
    cflg = 1;
  }
  else {
    cflg = 0;
  }
  if(addCheck < 0){
    nflg = 1;
  }
  else {
    nflg = 0;
  }
  }
function addc(second, third, fourth, fifth){

  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
  //need function variable to track value of source
  var sourceValue;
  //need function variable to store a value that goes over the the limits of 16 bit signed integar -32768 < x < 32767
  var addCheck;
  if(as == 0){
      sourceValue = registers[source];
  }
  else if(as == 1){
    var mregsource = registers[source];
      sourceValue = mregisters[mregsource];
  }
  else if(as == 2){
      sourceValue = source;
  }
  else if(as == 3){
      sourceValue = source*17;
  }
  if(ad == 0){
    addCheck = registers[dest]+sourceValue+cflg;
    registers[dest] = registers[dest]+sourceValue+cflg;
  }
  else if(ad == 1){
    var mregdest = registers[dest];
    addCheck = mregisters[mregdest]+sourceValue+cflg;
    mregisters[mregdest]= mregisters[mregdest]+sourceValue+cflg;
  }
  //check for the value of flags
  if(addCheck == 0){
    zflg = 1;
  }
  else {
    zflg = 0;
  }
  if(addCheck > 32767 || addCheck < -32768){
    cflg = 1;
  }
  else {
    cflg = 0;
  }
  if(addCheck < 0){
    nflg = 1;
  }
  else {
    nflg = 0;
  }
  }
function inv(second, third, fourth, fifth){
  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
  //need function variable to track value of source
  var sourceValue;

  if(as == 0){
      sourceValue = registers[source];
  }
  else if(as == 1){
      var mregsource = registers[source];
      sourceValue = mregisters[mregsource];
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
    var mregdest = registers[dest]
    mregisters[dest]= ~sourceValue;
  }
}
function or(second, third, fourth, fifth){
    var dest = Math.abs(second % 16);
    var source = Math.abs(third % 16);
    var ad = Math.abs(fourth % 2);
    var as = Math.abs(fifth % 4);
    //need function variable to track value of source
    var sourceValue;

    if(as == 0){
        sourceValue = registers[source];
    }
    else if(as == 1){
        var mregsource = registers[source]
        sourceValue = mregisters[mregsource];
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
      var mregdest = registers[dest];
      mregisters[dest]= mregisters[mregdest]|sourceValue;
    }
  }
function xor(second, third, fourth, fifth){
    var dest = Math.abs(second % 16);
    var source = Math.abs(third % 16);
    var ad = Math.abs(fourth % 2);
    var as = Math.abs(fifth % 4);
    //need function variable to track value of source
    var sourceValue;

    if(as == 0){
        sourceValue = registers[source];
    }
    else if(as == 1){
        var mregsource = register[source];
        sourceValue = mregisters[mregsource];
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
      var mregdest = register[dest];
      mregisters[dest]= mregisters[mregdest]^sourceValue;
    }
}
function and(second, third, fourth, fifth){
  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
  //need function variable to track value of source
  var sourceValue;

  if(as == 0){
      sourceValue = registers[source];
  }
  else if(as == 1){
      var mregsource = registers[source];
      sourceValue = mregisters[mregsource];
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
    var mregdest = registers[dest];
    mregisters[dest]= mregisters[mregdest]&sourceValue;
  }
}
function rrc(second, third){
var dest = Math.abs(second % 16);
var ad = Math.abs(third % 2);
var sourceValue;
var sourceValueShifted;
if(ad == 0){
  sourceValue= registers[dest];
  if(sourceValue > 0){
    var oddCheckPositive = sourceValue % 2;
    if(oddCheckPositive != 0){                                                        //If its odd
      sourceValueShifted = sourceValue >> 1;
      sourceValueShifted = sourceValueShifted | 0x4000;
    }
    else if(oddCheckPositive == 0){                                                  //If its even
      sourceValueShifted = sourceValue >> 1;
    }
}
else if(sourceValue < 0){
  var oddCheckNegative = sourceValue % 2;
  if(oddCheckNegative != 0){                                                        //If its odd
    sourceValueShifted = sourceValue >> 1;
  }
  else if(oddCheckNegative == 0){                                                  //If its even
    sourceValueShifted = sourceValue >> 1;
    sourceValueShifted = sourceValueShifted ^ 0x4000;
  }
}
else{
  registers[dest] = 0;
}
registers[dest] = sourceValueShifted;
}
else if(ad == 1){
  var mregdest = registers[dest];
  sourceValue= mregisters[mregdest];
  if(sourceValue > 0){
    var oddCheckPositive = sourceValue % 2;
    if(oddCheckPositive != 0){                                                        //If its odd
      sourceValueShifted = sourceValue >> 1;
      sourceValueShifted = sourceValueShifted | 0x4000;
    }
    else if(oddCheckPositive == 0){                                                  //If its even
      sourceValueShifted = sourceValue >> 1;
    }
  }
  else if(sourceValue < 0){
  var oddCheckNegative = sourceValue % 2;
  if(oddCheckNegative != 0){                                                        //If its odd
    sourceValueShifted = sourceValue >> 1;
  }
  else if(oddCheckNegative == 0){                                                  //If its even
    sourceValueShifted = sourceValue >> 1;
    sourceValueShifted = sourceValueShifted ^ 0x4000;
  }
  }
  else{
  var mregdest = registers[dest];
  mregisters[mregdest] = 0;
  }
  registers[dest];
}
}
function rra(second, third, fourth, fifth){
var dest = Math.abs(second % 16);
var ad = Math.abs(third % 2);
var sourceValue;
var sourceValueShifted;
if(ad == 0){
  sourceValue= registers[dest];
  var checkOdd = sourceValue % 2;
  if(checkOdd != 0){                                                            // if its odd
    sourceValueShifted = sourceValue >>> 1;
    sourceValueShifted = sourceValueShifted | 0x8000;
  }
  else if(checkOdd == 0){                                                       //if its even
    sourceValueShifted = sourceValue >>> 1;
  }
  registers[dest]=sourceValueShifted;
}
if(ad == 1){
  sourceValue= mregisters[dest];
  var checkOdd = sourceValue % 2;
  if(checkOdd != 0){                                                            // if its odd
    sourceValueShifted = sourceValue >>> 1;
    sourceValueShifted = sourceValueShifted | 0x8000;
  }
  else if(checkOdd == 0){                                                       //if its even
    sourceValueShifted = sourceValue >>> 1;
  }
  var mregdest = registers[dest];
  mregisters[mregdest]=sourceValueShifted;
}
}
function call(second, third, fourth, fifth){
var dest = Math.abs(second % 16);
var ad = Math.abs(third % 2);

if(ad == 0){
  if(stackPointer == 3){
    //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
    //To the value in stack aswell to show the line number in the codemirror
    stack[stackPointer+1]=lineValue+1;
    //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
    lineValue = registers[dest];
    //We need to take the last 4 values of the stack
    stack.splice(0,1);
    stackUpdate(stackPointer);


  }
  else{
    //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
    //To the value in stack aswell to show the line number in the codemirror
    stack[stackPointer+1]=lineValue+1;
    //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
    lineValue = mregisters[dest];
    stackPointer++;
    stackUpdate(stackPointer);
  }
}

else if(ad == 1){
if(stackPointer == 3){
  //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
  //To the value in stack aswell to show the line number in the codemirror
  stack[stackPointer+1]=lineValue+1;
  //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
  lineValue = mregisters[dest];
  //We need to take the last 4 values of the stack
  stack.splice(0,1);
stackUpdate(stackPointer);

}
else{
  //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
  //To the value in stack aswell to show the line number in the codemirror
  stack[stackPointer+1]=lineValue+1;
  //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
  lineValue = mregisters[dest];
  stackPointer++;
  stackUpdate(stackPointer);
}

}
return lineValue;
}
function ret(lineValue){
if(stackPointer == -1){
  alert("Nothing in stack")
  stackUpdate(stackPointer);
}
else {

lineValue = stack[stackPointer];
stack.splice(stackPointer,1);
stackPointer--;
  stackUpdate(stackPointer);
return lineValue;

}
}
function jmz(second,lineValue){
if(second < -128){
  second = second % 128;
}
else if (second > 127){
  second = second % 127;
}
var lineValue = lineValue;
if(zflg == 1){
  lineValue = lineValue + second;
}
else{
  lineValue = lineValue+1;
}
return lineValue;
}
function jmc(second,lineValue){
if(second < -128){
  second = second % 128;
}
else if (second > 127){
  second = second % 127;
}
var lineValue = lineValue;
if(cflg == 1){
  lineValue = lineValue + second;
}
else{
  lineValue = lineValue+1;
}
return lineValue;
}
function jmn(second,lineValue){
if(second < -128){
  second = second % 128;
}
else if (second > 127){
  second = second % 127;
}
var lineValue = lineValue;
if(nflg == 1){
  lineValue = lineValue + second;
}
else{
  lineValue = lineValue+1;
}
return lineValue;
}
function jmu(second, lineValue){
if(second < -128){
  second = second % 129;
}
else if (second > 127){
  second = second % 128;
}
lineValue = lineValue + second;
return lineValue;
}

function stackUpdate(stackPointer){

  if (stackPointer == 0){
    document.getElementById("stackbits0IND").style.display='inline';
    document.getElementById("stackbits1IND").style.display='none';
    document.getElementById("stackbits2IND").style.display='none';
    document.getElementById("stackbits3IND").style.display='none';

  }

  else if(stackPointer == 1){
    document.getElementById("stackbits0IND").style.display='none';
    document.getElementById("stackbits1IND").style.display='inline';
    document.getElementById("stackbits2IND").style.display='none';
    document.getElementById("stackbits3IND").style.display='none';
  }

  else if(stackPointer == 2){
    document.getElementById("stackbits0IND").style.display='none';
    document.getElementById("stackbits1IND").style.display='none';
    document.getElementById("stackbits2IND").style.display='inline';
    document.getElementById("stackbits3IND").style.display='none';
  }

  else if(stackPointer == 3){
    document.getElementById("stackbits0IND").style.display='none';
    document.getElementById("stackbits1IND").style.display='none';
    document.getElementById("stackbits2IND").style.display='none';
    document.getElementById("stackbits3IND").style.display='inline';
  }
  else{
    document.getElementById("stackbits0IND").style.display='none';
    document.getElementById("stackbits1IND").style.display='none';
    document.getElementById("stackbits2IND").style.display='none';
    document.getElementById("stackbits3IND").style.display='none';
  alert("Something was missed");
  }


}

function machineCoder(first, second, third, fourth, fifth){
  var machineLine = "";

  if(first == "MOV"){
    machineLine = machineLine.concat("0000 ");
  }
  else if(first == "CMP"){
    machineLine = machineLine.concat("0001 ");
  }
  else if(first == "ADD"){
    machineLine = machineLine.concat("0010 ");
  }
  else if(first == "ADDC"){
    machineLine = machineLine.concat("0011 ");
  }
  else if(first == "INV"){
    machineLine = machineLine.concat("0100 ");
  }
  else if(first == "OR"){
    machineLine = machineLine.concat("0101 ");
  }
  else if(first == "XOR"){
    machineLine = machineLine.concat("0110 ");
  }
  else if(first == "AND"){
    machineLine = machineLine.concat("0111 ");
  }
  else if(first == "RRC"){
    machineLine = machineLine.concat("1000 ");
  }
  else if(first == "RRA"){
    machineLine = machineLine.concat("1001 ");
  }
  else if(first == "CALL"){
    machineLine = machineLine.concat("1010 ");
  }
  else if(first == "RET"){
    machineLine = machineLine.concat("1011 ");
  }
  else if(first == "JMZ"){
    machineLine = machineLine.concat("1100 ");
  }
  else if(first == "JMC"){
    machineLine = machineLine.concat("1101 ");
  }
  else if(first == "JMN"){
    machineLine = machineLine.concat("1110 ");
  }
  else if(first == "JMU"){
    machineLine = machineLine.concat("1111 ");
  }
  else if(first == "ALERT"){
    machineLine = machineLine.concat("001");
  }
  else{
    var text = "Unknown operation detected at "+ lineValue;
    alert(text);
  }
// Above adds the first 4 bits based off the instruction
// Next we convert each following value to bits then append
  machineLine = machineLine.concat(second.toString(2)+" "); // Register
  machineLine = machineLine.concat(third.toString(2)+" "); // Register
  machineLine = machineLine.concat(" X "); // 4th bit is Xed out
  machineLine = machineLine.concat(fourth.toString(2)+" ");
  machineLine = machineLine.concat(fifth.toString(2)+" ");
// Values have been converted
// Append
$("#machineDisplay").append(machineLine +'<br>'); // BR is there to break each new run onto a new line.
}
