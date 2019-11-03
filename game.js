/*
Add your code for Game here
 */
import Tile from "./tile.js";



export default class Game {
    constructor(size) {
        var count = 0;
        this.size = size;
        var arr = [];
        this.moves = [];
        this.win = [];
        this.lose = [];
        var values = [];
        for(var i = 0; i < size*size; i++) {
            arr.push(new Tile())
        }
        var randomIndexOne = Math.floor(Math.random() * size*size);
        count++;
        while(count < 2) {
            var randomIndexTwo = Math.floor(Math.random() * size*size);
            if(randomIndexTwo != randomIndexOne) {
                count++;
            }
        }
        var randomNumberOne = this.randomNum();
        var randomNumberTwo = this.randomNum();
        arr[randomIndexOne].setValue(randomNumberOne);
        arr[randomIndexTwo].setValue(randomNumberTwo);
        for(let v = 0; v < arr.length; v++) {
            values.push(arr[v].getValue());
        }
        this.arr = arr;
        this.gameState = {
            board: values,
            score: 0,
            won: false,
            over: false
        }
    }
    setupNewGame() {
        this.moves = [];
        var count = 0;
        var arr2 = [];
        var values = [];
        for(var i = 0; i < this.size*this.size; i++) {
            arr2.push(new Tile())
        }
        var randomIndexOne = Math.floor(Math.random() * this.size*this.size);
        count++;
        while(count < 2) {
            var randomIndexTwo = Math.floor(Math.random() * this.size*this.size);
            if(randomIndexTwo != randomIndexOne) {
                count++;
            }
        }
        var randomNumberOne = this.randomNum();
        var randomNumberTwo = this.randomNum();
        arr2[randomIndexOne].setValue(randomNumberOne);
        arr2[randomIndexTwo].setValue(randomNumberTwo);
        for(let v = 0; v < arr2.length; v++) {
            values.push(arr2[v].getValue());
        }
        this.arr = arr2;
        this.gameState = {
            board: values,
            score: 0,
            won: false,
            over: false
        }
    }
    loadGame(newGameState) {
        this.gameState.board = newGameState.board;
        this.gameState.score = newGameState.score;
        this.gameState.won = newGameState.won;
        this.gameState.over = newGameState.over;
    }
    move(direction) {
        for(var f = 0; f < this.size*this.size; f++) {
            this.arr[f].setValue(this.gameState.board[f]);
            this.arr[f].setPair(false);
        }
        if(direction == 'left') {
            var bool = 0;
            for(var i = 0; i < this.size; i++) {
                // slice each row in the board
                var newArr = this.arr.slice(i*this.size, i*this.size + this.size);
                for(var j = 1; j < newArr.length; j++) {
                    var p = j;
                    if(newArr[j].getValue() == 0) {
                        // if 0, continue
                        continue;
                    }
                    while(newArr[p-1] != null && newArr[p-1].getValue() == 0) {
                        // traverse array until it hit the boundary or the next element is not 0.
                        p--;
                    }
                    if(newArr[p-1] == null) {
                        // if the boundary is reached, set the boundary to the value.
                        newArr[p].setValue(newArr[j].getValue());
                        newArr[j].setValue(0);
                        bool = 1;
                    } else {
                        if(newArr[p-1].getValue() == newArr[j].getValue() && newArr[p-1].getValue() != 0 && newArr[p-1].getPair() == false && newArr[j].getPair() == false){
                            // if two elements, match... combine them.
                            var sum = newArr[p-1].getValue() + newArr[j].getValue();
                            this.gameState.score += sum;
                            newArr[p-1].setValue(newArr[p-1].getValue() + newArr[j].getValue());
                            newArr[j].setValue(0);
                            newArr[p-1].setPair(true);
                            newArr[j].setPair(false);
                            if(sum == 2048) {
                                this.gameState.won = true;
                                this.win.forEach(observer => observer(this.gameState));
                                return;
                            } else {
                                this.gameState.won = false;
                            }
                            bool = 1;
                        } else {
                            if(p == j) {
                                continue;
                            }
                            // if they dont match.. put the element in the available spot.
                            newArr[p].setValue(newArr[j].getValue());
                            newArr[j].setValue(0);
                            bool = 1;
                        }
                    }
                }
                for(let v = 0; v < newArr.length; v++) {
                    newArr[v].setPair(false);
                }
            }
            if(bool == 1) {
                // if valid move
                this.randomNumAfterMove();
            }
            var finalArr2 = [];
            for(var c = 0; c < this.size*this.size; c++) {
                finalArr2.push(this.arr[c].getValue());
            }
            this.gameState.board = finalArr2;
            if(bool == 1) {
                this.moves.forEach(observer => observer(this.gameState));
            }
            // sets pair to false for every tile
            for(var i = 0; i < this.size*this.size; i++) {
                this.arr[i].setPair(false);
            }
            
            // checks if there is an available spot.. if not, we lose
            var d = this.checkIfDone();
            if(d == true) {
                //console.log("done");
                this.gameState.over = true;
                this.lose.forEach(observer => observer(this.gameState));
            } else {
                this.gameState.over = false;
            }
        }
        if(direction == 'right') {
            var bool = 0;
            for(var i = 0; i < this.size; i++) {
                var newArr = this.arr.slice(i*this.size, i*this.size + this.size);
                for(var j = newArr.length-2; j >= 0; j--) {
                    var p = j;
                    if(newArr[j].getValue() == 0) {
                        // if 0, continue
                        continue;
                    }
                    while(newArr[p+1] != null && newArr[p+1].getValue() == 0) {
                        // traverse array until it hit the boundary or the next element is not 0.
                        p++;
                    }
                    if(newArr[p+1] == null) {
                        // if the boundary is reached, set the boundary to the value.
                        newArr[p].setValue(newArr[j].getValue());
                        newArr[j].setValue(0);
                        bool = 1;
                    } else {
                        if(newArr[p+1].getValue() == newArr[j].getValue() && newArr[p+1].getValue() != 0 && newArr[p+1].getPair() == false && newArr[j].getPair() == false){
                            // if two elements, match... combine them.
                            var sum = newArr[p+1].getValue() + newArr[j].getValue();
                            this.gameState.score += sum;
                            newArr[p+1].setValue(newArr[p+1].getValue() + newArr[j].getValue());
                            newArr[j].setValue(0);
                            newArr[p+1].setPair(true);
                            newArr[j].setPair(false);
                            if(sum == 2048) {
                                this.gameState.won = true;
                                this.win.forEach(observer => observer(this.gameState));
                                return;
                            } else {
                                this.gameState.won = false;
                            }
                            bool = 1;
                        } else {
                            if(p == j) {
                                continue;
                            }
                            // if they dont match.. put the element in the available spot.
                            newArr[p].setValue(newArr[j].getValue());
                            newArr[j].setValue(0);
                            bool = 1;
                        }
                    }
                }
                for(let v = 0; v < newArr.length; v++) {
                    newArr[v].setPair(false);
                }
            }
            if(bool == 1) {
                this.randomNumAfterMove();
            }
            var finalArr2 = [];
            for(var c = 0; c < this.size*this.size; c++) {
                finalArr2.push(this.arr[c].getValue());
            }
            this.gameState.board = finalArr2;

            if(bool == 1) {
                this.moves.forEach(observer => observer(this.gameState));
            }
            
            for(var i = 0; i < this.size*this.size; i++) {
                this.arr[i].setPair(false);
            }
            var d = this.checkIfDone();
            if(d == true) {
                //console.log("done");
                this.gameState.over = true;
                this.lose.forEach(observer => observer(this.gameState));
            } else {
                this.gameState.over = false;
            }
        }
        if(direction == 'down') {
            var bool = 0;
            for(var i = 0; i < this.size; i++) {
                var array = [];
                for(var p = 0; p < this.size*this.size; p=p+this.size) {
                    var newArr = this.arr.slice(i+p, i+p+1);
                    array.push(newArr[0]);
                }
                for(var j = array.length-2; j >= 0; j--) {
                    var p = j;
                    if(array[j].getValue() == 0) {
                        // if 0, continue
                        continue;
                    }
                    while(array[p+1] != null && array[p+1].getValue() == 0) {
                        // traverse array until it hit the boundary or the next element is not 0.
                        p++;
                    }
                    if(array[p+1] == null) {
                        // if the boundary is reached, set the boundary to the value.
                        array[p].setValue(array[j].getValue());
                        array[j].setValue(0);
                        bool = 1;
                    } else {
                        if(array[p+1].getValue() == array[j].getValue() && array[p+1].getValue() != 0 && array[p+1].getPair() == false && array[j].getPair() == false){
                            // if two elements, match... combine them.
                            var sum = array[p+1].getValue() + array[j].getValue();
                            this.gameState.score += sum;
                            array[p+1].setValue(array[p+1].getValue() + array[j].getValue());
                            array[j].setValue(0);
                            array[p+1].setPair(true);
                            array[j].setPair(false);
                            if(sum == 2048) {
                                this.gameState.won = true;
                                this.win.forEach(observer => observer(this.gameState));
                                return;
                            } else {
                                this.gameState.won = false;
                            }
                            bool = 1;
                        } else {
                            if(p == j) {
                                continue;
                            }
                            // if they dont match.. put the element in the available spot.
                            array[p].setValue(array[j].getValue());
                            array[j].setValue(0);
                            bool = 1;
                        }
                    }
                }
                
                for(let v = 0; v < array.length; v++) {
                    array[v].setPair(false);
                }
            }
            if(bool == 1) {
                this.randomNumAfterMove();
            }
            var finalArr2 = [];
            for(var c = 0; c < this.size*this.size; c++) {
                finalArr2.push(this.arr[c].getValue());
            }
            this.gameState.board = finalArr2;
            if(bool == 1) {
                this.moves.forEach(observer => observer(this.gameState));
            }
            
            
            for(var i = 0; i < this.size*this.size; i++) {
                this.arr[i].setPair(false);
            }
            var d = this.checkIfDone();
            if(d == true) {
                //console.log("done");
                this.gameState.over = true;
                this.lose.forEach(observer => observer(this.gameState));
            } else {
                this.gameState.over = false;
            }
        }
        if(direction == 'up') {
            var bool = 0;
            for(var i = 0; i < this.size; i++) {
                var array = [];
                for(var p = 0; p < this.size*this.size; p=p+this.size) {
                    var newArr = this.arr.slice(i+p, i+p+1);
                    array.push(newArr[0]);
                }
                for(var j = 1; j < array.length; j++) {
                    var p = j;
                    if(array[j].getValue() == 0) {
                        // if 0, continue
                        continue;
                    }
                    while(array[p-1] != null && array[p-1].getValue() == 0) {
                        // traverse array until it hit the boundary or the next element is not 0.
                        p--;
                    }
                    if(array[p-1] == null) {
                        // if the boundary is reached, set the boundary to the value.
                        array[p].setValue(array[j].getValue());
                        array[j].setValue(0);
                        bool = 1;
                    } else {
                        if(array[p-1].getValue() == array[j].getValue() && array[p-1].getValue() != 0 && array[p-1].getPair() == false && array[j].getPair() == false){
                            // if two elements, match... combine them.
                            var sum = array[p-1].getValue() + array[j].getValue();
                            this.gameState.score += sum;
                            array[p-1].setValue(array[p-1].getValue() + array[j].getValue());
                            array[j].setValue(0);
                            array[p-1].setPair(true);
                            array[j].setPair(false);
                            if(sum == 2048) {
                                this.gameState.won = true;
                                this.win.forEach(observer => observer(this.gameState));
                                return;
                            } else {
                                this.gameState.won = false;
                            }
                            bool = 1;
                        } else {
                            if(p == j) {
                                continue;
                            }
                            // if they dont match.. put the element in the available spot.
                            array[p].setValue(array[j].getValue());
                            array[j].setValue(0);
                            bool = 1;
                        }
                    }
                }
                for(let v = 0; v < newArr.length; v++) {
                    array[v].setPair(false);
                }
            }
            if(bool == 1) {
                this.randomNumAfterMove();
            }
            var finalArr2 = [];
            for(var c = 0; c < this.size*this.size; c++) {
                finalArr2.push(this.arr[c].getValue());
            }
            this.gameState.board = finalArr2;
            if(bool == 1) {
                this.moves.forEach(observer => observer(this.gameState));
            }
            for(var i = 0; i < this.size*this.size; i++) {
                this.arr[i].setPair(false);
            }
            var d = this.checkIfDone();
            if(d == true) {
                //console.log("done");
                this.gameState.over = true;
                this.lose.forEach(observer => observer(this.gameState));
            } else {
                this.gameState.over = false;
            }
        }
    }
    toString() {
        var count = 0;
        var string = "";
        for(var i = 0; i < (this.size) * (this.size); i++) {
            count++;
            if(this.arr[i].getValue() == 0) {
                string = string.concat('[ ]');
            } else {
                string = string.concat('[' + this.arr[i].getValue() + ']');
            }
            if(count % this.size == 0) {
                console.log(string);
                string = "";
            }
        }
        return string;
    }

