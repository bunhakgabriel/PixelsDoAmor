import type { FieldValues, UseFormReturn } from "react-hook-form"

export type EtapaProps<T extends FieldValues> = {
  form: UseFormReturn<T>
}