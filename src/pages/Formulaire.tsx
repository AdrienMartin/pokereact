import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  nom: z
    .string()
    .min(1, "Le nom ne doit pas être vide")
    .refine((s) => s === s.toUpperCase(), {
      message: "Le nom doit être en majuscule",
    }),
  prenom: z.string().min(1, "Le prénom ne doit pas être vide"),
  age: z.number().min(18, "Majorité requise"),
});

const STEP_FIELDS = {
  1: ["nom"] as const,
  2: ["prenom"] as const,
  3: ["age"] as const,
};

type FormData = z.infer<typeof schema>;

export default function Formulaire() {
  const [etape, setEtape] = useState<number>(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    navigate("/result", {
      state: { data: data },
    });
  };

  const handleCLickSuivant = () => {
    trigger(STEP_FIELDS[etape as 1 | 2 | 3]).then((isValid) => {
      if (isValid) {
        setEtape(etape + 1);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Etape {etape}</h1>
      {etape === 1 && (
        <>
          Nom : <br />
          <input {...register("nom")} />
          <br />
          {errors.nom && <span>{errors.nom.message}</span>}
          <button type="button" onClick={() => handleCLickSuivant()}>
            Suivant
          </button>
        </>
      )}
      {etape === 2 && (
        <>
          Prenom : <br />
          <input {...register("prenom")} />
          <br />
          {errors.prenom && <span>{errors.prenom.message}</span>}
          <button type="button" onClick={() => handleCLickSuivant()}>
            Suivant
          </button>
        </>
      )}
      {etape === 3 && (
        <>
          Age : <br />
          <input {...register("age", { valueAsNumber: true })} type="number" />
          <br />
          {errors.age && <span>{errors.age.message}</span>}
          <button type="submit">Terminer</button>
        </>
      )}
    </form>
  );
}
