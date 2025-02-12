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
        },
        actions: {
            editImage: CharacterSheet.#onEditImage
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
        const context = {
            img: this.document.img,
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
            nature: this.document.system.nature,
            resources: this.document.system.resources,
            circles: this.document.system.circles,
            fate: this.document.system.fate,
            persona: this.document.system.persona,
            checks: this.document.system.checks,
            bio: {
                text: this.document.system.bio,
                enriched: await TextEditor.enrichHTML(
                    this.document.system.bio,
                    {
                        rollData: this.document.getRollData(),
                        relativeTo: this.document
                    }
                )
            },

            skills: this.document.system.skills,
            traits: this.document.system.traits,
            wises: this.document.system.wises,

            fields: {
                img: this.document.schema.fields.img,
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
                will: this.document.system.schema.fields.will,
                nature: this.document.system.schema.fields.nature,
                resources: this.document.system.schema.fields.resources,
                circles: this.document.system.schema.fields.circles,
                fate: this.document.system.schema.fields.fate,
                persona: this.document.system.schema.fields.persona,
                checks: this.document.system.schema.fields.checks,
                bio: this.document.system.schema.fields.bio,

                skills: this.document.system.schema.fields.skills,
                traits: this.document.system.schema.fields.traits,
                wises: this.document.system.schema.fields.wises
            }
        };
        return context;
    }

    _onRender(context, options) {
        super._onRender(context, options);

        //Adds the handler that allows us to store skill levels created in the table
        const skills = this.element.querySelectorAll("input.skill-rating"); // whatever selector works for you
        for (const s of skills) {
            //should I add the means to find the item?
            s.addEventListener("change", (e) => {
                console.log("Find the id and new skill and show it.");
                console.log(e);
            });
        }
    }

    /**
     * Edit the Actor profile image.
     * This is a simplified version of the script I've seen people playing
     * around with in the web.
     * TODO: Remove this in V13?
     */
    static async #onEditImage(event) {
        const current = this.document.img;
        const fp = new FilePicker({
            current,
            type: "image",
            callback: (path) => {
                event.target.src = path;
                this.document.img = path;
                this.submit();
            }
        });
        await fp.browse();
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

export class SkillSheet extends api.HandlebarsApplicationMixin(
    sheets.ItemSheetV2
) {
    static DEFAULT_OPTIONS = {
        actions: {},
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        }
    };

    static PARTS = {
        form: {
            template: "systems/mouseguardrpg/templates/skill-sheet.hbs",
            scrollable: [""]
        }
    };

    async _prepareContext(options) {
        return {
            name: this.document.name,
            fields: {
                name: this.document.schema.fields.name
            }
        };
    }
}
