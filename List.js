// @flow

module.exports = class List<T> {
    list: Array<T>

    constructor(value: Array<T>) {
        this.list = value
    }

    static of<U>(value: Array<U>): List<U> {
        return new List(value)
    }

    map<U>(f: (data: T) => U): List<U> {
        return List.of(this.list.map(f))
    }
}
