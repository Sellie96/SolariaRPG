import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCharacterInput {
    @Field()
    level: Number;

    @Field()
    hpMax: Number;

    @Field()
    hpCurrent: Number;

    @Field()
    xpMax: Number;

    @Field()
    xpCurrent: Number;

    @Field()
    damage: Number;

    @Field()
    accuracy: Number;

    @Field()
    armour: Number;

    @Field()
    evasion: Number;

    @Field()
    critChance: Number;

    @Field()
    gold: Number;

}