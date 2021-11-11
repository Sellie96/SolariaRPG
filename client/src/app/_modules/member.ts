import { Photo } from "./Photo";

export interface Member {
    id: number;
    username: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gamemode: string;
    photos: Photo[];
  }
  
