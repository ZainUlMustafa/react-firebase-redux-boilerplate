import moment from 'moment'
const DateParser = (dateCreated, doWhat = 0) => {
    const helpMap = {
        "parseFirestoreDate": 0,
        "howAgo": 1,
        "currentData": 2
    }

    const parseFirestoreDate = () => {
        var parsedDate = new Date(
            dateCreated ? dateCreated.seconds + dateCreated.nanoseconds * 10 ** -9 : ""
        );
        // console.log(parsedDate, dateCreated)
        var date = moment(parsedDate * 1000).format("MMM Do, YYYY");
        return date
    }

    const currentDate = () => {
        var date = moment().format("MMM Do YY");
        return date;
    }

    const howAgo = () => {
        return moment(dateCreated?.toDate()).fromNow()
    }

    if (doWhat === 0) {
        // console.log(dateCreated)
        return parseFirestoreDate()
    } else if (doWhat === 1) {
        // console.log(dateCreated)
        return howAgo()
    }
    else if (doWhat === 2) {
        // console.log(dateCreated)
        return currentDate()
    }
     else {
        return JSON.stringify(helpMap)
    }
}

export default DateParser;