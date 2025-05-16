export interface DateInfo {
  dayOfWeek: string;
  day: string;
  month: string;
}

export enum FormatDateOptionsEnum {
  LONG = "long",
  SHORT = "short",
}

export interface FormatDateOptions {
  monthType: FormatDateOptionsEnum;
  weekdayType: FormatDateOptionsEnum;
}

export interface ErrorResponse {
  data?: {
    error?: string | string[];
  };
}

export const feedbackTextMapper = {
  create: (tag: string) => `${tag} created successfully`,
  delete: (tag: string) => `${tag} deleted successfully`,
  update: (tag: string) => `${tag} updated successfully`,
};
