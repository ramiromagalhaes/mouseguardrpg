import {
    AnimalDataModel,
    MouseDataModel,
    WeaselDataModel,
    CharacterDataModel
} from "./module/data-models.mjs";
import { MouseGuardActor } from "./module/documents.mjs";
import { CharacterSheet } from "./module/sheets.mjs";

Hooks.once("init", () => {
    //Data Models
    CONFIG.Actor.dataModels.animal = AnimalDataModel;
    CONFIG.Actor.dataModels.mouse = MouseDataModel;
    CONFIG.Actor.dataModels.weasel = WeaselDataModel;
    CONFIG.Actor.dataModels.character = CharacterDataModel;

    //Documents
    CONFIG.Actor.documentClass = MouseGuardActor;

    //Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mouseguardrpg", CharacterSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Character"
    });
});
