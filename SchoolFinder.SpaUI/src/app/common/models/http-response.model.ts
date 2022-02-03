export class HttpResponse<T> {
    success: boolean;
    errors: string[];
    data: T[];
    count: number;
}