type ErrorType = {
    [key: string]: string
}

export const ErrorCodes: ErrorType = {
    'user_group_nil': 'Вступите в группу, прежде чем отправлять сообщение',
    'no_headman': 'У группы не выбран староста'
}

export const getErrorMessage = (error_id: string | undefined) => {
    if (!error_id || !ErrorCodes[error_id]) {
        return 'Произошла непредвиденная ошибка'
    }
    return ErrorCodes[error_id]
}