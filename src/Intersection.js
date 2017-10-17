"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    this.getState = function () {
        return state;
    };

    this.putPiece = function (p_piece) {
        pieces.push(p_piece);
        if (pieces.length=== 1) {
            state = Lyngk.State.ONE_PIECE;
        }
        else if (pieces.length<5) {
            state = Lyngk.State.STACK;
        }
        else {
            state = Lyngk.State.FULL_STACK;
        }
    };

    this.getColor= function() {
        if (this.getState() !== Lyngk.State.VACANT) {
            return pieces[pieces.length - 1].getColor();
        }
        else {
            return null;
        }
    }
};
