export const validateParams = <T extends Object>(params: T, schema: any[]) => {
  const errors = [];

  for (let key of schema) {
    if (!params.hasOwnProperty(key)) {
      errors.push(`${key} is required!`);
    }
  }

  return {
    errors: errors.length > 0 && errors,
    data: params,
  };
};
