export const getUpdatedValues = (
    initial: Record<string, unknown>,
    final: Record<string, unknown>
  ): Partial<typeof final> => {
    const updated: Partial<typeof final> = {};
    for (const key in final) {
      if (initial[key] !== final[key]) {
        updated[key] = typeof final[key] === 'string' ? final[key].trim() : final[key];
      }
    }
    return updated;
  };
  