import React, { useEffect, useRef, useState } from "react";
import { Card, FormGroup, Label } from "reactstrap";
import UnformInput from "../../components/Unform/UnformInput";
import { Form } from "@unform/web";
import { resetPasswordSchema } from "../../schemas/AuthSchemas";
import { FormHandles, SubmitHandler } from "@unform/core";
import { ValidationError } from "yup";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import axios from "axios";
import { ResetPasswordParameters } from "../../types/API";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { useAPI } from "../../hooks/useAPI";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const onSubmit: SubmitHandler<ResetPasswordParameters> = async (data) => {
    try {
      setLoading(true);
      const parsedData = await resetPasswordSchema.validate(data, {
        abortEarly: false,
      });

      await api.resetPassword(parsedData);

      cogoToast.success("Senha redefinida com sucesso!");

      navigate("/auth/login");
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

  useEffect(() => {
    const token = searchParams.get("token");
    formRef.current?.setFieldValue("token", token);
  }, [searchParams]);

  return (
    <div style={{ maxWidth: 500 }} className="m-auto">
      <Card body>
        <Form ref={formRef} onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Redefinição de senha</h1>

          <FormGroup>
            <Label htmlFor="token">Código enviado por e-mail</Label>
            <UnformInput
              type="text"
              id="token"
              placeholder="Código"
              name="token"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="newPassword">Nova senha</Label>
            <UnformInput
              type="password"
              id="newPassword"
              placeholder="Nova senha"
              name="password"
              autoComplete="new-password"
              required
            />
          </FormGroup>
          <p>
            Já tem uma conta? <Link to="/auth/login">Faça login.</Link>
          </p>
          <CustomButton
            block
            size="lg"
            type="submit"
            color="primary"
            loading={loading}
          >
            Redefinir senha
          </CustomButton>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
