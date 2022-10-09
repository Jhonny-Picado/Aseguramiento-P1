const controller = require("./AM008CorreoBackend");

test("valor de correo con mal formato", () => {
  const create = jest.fn(async (x) => {});

  const db = {
    Correo: {
      create: create,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      correo: "gerald@zamora@itcr.com",
    },
    params: {
      cedula: "23423",
    },
  });

  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  controller(db)
    .store(req(), res())
    .then(() => {
      expect(create.mock.calls.length).toBe(1);
      expect(create).toHaveBeenCalledWith({
        correo: "gerald@zamora@itcr.com",
        cedula: "23423",
      });
    });
});

test("valor de correo sin arroba", () => {
  const create = jest.fn(async (x) => {});

  const db = {
    Correo: {
      create: create,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      correo: "gerald",
    },
    params: {
      cedula: "23423",
    },
  });

  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  controller(db)
    .store(req(), res())
    .then(() => {
      expect(create.mock.calls.length).toBe(1);
      expect(create).toHaveBeenCalledWith({
        correo: "gerald",
        cedula: "23423",
      });
    });
});


test("valor de correo sin nombre", () => {
  const create = jest.fn(async (x) => {});

  const db = {
    Correo: {
      create: create,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      correo: "@itcr.com",
    },
    params: {
      cedula: "23423",
    },
  });

  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  controller(db)
    .store(req(), res())
    .then(() => {
      expect(create.mock.calls.length).toBe(1);
      expect(create).toHaveBeenCalledWith({
        correo: "@itcr.com",
        cedula: "23423",
      });
    });
});


test("valor de correo correcto", () => {
  const create = jest.fn(async (x) => {});

  const db = {
    Correo: {
      create: create,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      correo: "ersolano@itcr.ac.cr",
    },
    params: {
      cedula: "23423",
    },
  });

  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  controller(db)
    .store(req(), res())
    .then(() => {
      expect(create.mock.calls.length).toBe(1);
      expect(create).toHaveBeenCalledWith({
        correo: "ersolano@itcr.ac.cr",
        cedula: "23423",
      });
    });
});
