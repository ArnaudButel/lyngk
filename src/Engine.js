"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var inter = [];
    var pieces = [];


    this.initPlateau = function () {
        var randomIndex;
        var itemAtIndex;

        //création des pièces
        for (var i=0; i<8; i++){
            pieces.push(new Lyngk.Piece(Lyngk.Color.IVORY));
            pieces.push(new Lyngk.Piece(Lyngk.Color.RED));
            pieces.push(new Lyngk.Piece(Lyngk.Color.GREEN));
            pieces.push(new Lyngk.Piece(Lyngk.Color.BLUE));
            pieces.push(new Lyngk.Piece(Lyngk.Color.BLACK));
            if (i < 3)
            {
                pieces.push(new Lyngk.Piece(Lyngk.Color.WHITE));
            }
        }

        //création des intersections
        for( i in Lyngk.plateau) {
            inter.push(new Lyngk.Intersection( new Lyngk.Coordinates(i[0],i[1])));
        }

        //mélange des pièces
        for (i = pieces.length-1; i >=0; i--) {
            randomIndex = Math.floor(Math.random()*(i+1));
            itemAtIndex = pieces[randomIndex];
            pieces[randomIndex] = pieces[i];
            pieces[i] = itemAtIndex;
        }

        //placement des pièces
        for( i in inter) {
            inter[i].putPiece(pieces[i]);
        }
    };

    this.getInters = function () {
        return inter;
    }

};
