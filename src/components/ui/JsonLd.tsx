// Serializes structured data for injection as JSON-LD.
// Unicode-escapes <, >, & to prevent </script> injection — data is always
// application-controlled (never from user input), but defence-in-depth matters.
function safeStringify(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  )
}
