export function badRequest(resp: any, message: string) {
  resp.statusCode = 400;
  resp.setHeader('Content-Type', 'json');
  resp.write(
    JSON.stringify({
      message,
    })
  );
}
