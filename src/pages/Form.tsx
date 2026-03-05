import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const GenderEnum = {
  female: "female",
  male: "male",
  other: "other",
} as const;

type Inputs = {
  exampleRequired: string;
  gender: typeof GenderEnum;
  age: number;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    navigate("/result", { state: { data: data } });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("exampleRequired", { required: true })} />

      {errors.exampleRequired && <span>This field is required</span>}
      <br />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <br />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <br />
      {errors.age && <span>Age incorrect</span>}
      <input type="submit" />
    </form>
  );
}
