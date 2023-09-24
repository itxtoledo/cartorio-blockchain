import React, { useRef } from "react";
import { Card, FormGroup, Label } from "reactstrap";
import UnformInput from "../../components/Unform/UnformInput";
import CustomButton from "../../components/common/CustomButton";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import ImageInput from "../../components/Unform/UnformFileInput";
import { useAPI } from "../../hooks/useAPI";

// import { Container } from './styles';

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
    <div style={{ maxWidth: 500, minHeight: 100 }} className="m-auto">
      <Card body>
        <Form ref={formRef} onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Registrar Documento</h1>
          <FormGroup>
            <Label htmlFor="token">Documento</Label>
            <ImageInput
              type="file"
              id="document"
              placeholder="Código"
              name="document"
              required
            />
            <small>Extensões suportadas: pdf, png, jpg.</small>
          </FormGroup>
          <CustomButton block size="lg" type="submit" color="primary">
            Registrar
          </CustomButton>
        </Form>
      </Card>
    </div>
  );
};

export default NotarizeDocument;
