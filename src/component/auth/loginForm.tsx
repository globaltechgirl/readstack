import { useState, useEffect, type FC, type CSSProperties } from "react";
import { Stack, Button, Anchor, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff, IconCheck } from "@tabler/icons-react";

import useLogin from "@/hooks/use-login";

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
  errorText: { 
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--dark-200)" 
  },
};

interface PasswordInputProps { value: string; onChange: (val: string) => void; hasError?: boolean; }

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

interface CustomCheckboxProps { checked: boolean; onToggle: () => void; label: string; }

const CustomCheckbox: FC<CustomCheckboxProps> = ({ checked, onToggle, label }) => (
  <label style={styles.checkboxLabel} onClick={onToggle}>
    <span style={{ ...styles.customCheckbox, backgroundColor: checked ? "var(--dark-100)" : "transparent" }}>
      {checked && <IconCheck size={9} stroke={3} color="var(--light-100)" />}
    </span>
    {label}
  </label>
);

const LoginForm: FC = () => {
  const { handleFormSubmit, loading, error } = useLogin();
  const [signInHover, setSignInHover] = useState(false);
  const [remember, setRemember] = useState(false);

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length >= 6 ? null : "Password must be at least 6 characters"),
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      form.setFieldValue("email", savedEmail);
      setRemember(true);
    }
  }, []);

  const onSubmit = async (values: typeof form.values) => {
    if (remember) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    await handleFormSubmit(values);
  };

  return (
    <form style={{ width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={20}>
        {error && <Text style={styles.errorText}>{error}</Text>}

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
          loading={loading}
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
      </Stack>
    </form>
  );
};

export default LoginForm;
