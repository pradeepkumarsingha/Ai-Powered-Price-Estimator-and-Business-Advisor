import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/predict", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(form);
      toast.success("Account created successfully");
      navigate("/predict", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Register once to save predictions and unlock your analytics workspace."
      alternateText="Already have an account?"
      alternateLabel="Sign in"
      alternateTo="/login"
    >
      <div className="space-y-5">
        <GoogleAuthButton onSuccessPath="/predict" />
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span className="h-px flex-1 bg-slate-800" />
          Or create with email
          <span className="h-px flex-1 bg-slate-800" />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" className="input" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" minLength="6" className="input" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-60">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </AuthCard>
  );
};

export default RegisterPage;
