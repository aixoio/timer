
export function ConvertSecondToFotmatedString(secs: number): string {
    const date = new Date(secs * 1000)

    return `${date.getMinutes()}:${date.getSeconds()}`
}
