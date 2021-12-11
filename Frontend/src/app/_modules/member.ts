import { Character } from "./Character";

export interface Member {
    id: number;
    username: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gameMode: string;
    characters: Character[];
  }
  
