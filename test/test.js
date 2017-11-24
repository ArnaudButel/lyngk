'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");
Math.seedrandom("isidi-i2l");

LyngkTestCase.prototype.test1 = function () {
    var coord1 = new Lyngk.Coordinates('A', 1);
    assertFalse(coord1.isValide());
};

LyngkTestCase.prototype.test2 = function () {
    var ligne = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    var count = 0;
    var coordATester;
    for (var i in ligne) {
        for (var j in col) {
            coordATester = new Lyngk.Coordinates(col[j], ligne[i]);
            if (coordATester.isValide()) {
                count++;
            }
        }
    }
    assertEquals(count, 43);
};

LyngkTestCase.prototype.test3 = function () {
    var coord = new Lyngk.Coordinates('B', 5);
    assertEquals(coord.toString(), 'B5');
};

LyngkTestCase.prototype.test4 = function () {
    var coord = new Lyngk.Coordinates('qsd', 30);
    assertEquals(coord.toString(), 'invalid');
};

LyngkTestCase.prototype.test5 = function () {
    var coord = new Lyngk.Coordinates('E', 6);
    var coord2 = coord.clone();
    assertEquals(coord.toString(), coord2.toString());
};

LyngkTestCase.prototype.test6 = function () {
    var coord = new Lyngk.Coordinates('C', 1);
    var coord2 = new Lyngk.Coordinates('E', 6);
    assertNotEquals(coord.hash(), coord2.hash());
};

LyngkTestCase.prototype.test7 = function () {
    var coord = new Lyngk.Coordinates('C', 1);
    var intersec = new Lyngk.Intersection();
    assertEquals(intersec.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.test8 = function () {
    var coord = new Lyngk.Coordinates('C', 3);
    var inter = new Lyngk.Intersection();
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);
    inter.putPiece(piece);
    assertEquals(piece.getColor(), Lyngk.Color.BLUE);
    assertEquals(inter.getState(), Lyngk.State.ONE_PIECE);
    assertEquals(inter.getColor(), Lyngk.Color.BLUE);
};


LyngkTestCase.prototype.test9 = function () {
    var coord = new Lyngk.Coordinates('C', 3);
    var inter = new Lyngk.Intersection();
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piece2 = new Lyngk.Piece(Lyngk.Color.RED);
    inter.putPiece(piece);
    inter.putPiece(piece2);
    assertEquals(inter.getState(), Lyngk.State.STACK);
    assertEquals(inter.getColor(), Lyngk.Color.RED);
};


LyngkTestCase.prototype.test10 = function () {
    var coord = new Lyngk.Coordinates('C', 3);
    var inter = new Lyngk.Intersection();
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piece2 = new Lyngk.Piece(Lyngk.Color.RED);
    var piece3 = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piece4 = new Lyngk.Piece(Lyngk.Color.RED);
    var piece5 = new Lyngk.Piece(Lyngk.Color.IVORY);
    inter.putPiece(piece);
    inter.putPiece(piece2);
    inter.putPiece(piece3);
    inter.putPiece(piece4);
    inter.putPiece(piece5);
    assertEquals(inter.getState(), Lyngk.State.FULL_STACK);
    assertEquals(inter.getColor(), Lyngk.Color.IVORY);
};

LyngkTestCase.prototype.test11 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    for (var i in plateau) {
        assertEquals(Lyngk.State.ONE_PIECE, plateau[i].getState());
        //assertEquals(Lyngk.Color.BLUE, plateau[i].getColor());
    }
};

LyngkTestCase.prototype.test12 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    for (var i in plateau) {
        assertEquals(Lyngk.State.ONE_PIECE, plateau[i].getState());
    }
};

LyngkTestCase.prototype.test13 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    for (var i in plateau) {
        assertEquals(1, plateau[i].hauteur());
    }
};

LyngkTestCase.prototype.test14 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();

    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var piece2 = new Lyngk.Piece(Lyngk.Color.RED);
    var piece3 = new Lyngk.Piece(Lyngk.Color.IVORY);

    for (var i in plateau) {
        assertEquals(plateau[i].getState(), Lyngk.State.ONE_PIECE);
        plateau[i].putPiece(piece);
        assertEquals(plateau[i].getState(), Lyngk.State.STACK);
        assertEquals(plateau[i].getColor(), Lyngk.Color.BLUE);
        plateau[i].putPiece(piece2);
        assertEquals(plateau[i].getState(), Lyngk.State.STACK);
        assertEquals(plateau[i].getColor(), Lyngk.Color.RED);
        plateau[i].putPiece(piece3);
        assertEquals(plateau[i].getState(), Lyngk.State.STACK);
        assertEquals(plateau[i].getColor(), Lyngk.Color.IVORY);
    }
};

LyngkTestCase.prototype.test15 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var A3 = new Lyngk.Coordinates('A', 3);
    var B3 = new Lyngk.Coordinates('B', 3);
    var couleurA3 = plateau[A3.hash()].getColor();
    jeu.move(A3, B3);
    assertEquals(plateau[A3.hash()].getState(), Lyngk.State.VACANT);
    assertEquals(plateau[B3.hash()].getState(), Lyngk.State.STACK);
    assertEquals(plateau[B3.hash()].getColor(), couleurA3);
};

