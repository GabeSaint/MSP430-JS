  var zflg;
  var cflg;
  var nflag;
  var lineValue = 0;

  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    indentUnit: 0,
    lineSeparator: null


  });

                                                          //var for what line we read

var registers = new Int16Array(16);                                                                     // register variables
var mregisters = new Int16Array(16);
var stack = [0, 0 ,0 ,0, 0 ,0];
var stackPointer = -1;                                                          // memory register variables

//Fill registers with random numbers
for(var i = 0; i < 15; i++){
  var randomNeg = Math.floor((Math.random()*3)+1);
  registers[i] = Math.floor((Math.random()*32767)+1) * Math.pow(-1,randomNeg);
}
for(var i = 0; i < 15; i++){
  //Get random number between 0 and 3
  var randomNeg = Math.floor((Math.random()*3)+1)
  mregisters[i] = Math.floor((Math.random()*32767)+1) * Math.pow(-1,randomNeg);
}

function clearRegisters(){                                                               //clears all registers and resets linecounter                                                      //var for what line we read
  for(var i = 0; i < 15; i++){
    registers[i] = 0
  }
  for(var i = 0; i < 15; i++){
    mregisters[i] = 0
  }
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
  lineValue = processor(first, second, third, fourth, fifth, lineValue);
  document.getElementById("topLevel").innerHTML = "register 0 is " + registers[0]

  lineValue++;

}

function submit(){
  var line_count= editor.doc.lineCount();

  for (var i = 0; i <line_count; i++) {
      var program = editor.doc.getLine(i);
      var split_code = program.split(" ",6);
      var first = split_code[0];

      first = first.toUpperCase();
      var second = parseInt(split_code[1]);
      var third = parseInt(split_code[2]);
      var fourth = parseInt(split_code[3]);
      var fifth = parseInt(split_code[4]);
      i = processor(first, second, third, fourth, fifth, i);
      }

      document.getElementById("topLevel").innerHTML = "register 0 is " +registers[0];




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
  else{
    lineAlert = lineValue + 1;
    var text = "Unknown operation detected at "+ lineAlert;
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
  }
  else if(as == 1){
      sourceValue = mregisters[source];
      //check if the value is zero for the z flag
      if(sourceValue == 0){
        zflg = 1;
      }
      else {
        zflg = 0;
      }
  }
  else if(as == 2){
      sourceValue = source;
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
    mregisters[dest]= sourceValue;
  }
}
function cmp(second, third, fourth, fifth){

  var dest = Math.abs(second % 16);
  var source = Math.abs(third % 16);
  var ad = Math.abs(fourth % 2);
  var as = Math.abs(fifth % 4);
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
      sourceValue = mregisters[source];
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
    addCheck = mregisters[dest]+sourceValue;
    mregisters[dest]= mregisters[dest]+sourceValue;
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
      sourceValue = mregisters[source];
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
    addCheck = mregisters[dest]+sourceValue+cflg;
    mregisters[dest]= mregisters[dest]+sourceValue+cflg;
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
    sourceValue= mregisters[dest];
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
    mregisters[dest] = 0;
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
    mregisters[dest]=sourceValueShifted;
  }
}
function call(second, third, fourth, fifth){
  var dest = Math.abs(second % 16);
  var ad = Math.abs(third % 2);

  if(ad == 0){
    if(stackPointer == 3){
      //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
      //To the value in stack aswell to show the line number in the codemirror
      stack[stackPointer+1]=lineValue+2;
      //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
      lineValue = registers[dest]-1;
      //We need to take the last 4 values of the stack
      stack.splice(0,1);


    }
    else{
      //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
      //To the value in stack aswell to show the line number in the codemirror
      stack[stackPointer+1]=lineValue+2;
      //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
      lineValue = registers[dest]-1;
      stackPointer++;
    }
  }

else if(ad == 1){
  if(stackPointer == 3){
    //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
    //To the value in stack aswell to show the line number in the codemirror
    stack[stackPointer+1]=lineValue+2;
    //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
    lineValue = mregisters[dest]-1;
    //We need to take the last 4 values of the stack
    stack.splice(0,1);


  }
  else{
    //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
    //To the value in stack aswell to show the line number in the codemirror
    stack[stackPointer+1]=lineValue+2;
    //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
    lineValue = mregisters[dest]-1;
    stackPointer++;
  }

  }
  return lineValue;
}
function ret(lineValue){
  lineValue = stack[stackPointer];
  stack.splice(stackPointer,1);
  stackPointer--;
  return lineValue;

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

}

