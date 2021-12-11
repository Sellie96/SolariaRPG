export class SetUser {
    static readonly type = '[user] set user';
    constructor(public payload: string) {}
}