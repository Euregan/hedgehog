// @flow

module.exports = class Maybe<T> {
    value: ?T

    constructor(value: ?T) {
        this.value = value
    }

    static of<U>(value: ?U): Maybe<U> {
        return new Maybe(value)
    }

    isNothing() {
        return this.value == null
    }

    map<U>(f: (data: T) => U): Maybe<U> {
        return this.value == null ? Maybe.of(null) : Maybe.of(f(this.value))
    }
}
