import { useState, useRef, useCallback } from "react";

const INITIAL_FORM = {
  title: "",
  amount: "",
  category: "Tech",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

const CATEGORIES = ["Tech", "Design", "Food", "Travel", "Office", "Health", "Entertainment", "Other"];

export function useExpenseForm(onSubmit) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // useRef: focus management
  const titleRef = useRef(null);
  const amountRef = useRef(null);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Date is required";
    return errs;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length) {
        setErrors(errs);
        // Focus first errored field via ref
        if (errs.title) titleRef.current?.focus();
        else if (errs.amount) amountRef.current?.focus();
        return;
      }
      setSubmitting(true);
      try {
        await onSubmit({
          ...form,
          amount: parseFloat(form.amount),
        });
        setForm(INITIAL_FORM);
        setErrors({});
        // Return focus to title for fast re-entry
        titleRef.current?.focus();
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    titleRef.current?.focus();
  }, []);

  return {
    form,
    errors,
    submitting,
    titleRef,
    amountRef,
    handleChange,
    handleSubmit,
    resetForm,
    CATEGORIES,
  };
}
