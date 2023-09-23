import React, { useEffect, useRef, useState } from "react";
import { Card, FormGroup, Label } from "reactstrap";
import UnformInput from "../../components/Unform/UnformInput";
import { Form } from "@unform/web";
import { lostPasswordSchema } from "../../schemas/AuthSchemas";
import { FormHandles, SubmitHandler } from "@unform/core";
import { ValidationError } from "yup";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import axios from "axios";
import { LostPasswordParameters } from "../../types/API";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { useAPI } from "../../hooks/useAPI";
import LogoImage from "../../components/common/LogoImage";

const LostPassword: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    formRef.current?.setFieldValue("email", state.email);
  }, [state]);

  const onSubmit: SubmitHandler<LostPasswordParameters> = async (data) => {
    try {
      setLoading(true);
      const parsedData = await lostPasswordSchema.validate(data, {
        abortEarly: false,
      });

      await api.lostPassword(parsedData);

      cogoToast.success("Código efetuado com sucesso!");

      navigate("/auth/reset-password");
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};

      if (err instanceof ValidationError) {
        cogoToast.error(err.message);
        err.inner.forEach((error) => {
          validationErrors[error.path as string] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      } else if (axios.isAxiosError(err)) {
        cogoToast.error(parseAxiosErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-100 d-flex align-items-center py-4 bg-light">
      <div style={{ maxWidth: 500 }} className="m-auto">
        <Card body>
          <Form ref={formRef} onSubmit={onSubmit}>
            <LogoImage />
            <h1 className="h3 mb-3 fw-normal">Esqueci a senha</h1>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <UnformInput
                type="email"
                id="email"
                placeholder="name@example.com"
                name="email"
                autoComplete="email"
                required
              />
            </FormGroup>

            <p>
              Já tem um código?{" "}
              <Link to="/auth/reset-password">Redefina sua senha.</Link>
            </p>

            <CustomButton
              block
              size="lg"
              type="submit"
              color="primary"
              loading={loading}
            >
              Enviar
            </CustomButton>
          </Form>
        </Card>
      </div>
    </main>
  );
};

export default LostPassword;
