import { useState, type FC, type CSSProperties } from "react";
import { Stack, Button, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff, IconCheck } from "@tabler/icons-react";
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
  checkRow: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    fontSize: 9.5, 
    fontWeight: 500, 
    color: "var(--dark-100)", 
    marginTop: 5 
  },
  checkboxLabel: { 
    display: "flex", 
    alignItems: "center", 
    gap: 5 
  },
  customCheckbox: { 
    width: 11.5, 
    height: 11, 
    border: "1px solid var(--dark-100)", 
    borderRadius: 3, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    flexShrink: 0, 
    transition: "background-color 0.2s", 
    cursor: "pointer" 
  },
  forgotPassword: { 
    fontSize: 9.5, 
    fontWeight: 500, 
    color: "var(--dark-100)", 
    textDecoration: "none", 
    cursor: "pointer", 
    transition: "opacity 0.2s" 
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

interface CustomCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ checked, onToggle, label }) => (
  <label style={styles.checkboxLabel} onClick={onToggle}>
    <span style={{ ...styles.customCheckbox, backgroundColor: checked ? "var(--dark-100)" : "transparent" }}>
      {checked && <IconCheck size={9} stroke={3} color="var(--light-100)" />}
    </span>
    {label}
  </label>
);

const LoginForm: FC = () => {
  const navigate = useNavigate(); 
  const [signInHover, setSignInHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);
  const [remember, setRemember] = useState(false);

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
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
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{ ...styles.input, borderColor: form.errors.email ? "red" : "var(--dark-100)" }}
            {...form.getInputProps("email")}
          />
        </div>

        <PasswordInput value={form.values.password} onChange={(val) => form.setFieldValue("password", val)} hasError={!!form.errors.password} />

        <div style={styles.checkRow}>
          <CustomCheckbox checked={remember} onToggle={() => setRemember(!remember)} label="Remember me" />
          <Anchor style={styles.forgotPassword} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
            Forgot your password?
          </Anchor>
        </div>

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
          Sign In
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
          <span>Sign in with Google</span>
        </div>
      </Stack>
    </form>
  );
};

export default LoginForm;
