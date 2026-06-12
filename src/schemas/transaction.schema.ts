import { z } from "zod";

export const transactionSchema = z.object({
  amount: z
    .number({
      error: "El monto es obligatorio",
    })
    .positive("El monto debe ser mayor a 0"),

  type: z.enum(
    ["income", "expense"],
    {
      error: "Tipo inválido",
    }
  ),

  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .trim(),

  categoryId: z
    .number({
      error: "Debe seleccionar una categoría",
    })
    .positive("Debe seleccionar una categoría"),
});