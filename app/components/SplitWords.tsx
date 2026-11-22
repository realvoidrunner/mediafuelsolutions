import { Fragment } from "react";

// Wraps each word in a mask so it can slide up into view.
// Real spaces stay between words, so screen readers and copy/paste read normally.
export default function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span className="split-word-inner">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
