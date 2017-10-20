"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau = [];
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

        //creation des intersections
        for( i in Lyngk.plateau) {
            //plateau.push(new Lyngk.Intersection( (new Lyngk.Coordinates(i[0],i[1]))));
            var coordtemp = new Lyngk.Coordinates(Lyngk.plateau[i][0],Lyngk.plateau[i][1]);
            plateau[coordtemp.hash()] = new Lyngk.Intersection();
        }

        //mélange des pièces
        for (i = pieces.length-1; i >=0; i--) {
            randomIndex = Math.floor(Math.random()*(i+1));
            itemAtIndex = pieces[randomIndex];
            pieces[randomIndex] = pieces[i];
            pieces[i] = itemAtIndex;
        }

        //placement des pièces
        for( i in plateau) {
            plateau[i].putPiece(pieces[i]);
        }
    };

    this.getplateau = function () {
        return plateau;
    };

    this.move = function (coordDepart, coordDestination) {
        if (plateau[coordDestination.hash()].getState() !== Lyngk.State.VACANT) {
            var piece = plateau[coordDepart.hash()].takePiece();
            for (var i in piece) {
                plateau[coordDestination.hash()].putPiece(piece[i]);
            }
        }
    }

};
