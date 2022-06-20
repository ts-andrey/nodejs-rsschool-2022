export function badRequest(resp: any, errorCode: number, message: string) {
  resp.writeHead(errorCode, { 'Content-Type': 'json' });
  resp.write(
    JSON.stringify({
      message,
    })
  );
}