    getGameState() {
        return this.gameState;
    }

    onMove(callback) {
        this.moves.push(callback);
    }
    onWin(callback) {
        this.win.push(callback);
    }
    onLose(callback) {
        this.lose.push(callback);
    }


    randomNum() {
        var nums = [2,2,2,2,2,2,2,2,2,4];
        var idx = Math.floor(Math.random() * nums.length);
        return nums[idx];
      }

    randomNumAfterMove() {
        var values = [];
        for(var i = 0; i < this.size * this.size; i++) {
            if(this.arr[i].getValue() == 0) {
                values.push(i);
            }
        }
        if(values.length == 0) {
            return;
        }
        var randomIndexOne = values[Math.floor(Math.random() * values.length)];
        var randomNumberOne = this.randomNum();
        return this.arr[randomIndexOne].setValue(randomNumberOne);
    }
    checkIfDone() {
        for(var i = 0; i < this.size*this.size; i++) {
            var temp = this.gameState.board[i];
            if(temp == 0) {
                return false;
            }
            if(this.gameState.board[i+this.size] != null && temp == this.gameState.board[i+this.size]) {
                return false;
            }
            if(this.gameState.board[i+1] != null && temp == this.gameState.board[i+1] && (i % this.size) != this.size-1) {
                return false;
            }
        }
        return true;
    }
}