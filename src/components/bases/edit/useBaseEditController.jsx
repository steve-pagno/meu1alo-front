import React, { useEffect } from 'react';

const hasId = (id) => id !== undefined && id !== null && id !== '' && !Number.isNaN(Number(id));

const useBaseEditController = (serviceGetFunction, serviceFunction, id, setValue) => {
  const onSubmit = (data) => {
    if (hasId(id)) return serviceFunction(id, data);
    return serviceFunction(data);
  };

  useEffect(() => {
    const load = async () => {
      const resp = hasId(id) ? await serviceGetFunction(id) : await serviceGetFunction();
      const { body, isSuccess } = resp || {};
      if (!isSuccess || !body) return;

      Object.keys(body).forEach((key) => {
        setValue(key, body[key], { shouldDirty: false, shouldTouch: false, shouldValidate: false });
      });
    };

    if (typeof serviceGetFunction === 'function') load();
  }, [id, serviceGetFunction, setValue]);

  return { onSubmit };
};

export default useBaseEditController;
