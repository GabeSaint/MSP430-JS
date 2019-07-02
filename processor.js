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
  var mregisters = new Int16Array(16);
  var stack = [0, 0 ,0 ,0, 0 ,0];
  var stackPointer = -1;                                                          // memory register variables

  //Fill registers with random numbers
  for(var i = 0; i < 16; i++){
    //Get random number between 0 and 3
    var randomNeg = Math.floor((Math.random()*3)+1);
    registers[i] = Math.floor((Math.random()*32767)+1) * Math.pow(-1,randomNeg);
  }
  for(var i = 0; i < 16; i++){
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
      /////////////register 0
      var register0BitContents = registers[0].toString(2)
      while(register0BitContents.length < 16){
        register0BitContents = "0"+ register0BitContents;
      }
      document.getElementById("register0bits").innerHTML = register0BitContents;
      //////////////////////////////////////////////////register 1
      var register1BitContents = registers[1].toString(2)
      while(register1BitContents.length < 16){
        register1BitContents = "0"+ register1BitContents;
      }
      document.getElementById("register1bits").innerHTML = register1BitContents;
      ///////////////////////////////////////////////register 2
      var register2BitContents = registers[2].toString(2)
      while(register2BitContents.length < 16){
        register2BitContents = "0"+ register2BitContents;
      }
      document.getElementById("register2bits").innerHTML = register2BitContents;
      //////////////////////////////////////////////register 3
      var register3BitContents = registers[3].toString(2)
      while(register3BitContents.length < 16){
        register3BitContents = "0"+ register3BitContents;
      }
      document.getElementById("register3bits").innerHTML = register3BitContents;
      ///////////////////////////////////////////////register 4
      var register4BitContents = registers[4].toString(2)
      while(register4BitContents.length < 16){
        register4BitContents = "0"+ register4BitContents;
      }
      document.getElementById("register4bits").innerHTML = register4BitContents;
      ////////////////////////////////////////////////register 5
      var register5BitContents = registers[5].toString(2)
      while(register5BitContents.length < 16){
        register5BitContents = "0"+ register5BitContents;
      }
      document.getElementById("register5bits").innerHTML = register5BitContents;
      ///////////////////////////////////////////////register 6
      var register6BitContents = registers[6].toString(2)
      while(register6BitContents.length < 16){
        register6BitContents = "0"+ register6BitContents;
      }
      document.getElementById("register6bits").innerHTML = register6BitContents;
      /////////////////////////////////////////////register 7
      var register7BitContents = registers[7].toString(2)
      while(register7BitContents.length < 16){
        register7BitContents = "0"+ register7BitContents;
      }
      document.getElementById("register7bits").innerHTML = register7BitContents;
      /////////////////////////////////////////////register 8
      var register8BitContents = registers[8].toString(2)
      while(register8BitContents.length < 16){
        register8BitContents = "0"+ register8BitContents;
      }
      document.getElementById("register8bits").innerHTML = register8BitContents;
      //////////////////////////////////////////////////register 9
      var register9BitContents = registers[9].toString(2)
      while(register9BitContents.length < 16){
        register9BitContents = "0"+ register9BitContents;
      }
      document.getElementById("register9bits").innerHTML = register9BitContents;
      ///////////////////////////////////////////////register 10
      var register10BitContents = registers[10].toString(2)
      while(register10BitContents.length < 16){
        register10BitContents = "0"+ register10BitContents;
      }
      document.getElementById("register10bits").innerHTML = register10BitContents;
      //////////////////////////////////////////////register 11
      var register11BitContents = registers[11].toString(2)
      while(register11BitContents.length < 16){
        register11BitContents = "0"+ register11BitContents;
      }
      document.getElementById("register11bits").innerHTML = register11BitContents;
      ///////////////////////////////////////////////register 12
      var register12BitContents = registers[12].toString(2)
      while(register12BitContents.length < 16){
        register12BitContents = "0"+ register12resBitContents;
      }
      document.getElementById("register12bits").innerHTML = register12BitContents;
      ////////////////////////////////////////////////register 13
      var register13BitContents = registers[13].toString(2)
      while(register13BitContents.length < 16){
        register13BitContents = "0"+ register13BitContents;
      }
      document.getElementById("register13bits").innerHTML = register13BitContents;
      ///////////////////////////////////////////////register 14
      var register14BitContents = registers[14].toString(2)
      while(register14BitContents.length < 16){
        register14BitContents = "0"+ register14BitContents;
      }
      document.getElementById("register14bits").innerHTML = register14BitContents;
      /////////////////////////////////////////////register 15
      var register15BitContents = registers[15].toString(2)
      while(register15BitContents.length < 16){
        register15BitContents = "0"+ register15BitContents;
      }
      document.getElementById("register15bits").innerHTML = register15BitContents;



    // Show Decimal Value - for memory

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

      // Show Bit Value
      /////////////register 0
      var mregister0BitContents = mregisters[0].toString(2)
      while(mregister0BitContents.length < 16){
        mregister0BitContents = "0"+ mregister0BitContents;
      }
      document.getElementById("mregister0bits").innerHTML = mregister0BitContents;
      //////////////////////////////////////////////////mregister 1
      var mregister1BitContents = mregisters[1].toString(2)
      while(mregister1BitContents.length < 16){
        mregister1BitContents = "0"+ mregister1BitContents;
      }
      document.getElementById("mregister1bits").innerHTML = mregister1BitContents;
      ///////////////////////////////////////////////mregister 2
      var mregister2BitContents = mregisters[2].toString(2)
      while(mregister2BitContents.length < 16){
        mregister2BitContents = "0"+ mregister2BitContents;
      }
      document.getElementById("mregister2bits").innerHTML = mregister2BitContents;
      //////////////////////////////////////////////mregister 3
      var mregister3BitContents = mregisters[3].toString(2)
      while(mregister3BitContents.length < 16){
        mregister3BitContents = "0"+mregister3BitContents;
      }
      document.getElementById("mregister3bits").innerHTML = mregister3BitContents;
      ///////////////////////////////////////////////mregister 4
      var mregister4BitContents = mregisters[4].toString(2)
      while(mregister4BitContents.length < 16){
        mregister4BitContents = "0"+ mregister4BitContents;
      }
      document.getElementById("mregister4bits").innerHTML = mregister4BitContents;
      ////////////////////////////////////////////////mregister 5
      var mregister5BitContents = mregisters[5].toString(2)
      while(mregister5BitContents.length < 16){
        mregister5BitContents = "0"+ mregister5BitContents;
      }
      document.getElementById("mregister5bits").innerHTML = mregister5BitContents;
      ///////////////////////////////////////////////mregister 6
      var mregister6BitContents = mregisters[6].toString(2)
      while(mregister6BitContents.length < 16){
        mregister6BitContents = "0"+ mregister6BitContents;
      }
      document.getElementById("mregister6bits").innerHTML = mregister6BitContents;
      /////////////////////////////////////////////mregister 7
      var mregister7BitContents = mregisters[7].toString(2)
      while(mregister7BitContents.length < 16){
        mregister7BitContents = "0"+ mregister7BitContents;
      }m
      document.getElementById("mregister7bits").innerHTML = mregister7BitContents;
      /////////////////////////////////////////////mregister 8
      var mregister8BitContents = mregisters[8].toString(2)
      while(mregister8BitContents.length < 16){
        mregister8BitContents = "0"+ mregister8BitContents;
      }
      document.getElementById("mregister8bits").innerHTML = mregister8BitContents;
      //////////////////////////////////////////////////mregister 9
      var mregister9BitContents = mregisters[9].toString(2)
      while(mregister9BitContents.length < 16){
        mregister9BitContents = "0"+ mregister9BitContents;
      }
      document.getElementById("mregister9bits").innerHTML = mregister9BitContents;
      ///////////////////////////////////////////////register 10
      var mregister10BitContents = mregisters[10].toString(2)
      while(mregister10BitContents.length < 16){
        mregister10BitContents = "0"+ mregister10BitContents;
      }
      document.getElementById("mregister10bits").innerHTML = mregister10BitContents;
      //////////////////////////////////////////////register 11
      var mregister11BitContents = mregisters[11].toString(2)
      while(mregister11BitContents.length < 16){
        mregister11BitContents = "0"+ mregister11BitContents;
      }
      document.getElementById("mregister11bits").innerHTML = mregister11BitContents;
      ///////////////////////////////////////////////mregister 12
      var mregister12BitContents = mregisters[12].toString(2)
      while(mregister12BitContents.length < 16){
        mregister12BitContents = "0"+ mregister12resBitContents;
      }
      document.getElementById("mregister12bits").innerHTML = mregister12BitContents;
      ////////////////////////////////////////////////register 13
      var mregister13BitContents = mregisters[13].toString(2)
      while(register13BitContents.length < 16){
        mregister13BitContents = "0"+ mregister13BitContents;
      }
      document.getElementById("mregister13bits").innerHTML = mregister13BitContents;
      ///////////////////////////////////////////////mregister 14
      var mregister14BitContents = mregisters[14].toString(2)
      while(mregister14BitContents.length < 16){
        mregister14BitContents = "0"+ mregister14BitContents;
      }
      document.getElementById("mregister14bits").innerHTML = mregister14BitContents;
      /////////////////////////////////////////////mregister 15
      var mregister15BitContents = mregisters[15].toString(2)
      while(mregister15BitContents.length < 16){
        mregister15BitContents = "0"+ mregister15BitContents;
      }
      document.getElementById("mregister15bits").innerHTML = mregister15BitContents;
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
        stack[stackPointer+1]=lineValue+1;
        //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
        lineValue = registers[dest];
        //We need to take the last 4 values of the stack
        stack.splice(0,1);


      }
      else{
        //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
        //To the value in stack aswell to show the line number in the codemirror
        stack[stackPointer+1]=lineValue+1;
        //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
        lineValue = mregisters[dest];
        stackPointer++;
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


    }
    else{
      //We need to add 2 to the lineValue when we store it because it needs to return a line after the lineValue and we need to add 1
      //To the value in stack aswell to show the line number in the codemirror
      stack[stackPointer+1]=lineValue+1;
      //We need to take the Value of whats in the register - 1 because codemirror does not have a line 0
      lineValue = mregisters[dest];
      stackPointer++;
    }

    }
    return lineValue;
  }
  function ret(lineValue){
    if(stackPointer == -1){
      alert("Nothing in stack")
    }
    else {

    lineValue = stack[stackPointer];
    stack.splice(stackPointer,1);
    stackPointer--;
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
