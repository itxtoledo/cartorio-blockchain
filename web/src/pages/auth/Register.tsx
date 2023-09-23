import React, { useEffect, useRef, useState } from "react";
import { Card, FormGroup, Label } from "reactstrap";
import UnformInput from "../../components/Unform/UnformInput";
import { Form } from "@unform/web";
import { registerSchema } from "../../schemas/AuthSchemas";
import { FormHandles, SubmitHandler } from "@unform/core";
import { ValidationError } from "yup";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import axios from "axios";
import { RegisterParameters } from "../../types/API";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { useAPI } from "../../hooks/useAPI";
import LogoImage from "../../components/common/LogoImage";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    formRef.current?.setFieldValue("email", state.email);
  }, [state]);

  const onSubmit: SubmitHandler<RegisterParameters> = async (data) => {
    try {
      setLoading(true);
      const parsedData = await registerSchema.validate(data, {
        abortEarly: false,
      });

      await api.register(parsedData);

      cogoToast.success("Registro efetuado com sucesso!");

      navigate("/auth/login", { state: parsedData });
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
            <FormGroup>
              <Label htmlFor="floatingPassword">Senha</Label>
              <UnformInput
                type="password"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                autoComplete="new-password"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="firstName">Primeiro nome</Label>
              <UnformInput
                type="text"
                id="firstName"
                placeholder="Primeiro nome"
                name="firstName"
                autoComplete="given-name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Último nome</Label>
              <UnformInput
                type="text"
                id="lastName"
                placeholder="Nome"
                name="lastName"
                autoComplete="family-name"
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
              Registrar
            </CustomButton>
          </Form>
        </Card>
      </div>
    </main>
  );
};

export default Register;
