"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var inter = [];
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);

    this.initPlateau = function () {
        for( var i in Lyngk.plateau) {
            inter.push(new Lyngk.Intersection( new Lyngk.Coordinates(i[0],i[1])));
        }
        for( i in inter) {
            inter[i].putPiece(piece);
        }
    };

    this.getInters = function () {
        return inter;
    }

};
