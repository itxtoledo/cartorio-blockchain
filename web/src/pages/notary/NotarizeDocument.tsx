import React, { useRef } from "react";
import { Card, FormGroup, Label } from "reactstrap";
import CustomButton from "../../components/common/CustomButton";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import ImageInput from "../../components/Unform/UnformFileInput";
import { useAPI } from "../../hooks/useAPI";

const NotarizeDocument: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();

  const onSubmit: SubmitHandler<{
    document: File;
  }> = async ({ document }) => {
    console.log(document);

    api.registerDocument(document);
  };

  return (
    <Card body style={{ maxWidth: 400 }} className="m-auto">
      <Form ref={formRef} onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Registrar Documento</h1>
        <FormGroup>
          <Label htmlFor="token">Documento</Label>
          <ImageInput
            type="file"
            id="document"
            placeholder="Documento"
            name="document"
            accept="application/pdf"
            required
          />
          <small>Extensões suportadas: pdf.</small>
        </FormGroup>
        <CustomButton block size="lg" type="submit" color="primary">
          Registrar
        </CustomButton>
      </Form>
    </Card>
  );
};

export default NotarizeDocument;
