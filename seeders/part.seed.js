const db = require('../models/index');

const parts = [
    { name: 'IOS' },
    { name: 'ANDROID' },
    { name: 'NODE' },
    { name: 'SPRING' },
    { name: 'WEB' },
    { name: 'PM' },
    { name: 'DESIGN' },
];

const insertPartList = async () => {
    try {
        await db.Part.bulkCreate(parts);
        console.log('Part seeded successfully.');
    } catch (error) {
        console.log('Error seeding Part:', error);
    }
};

module.exports = insertPartList;
