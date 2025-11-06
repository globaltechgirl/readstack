import { useState, type FC, type CSSProperties } from "react";
import { Stack, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import GoogleLogo from "@/assets/google.png";

const styles: Record<string, CSSProperties> = {
  inputWrapper: { 
    display: "flex", 
    flexDirection: "column", 
    width: "100%" 
  },
  label: { 
    fontSize: 9.5,
    fontWeight: 500,
    marginBottom: 8, 
    color: "var(--dark-200)" 
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 9.5,
    fontWeight: 450,
    borderRadius: 10,
    border: "0.5px solid var(--border-100)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  passwordWrapper: { 
    position: "relative", 
    width: "100%" 
  },
  toggleIcon: { 
    position: "absolute", 
    right: 14, 
    top: "50%", 
    transform: "translateY(-50%)", 
    cursor: "pointer" 
  },
  orWrapper: { 
    display: "flex", 
    alignItems: "center", 
    gap: 10, 
    fontSize: 9.5, 
    color: "var(--dark-100)", 
    fontWeight: 500 
  },
  hr: { 
    flex: 1, 
    height: 0.4, 
    backgroundColor: "var(--border-100)", 
    border: "none" 
  },
  button: { 
    fontSize: 9.5, 
    fontWeight: 600, 
    color: "var(--light-100)", 
    backgroundColor: "var(--dark-100)", 
    borderRadius: 10, 
    height: 38, 
    marginTop: 5, 
    transition: "all 0.2s"  
  },
  googleButton: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 8, 
    border: "0.5px solid var(--border-100)", 
    borderRadius: 10, 
    height: 38, 
    cursor: "pointer", 
    fontSize: 9.5, 
    fontWeight: 600, 
    color: "var(--dark-100)", 
    backgroundColor: "transparent", 
    transition: "all 0.2s" 
  },
};

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  hasError?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange, hasError }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>Password</label>
      <div style={styles.passwordWrapper}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your password"
          style={{ ...styles.input, borderColor: hasError ? "red" : "var(--dark-100)", paddingRight: 32 }}
        />
        {show ? (
          <IconEyeOff size={14} stroke={1.5} style={styles.toggleIcon} onClick={() => setShow(false)} color="var(--dark-200)" />
        ) : (
          <IconEye size={14} stroke={1.5} style={styles.toggleIcon} onClick={() => setShow(true)} color="var(--dark-200)" />
        )}
      </div>
    </div>
  );
};

const RegisterForm: FC = () => {
  const navigate = useNavigate(); 
  const [signInHover, setSignInHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);

  const form = useForm({
    initialValues: { username: "", email: "", password: "" },
    validate: {
      username: (val) => (val.length > 0 ? null : true),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : true),
      password: (val) => (val.length >= 6 ? null : true),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    navigate("/home"); 
  };

  return (
    <form style={{ width: "100%" }} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={20}>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={{ ...styles.input, borderColor: form.errors.username ? "red" : "var(--border-100)" }}
            {...form.getInputProps("username")}
          />
        </div>

        <div style={styles.inputWrapper}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{ ...styles.input, borderColor: form.errors.email ? "red" : "var(--border-100)" }}
            {...form.getInputProps("email")}
          />
        </div>

        <PasswordInput value={form.values.password} onChange={(val) => form.setFieldValue("password", val)} hasError={!!form.errors.password} />
          
        <Button
          type="submit"
          fullWidth
          style={{
            ...styles.button,
            backgroundColor: signInHover ? "var(--dark-300)" : "var(--dark-100)",
            border: signInHover ? "0.5px solid var(--border-100)" : "transparent",
            color: signInHover ? "var(--dark-100)" : "var(--light-100)",
          }}
          onMouseEnter={() => setSignInHover(true)}
          onMouseLeave={() => setSignInHover(false)}
        >
          Sign Up
        </Button>

        <div style={styles.orWrapper}>
          <hr style={styles.hr} />
          <span>or</span>
          <hr style={styles.hr} />
        </div>

        <div
          style={{
            ...styles.googleButton,
            backgroundColor: googleHover ? "var(--dark-300)" : "transparent",
          }}
          onMouseEnter={() => setGoogleHover(true)}
          onMouseLeave={() => setGoogleHover(false)}
        >
          <img src={GoogleLogo} alt="Google" width={12} height={12} />
          <span>Sign up with Google</span>
        </div>
      </Stack>
    </form>
  );
};

export default RegisterForm;
