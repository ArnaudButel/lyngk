'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1 = function(){
    var coord1 = new Lyngk.Coordinates('A' , 1);
    assertFalse(coord1.isValide());
}

LyngkTestCase.prototype.test2 = function () {
    var ligne = ['1','2','3','4','5','6','7','8','9'];
    var col = ['A','B','C','D','E','F','G','H','I'];
    var count = 0;
    var coordATester;
    for(var i in ligne) {
        for(var j in col) {
            coordATester = new Lyngk.Coordinates(col[j],ligne[i]);
            if(coordATester.isValide()) {
                count++;
            }
        }
    }
    assertEquals(count,43);
}

LyngkTestCase.prototype.test3 = function () {
    var coord = new Lyngk.Coordinates('B',5);
    assertEquals(coord.toString(),'B5');
}