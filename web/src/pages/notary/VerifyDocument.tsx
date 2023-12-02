import React, { useRef, useState } from "react";
import { Alert, Card, FormGroup, Label, Table } from "reactstrap";
import CustomButton from "../../components/common/CustomButton";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import ImageInput from "../../components/Unform/UnformFileInput";
import { useAPI } from "../../hooks/useAPI";
import { ImWarning } from "react-icons/im";
import axios from "axios";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import { CheckDocumentResponse } from "../../types/API";
import { FiCheckCircle } from "react-icons/fi";
import { format, formatDistance, fromUnixTime } from "date-fns";
import { FiExternalLink } from "react-icons/fi";
import { abbreviateAddress } from "../../utils/helpers";
import ptBrLocale from "date-fns/locale/pt-BR";

const VerifyDocument: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<CheckDocumentResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<{
    document: File;
  }> = async ({ document }) => {
    try {
      setLoading(true);

      const res = await api.checkDocument(document);

      if (res.fileSize == "0") {
        setErrorMessage(
          "Este documento não foi encontrado ou pode ter sido alterado."
        );
      } else {
        setReceipt(res);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        cogoToast.error(parseAxiosErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card body style={{ maxWidth: 500 }} className="m-auto">
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
          </Alert>
          {receipt && (
            <Card color="light" body>
              <h4 className="mb-3">
                <FiCheckCircle color="green" /> Documento certificado
              </h4>

              <Table bordered hover stripped responsive className="mb-3">
                <tbody>
                  <tr>
                    <td>
                      <b>Checksum</b>
                    </td>
                    <td>{receipt?.fileHash}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>TxID</b>
                    </td>
                    <td>
                      <a
                        href={`https://alfajores.celoscan.io/tx/${receipt?.txid}`}
                        target="_blank"
                      >
                        {abbreviateAddress(receipt?.txid)} <FiExternalLink />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Bloco</b>
                    </td>
                    <td>
                      <a
                        href={`https://alfajores.celoscan.io/block/${receipt?.blockNumber}`}
                        target="_blank"
                      >
                        {abbreviateAddress(receipt?.blockNumber)}{" "}
                        <FiExternalLink />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Registro</b>
                    </td>
                    <td>
                      {format(
                        fromUnixTime(Number(receipt!.timestamp!)),
                        "dd/MM/yyy HH:mm:ss"
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <small>
                Registrado na blockchain há{" "}
                {formatDistance(
                  fromUnixTime(Number(receipt!.timestamp!)),
                  new Date(),
                  {
                    locale: ptBrLocale,
                  }
                )}
                .
              </small>
            </Card>
          )}
          <hr />
          <CustomButton
            block
            size="lg"
            type="submit"
            color="primary"
            loading={loading}
          >
            Verificar
          </CustomButton>
        </Form>
      </Card>
  );
};

export default VerifyDocument;
