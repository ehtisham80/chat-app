import app from './base';
// sender message
export const SenderMessages = async (msgValue, currentUserId, guestUserId, date) => {
    try {
        return await app.database()
            .ref(`messages/${currentUserId}`)
            .child(guestUserId)
            .push({
                message: {
                    sender: currentUserId,
                    receiver: guestUserId,
                    msg: msgValue,
                    date: date
                }
            })
    } catch (error) {
        console.log(error)
    }
}