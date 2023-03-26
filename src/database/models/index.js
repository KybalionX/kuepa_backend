import Role from './role.model.js';
import User from './user.model.js';

User.belongsTo(Role);
Role.hasMany(User);

export { Role, User };
