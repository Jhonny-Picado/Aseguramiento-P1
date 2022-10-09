const controller = require("./CV006Convocar");

test("dummy", () => {
  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    body: {
      consecutivo: "1",
      convocados: [2, 3, 4],
      limite_solicitud: 10,
    },
  });

  const create = jest.fn(async (x) => {});
  const findAll = jest.fn(async (x) => [2, 3, 4]);

  const db = {
    Correo: {
      findAll: findAll,
    },
    Convocado: {
      create: create,
    },
  };

    controller(db).store(req(), res()).then(() => {
        expect(create.mock.calls.length).toBe(3);
        expect(findAll.mock.calls.length).toBe(3);
    });
});
