
export const findAll = async () => {
    const results = [
        {    id: 1,
            name: 'Test Card 1',
            type: 'Monster',
            description: 'Does stuff',
            archetype: 'Test',
            created_at: "00:00:00"
        },
        {    id: 2,
            name: 'Test Card 2',
            type: 'Spell',
            description: 'Does stuff',
            created_at: "00:00:00"
        }
    ]
    return Promise.resolve(results)
};

export const findByID = async () => {
    const results = [
        {    id: 1,
            name: 'Test Card 1',
            type: 'Monster',
            description: 'Does stuff',
            archetype: 'Test',
            created_at: "00:00:00"
        }
    ];
    return Promise.resolve(results);
};

export const create = async () => {
    const results = [
        {    id: 1,
            name: 'Test Card 1',
            type: 'Monster',
            description: 'Does stuff',
            archetype: 'Test',
            created_at: "00:00:00"
        }
    ];
    return Promise.resolve(results);
};

export const createBulk = async () => {
    const results = [
        {    id: 1,
            name: 'Test Card 1',
            type: 'Monster',
            description: 'Does stuff',
            archetype: 'Test',
            created_at: "00:00:00"
        }
    ];
    return Promise.resolve(results);
};
