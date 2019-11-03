export default class Tile {
    constructor() {
        this.value = 0;
        this.pair = false;
    }

    getValue() {
        return this.value;
    }

    getPair() {
        return this.pair;
    }

    setValue(value) {
        this.value = value;

    }
    setPair(value) {
        this.pair = value;
    }





}