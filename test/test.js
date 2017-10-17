'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1 = function(){
    var coord1 = new Lyngk.Coordinates('A' , 1);
    assertFalse(coord1.isValide());
};

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
};

LyngkTestCase.prototype.test3 = function () {
    var coord = new Lyngk.Coordinates('B',5);
    assertEquals(coord.toString(),'B5');
};

LyngkTestCase.prototype.test4 = function () {
    var coord = new Lyngk.Coordinates('qsd',30);
    assertEquals(coord.toString(),'invalid');
};

LyngkTestCase.prototype.test5 = function () {
    var coord = new Lyngk.Coordinates('E',6);
    var coord2 = coord.clone();
    assertEquals(coord.toString(),coord2.toString());
};

LyngkTestCase.prototype.test6 = function() {
    var coord = new Lyngk.Coordinates('C',1);
    var coord2 = new Lyngk.Coordinates('E',6);
    assertNotEquals(coord.hash(),coord2.hash());
};

LyngkTestCase.prototype.test7 = function() {
    var coord = new Lyngk.Coordinates('C',1);
    var intersec = new Lyngk.Intersection(coord);
    assertEquals(intersec.getState(),Lyngk.State.VACANT);
};

LyngkTestCase.prototype.test8 = function () {
    var coord = new Lyngk.Coordinates('C',3);
    var inter = new Lyngk.Intersection(coord);
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);
    inter.putPiece(piece);
    assertEquals(piece.getColor(),Lyngk.Color.BLUE);
    assertEquals(inter.getState(),Lyngk.State.ONE_PIECE);
    assertEquals(inter.getColor(),Lyngk.Color.BLUE);
}