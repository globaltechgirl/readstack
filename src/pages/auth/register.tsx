import type { FC, CSSProperties } from "react";
import { Paper, Title, Stack, Text, Anchor } from "@mantine/core";
import Logo from "@/assets/logo.svg";
import RegisterForm from "@/component/auth/registerForm";

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "var(--light-200)",
    overflow: "hidden",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "var(--light-200)",
    padding: "20px 0 50px",
    gap: 10,
  },
  logoWrapper: { 
    display: "flex", 
    justifyContent: "center" 
  },
  logo: { 
    width: 80, 
    height: 40 
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "70%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  title: { 
    fontSize: 30, 
    fontWeight: 500, 
    color: "var(--dark-100)", 
    textAlign: "center" 
  },
  subtitle: { 
    fontSize: 10, 
    fontWeight: 450, 
    color: "var(--dark-200)", 
    textAlign: "center", 
    marginTop: 2 
  },
  signUpWrapper: { 
    fontSize: 9.5, 
    fontWeight: 450, 
    color: "var(--dark-200)", 
    textAlign: "center", 
    marginTop: 5 
  },
  signUpLink: { 
    fontSize: 9.5, 
    fontWeight: 450, 
    color: "var(--dark-100)", 
    textDecoration: "none", 
    cursor: "pointer", 
    transition: "opacity 0.2s", 
    marginLeft: 4 
  },
  rightPanel: { 
    flex: 1, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    position: "relative", 
    overflow: "hidden",
    backgroundColor: "var(--dark-300)"
  },
  layoutContainer: { 
    position: "relative", 
    width: "115%", 
    height: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  layoutBg: { 
    position: "absolute", 
    inset: 0, 
    width: "100%", 
    height: "100%", 
    objectFit: "cover", 
    objectPosition: "center", 
    zIndex: 1 
  },
};

const Register: FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.logoWrapper}>
          <img src={Logo} alt="Logo" style={styles.logo} />
        </div>

        <Paper style={styles.paper}>
          <Stack gap={6} mb="lg" align="center">
            <Title style={styles.title}>Welcome to Readstack!</Title>
            <Text style={styles.subtitle}>
              Your reads, your notes, your stack — all in one place.
            </Text>
          </Stack>
          <RegisterForm />
        </Paper>

        <Text style={styles.signUpWrapper}>
          Already have an account?
          <Anchor href="/login" style={styles.signUpLink}>
            Sign in here
          </Anchor>
        </Text>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.layoutContainer}>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
