export const dateConverter = (dateCreated) => {
    // console.log(dateCreated);
    // check if dateCreated is not null/undefined
    var parsedDate = 'Invalid date';
    if (dateCreated) {
        // type check if dateCreated is a number
        if (typeof dateCreated === 'number') {
            try {
                parsedDate = new Date(dateCreated).toUTCString().split(' ').slice(0, 4).join(' ');
            } catch (e) {
                parsedDate = 'Invalid date';
            }
        }
        // type check if dateCreated is an object
        if (typeof dateCreated === 'object') {
            if ('seconds' in dateCreated) {
                try {
                    parsedDate = new Date(dateCreated.seconds * 1000).toUTCString().split(' ').slice(0, 4).join(' ');
                } catch (e) {
                    parsedDate = 'Invalid date';
                }
            }
        }
    }
    return {
        parsedDate,
        type: ''
    }
}

export const daysDifference = (dateFuture, datePresent) => {
    dateFuture = dateFuture ?? Date.now()
    datePresent = datePresent ?? Date.now()
    let diffInMilliSeconds = Math.abs(dateFuture - datePresent)

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    return days;
}