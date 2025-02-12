const {
    StringField,
    NumberField,
    BooleanField,
    SchemaField,
    HTMLField,
    ArrayField
} = foundry.data.fields;

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

        const schema = {
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

            bio: new HTMLField({ label: "Bio" }),

            skills: new ArrayField(
                new SchemaField({
                    skill: new StringField(this.searcheable_string),
                    rating: new NumberField(this.positive_number),
                    passes: new NumberField(this.positive_number),
                    fails: new NumberField(this.positive_number)
                })
            ),

            traits: new ArrayField(
                new SchemaField({
                    trait: new StringField(this.searcheable_string),
                    level: new NumberField(this.positive_number),
                    for: new NumberField(this.positive_number),
                    against: new NumberField(this.positive_number)
                })
            ),

            wises: new ArrayField(
                new SchemaField({
                    wise: new StringField(this.searcheable_string),
                    pass: new BooleanField(),
                    fail: new BooleanField(),
                    fate: new BooleanField(),
                    persona: new BooleanField()
                })
            )
        };

        return schema;
    }

    prepareDerivedData() {
        super.prepareDerivedData();

        // Make sure nature cannot exceed its maximum.
        this.nature.current = Math.min(this.nature.current, this.nature.max);

        this.acquireSkill();
        this.acquireTraits();
        this.acquireWises();
    }

    acquireSkill() {
        this.skills.push({
            skill: "Thing",
            rating: 3,
            passes: 1,
            fails: 2
        });
        this.skills.push({
            skill: "Something",
            rating: 5,
            passes: 4,
            fails: 2
        });
    }

    acquireTraits() {
        this.traits.push({
            trait: "Thing",
            level: 1,
            for: 1,
            against: 1
        });
        this.traits.push({
            trait: "Something",
            level: 2,
            for: 0,
            against: 0
        });
    }

    acquireWises() {
        this.wises.push({
            wise: "Wise 1",
            pass: 0,
            fail: 0,
            fate: 1,
            persona: 1
        });
        this.wises.push({
            wise: "Wise 2",
            pass: 1,
            fail: 1,
            fate: 0,
            persona: 0
        });
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

export class SkillDataModel extends foundry.abstract.TypeDataModel {
    static max_rating = 6;

    static defineSchema() {
        const schema = {
            type: new StringField({
                required: true,
                blank: false,
                initial: "skill"
            }),
            description: new StringField({
                blank: true,
                trim: true,
                textSearch: true,
                label: "Description"
            }),
            rating: new NumberField({
                required: true,
                integer: true,
                min: 0,
                initial: 0,
                max: this.max_rating
            }),
            passes: new NumberField({
                required: true,
                integer: true,
                min: 0,
                initial: 0,
                max: this.max_rating
            }),
            fails: new NumberField({
                required: true,
                integer: true,
                min: 0,
                initial: 0,
                max: this.max_rating
            })
        };

        return schema;
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }

    /**
     * @see #addTest
     */
    addPass() {
        return this.#addTest(true);
    }

    /**
     * @see #addTest
     */
    addFail() {
        return this.#addTest(false);
    }

    /**
     * Return true if the character increased his rating.
     * @param {boolean} pass true to add a pass, false to add a fail
     */
    #addTest(pass) {
        const fail_threshold = this.rating - 1;

        if (pass) {
            if (this.passes < this.rating) this.passes++;
        } else {
            if (this.fails < fail_threshold) this.fails++;
        }

        if (
            this.passes >= this.rating &&
            this.fails >= fail_threshold &&
            this.rating < this.max_rating
        ) {
            this.passes = 0;
            this.fails = 0;
            this.rating++;
            return true;
        }

        return false;
    }
}

export class TraitDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {}
}
