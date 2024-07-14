import React from "react";
import { Button, Stack } from "react-bootstrap";
import { PasswordStrength } from "../../PasswordStrength/PasswordStrength";
import TypeMessage from "../../TypeMessage/TypeMessage";
import { validateEmail } from "../../../../../helpers/ValidateEmail/ValidateEmail";

export const expRegularMay = /(?:[A-Z])/;
export const expRegularMin = /(?:[a-z])/;
export const expRegularNumero = /(?:\d)/;
export const expCarateEspace = /(?=.*[$@$%*&_])/;

const FormLogin = () => {
  const [formValue, setFormValue] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = React.useState<{
    force: string;
    bgColor: string;
    textColor: string;
  }>({
    force: "",
    bgColor: "",
    textColor: "",
  });
  const [isViewPassword, setIsViewPassword] = React.useState<boolean>(false);

  const validatePassword = (value: string) => {
    if (
      value.length >= 8 &&
      expRegularMay.test(value) &&
      expRegularMin.test(value) &&
      expRegularNumero.test(value) &&
      expCarateEspace.test(value)
    ) {
      setPasswordStrength({
        ...passwordStrength,
        force: "Contraseña fuerte",
        bgColor: "green",
        textColor: "white",
      });
      return true ;
    } else if (
      value.length >= 8 &&
      (expRegularMay.test(value) || expRegularMin.test(value)) &&
      expRegularNumero.test(value)
    ) {
      setPasswordStrength({
        ...passwordStrength,
        force: "Contraseña Moderada",
        bgColor: "orange",
        textColor: "black",
      });
      return true;
    } else {
      setPasswordStrength({
        ...passwordStrength,
        force: "Contraseña Debil",
        bgColor: "red",
        textColor: "white",
      });
      return false;
    }
  };

  const formClear = () => {
    setFormValue({...formValue, email: '', password: ''})
  }

  const validateDatos = ({formValue: { email, password }} : {formValue: {email: string, password: string}}) => {
    if (validatePassword(password) && validateEmail(email)) {
      alert("Credenciales Validas....")
    } else {
      alert("Credenciales no validas....")
    }
  }

  return (
    <div>
   
      <Stack direction="vertical" gap={2} className="my-3">
        <input
          type="email"
          value={formValue.email}
          onChange={(e) =>
            setFormValue({ ...formValue, email: e.target.value })
          }
          className="input"
          placeholder="Correo Eléctronico"
        />
        {formValue.email.length > 5 && !validateEmail(formValue.email) && (
          <TypeMessage message="Correo no valido..." />
        )}
        <input
          type={isViewPassword ? "text" : "password"}
          value={formValue.password}
          onChange={(e) =>
            setFormValue({ ...formValue, password: e.target.value })
          }
          onKeyUp={(e: any) => validatePassword(e.target.value)}
          onBlur={(e) => validatePassword(e.target.value)}
          className="input"
          placeholder="password"
        />
        <Button
          variant="secondary"
          onClick={() => setIsViewPassword(!isViewPassword)}
        >
          {!isViewPassword ? "Mostrar Contraseña" : "Ocultar Contraseña"}
        </Button>
        <Button
          variant="success"
          onClick={() => validateDatos({formValue})}
        >
          Validar
        </Button>
        <Button variant="primary" onClick={formClear}>Limpiar</Button>
      </Stack>

      <PasswordStrength passwordStrength={passwordStrength} />
    </div>
  );
};

export default FormLogin;
