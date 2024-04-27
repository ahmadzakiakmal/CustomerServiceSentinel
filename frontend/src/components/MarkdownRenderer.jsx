import { marked } from "marked";

const MarkdownRenderer = ({ text }) => {
  const html = marked.parse(text);
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  );
};

export default MarkdownRenderer;