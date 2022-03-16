"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const character_service_1 = require("./character.service");
const character_type_1 = require("./character.type");
let CharacterResolver = class CharacterResolver {
    constructor(characterService) {
        this.characterService = characterService;
    }
    character(id) {
        return this.characterService.getCharacter(id);
    }
    createCharacter(level, hpMax, hpCurrent, xpMax, xpCurrent, damage, accuracy, armour, evasion, critChance, gold) {
        return this.characterService.createCharacter(level, hpMax, hpCurrent, xpMax, xpCurrent, damage, accuracy, armour, evasion, critChance, gold);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => character_type_1.CharacterType),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharacterResolver.prototype, "character", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => character_type_1.CharacterType),
    __param(0, (0, graphql_1.Args)('level')),
    __param(1, (0, graphql_1.Args)('hpMax')),
    __param(2, (0, graphql_1.Args)('hpCurrent')),
    __param(3, (0, graphql_1.Args)('xpMax')),
    __param(4, (0, graphql_1.Args)('xpCurrent')),
    __param(5, (0, graphql_1.Args)('damage')),
    __param(6, (0, graphql_1.Args)('accuracy')),
    __param(7, (0, graphql_1.Args)('armour')),
    __param(8, (0, graphql_1.Args)('evasion')),
    __param(9, (0, graphql_1.Args)('critChance')),
    __param(10, (0, graphql_1.Args)('gold')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number,
        Number,
        Number,
        Number,
        Number,
        Number,
        Number,
        Number,
        Number,
        Number,
        Number]),
    __metadata("design:returntype", void 0)
], CharacterResolver.prototype, "createCharacter", null);
CharacterResolver = __decorate([
    (0, graphql_1.Resolver)((of) => character_type_1.CharacterType),
    __metadata("design:paramtypes", [character_service_1.CharacterService])
], CharacterResolver);
exports.CharacterResolver = CharacterResolver;
//# sourceMappingURL=character.resolver.js.map