import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { CharacterType } from './character.type';

@Resolver((of) => CharacterType)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query((returns) => CharacterType)
  character(@Args('id') id:string) {
    return this.characterService.getCharacter(id)
  }

  @Mutation((returns) => CharacterType)
  createCharacter(
    @Args('level') level: Number,
    @Args('hpMax') hpMax: Number,
    @Args('hpCurrent') hpCurrent: Number,
    @Args('xpMax') xpMax: Number,
    @Args('xpCurrent') xpCurrent: Number,
    @Args('damage') damage: Number,
    @Args('accuracy') accuracy: Number,
    @Args('armour') armour: Number,
    @Args('evasion') evasion: Number,
    @Args('critChance') critChance: Number,
    @Args('gold') gold: Number,
  ) {
    return this.characterService.createCharacter(
      level,
      hpMax,
      hpCurrent,
      xpMax,
      xpCurrent,
      damage,
      accuracy,
      armour,
      evasion,
      critChance,
      gold,
    );
  }
}
