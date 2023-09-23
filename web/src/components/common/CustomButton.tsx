import React from "react";
import { Button, ButtonProps, Spinner } from "reactstrap";
import _ from "lodash";

const CustomButton: React.FC<
  ButtonProps & {
    loading?: boolean;
  }
> = (props) => {
  return (
    <Button
      disabled={props.loading ? true : props.disabled}
      {..._.omit(props, ["loading"])}
    >
      {props.loading && (
        <>
          <Spinner size="sm">Loading...</Spinner>{" "}
        </>
      )}
      {props.children}
    </Button>
  );
};

export default CustomButton;
