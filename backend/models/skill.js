const mongoose = require('mongoose');

const SkillSchema = {
    name: {
        type: String,
        required: true
    }
}

var Skill = mongoose.model('Skill', SkillSchema);

module.exports = { Skill, SkillSchema };