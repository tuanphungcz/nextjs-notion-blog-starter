export default function Text({ text }) {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value;
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : null,
          italic ? 'italic' : null,
          code
            ? 'bg-gray-200 font-semibold  text-gray-500 text-sm px-2 rounded mx-1 inline-block align-middle tracking-tight'
            : null,
          strikethrough ? 'line-through' : null,
          underline ? 'underline' : null
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a className="text-gray-700 underline" href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
}
