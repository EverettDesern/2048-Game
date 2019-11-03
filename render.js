import Game from "./game.js";



let game = new Game(4);

export const handleNewGame = function(event) {
    game.setupNewGame();
    $('.wl').text("");
    for(let i = 0; i < game.size*game.size; i++) {
        $('#' + i + '.cell').text(game.gameState.board[i]);
        if(game.gameState.board[i] == 0) {
            $('#' + i + '.cell').css("background","rgb(187, 175, 175)");
        }
        if(game.gameState.board[i] == 2) {
            $('#' + i + '.cell').css("background","rgb(252, 252, 169)");
        }
        if(game.gameState.board[i] == 4) {
            $('#' + i + '.cell').css("background","rgb(255, 196, 0)");
        }
    }
}

export const handleKeyDown = function(event) {
    if(game.gameState.over == true) {
        $('.wl').text("You Lose.. Try Again!");
    }
    if(event.keyCode == 37) {
        game.move('left');
    }
    if(event.keyCode == 38) {
        game.move('up');
    }
    if(event.keyCode == 39) {
        game.move('right');
    }
    if(event.keyCode == 40) {
        game.move('down');
    }
    for(let i = 0; i < game.size*game.size; i++) {
        $('#' + i + '.cell').text(game.gameState.board[i]);
        if(game.gameState.board[i] == 0) {
            $('#' + i + '.cell').css("background","rgb(187, 175, 175)");
        }
        if(game.gameState.board[i] == 2) {
            $('#' + i + '.cell').css("background","rgb(252, 252, 169)");
        }
        if(game.gameState.board[i] == 4) {
            $('#' + i + '.cell').css("background","rgb(255, 196, 0)");
        }
        if(game.gameState.board[i] == 8) {
            $('#' + i + '.cell').css("background","rgb(255, 153, 0)");
        }
        if(game.gameState.board[i] == 16) {
            $('#' + i + '.cell').css("background","rgb(255, 94, 0)");
        }
        if(game.gameState.board[i] == 32) {
            $('#' + i + '.cell').css("background","rgb(255, 0, 0)");
        }
        if(game.gameState.board[i] == 64) {
            $('#' + i + '.cell').css("background","rgb(196, 140, 196)");
        }
        if(game.gameState.board[i] == 128) {
            $('#' + i + '.cell').css("background","rgb(247, 71, 247)");
        }
        if(game.gameState.board[i] == 256) {
            $('#' + i + '.cell').css("background","rgb(122, 0, 122)");
        }
        if(game.gameState.board[i] == 512) {
            $('#' + i + '.cell').css("background","rgb(130, 149, 255)");
        }
        if(game.gameState.board[i] == 1024) {
            $('#' + i + '.cell').css("background","rgb(47, 79, 255)");
        }
        if(game.gameState.board[i] == 2048) {
            $('.wl').text("You Win!");
            $('#' + i + '.cell').css("background","rgb(78, 38, 38)");
        }
    }

    $('.num').text(game.gameState.score);
}

$(function() {
    for(let i = 0; i < game.size*game.size; i++) {
        $('#' + i + '.cell').append(game.gameState.board[i]); 
        if(game.gameState.board[i] == 0) {
            $('#' + i + '.cell').css("background","rgb(187, 175, 175)");
        }
        if(game.gameState.board[i] == 2) {
            $('#' + i + '.cell').css("background","rgb(252, 252, 169)");
        }
        if(game.gameState.board[i] == 4) {
            $('#' + i + '.cell').css("background","rgb(255, 196, 0)");
        }
    }
    $('.num').append(game.gameState.score);
    $('.new-game').on('click', handleNewGame);
    $(document).on('keydown', handleKeyDown);

});