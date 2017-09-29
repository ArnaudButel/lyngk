'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1 = function(){
    var coord1 = new Lyngk.Coordinates('A' , 1);
    assertFalse(coord1.isValide());
}
