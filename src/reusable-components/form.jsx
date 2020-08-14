import React from "react";
import { Form, Button } from "react-bootstrap";
import { capitalize } from "lodash";

const HelperForm = ({ val1, val2, val3, handleChange, submit, prop }) => {
  let val1Name;
  let val2Name;
  let val3Name;
  let val2Type;
  let btnText;

  if (prop === "post") {
    val1Name = "title";
    val2Name = "description";
    val2Type = "text";
    btnText = "Create Post";
  } else if (prop === "signin") {
    val1Name = "email";
    val2Name = "password";
    val2Type = "password";
    btnText = "Sign In";
  } else if (prop === "signup") {
    val1Name = "email";
    val2Name = "password";
    val2Type = "password";
    val3Name = "username";
    btnText = "Sign Up";
  }

  return (
    <Form className="form-settings">
      {prop === "signup" ? (
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="label-settings">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={capitalize(val3Name)}
            name={val3Name}
            onChange={handleChange}
            value={val3}
            className="input-settings"
            autoComplete="off"
          />
        </Form.Group>
      ) : null}

      <Form.Group controlId="formBasicEmail">
        <Form.Label className="label-settings">
          {capitalize(val1Name)}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={capitalize(val1Name)}
          name={val1Name}
          onChange={handleChange}
          value={val1}
          autoComplete="off"
          className="input-settings"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className="label-settings">
          {capitalize(val2Name)}
        </Form.Label>
        <Form.Control
          type={val2Type}
          placeholder={capitalize(val2Name)}
          name={val2Name}
          onChange={handleChange}
          value={val2}
          autoComplete="off"
          className="input-settings"
        />
      </Form.Group>
      <Button
        className={prop === "post" && (!val1 || !val2) ? " -disabled" : ""}
        variant="secondary"
        type="submit"
        onClick={submit}
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default HelperForm;
