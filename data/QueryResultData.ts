export interface QueryResultData<T> {
    data: T | undefined,
    isLoading: boolean,
    error: Error | null
}