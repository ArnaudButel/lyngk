"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau = [];
    var pieces = [];

    var createPieces = function () {
        var i;
        for (i = 0; i < 8; i++) {
            pieces.push(new Lyngk.Piece(Lyngk.Color.IVORY));
            pieces.push(new Lyngk.Piece(Lyngk.Color.RED));
            pieces.push(new Lyngk.Piece(Lyngk.Color.GREEN));
            pieces.push(new Lyngk.Piece(Lyngk.Color.BLUE));
            pieces.push(new Lyngk.Piece(Lyngk.Color.BLACK));
            if (i < 3) {
                pieces.push(new Lyngk.Piece(Lyngk.Color.WHITE));
            }
        }
    };
    var createInters = function () {
        var i;
        var coordtemp;
        var lettrecoord;
        var chiffrecoord;
        for (i in Lyngk.plateau) {
            lettrecoord = Lyngk.plateau[i][0];
            chiffrecoord = Lyngk.plateau[i][1];
            coordtemp = new Lyngk.Coordinates(lettrecoord, chiffrecoord);
            plateau[coordtemp.hash()] = new Lyngk.Intersection();
        }
    };
    var ShufflePieces = function () {
        var randomIndex;
        var itemAtIndex;
        var i;
        for (i = pieces.length - 1; i >= 0; i--) {
            //mélange avec une seed : prendre le fichier seedrandom.js
            //sur github.com/davidbau/seedrandom
            //Dans jsTestDriver.conf load - src/seedrandom.js
            //test.js "use strict"; var LynkTestCase = TestCase("___");
            //Math.seedrandom("____");
            //laisser le Math.random(), juste ajouter la ligne
            // au début de test.js.
            randomIndex = Math.floor(Math.random() * (i + 1));
            itemAtIndex = pieces[randomIndex];
            pieces[randomIndex] = pieces[i];
            pieces[i] = itemAtIndex;
        }
    };
    var placePieces = function () {
        var i;
        for (i in plateau) {
            plateau[i].putPiece(pieces[i]);
        }
    };

    this.initPlateau = function () {
        createPieces();
        createInters();
        ShufflePieces();
        placePieces();
    };

    this.getplateau = function () {
        return plateau;
    };
    var allowPlacement = function (coordDepart, coordDestination) {
        var autorise;
        var c0 = parseInt(coordDepart.toString().charCodeAt(0));
        var l0 = parseInt(coordDepart.toString()[1]);
        var c1 = parseInt(coordDestination.toString().charCodeAt(0));
        var l1 = parseInt(coordDestination.toString()[1]);
        var idDesti = coordDestination.hash();
        var idDep = coordDepart.hash();
        var cTemp;
        autorise = c0 - c1 === 0 || l0 - l1 === 0 || c0 - c1 === l0 - l1;
        autorise &= plateau[idDesti].getState() !== Lyngk.State.VACANT;
        while (autorise && ( c0 !== c1 || l0 !== l1 )) {
            if (c0 < c1) c0++;
            else if (c0 > c1) c0--;
            if (l0 < l1) l0++;
            else if (l0 > l1) l0--;
            cTemp = new Lyngk.Coordinates(String.fromCharCode(c0), l0);
            autorise &= plateau[cTemp.hash()].getState() === Lyngk.State.VACANT;
            autorise |= c0 === c1 && l0 === l1;
        }
        autorise &= plateau[idDep].getState() !== Lyngk.State.FULL_STACK;
        return autorise;
    };
    this.move = function (coordDepart, coordDestination) {
        var i;
        if (allowPlacement(coordDepart, coordDestination)) {
            var piece = plateau[coordDepart.hash()].takePiece();
            for (i in piece) {
                plateau[coordDestination.hash()].putPiece(piece[i]);
            }
        }
    };

};
