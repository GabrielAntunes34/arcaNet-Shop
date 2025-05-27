// Custom errorClass to send error Messages back to the client

class ErrorMessage extends Error {
    constructor(entityName, entityId, httpStatusCode, details='') {
        super();
        this.entity = entityName;
        this.status = httpStatusCode;
        this.details = details;
        this.id = entityId

        // Choosing a message based on the http status
        switch(httpStatusCode) {
            case 404:
                this.message = `Error: ${entityName} with id: ${entityId} not found`;
                break;
            case 400:
                this.message = `Error: Couldn't save a new ${entityName}, did you send all the data correctly?`;
                break;
            case 500:
                this.message = `Error: Couldn\'t access /${entityName} at server`;
                break;
            default:
                this.message = `Error: Something went wrong!`
                break;
        }

        // Saving the call stack for debugs
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

            //DEBUG
        //console.log(this);
    }
}

module.exports = ErrorMessage;