import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nextPath = location.state?.from?.pathname || "/predict";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [isAuthenticated, navigate, nextPath]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(form);
      toast.success("Welcome back");
      navigate(nextPath, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Access predictions, history, and your analytics workspace."
      alternateText="New here?"
      alternateLabel="Create an account"
      alternateTo="/register"
    >
      <div className="space-y-5">
        <GoogleAuthButton onSuccessPath={nextPath} />
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span className="h-px flex-1 bg-slate-800" />
          Or continue with email
          <span className="h-px flex-1 bg-slate-800" />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="input" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-60">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
