import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async getCharacter(id: string): Promise<Character> {
      return this.characterRepository.findOne({ id });
  }

  async createCharacter(
    level: Number,
    hpMax: Number,
    hpCurrent: Number,
    xpMax: Number,
    xpCurrent: Number,
    damage: Number,
    accuracy: Number,
    armour: Number,
    evasion: Number,
    critChance: Number,
    gold: Number,
  ): Promise<Character> {
    const character = this.characterRepository.create({
      id: randomUUID(),
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
    });

    return this.characterRepository.save(character);
  }
}
