"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    this.getState = function () {
        return state;
    };

    this.putPiece = function (p_piece) {
        pieces.push(p_piece);
        this.verifierEtat();
    };

    this.takePiece = function () {
        var pieceRetour = pieces;
        pieces = [];
        this.verifierEtat();
        return pieceRetour;
    };

    this.verifierEtat = function () {
        state = Lyngk.State.FULL_STACK;
        if (pieces.length <= 1) {
            state = pieces.length;
        } else if (pieces.length < 5) {
            state = Lyngk.State.STACK;
        }
    };

    this.getColor = function () {
        if (this.getState() !== Lyngk.State.VACANT) {
            return pieces[pieces.length - 1].getColor();
        } else {
            return null;
        }
    };
    this.getColors = function (id_piece) {
        if (this.getState() !== Lyngk.State.VACANT) {
            return pieces[id_piece].getColor();
        } else {
            return null;
        }
    };

    this.hauteur = function () {
        return pieces.length;
    };
};
