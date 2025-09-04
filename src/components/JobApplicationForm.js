import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function JobApplicationForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      resume: null,
      skills: [{ name: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = (data) => {
    // Convert to FormData for backend
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("resume", data.resume[0]); // first file
    data.skills.forEach((skill, i) => {
      formData.append(`skills[${i}]`, skill.name);
    });

    console.log("Form Submitted ✅");
    console.log("Raw Data:", data);
    console.log("FormData (for backend):", [...formData.entries()]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Job Application Form</h2>

      {/* Name */}
      <div>
        <label>Name:</label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Your Name"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="you@example.com"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      {/* Resume Upload */}
      <div>
        <label>Upload Resume:</label>
        <input
          type="file"
          {...register("resume", {
            required: "Resume is required",
            validate: {
              fileType: (value) =>
                value[0]?.type === "application/pdf" || "Only PDF allowed",
              fileSize: (value) =>
                value[0]?.size < 2 * 1024 * 1024 || "File must be < 2MB"
            }
          })}
        />
        {errors.resume && <p className="error">{errors.resume.message}</p>}
      </div>

      {/* Dynamic Skills */}
      <div>
        <label>Skills:</label>
        {fields.map((field, index) => (
          <div key={field.id} className="skill-row">
            <input
              {...register(`skills.${index}.name`, { required: "Skill is required" })}
              placeholder={`Skill #${index + 1}`}
            />
            <button type="button" onClick={() => remove(index)}>
              ❌ Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: "" })}>
          ➕ Add Skill
        </button>
        {errors.skills && <p className="error">Each skill is required</p>}
      </div>

      <button type="submit">Submit Application</button>
    </form>
  );
}
