import React, { forwardRef } from "react";

const TextInput = forwardRef(
  ({ style, password, ...props }: any, ref) => {
    return (
        <input
          type={password ? "password" : "text"}
          ref={ref}
          style={{
            backgroundColor: "#232323",
            border: "1px solid black",
            height: 35,
            width: "100%",
            color: "white",
            fontSize: 20,
            paddingLeft: 2,
            ...style,
          }}
          {...props}
        />
    );
  }
);

export default TextInput;
