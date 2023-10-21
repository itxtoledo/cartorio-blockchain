import React, { useRef, useState } from "react";
import { Alert, Card, FormGroup, Label } from "reactstrap";
import CustomButton from "../../components/common/CustomButton";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import ImageInput from "../../components/Unform/UnformFileInput";
import { useAPI } from "../../hooks/useAPI";
import { ImWarning } from "react-icons/im";

// import { Container } from './styles';

const VerifyDocument: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<{
    document: File;
  }> = async ({ document }) => {
    console.log(document);

    const res = await api.checkDocument(document);

    if (res.fileSize == "0") {
      setErrorMessage(
        "Este documento não foi encontrado ou pode ter sido alterado."
      );
    }
  };

  return (
    <Card body style={{ maxWidth: 400 }} className="m-auto">
      <Form ref={formRef} onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Verificar Documento</h1>
        <hr />
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
        <Alert isOpen={!!errorMessage} color="danger">
          <ImWarning /> {errorMessage}
        </Alert>{" "}
        <hr />
        <CustomButton block size="lg" type="submit" color="primary">
          Verificar
        </CustomButton>
      </Form>
    </Card>
  );
};

export default VerifyDocument;
