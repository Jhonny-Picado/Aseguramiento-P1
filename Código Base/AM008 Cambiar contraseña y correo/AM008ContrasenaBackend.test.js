const controller = require("./AM008ContrasenaBackend");

test("valor de contraseña vacia", () => {
  const update = jest.fn();

  const db = {
    Usuario: {
      update: update,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      clave: "",
      cedula: "1234567890",
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
    .changePassword(req(), res())
    .then(() => {
      const expected = [{ clave: "" }, { where: { cedula: "1234567890" } }];

      expect(update.mock.calls.length).toBe(1);
      expect(update).toHaveBeenCalledWith(expected[0], expected[1]);
    });
});

test("valor de contraseña con longitud mayor", () => {
  const update = jest.fn();

  const db = {
    Usuario: {
      update: update,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      clave: "hfyr7585u2he2",
      cedula: "1234567890",
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
    .changePassword(req(), res())
    .then(() => {
      const expected = [
        { clave: "hfyr7585u2he2" },
        { where: { cedula: "1234567890" } },
      ];

      expect(update.mock.calls.length).toBe(1);
      expect(update).toHaveBeenCalledWith(expected[0], expected[1]);
    });
});

test("valor de contraseña con longitud menor", () => {
  const update = jest.fn();

  const db = {
    Usuario: {
      update: update,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      clave: "34re",
      cedula: "1234567890",
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
    .changePassword(req(), res())
    .then(() => {
      const expected = [{ clave: "34re" }, { where: { cedula: "1234567890" } }];

      expect(update.mock.calls.length).toBe(1);
      expect(update).toHaveBeenCalledWith(expected[0], expected[1]);
    });
});

test("valor de contraseña con longitud menor", () => {
  const update = jest.fn();

  const db = {
    Usuario: {
      update: update,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      clave: "_$irir??",
      cedula: "1234567890",
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
    .changePassword(req(), res())
    .then(() => {
      const expected = [
        { clave: "_$irir??" },
        { where: { cedula: "1234567890" } },
      ];

      expect(update.mock.calls.length).toBe(1);
      expect(update).toHaveBeenCalledWith(expected[0], expected[1]);
    });
});

test("valor de contraseña correcta", () => {
  const update = jest.fn();

  const db = {
    Usuario: {
      update: update,
    },
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      clave: "asdf123",
      cedula: "1234567890",
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
    .changePassword(req(), res())
    .then(() => {
      const expected = [
        { clave: "asdf123" },
        { where: { cedula: "1234567890" } },
      ];

      expect(update.mock.calls.length).toBe(1);
      expect(update).toHaveBeenCalledWith(expected[0], expected[1]);
    });
});
