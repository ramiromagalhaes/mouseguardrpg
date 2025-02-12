import {
    AnimalDataModel,
    MouseDataModel,
    WeaselDataModel,
    CharacterDataModel,
    SkillDataModel
} from "./module/data-models.mjs";
import { MouseGuardActor, MouseGuardItem } from "./module/documents.mjs";
import { CharacterSheet, SkillSheet } from "./module/sheets.mjs";

Hooks.once("init", () => {
    //Data Models
    CONFIG.Actor.dataModels.animal = AnimalDataModel;
    CONFIG.Actor.dataModels.mouse = MouseDataModel;
    CONFIG.Actor.dataModels.weasel = WeaselDataModel;
    CONFIG.Actor.dataModels.character = CharacterDataModel;

    CONFIG.Item.dataModels.skill = SkillDataModel;

    //Documents
    CONFIG.Actor.documentClass = MouseGuardActor;

    CONFIG.Item.documentClass = MouseGuardItem;

    //Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mouseguardrpg", CharacterSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Character"
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("mouseguardrpg", SkillSheet, {
        types: ["skill"],
        makeDefault: true,
        label: "Skill"
    });
});
