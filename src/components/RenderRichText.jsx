import DOMPurify from "dompurify";
import React from "react";

function RenderRichText({ content }) {
  const sanitisedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitisedContent }} />;
}

export default RenderRichText;
