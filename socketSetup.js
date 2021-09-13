const Dialog = require('./models/Dialog');
const User = require('./models/User');

const socketSetup =  io => {

    io.on('connection', socket => {

        // Helper function to set offline status
        const setOffline = userId => {
        
            User.findById(userId)
            .then(user => {
                
                user.online = false;
                user.save();
    
                socket.broadcast.emit('userLeft', userId);
    
            });

        };

        /*\
        |*| SIGN IN / SIGN UP / AUTH. WITH TOKEN
        \*/

        // When user signs in(up)/authenticates, join their socket to their profile's ID room
        socket.on('signIn', userId => {

            socket.join(userId);

            User.findById(userId)
            .then(user => {

                user.password = user.dialogs = undefined;

                socket.broadcast.emit('userLoggedIn', user);

            });

            /*\
            |*| DISCONNECTION
            \*/

            socket.on('disconnect', () => setOffline(userId));

        });

        /*\
        |*| DIALOGS
        \*/

        // Create dialog
        socket.on('createDialog', (initiatorName, interlocutorName, dialogData) => {

            const newDialog = new Dialog(dialogData);

            newDialog.save()
            .then(dialog => {

                const { users } = dialog;
                const [ initiatorId, interlocutorId ] = users;
                const dialogId = dialog._id.toString();
                
                socket.emit('dialogCreated', dialog);
                socket.join(dialogId);

                socket.emit(
                    'newDialog',
                    {
                        id: dialogId,
                        name: interlocutorName,
                        interlocutorId
                    }
                );

                socket.to(interlocutorId).emit(
                    'newDialog',
                    {
                        id: dialogId,
                        name: initiatorName,
                        interlocutorId: initiatorId
                    }
                );

                User.findById(initiatorId)
                .then(user => {

                    let dialog = {
                        id: dialogId,
                        name: interlocutorName,
                        interlocutorId
                    };

                    user.dialogs.push(dialog);
                    user.save();

                });

                User.findById(interlocutorId)
                .then(user => {

                    let dialog = {
                        id: dialogId,
                        name: initiatorName,
                        interlocutorId: initiatorId
                    };

                    user.dialogs.push(dialog);
                    user.save();

                });

            });

        });

        // Delete dialog
        socket.on('deleteDialog', dialogId => {
            
            Dialog.findByIdAndDelete(dialogId)
            .then(dialog => {

                const { users } = dialog;
                const [ initiatorId, interlocutorId ] = users;
                const dialogId = dialog._id.toString();
                
                User.findById(initiatorId)
                .then(user => {

                    user.dialogs = user.dialogs.filter(dialog => dialog.id !== dialogId);
                    user.save()
                    .then(user => {

                        user.password = undefined;
                        socket.emit('dialogDeleted', user);

                    });

                });

                User.findById(interlocutorId)
                .then(user => {

                    user.dialogs = user.dialogs.filter(dialog => dialog.id !== dialogId);
                    user.save()
                    .then(user => {

                        user.password = undefined;
                        socket.to(interlocutorId).emit('dialogDeleted', user)

                    });

                });

            });

        });

        // Enter dialog
        socket.on('enterDialog', dialogId => socket.join(dialogId));

        // Exit dialog
        socket.on('exitDialog', dialogId => socket.leave(dialogId));

        /*\
        |*| MESSAGES
        \*/

        // New message posted
        socket.on('postMessage', (dialogId, message) => {

            io.in(dialogId).emit('newMessage', message);

            Dialog.findById(dialogId)
            .then(dialog => {

                dialog.messages.push(message);
                dialog.save();

            });

        });

        /*\
        |*| LOG OUT
        \*/

        // Leave user's ID room on logout
        socket.on('logOut', userId => {
            socket.leave(userId);
            setOffline(userId);
        });

    });

    return io;

};

module.exports = socketSetup;