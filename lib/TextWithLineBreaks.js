import React from "react";

const TextWithLineBreaks = ({ text }) => {
  return (
    <p className="text-gray-700 dark:text-gray-300">
      {text.split("\n").map((str, index) => (
        <React.Fragment key={index}>
          {str}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default TextWithLineBreaks;
