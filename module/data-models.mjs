const { StringField, NumberField, SchemaField, HTMLField, FilePathField } =
    foundry.data.fields;

export class AnimalDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            //name: searcheable_string({ required: true }),
            //nature: positive_number()
            //description
            //weapons
            //behaviours
        };
    }
}

export class MouseDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {};
    }
}

export class WeaselDataModel extends MouseDataModel {
    static defineSchema() {
        return {};
    }
}

export class CharacterDataModel extends foundry.abstract.TypeDataModel {
    static plain_string = {
        blank: true,
        trim: true
    };

    static searcheable_string = {
        blank: true,
        trim: true,
        textSearch: true
    };

    static positive_number = {
        required: true,
        integer: true,
        min: 0,
        initial: 0
    };

    static defineSchema() {
        //TODO how do I set a proper validation message to name?

        const fields = {
            home: new StringField({
                ...this.searcheable_string,
                label: "Home"
            }),
            fur: new StringField({ ...this.searcheable_string, label: "Fur" }),
            age: new NumberField({ ...this.positive_number, label: "Age" }),

            rank: new StringField({
                ...this.searcheable_string,
                label: "Rank"
            }),
            cloak: new StringField({
                ...this.searcheable_string,
                label: "Cloak"
            }),
            menthor: new StringField({
                ...this.searcheable_string,
                label: "Menthor"
            }),
            master_artisan: new StringField({
                ...this.searcheable_string,
                label: "Master Artisan"
            }),

            parents: new StringField({
                ...this.searcheable_string,
                label: "Parents"
            }),
            friend: new StringField({
                ...this.searcheable_string,
                label: "Friend"
            }),
            enemy: new StringField({
                ...this.searcheable_string,
                label: "Enemy"
            }),

            instinct: new StringField({
                ...this.plain_string,
                label: "Instinct"
            }),
            belief: new StringField({ ...this.plain_string, label: "Belief" }),
            goal: new StringField({ ...this.plain_string, label: "Goal" }),

            nature: new SchemaField({
                current: new NumberField(this.positive_number),
                max: new NumberField(this.positive_number)
            }),

            health: new NumberField({
                ...this.positive_number,
                label: "Health"
            }),
            will: new NumberField({ ...this.positive_number, label: "Will" }),
            resources: new NumberField({
                ...this.positive_number,
                label: "Resources"
            }),
            circles: new NumberField({
                ...this.positive_number,
                label: "Circles"
            }),

            fate: new NumberField({ ...this.positive_number, label: "Fate" }),
            persona: new NumberField({
                ...this.positive_number,
                label: "Persona"
            }),
            checks: new NumberField({
                ...this.positive_number,
                label: "Checks"
            }),

            bio: new HTMLField({ label: "Bio" })

            //skills
            //characteristics
            //wises
        };

        return fields;
    }

    prepareDerivedData() {
        super.prepareDerivedData();

        // Make sure nature cannot exceed its maximum.
        this.nature.current = Math.min(this.nature.current, this.nature.max);
    }

    spendNature(toSpend) {
        if (this.nature.current - toSpend > 0) {
            this.nature.current -= toSpend;
        } else {
            this.nature.max -= 1;
            this.nature.current = this.nature.max;
            //TODO should I reduce remaining nature from the new max? Gotta check the rules.
        }
    }
}
