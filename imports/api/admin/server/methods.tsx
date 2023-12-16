import {Admin} from '../Admin'

Meteor.methods({
    'admin.insert'(userData) {
        Admin.insert(userData);
    },
    'admin.updateBasicDetail'(userData, adminUserId) {
        const admin = Admin.findOne({_id: adminUserId});
        Admin.update(admin._id, 
            {$set: {username: userData.username, password: userData.password,
            profile:
            {name: userData.name, 
            email: userData.username, 
            phone: userData.phone,
            userType: 'admin'}}});
    },
    'admin.changePassword'(adminUserId, newPassword) {
        Accounts.setPassword(adminUserId, newPassword);
    }
})


