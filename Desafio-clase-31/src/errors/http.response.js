const Status = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUHTORIZED: 401,
    INTERNAN_SERVER_ERROR: 500
}

export class HttpResponse {
    ok(res, data) {
        return res.status(Status.OK).json({status: Status.OK, message: 'Success', data: data})
    }


    NotFound(res, data) {
        return res.status(Status.NOT_FOUND).json({status: Status.NOT_FOUND, message: 'Not found', data: data})

    }

    Unauhtorized(res, data) {
        return res.status(Status.UNAUHTORIZED).json({status: Status.UNAUHTORIZED, message: 'Unauhtorized', data: data})

    }

    ServerError(res, data) {
        return res.status(Status.INTERNAN_SERVER_ERROR).json({status: Status.INTERNAN_SERVER_ERROR, message: 'Internal server error', data: data})

    }

}