LyngkTestCase.prototype.test16 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var A3 = new Lyngk.Coordinates('A', 3);
    var B3 = new Lyngk.Coordinates('B', 3);
    var B2 = new Lyngk.Coordinates('B', 2);
    jeu.move(A3, B3);
    var couleurB3 = plateau[B3.hash()].getColor();
    jeu.move(B3, B2);
    assertEquals(Lyngk.State.VACANT, plateau[B3.hash()].getState());
    assertEquals(Lyngk.State.STACK, plateau[B2.hash()].getState());
    assertEquals(3, plateau[B2.hash()].hauteur());
    assertEquals(couleurB3, plateau[B2.hash()].getColor());
};

LyngkTestCase.prototype.test17 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var B3 = new Lyngk.Coordinates('B', 3);
    var B2 = new Lyngk.Coordinates('B', 2);
    jeu.move(B2, B3);
    jeu.move(B3, B2);
    assertEquals(Lyngk.State.STACK, plateau[B3.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[B2.hash()].getState());
};

LyngkTestCase.prototype.test18 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var B3 = new Lyngk.Coordinates('B', 3);
    var B2 = new Lyngk.Coordinates('B', 2);
    var C2 = new Lyngk.Coordinates('C', 2);
    jeu.move(B2, B3);
    jeu.move(B3, C2);
    assertEquals(Lyngk.State.STACK, plateau[B3.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[C2.hash()].getState());
};

LyngkTestCase.prototype.test19 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var I7 = new Lyngk.Coordinates('I', 7);
    var H6 = new Lyngk.Coordinates('H', 6);
    var H5 = new Lyngk.Coordinates('H', 5);
    var H8 = new Lyngk.Coordinates('H', 8);
    var F5 = new Lyngk.Coordinates('F', 5);
    var F3 = new Lyngk.Coordinates('F', 3);
    jeu.move(I7, H6);
    jeu.move(H6, H5);
    jeu.move(H5, H8);
    jeu.move(H5, F5);
    jeu.move(H5, F3);
    assertEquals(Lyngk.State.VACANT, plateau[I7.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[H6.hash()].getState());
    assertEquals(Lyngk.State.STACK, plateau[H5.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[H8.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[F5.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[F3.hash()].getState());
};

LyngkTestCase.prototype.test20 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var E2 = new Lyngk.Coordinates('E', 2);
    var D2 = new Lyngk.Coordinates('D', 2);
    var D3 = new Lyngk.Coordinates('D', 3);
    var D4 = new Lyngk.Coordinates('D', 4);
    var D5 = new Lyngk.Coordinates('D', 5);
    var C5 = new Lyngk.Coordinates('C', 5);
    jeu.move(E2, D2);
    jeu.move(D2, D3);
    jeu.move(D3, D4);
    jeu.move(D4, D5);
    jeu.move(D5, C5);
    assertEquals(Lyngk.State.VACANT, plateau[E2.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[D2.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[D3.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[D4.hash()].getState());
    assertEquals(Lyngk.State.FULL_STACK, plateau[D5.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[C5.hash()].getState());
};

LyngkTestCase.prototype.test21 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var A3 = new Lyngk.Coordinates('A', 3);
    var B3 = new Lyngk.Coordinates('B', 3);
    var B2 = new Lyngk.Coordinates('B', 2);
    jeu.move(A3, B3);
    jeu.move(B2, B3);
    assertEquals(Lyngk.State.STACK, plateau[B3.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[B2.hash()].getState());
};

LyngkTestCase.prototype.test22 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var I7 = new Lyngk.Coordinates('I', 7);
    var H6 = new Lyngk.Coordinates('H', 6);
    var G4 = new Lyngk.Coordinates('G', 4);
    var G5 = new Lyngk.Coordinates('G', 5);
    var G6 = new Lyngk.Coordinates('G', 6);
    jeu.move(I7, H6);
    jeu.move(G4, G5);
    jeu.move(G5, G6);
    jeu.move(H6, G6);
    assertEquals(Lyngk.State.STACK, plateau[H6.hash()].getState());
    assertEquals(Lyngk.State.STACK, plateau[G6.hash()].getState());
};


LyngkTestCase.prototype.test23 = function () {
    var jeu = new Lyngk.Engine();
    jeu.initPlateau();
    var plateau = jeu.getplateau();
    var B2 = new Lyngk.Coordinates('B', 2);
    var C2 = new Lyngk.Coordinates('C', 2);
    var D2 = new Lyngk.Coordinates('D', 2);
    var E2 = new Lyngk.Coordinates('E', 2);
    jeu.move(B2, C2);
    jeu.move(C2, D2);
    jeu.move(D2, E2);
    assertEquals(Lyngk.State.VACANT, plateau[B2.hash()].getState());
    assertEquals(Lyngk.State.VACANT, plateau[C2.hash()].getState());
    assertEquals(Lyngk.State.STACK, plateau[D2.hash()].getState());
    assertEquals(Lyngk.State.ONE_PIECE, plateau[E2.hash()].getState());
};