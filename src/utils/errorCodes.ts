type ErrorType = {
    [key: string]: string
}

export const ErrorCodes: ErrorType = {
    'group_is_null': 'Вступите в группу, прежде чем отправлять сообщение',
    'group_has_no_headman': 'У группы не выбран староста'
}

export const getErrorMessage = (error_id: string | undefined) => {
    if (!error_id || !ErrorCodes[error_id]) {
        return 'Произошла непредвиденная ошибка'
    }
    return ErrorCodes[error_id]
}