import { useState } from "react";
import { useCreateContact } from "../query/itContactQuery";

export const useItContact = () => {
    const { mutate: submit, isPending } = useCreateContact();

    const [form, setForm] = useState({
        name: "",
        dept: "",
        contact: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(form, {
            onSuccess: () => {
                alert("문의가 접수되었습니다.");
                setForm({ name: "", dept: "", contact: "", email: "", subject: "", message: "" });
            },
            onError: (err) => {
                alert(err.response?.data?.message ?? "문의 접수 실패");
            },
        });
    };

    return { form, isPending, handleChange, handleSubmit };
};