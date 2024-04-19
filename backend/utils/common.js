const extractErrors = (error)=>{
    var errors = {};
    error.details.forEach(function(detail) {
        errors[detail.path[0]] = detail.message
    });
    return errors;
}

module.exports = {
    extractErrors
}