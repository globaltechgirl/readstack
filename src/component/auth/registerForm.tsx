import { useState, type FC, type CSSProperties } from "react";
import { Stack, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import useRegister from "@/hooks/use-register";

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
  errorText: { 
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--dark-200)",
    marginBottom: "-15px"
  },
};

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
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

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}

const ConfirmPasswordInput: FC<ConfirmPasswordInputProps> = ({ value, onChange, hasError }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>Confirm Password</label>
      <div style={styles.passwordWrapper}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Confirm your password"
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
  const { handleFormSubmit, loading, error } = useRegister();
  const [signInHover, setSignInHover] = useState(false);

  const form = useForm({
    initialValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    validate: {
      fullName: (val) => (val.length > 0 ? null : "Full Name is required"),
      email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length >= 6 ? null : "Password must be at least 6 characters"),
      confirmPassword: (val, values) => (val === values.password ? null : "Passwords do not match"),
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    await handleFormSubmit(values);
  };

  return (
    <form style={{ width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={20}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <div style={styles.inputWrapper}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            style={{ ...styles.input, borderColor: form.errors.fullName ? "red" : "var(--border-100)" }}
            {...form.getInputProps("fullName")}
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

        <PasswordInput
          value={form.values.password}
          onChange={(val) => form.setFieldValue("password", val)}
          hasError={!!form.errors.password}
        />

        <ConfirmPasswordInput
          value={form.values.confirmPassword}
          onChange={(val) => form.setFieldValue("confirmPassword", val)}
          hasError={!!form.errors.confirmPassword}
        />

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
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
