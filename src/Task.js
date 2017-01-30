// @flow

type Success<T> = (data: T) => void
type Failure = (err: any) => void

module.exports = class Task<T> {
    computation: (rej: Failure, res: Success<T>) => void

    constructor(callback: (rej: Failure, res: Success<T>) => void) {
        this.computation = callback
    }

    static of<U>(value: U): Task<U> {
        return new Task((rej: Failure, res: Success<U>) =>
            res(value)
        )
    }

    fork(rej: Failure, res: Success<T>): void {
        this.computation(rej, res)
    }

    map<U>(f: (data: T) => U): Task<U> {
        return new Task((rej: Failure, res: Success<U>) =>
            this.fork(rej, (data: T) =>
                res(f(data))
            )
        )
    }

    chain<U>(f: (data: T) => Task<U>): Task<U> {
        return new Task((rej: Failure, res: Success<U>) =>
            this.fork(rej, (data: T) =>
                f(data).fork(rej, res)
            )
        )
    }
}
