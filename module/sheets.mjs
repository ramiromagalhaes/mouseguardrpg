const { api, sheets } = foundry.applications;

export class CharacterSheet extends api.HandlebarsApplicationMixin(
    sheets.ActorSheetV2
) {
    //READ THIS: https://foundryvtt.wiki/en/development/api/applicationv2

    constructor(options = {}) {
        super(options);
    }

    /**
     * DocumentSheet
     * https://foundryvtt.com/api/classes/foundry.applications.api.DocumentSheetV2.html#DEFAULT_OPTIONS
     *
     * ActorSheet (herda de DocumentSheet)
     * https://foundryvtt.com/api/classes/foundry.applications.sheets.ActorSheetV2.html#DEFAULT_OPTIONS
     *
     * @override
     */
    static DEFAULT_OPTIONS = {
        position: {
            height: 400,
            width: 620
        },
        form: {
            //handler: CharacterSheet.formHandler,
            submitOnChange: true,
            closeOnSubmit: false
        }
    };

    static PARTS = {
        form: {
            template: "systems/mouseguardrpg/templates/character-sheet.hbs",
            scrollable: [""]
        }
    };

    /**
     * https://foundryvtt.com/api/interfaces/foundry.applications.types.ApplicationRenderOptions.html
     * https://foundryvtt.com/api/interfaces/foundry.DocumentSheetRenderOptions.html
     * @override
     */
    async _prepareContext(options) {
        /*TODO how do I set a proper validation message to name?
        const bio = {
            field: this.document.system.schema.fields.bio,
            value: this.document.system.bio,
            enriched: await TextEditor.enrichHTML(this.document.system.bio, {
                rollData: this.document.getRollData(),
                relativeTo: this.document
            })
        };
        {{formGroup bio.field value=bio.value enriched=bio.enriched height=300}}
        */

        const context = {
            name: this.document.name,
            home: this.document.system.home,
            fur: this.document.system.fur,
            age: this.document.system.age,
            rank: this.document.system.rank,
            cloak: this.document.system.cloak,
            menthor: this.document.system.menthor,
            master_artisan: this.document.system.master_artisan,
            parents: this.document.system.parents,
            friend: this.document.system.friend,
            enemy: this.document.system.enemy,
            instinct: this.document.system.instinct,
            belief: this.document.system.belief,
            goal: this.document.system.goal,
            health: this.document.system.health,
            will: this.document.system.will,
            fields: {
                name: this.document.schema.fields.name,
                home: this.document.system.schema.fields.home,
                fur: this.document.system.schema.fields.fur,
                age: this.document.system.schema.fields.age,
                rank: this.document.system.schema.fields.rank,
                cloak: this.document.system.schema.fields.cloak,
                menthor: this.document.system.schema.fields.menthor,
                master_artisan:
                    this.document.system.schema.fields.master_artisan,
                parents: this.document.system.schema.fields.parents,
                friend: this.document.system.schema.fields.friend,
                enemy: this.document.system.schema.fields.enemy,
                instinct: this.document.system.schema.fields.instinct,
                belief: this.document.system.schema.fields.belief,
                goal: this.document.system.schema.fields.goal,
                health: this.document.system.schema.fields.health,
                will: this.document.system.schema.fields.will
            }
        };
        return context;
    }

    /*
    async _preparePartContext(partId, context) {
        context.partId = `${this.id}-${partId}`;
        return context;
    }
    */

    /**
     * @see https://foundryvtt.com/api/classes/client.FormDataExtended.html
    static async formHandler(event, form, formData) {
        console.log(JSON.stringify(event));
        console.log(JSON.stringify(form));
        console.log(JSON.stringify(formData.form));
        console.log(form);
        console.log(JSON.stringify(this.actor));
    }
     */
}
