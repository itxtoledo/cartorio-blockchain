import React, { useRef, useState } from "react";
import { Alert, Card, FormGroup, Label } from "reactstrap";
import CustomButton from "../../components/common/CustomButton";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import ImageInput from "../../components/Unform/UnformFileInput";
import { useAPI } from "../../hooks/useAPI";
import { RegisterDocumentResponse } from "../../types/API";
import { FiExternalLink } from "react-icons/fi";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import axios from "axios";

const NotarizeDocument: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();

  const [receipt, setReceipt] = useState<RegisterDocumentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<{
    document: File;
  }> = async ({ document }) => {
    try {
      setReceipt(null);
      setLoading(true);

      const receipt = await api.registerDocument(document);

      setReceipt(receipt);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        cogoToast.error(parseAxiosErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card body style={{ maxWidth: 400 }} className="m-auto">
      <Form ref={formRef} onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal">Registrar Documento</h1>
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
        <Alert color="success" isOpen={!!receipt}>
          Documento registrado com sucesso no bloco{" "}
          <a
            href={`https://alfajores.celoscan.io/block/${receipt?.blockNumber}`}
            target="_blank"
          >
            {receipt?.blockNumber} <FiExternalLink />
          </a>
          , TxID{" "}
          <a
            href={`https://alfajores.celoscan.io/tx/${receipt?.txid}`}
            target="_blank"
          >
            {receipt?.txid} <FiExternalLink />
          </a>
          .
        </Alert>
        <hr />
        <CustomButton
          block
          size="lg"
          type="submit"
          color="primary"
          loading={loading}
        >
          Registrar
        </CustomButton>
      </Form>
    </Card>
  );
};

export default NotarizeDocument;
