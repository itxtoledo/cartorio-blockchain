import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Collapse, FormGroup, Label } from "reactstrap";
import UnformInput from "../../components/Unform/UnformInput";
import { Form } from "@unform/web";
import { loginSchema } from "../../schemas/AuthSchemas";
import { FormHandles, SubmitHandler } from "@unform/core";
import { ValidationError } from "yup";
import cogoToast from "cogo-toast";
import { parseAxiosErrorMessage } from "../../services/API";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { useAPI } from "../../hooks/useAPI";
import { LoginParameters, RegisterParameters } from "../../types/API";

const Login: React.FC = () => {
  const auth = useAuth();
  const formRef = useRef<FormHandles>(null);
  const api = useAPI();
  const location = useLocation();
  const [changedEmail, setChangedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginParameters> = async (data) => {
    setLoading(true);
    try {
      const parsedData = await loginSchema.validate(data, {
        abortEarly: false,
      });

      const res = await api.login(parsedData);

      auth.setJWT(res.jwt);
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

  const data = useMemo(() => location.state as RegisterParameters, [location]);

  useEffect(() => {
    if (data) {
      setChangedEmail(data.email);
      formRef.current?.submitForm();
    }
  }, [data]);

  return (
    <div style={{ maxWidth: 500 }} className="m-auto">
      <Card body className="w-100">
        <Form onSubmit={onSubmit} initialData={data}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <UnformInput
              type="email"
              id="email"
              placeholder="name@example.com"
              name="email"
              onChange={({ target }) => setChangedEmail(target.value)}
              required
            />
          </FormGroup>
          <Collapse isOpen={changedEmail.length > 0}>
            <FormGroup>
              <Label htmlFor="floatingPassword">Senha</Label>
              <UnformInput
                type="password"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                required
              />
            </FormGroup>

            <p>
              <Link to="/auth/lost-password" state={{ email: changedEmail }}>
                Esqueci a senha
              </Link>
            </p>
          </Collapse>

          <CustomButton
            loading={loading}
            size="lg"
            type="submit"
            color="primary"
            block
          >
            Entrar
          </CustomButton>
          <p className="mt-3">
            Não tem uma conta?{" "}
            <Link to="/auth/register" state={{ email: changedEmail }}>
              Registre-se aqui.
            </Link>
          </p>
          <p className="mt-3 mb-3 text-muted">© 2023-2023</p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
