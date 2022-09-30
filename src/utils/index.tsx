export const highlightDiv = ({
  value,
  searchKey
}: {
  value?: string
  searchKey?: string
}) => {
  if (!searchKey) return value
  if (!value) return null

  const parts = value.split(new RegExp(`(${searchKey})`, 'gi'))
  return (
    <>
      {parts.map((part, idx) => {
        if (part.toLowerCase() === searchKey.toLowerCase()) {
          return (
            <span key={`${part}-${idx}`} className="highlight">
              {part}
            </span>
          )
        }
        return <span key={`${part}-${idx}`}>{part}</span>
      })}
    </>
  )
}
