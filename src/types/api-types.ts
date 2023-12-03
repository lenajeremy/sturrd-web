export type ApiResponse<T> = {
    errors: Array<string>,
    data: T,
    message: string
}